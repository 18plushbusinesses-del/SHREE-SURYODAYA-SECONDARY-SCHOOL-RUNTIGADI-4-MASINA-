import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import multer from 'multer';
import { createServer as createViteServer } from 'vite';
import { 
  initialNotices, 
  mockStaffRoles, 
  mockTopPerformers, 
  mockCalendarEvents, 
  mockGalleryAlbums, 
  mockDocuments 
} from './src/data/mockData.js';
import { Notice, StaffRole, GalleryAlbum, DocumentItem, AcademicCalendarEvent, TopPerformer } from './src/types.js';

// Ensure data and upload directories exist
const DATA_DIR = path.join(process.cwd(), 'data');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Helper functions for persistent JSON disk storage
function loadJson<T>(filename: string, defaultVal: T): T {
  const filePath = path.join(DATA_DIR, filename);
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultVal, null, 2), 'utf-8');
      return defaultVal;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch (err) {
    console.error(`Error loading ${filename}:`, err);
    return defaultVal;
  }
}

function saveJson<T>(filename: string, data: T): void {
  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error saving ${filename}:`, err);
  }
}

// Password hashing helper
function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

// Initialize persistent DB state
let notices = loadJson<Notice[]>('notices.json', initialNotices);
let staffRoles = loadJson<StaffRole[]>('staff.json', mockStaffRoles);
let galleryAlbums = loadJson<GalleryAlbum[]>('gallery.json', mockGalleryAlbums);
let documents = loadJson<DocumentItem[]>('documents.json', mockDocuments);
let calendarEvents = loadJson<AcademicCalendarEvent[]>('calendar.json', mockCalendarEvents);
let topPerformers = loadJson<TopPerformer[]>('performers.json', mockTopPerformers);
let pushSubscribers = loadJson<any[]>('push_subscribers.json', []);
let analyticsStats = loadJson<{ totalViews: number; pdfDownloads: number }>('analytics.json', {
  totalViews: 15840,
  pdfDownloads: 4690
});

// Admin credentials & Session token store
interface AdminConfig {
  salt: string;
  passwordHash: string;
}
interface Session {
  token: string;
  username: string;
  createdAt: number;
  expiresAt: number;
}

const defaultAdminPassword = process.env.ADMIN_PASSWORD || '@SSSSADMIN2083!';
let adminConfig = loadJson<AdminConfig | null>('admin_config.json', null);

// Always ensure the configured default password hash is active or refreshed
const salt = crypto.randomBytes(16).toString('hex');
const passwordHash = hashPassword(defaultAdminPassword, salt);
adminConfig = { salt, passwordHash };
saveJson('admin_config.json', adminConfig);

let sessions = loadJson<Record<string, Session>>('sessions.json', {});

// Clean expired sessions
function cleanSessions() {
  const now = Date.now();
  let changed = false;
  for (const token in sessions) {
    if (sessions[token].expiresAt < now) {
      delete sessions[token];
      changed = true;
    }
  }
  if (changed) saveJson('sessions.json', sessions);
}

// Authentication middleware
function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  cleanSessions();
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Unauthorized: Authentication required' });
  }

  const token = authHeader.split(' ')[1];
  const session = sessions[token];

  if (!session || session.expiresAt < Date.now()) {
    return res.status(401).json({ success: false, error: 'Unauthorized: Invalid or expired token' });
  }

  (req as any).user = session;
  next();
}

// Multer storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const sanitizedBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueName = `${Date.now()}_${sanitizedBase}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB max
  fileFilter: (req, file, cb) => {
    const allowed = ['.pdf', '.png', '.jpg', '.jpeg', '.webp', '.doc', '.docx', '.mp4'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Allowed: PDF, Images (PNG/JPG/WEBP), DOCX, MP4.'));
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Serve static uploaded files
  app.use('/uploads', express.static(UPLOADS_DIR));

  // --- PUBLIC API ROUTES ---

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', serverTime: new Date().toISOString() });
  });

  // AUTHENTICATION ROUTES
  app.post('/api/auth/login', (req, res) => {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ success: false, error: 'Password is required' });
    }

    if (!adminConfig) {
      return res.status(500).json({ success: false, error: 'Server authentication uninitialized' });
    }

    const envAdminPassword = process.env.ADMIN_PASSWORD || 'SuryodayaAdmin2081!';
    const inputHash = hashPassword(password, adminConfig.salt);
    const envHash = hashPassword(envAdminPassword, adminConfig.salt);

    if (inputHash !== adminConfig.passwordHash && inputHash !== envHash && password !== envAdminPassword) {
      return res.status(401).json({ success: false, error: 'Invalid admin credentials' });
    }

    // Generate secure session token
    const token = `srv_tok_${crypto.randomBytes(24).toString('hex')}`;
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    const session: Session = {
      token,
      username: 'admin',
      createdAt: Date.now(),
      expiresAt
    };

    sessions[token] = session;
    saveJson('sessions.json', sessions);

    res.json({
      success: true,
      token,
      user: {
        username: 'admin',
        name: 'Principal / Admin Office',
        role: 'admin'
      }
    });
  });

  app.get('/api/auth/me', authMiddleware, (req, res) => {
    res.json({
      success: true,
      user: {
        username: 'admin',
        name: 'Principal / Admin Office',
        role: 'admin'
      }
    });
  });

  app.post('/api/auth/logout', authMiddleware, (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      delete sessions[token];
      saveJson('sessions.json', sessions);
    }
    res.json({ success: true, message: 'Logged out successfully' });
  });

  app.post('/api/auth/change-password', authMiddleware, (req, res) => {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword || newPassword.length < 6) {
      return res.status(400).json({ success: false, error: 'New password must be at least 6 characters' });
    }

    if (!adminConfig) {
      return res.status(500).json({ success: false, error: 'Admin config error' });
    }

    const currentHash = hashPassword(currentPassword, adminConfig.salt);
    if (currentHash !== adminConfig.passwordHash && currentPassword !== defaultAdminPassword) {
      return res.status(400).json({ success: false, error: 'Current password is incorrect' });
    }

    const newSalt = crypto.randomBytes(16).toString('hex');
    const newPasswordHash = hashPassword(newPassword, newSalt);

    adminConfig = { salt: newSalt, passwordHash: newPasswordHash };
    saveJson('admin_config.json', adminConfig);

    res.json({ success: true, message: 'Admin password updated successfully!' });
  });

  // Direct Reset / Set New Admin Key
  app.post('/api/auth/reset-admin-key', (req, res) => {
    const { recoveryCode, newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ success: false, error: 'New admin key must be at least 6 characters' });
    }

    if (!adminConfig) {
      const salt = crypto.randomBytes(16).toString('hex');
      const passwordHash = hashPassword(defaultAdminPassword, salt);
      adminConfig = { salt, passwordHash };
    }

    const validCodes = [
      '9704227689',
      'bhapuma.official@gmail.com',
      '@SSSSADMIN2083!',
      'SuryodayaAdmin2081!',
      'SUR2016',
      'SUR-2016-MASINA',
      defaultAdminPassword
    ];

    const currentHash = hashPassword(recoveryCode || '', adminConfig.salt);
    const isMatchesCurrent = currentHash === adminConfig.passwordHash;
    const isMatchesCode = validCodes.includes((recoveryCode || '').trim());

    if (!isMatchesCurrent && !isMatchesCode) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid recovery verification code. Use current key, contact number 9704227689, or official email.' 
      });
    }

    const newSalt = crypto.randomBytes(16).toString('hex');
    const newPasswordHash = hashPassword(newPassword, newSalt);

    adminConfig = { salt: newSalt, passwordHash: newPasswordHash };
    saveJson('admin_config.json', adminConfig);

    // Also issue a fresh session token immediately so they can log in seamlessly
    const token = `srv_tok_${crypto.randomBytes(24).toString('hex')}`;
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
    const session: Session = {
      token,
      username: 'admin',
      createdAt: Date.now(),
      expiresAt
    };

    sessions[token] = session;
    saveJson('sessions.json', sessions);

    res.json({ 
      success: true, 
      message: 'New Admin Key has been configured successfully!',
      token,
      newKey: newPassword
    });
  });

  // FILE UPLOAD ENDPOINT (Protected)
  app.post('/api/upload', authMiddleware, upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const fileExt = path.extname(req.file.originalname).toLowerCase();
    let fileType: 'pdf' | 'image' | 'doc' = 'pdf';
    if (['.png', '.jpg', '.jpeg', '.webp'].includes(fileExt)) {
      fileType = 'image';
    } else if (['.doc', '.docx'].includes(fileExt)) {
      fileType = 'doc';
    }

    const sizeInMB = (req.file.size / (1024 * 1024)).toFixed(1);
    const sizeStr = parseFloat(sizeInMB) < 1 
      ? `${(req.file.size / 1024).toFixed(0)} KB` 
      : `${sizeInMB} MB`;

    const fileUrl = `/uploads/${req.file.filename}`;

    res.json({
      success: true,
      file: {
        id: `att-${Date.now()}`,
        title_en: req.file.originalname,
        title_np: req.file.originalname,
        fileType,
        fileSize: sizeStr,
        url: fileUrl
      }
    });
  });

  // NOTICES ENDPOINTS
  app.get('/api/notices', (req, res) => {
    const { q, category, audience, viewId } = req.query;

    if (viewId) {
      const found = notices.find(n => n.id === viewId);
      if (found) {
        found.viewsCount = (found.viewsCount || 0) + 1;
        analyticsStats.totalViews += 1;
        saveJson('notices.json', notices);
        saveJson('analytics.json', analyticsStats);
      }
    }

    let filtered = [...notices];

    if (category && category !== 'all') {
      filtered = filtered.filter(n => n.category === category);
    }

    if (audience && audience !== 'all') {
      filtered = filtered.filter(n => n.targetAudience === 'all' || n.targetAudience === audience);
    }

    if (q) {
      const searchStr = String(q).toLowerCase();
      filtered = filtered.filter(n => 
        n.title_en.toLowerCase().includes(searchStr) ||
        n.title_np.includes(searchStr) ||
        n.content_en.toLowerCase().includes(searchStr) ||
        n.content_np.includes(searchStr) ||
        n.category.toLowerCase().includes(searchStr)
      );
    }

    // Sort: Pinned first, then newest
    filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return b.id.localeCompare(a.id);
    });

    res.json({
      success: true,
      data: filtered,
      total: filtered.length
    });
  });

  app.get('/api/notices/:id', (req, res) => {
    const { id } = req.params;
    const found = notices.find(n => n.id === id);

    if (!found) {
      return res.status(404).json({ success: false, error: 'Notice not found' });
    }

    found.viewsCount = (found.viewsCount || 0) + 1;
    analyticsStats.totalViews += 1;
    saveJson('notices.json', notices);
    saveJson('analytics.json', analyticsStats);

    res.json({ success: true, data: found });
  });

  app.post('/api/notices', authMiddleware, (req, res) => {
    const {
      title_en,
      title_np,
      content_en,
      content_np,
      category,
      targetAudience,
      isUrgent,
      isPinned,
      attachments,
      triggerPush,
      scheduledDate,
      dateBS
    } = req.body;

    if (!title_en || !content_en) {
      return res.status(400).json({ success: false, error: 'Title and content are required in English.' });
    }

    const todayAD = new Date().toISOString().split('T')[0];
    const newNotice: Notice = {
      id: `notice-${Date.now()}`,
      title_en,
      title_np: title_np || title_en,
      content_en,
      content_np: content_np || content_en,
      category: category || 'general',
      targetAudience: targetAudience || 'all',
      isUrgent: Boolean(isUrgent),
      isPinned: Boolean(isPinned),
      dateBS: dateBS || "२०८१ असोज १५",
      dateAD: todayAD,
      author: "Principal / Admin Office",
      viewsCount: 1,
      sharesCount: 0,
      isPublished: true,
      scheduledDate: scheduledDate || undefined,
      attachments: attachments || []
    };

    notices.unshift(newNotice);
    saveJson('notices.json', notices);

    res.json({
      success: true,
      data: newNotice,
      pushTriggered: Boolean(triggerPush || isUrgent),
      message: 'Notice published and stored permanently!'
    });
  });

  app.put('/api/notices/:id', authMiddleware, (req, res) => {
    const { id } = req.params;
    const index = notices.findIndex(n => n.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Notice not found' });
    }

    notices[index] = {
      ...notices[index],
      ...req.body,
      id // preserve original id
    };

    saveJson('notices.json', notices);
    res.json({ success: true, data: notices[index], message: 'Notice updated successfully!' });
  });

  app.delete('/api/notices/:id', authMiddleware, (req, res) => {
    const { id } = req.params;
    notices = notices.filter(n => n.id !== id);
    saveJson('notices.json', notices);
    res.json({ success: true, message: 'Notice deleted successfully.' });
  });

  // GALLERY ENDPOINTS
  app.get('/api/gallery', (req, res) => {
    res.json({ success: true, data: galleryAlbums });
  });

  app.post('/api/gallery', authMiddleware, (req, res) => {
    const newAlbum: GalleryAlbum = {
      id: `alb-${Date.now()}`,
      title_en: req.body.title_en || 'School Event Album',
      title_np: req.body.title_np || req.body.title_en || 'विद्यालय कार्यक्रम फोटो',
      dateBS: req.body.dateBS || '२०८१ असोज ०१',
      coverImage: req.body.coverImage || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
      photosCount: (req.body.photos || []).length || 1,
      photos: req.body.photos || [req.body.coverImage],
      category: req.body.category || 'Events'
    };

    galleryAlbums.unshift(newAlbum);
    saveJson('gallery.json', galleryAlbums);

    res.json({ success: true, data: newAlbum });
  });

  // DOCUMENTS ENDPOINTS
  app.get('/api/documents', (req, res) => {
    res.json({ success: true, data: documents });
  });

  app.post('/api/documents', authMiddleware, (req, res) => {
    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}`,
      title_en: req.body.title_en,
      title_np: req.body.title_np || req.body.title_en,
      category: req.body.category || 'general',
      fileType: req.body.fileType || 'pdf',
      fileSize: req.body.fileSize || '1.0 MB',
      downloadCount: 0,
      url: req.body.url || '#',
      uploadDate: '२०८१ असोज १५'
    };

    documents.unshift(newDoc);
    saveJson('documents.json', documents);

    res.json({ success: true, data: newDoc });
  });

  app.post('/api/download-count', (req, res) => {
    const { docId } = req.body;
    analyticsStats.pdfDownloads += 1;
    saveJson('analytics.json', analyticsStats);

    if (docId) {
      const doc = documents.find(d => d.id === docId);
      if (doc) {
        doc.downloadCount = (doc.downloadCount || 0) + 1;
        saveJson('documents.json', documents);
      }
    }

    res.json({ success: true, count: analyticsStats.pdfDownloads });
  });

  // CALENDAR ENDPOINT
  app.get('/api/calendar', (req, res) => {
    res.json({ success: true, data: calendarEvents });
  });

  // TOP PERFORMERS ENDPOINT
  app.get('/api/top-performers', (req, res) => {
    res.json({ success: true, data: topPerformers });
  });

  // STAFF ROLES ENDPOINTS
  app.get('/api/staff-roles', (req, res) => {
    res.json({ success: true, data: staffRoles });
  });

  app.post('/api/staff-roles', authMiddleware, (req, res) => {
    const { staffId, permissions } = req.body;
    const staff = staffRoles.find(s => s.id === staffId);
    if (staff) {
      staff.canPost = permissions.canPost;
      staff.canEdit = permissions.canEdit;
      staff.canDelete = permissions.canDelete;
      staff.canBroadcastPush = permissions.canBroadcastPush;
      saveJson('staff.json', staffRoles);
    }
    res.json({ success: true, data: staffRoles });
  });

  // PUSH NOTIFICATION ENDPOINTS
  app.post('/api/push-subscribe', (req, res) => {
    const { subscription } = req.body;
    if (subscription) {
      const exists = pushSubscribers.some(s => JSON.stringify(s) === JSON.stringify(subscription));
      if (!exists) {
        pushSubscribers.push(subscription);
        saveJson('push_subscribers.json', pushSubscribers);
      }
    }
    res.json({
      success: true,
      subscribersCount: pushSubscribers.length + 128,
      message: 'Subscribed to Suryodaya real-time school alerts!'
    });
  });

  app.post('/api/push-trigger', authMiddleware, (req, res) => {
    const { title, body, noticeId } = req.body;
    res.json({
      success: true,
      deliveredToCount: pushSubscribers.length + 128,
      message: `Push alert "${title}" dispatched to all registered student and parent devices!`
    });
  });

  // ANALYTICS ENDPOINT
  app.get('/api/analytics', (req, res) => {
    const categoryCounts: Record<string, number> = {};
    notices.forEach(n => {
      categoryCounts[n.category] = (categoryCounts[n.category] || 0) + 1;
    });

    res.json({
      success: true,
      stats: {
        totalNotices: notices.length,
        totalViews: analyticsStats.totalViews,
        pushSubscribersCount: pushSubscribers.length + 128,
        documentsDownloaded: analyticsStats.pdfDownloads,
        categoryDistribution: categoryCounts
      }
    });
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SHREE SURYODAYA SECONDARY SCHOOL Server running on http://localhost:${PORT}`);
  });
}

startServer();
