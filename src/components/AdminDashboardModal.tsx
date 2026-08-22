import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  PlusCircle, 
  FileEdit, 
  Users, 
  BarChart3, 
  Trash2, 
  Send, 
  CheckCircle2, 
  Lock, 
  LogOut, 
  Upload, 
  Eye, 
  Key, 
  FileText, 
  Image as ImageIcon,
  Paperclip,
  Check,
  Calendar,
  UserCheck,
  Video,
  Copy,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { Notice, StaffRole, NoticeCategory, TargetAudience, AnalyticsStats, Attachment, SeeVideo } from '../types';
import { Language, translations } from '../i18n/translations';

interface AdminDashboardModalProps {
  lang: Language;
  onClose: () => void;
  notices: Notice[];
  seeVideos?: SeeVideo[];
  onAddSeeVideo?: (video: SeeVideo) => void;
  onDeleteSeeVideo?: (id: string) => void;
  onNoticeCreated: () => void;
  onNoticeDeleted: (id: string) => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  lang,
  onClose,
  notices,
  seeVideos = [],
  onAddSeeVideo,
  onDeleteSeeVideo,
  onNoticeCreated,
  onNoticeDeleted
}) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('suryodaya_admin_token'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<'publish' | 'manage' | 'seeVideos' | 'roles' | 'analytics' | 'adminKey'>('publish');
  const t = translations[lang];

  // Publisher Form State
  const [editingNoticeId, setEditingNoticeId] = useState<string | null>(null);
  const [titleEN, setTitleEN] = useState('');
  const [titleNP, setTitleNP] = useState('');
  const [contentEN, setContentEN] = useState('');
  const [contentNP, setContentNP] = useState('');
  const [category, setCategory] = useState<NoticeCategory>('exams');
  const [targetAudience, setTargetAudience] = useState<TargetAudience>('all');
  const [isUrgent, setIsUrgent] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [triggerPush, setTriggerPush] = useState(true);
  const [scheduledDate, setScheduledDate] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // SEE Video Form State
  const [seeTitleEn, setSeeTitleEn] = useState('');
  const [seeTitleNp, setSeeTitleNp] = useState('');
  const [seeVideoUrl, setSeeVideoUrl] = useState('');
  const [seeThumbnailUrl, setSeeThumbnailUrl] = useState('https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800');
  const [seeCategory, setSeeCategory] = useState<'reception' | 'math' | 'science' | 'english' | 'tips'>('reception');
  const [seeDuration, setSeeDuration] = useState('15:30');
  const [seeInstructorEn, setSeeInstructorEn] = useState('Shree Suryodaya Faculty');
  const [seeInstructorNp, setSeeInstructorNp] = useState('श्री सूर्योदय शिक्षक परिवार');
  const [seeDescEn, setSeeDescEn] = useState('');
  const [seeDescNp, setSeeDescNp] = useState('');
  const [seeStatusMsg, setSeeStatusMsg] = useState<string | null>(null);

  // Password / Admin Key State
  const [authView, setAuthView] = useState<'login' | 'setNewKey'>('login');
  const [recoveryCodeInput, setRecoveryCodeInput] = useState('');
  const [newKeyInput, setNewKeyInput] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');

  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [generatedKey, setGeneratedKey] = useState('');
  const [keyCopied, setKeyCopied] = useState(false);
  const [passStatus, setPassStatus] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Staff Roles & Analytics
  const [staffList, setStaffList] = useState<StaffRole[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsStats | null>(null);

  // Verify stored token on mount
  useEffect(() => {
    if (token) {
      fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(r => r.json())
      .then(res => {
        if (res.success) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('suryodaya_admin_token');
          setToken(null);
          setIsAuthenticated(false);
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
    }
  }, [token]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchStaffAndAnalytics();
    }
  }, [isAuthenticated]);

  const fetchStaffAndAnalytics = () => {
    fetch('/api/staff-roles')
      .then(r => r.json())
      .then(res => {
        if (res.success) setStaffList(res.data);
      })
      .catch(() => {});

    fetch('/api/analytics')
      .then(r => r.json())
      .then(res => {
        if (res.success) setAnalytics(res.stats);
      })
      .catch(() => {});
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput })
      });

      const data = await res.json();
      if (data.success && data.token) {
        localStorage.setItem('suryodaya_admin_token', data.token);
        setToken(data.token);
        setIsAuthenticated(true);
        setPasswordInput('');
      } else {
        setLoginError(data.error || 'Invalid admin code.');
      }
    } catch (err) {
      setLoginError('Connection error. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    if (token) {
      fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      }).catch(() => {});
    }
    localStorage.removeItem('suryodaya_admin_token');
    setToken(null);
    setIsAuthenticated(false);
  };

  // Upload file handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    setUploadingFile(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();
      if (data.success && data.file) {
        setAttachments(prev => [...prev, data.file]);
        setStatusMsg({ type: 'success', text: `Attached "${file.name}" successfully!` });
        setTimeout(() => setStatusMsg(null), 3000);
      } else {
        setStatusMsg({ type: 'error', text: data.error || 'File upload failed.' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Error uploading file.' });
    } finally {
      setUploadingFile(false);
    }
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments(prev => prev.filter(a => a.id !== id));
  };

  // Start editing existing notice
  const handleEditNotice = (n: Notice) => {
    setEditingNoticeId(n.id);
    setTitleEN(n.title_en);
    setTitleNP(n.title_np || '');
    setContentEN(n.content_en);
    setContentNP(n.content_np || '');
    setCategory(n.category);
    setTargetAudience(n.targetAudience);
    setIsUrgent(n.isUrgent);
    setIsPinned(n.isPinned);
    setScheduledDate(n.scheduledDate || '');
    setAttachments(n.attachments || []);
    setActiveTab('publish');
  };

  const handleResetForm = () => {
    setEditingNoticeId(null);
    setTitleEN('');
    setTitleNP('');
    setContentEN('');
    setContentNP('');
    setCategory('exams');
    setTargetAudience('all');
    setIsUrgent(false);
    setIsPinned(false);
    setScheduledDate('');
    setAttachments([]);
    setIsPreviewOpen(false);
  };

  const handlePublishNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleEN || !contentEN || !token) return;

    setIsSubmitting(true);
    setStatusMsg(null);

    const payload = {
      title_en: titleEN,
      title_np: titleNP || titleEN,
      content_en: contentEN,
      content_np: contentNP || contentEN,
      category,
      targetAudience,
      isUrgent,
      isPinned,
      scheduledDate,
      triggerPush,
      attachments
    };

    try {
      const url = editingNoticeId ? `/api/notices/${editingNoticeId}` : '/api/notices';
      const method = editingNoticeId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        setStatusMsg({
          type: 'success',
          text: editingNoticeId ? 'Notice updated successfully!' : 'Notice published & saved permanently!'
        });
        handleResetForm();
        onNoticeCreated();
        fetchStaffAndAnalytics();
        setTimeout(() => setStatusMsg(null), 4000);
      } else {
        setStatusMsg({ type: 'error', text: data.error || 'Failed to save notice.' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Error connecting to server.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteNotice = async (id: string) => {
    if (!token) return;
    if (confirm('Are you sure you want to delete this notice permanently?')) {
      try {
        const res = await fetch(`/api/notices/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          onNoticeDeleted(id);
          fetchStaffAndAnalytics();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleToggleStaffPermission = async (staffId: string, field: 'canPost' | 'canEdit') => {
    if (!token) return;
    const updated = staffList.map(s => {
      if (s.id === staffId) {
        return { ...s, [field]: !s[field] };
      }
      return s;
    });
    setStaffList(updated);

    const target = updated.find(s => s.id === staffId);
    if (target) {
      await fetch('/api/staff-roles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          staffId,
          permissions: {
            canPost: target.canPost,
            canEdit: target.canEdit,
            canDelete: target.canDelete,
            canBroadcastPush: target.canBroadcastPush
          }
        })
      });
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !currentPass || !newPass) return;

    setPassStatus(null);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword: currentPass, newPassword: newPass })
      });

      const data = await res.json();
      if (data.success) {
        setPassStatus('Password changed successfully!');
        setCurrentPass('');
        setNewPass('');
      } else {
        setPassStatus(`Error: ${data.error}`);
      }
    } catch (err) {
      setPassStatus('Failed to change password.');
    }
  };

  const handleResetAdminKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError('');
    setResetSuccess('');
    setResetLoading(true);

    try {
      const res = await fetch('/api/auth/reset-admin-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          recoveryCode: recoveryCodeInput, 
          newPassword: newKeyInput 
        })
      });

      const data = await res.json();
      if (data.success) {
        setResetSuccess('New Admin Key successfully set and logged in!');
        if (data.token) {
          localStorage.setItem('suryodaya_admin_token', data.token);
          setToken(data.token);
          setTimeout(() => {
            setIsAuthenticated(true);
            setAuthView('login');
          }, 1200);
        }
      } else {
        setResetError(data.error || 'Failed to update admin key.');
      }
    } catch (err) {
      setResetError('Connection error. Please try again.');
    } finally {
      setResetLoading(false);
    }
  };

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
        <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 text-white p-6 sm:p-7 text-center relative">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center mx-auto shadow-xl mb-3">
              {authView === 'login' ? <Lock className="w-7 h-7" /> : <Key className="w-7 h-7" />}
            </div>
            <h3 className="text-xl font-extrabold text-white">
              {authView === 'login' ? t.adminTitle : (lang === 'np' ? "नयाँ एडमिन की राख्नुहोस्" : "Set / Reset Admin Key")}
            </h3>
            <p className="text-xs text-amber-300/90 font-medium mt-0.5">SHREE SURYODAYA SECONDARY SCHOOL</p>
            <p className="text-[11px] text-slate-400">Runtigadi-4, Masina, Rolpa</p>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 p-1.5 bg-slate-100 border-b border-slate-200 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setAuthView('login');
                setLoginError('');
                setResetError('');
              }}
              className={`py-2.5 rounded-xl transition ${
                authView === 'login' 
                  ? 'bg-white text-blue-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {lang === 'np' ? "एडमिन लगइन" : "Admin Login"}
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthView('setNewKey');
                setLoginError('');
                setResetError('');
              }}
              className={`py-2.5 rounded-xl transition ${
                authView === 'setNewKey' 
                  ? 'bg-white text-blue-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {lang === 'np' ? "नयाँ की राख्ने (Set Key)" : "Set / Reset Key"}
            </button>
          </div>

          {authView === 'login' ? (
            <form onSubmit={handleLogin} className="p-6 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    Admin Access Key
                  </label>
                  <button
                    type="button"
                    onClick={() => setPasswordInput('@SSSSADMIN2083!')}
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-800 underline cursor-pointer"
                    title="Fill default admin key"
                  >
                    Default Key?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter admin key (e.g. @SSSSADMIN2083!)..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                />
              </div>

              {loginError && (
                <div className="text-xs font-bold text-red-700 bg-red-50 p-3 rounded-xl border border-red-200">
                  <p>{loginError}</p>
                  <p className="mt-1 font-normal text-[11px] text-red-600">
                    Need a new key? Click "Set / Reset Key" tab above or use verification code (9704227689).
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-md transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>{loginLoading ? 'Authenticating...' : t.login}</span>
              </button>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Default: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-700 font-bold">@SSSSADMIN2083!</code></span>
                <button
                  type="button"
                  onClick={() => setAuthView('setNewKey')}
                  className="text-amber-600 hover:text-amber-700 font-bold"
                >
                  Change / Set New Key →
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleResetAdminKey} className="p-6 space-y-4">
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                <p className="font-bold flex items-center gap-1.5 text-amber-950">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Set or Change Admin Access Key</span>
                </p>
                <p className="text-[11px] text-amber-800">
                  Verify using School Phone (<strong>9704227689</strong>), Email (<strong>bhapuma.official@gmail.com</strong>), or current key.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Verification / Recovery Code *
                </label>
                <input
                  type="text"
                  required
                  value={recoveryCodeInput}
                  onChange={(e) => setRecoveryCodeInput(e.target.value)}
                  placeholder="e.g. 9704227689 or bhapuma.official@gmail.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    New Admin Panel Key (Min 6 chars) *
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
                      setNewKeyInput(`Suryodaya-${rand}-2016`);
                    }}
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-800"
                  >
                    Auto Generate
                  </button>
                </div>
                <input
                  type="text"
                  required
                  minLength={6}
                  value={newKeyInput}
                  onChange={(e) => setNewKeyInput(e.target.value)}
                  placeholder="Enter your new secret admin key..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono font-bold text-blue-900"
                />
              </div>

              {resetError && (
                <p className="text-xs font-bold text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
                  {resetError}
                </p>
              )}

              {resetSuccess && (
                <p className="text-xs font-bold text-emerald-700 bg-emerald-50 p-3 rounded-xl border border-emerald-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{resetSuccess}</span>
                </p>
              )}

              <button
                type="submit"
                disabled={resetLoading}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-md transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Key className="w-4 h-4" />
                <span>{resetLoading ? 'Saving New Key...' : 'Save New Key & Log In'}</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthView('login')}
                className="w-full text-xs text-center text-slate-500 hover:text-slate-800 font-bold py-1"
              >
                ← Back to Regular Login
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-4 max-h-[94vh] flex flex-col">
        {/* Header Bar */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500 text-slate-950 font-bold shadow">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-white">{t.adminTitle}</h2>
              <p className="text-xs text-slate-400">Authenticated Admin Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-3 py-2 rounded-xl transition cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">{t.logout}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Admin Tabs Bar */}
        <div className="bg-slate-100 p-2 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto flex-shrink-0">
          <button
            onClick={() => { handleResetForm(); setActiveTab('publish'); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition flex-shrink-0 cursor-pointer ${
              activeTab === 'publish' ? 'bg-blue-700 text-white shadow' : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>{editingNoticeId ? 'Edit Notice' : t.tabPublishNotice}</span>
          </button>

          <button
            onClick={() => setActiveTab('manage')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition flex-shrink-0 cursor-pointer ${
              activeTab === 'manage' ? 'bg-blue-700 text-white shadow' : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <FileEdit className="w-4 h-4" />
            <span>{t.tabManageNotices} ({notices.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('seeVideos')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition flex-shrink-0 cursor-pointer ${
              activeTab === 'seeVideos' ? 'bg-blue-700 text-white shadow' : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Video className="w-4 h-4 text-amber-400" />
            <span>{t.tabSeeManager} ({seeVideos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('roles')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition flex-shrink-0 cursor-pointer ${
              activeTab === 'roles' ? 'bg-blue-700 text-white shadow' : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{t.tabRoleManager}</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition flex-shrink-0 cursor-pointer ${
              activeTab === 'analytics' ? 'bg-blue-700 text-white shadow' : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>{t.tabAnalytics}</span>
          </button>

          <button
            onClick={() => setActiveTab('adminKey')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition flex-shrink-0 cursor-pointer ${
              activeTab === 'adminKey' ? 'bg-blue-700 text-white shadow' : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Key className="w-4 h-4 text-amber-400" />
            <span>{t.tabAdminKey}</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1">
          {/* TAB 1: Notice Publisher */}
          {activeTab === 'publish' && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="text-base font-extrabold text-slate-900">
                  {editingNoticeId ? 'Update Published Notice' : 'Create & Publish School Notice'}
                </h3>

                <div className="flex items-center gap-2">
                  {editingNoticeId && (
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="text-xs font-bold text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-lg bg-slate-100"
                    >
                      Cancel Edit
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsPreviewOpen(!isPreviewOpen)}
                    className="flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-xl hover:bg-blue-100 transition cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>{isPreviewOpen ? 'Hide Preview' : 'Live Preview'}</span>
                  </button>
                </div>
              </div>

              {statusMsg && (
                <div className={`p-4 rounded-2xl border font-bold text-xs flex items-center gap-2 ${
                  statusMsg.type === 'success' ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-red-100 text-red-900 border-red-300'
                }`}>
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>{statusMsg.text}</span>
                </div>
              )}

              {/* LIVE PREVIEW BOX */}
              {isPreviewOpen && (
                <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-3 border-2 border-amber-400 shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase px-3 py-1 rounded-full bg-amber-400 text-slate-950">
                      PREVIEW MODE
                    </span>
                    <span className="text-xs text-slate-400">{category.toUpperCase()} • {targetAudience.toUpperCase()}</span>
                  </div>
                  <h4 className="text-lg font-bold text-white">{titleEN || 'Notice Title Preview (English)'}</h4>
                  <p className="text-xs text-amber-200">{titleNP || 'नेपाली शीर्षक पूर्वावलोकन'}</p>
                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{contentEN || 'Content body will be displayed here...'}</p>
                </div>
              )}

              <form onSubmit={handlePublishNotice} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      {t.titleEN} *
                    </label>
                    <input
                      type="text"
                      required
                      value={titleEN}
                      onChange={(e) => setTitleEN(e.target.value)}
                      placeholder="e.g. Annual SEE Board Exam Timetable Released"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      {t.titleNP}
                    </label>
                    <input
                      type="text"
                      value={titleNP}
                      onChange={(e) => setTitleNP(e.target.value)}
                      placeholder="उदाहरण: वार्षिक एस.इ.इ. परीक्षा रुटिन प्रकाशित"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      {t.selectCategory}
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as NoticeCategory)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="exams">{t.categoryExams}</option>
                      <option value="holidays">{t.categoryHolidays}</option>
                      <option value="results">{t.categoryResults}</option>
                      <option value="events">{t.categoryEvents}</option>
                      <option value="meetings">{t.categoryMeetings}</option>
                      <option value="tuition">{t.categoryTuition}</option>
                      <option value="routine">{t.categoryRoutine}</option>
                      <option value="general">{t.categoryGeneral}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      {t.selectAudience}
                    </label>
                    <select
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value as TargetAudience)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="all">{t.audienceAll}</option>
                      <option value="students">{t.audienceStudents}</option>
                      <option value="parents">{t.audienceParents}</option>
                      <option value="teachers">{t.audienceTeachers}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Schedule Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {t.contentEN} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={contentEN}
                    onChange={(e) => setContentEN(e.target.value)}
                    placeholder="Detailed notice text in English..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {t.contentNP}
                  </label>
                  <textarea
                    rows={3}
                    value={contentNP}
                    onChange={(e) => setContentNP(e.target.value)}
                    placeholder="सूचनाको विस्तृत विवरण नेपालीमा..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {/* File Attachments Section */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Paperclip className="w-4 h-4 text-blue-600" />
                      <span>Upload Official File Attachment (PDF / Image)</span>
                    </label>

                    <label className="cursor-pointer bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingFile ? 'Uploading...' : 'Choose File'}</span>
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        disabled={uploadingFile}
                        accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx"
                        className="hidden"
                      />
                    </label>
                  </div>

                  {attachments.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-slate-200">
                      {attachments.map(att => (
                        <div key={att.id} className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs">
                          <div className="flex items-center gap-2 overflow-hidden">
                            <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
                            <span className="font-bold text-slate-900 truncate">{att.title_en}</span>
                            <span className="text-[10px] text-slate-500 font-mono">({att.fileSize})</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemoveAttachment(att.id)}
                            className="p-1 rounded text-red-600 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Flags and Options */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isUrgent}
                      onChange={(e) => setIsUrgent(e.target.checked)}
                      className="w-4 h-4 text-red-600 rounded"
                    />
                    <span className="text-xs font-bold text-red-700">{t.markUrgent}</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPinned}
                      onChange={(e) => setIsPinned(e.target.checked)}
                      className="w-4 h-4 text-amber-600 rounded"
                    />
                    <span className="text-xs font-bold text-amber-800">{t.pinToTop}</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={triggerPush}
                      onChange={(e) => setTriggerPush(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-xs font-bold text-blue-900">Broadcast Web Push</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-sm py-4 rounded-xl shadow-lg transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                  <span>{isSubmitting ? t.updatingNotice : (editingNoticeId ? 'Update Notice' : t.publishButton)}</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: Manage Notices */}
          {activeTab === 'manage' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">Manage Published School Notices</h3>
              <div className="divide-y divide-slate-200 border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                {notices.map((n) => (
                  <div key={n.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50 transition">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-blue-100 text-blue-800">
                          {n.category}
                        </span>
                        {n.isUrgent && <span className="text-[10px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">URGENT</span>}
                        {n.isPinned && <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">PINNED</span>}
                        <span className="text-xs text-slate-400">{n.dateBS}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{n.title_en}</h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{n.content_en}</p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleEditNotice(n)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold transition"
                      >
                        <FileEdit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDeleteNotice(n.id)}
                        className="p-2 rounded-xl bg-red-100 text-red-700 hover:bg-red-200 transition"
                        title="Delete Notice"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Staff Role Management */}
          {activeTab === 'roles' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">Staff Roles & Permissions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {staffList.map((s) => (
                  <div key={s.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center gap-3">
                      <img src={s.avatarUrl} alt={s.name} className="w-12 h-12 rounded-full object-cover shadow-sm" />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{s.name}</h4>
                        <p className="text-xs text-blue-800 font-semibold">{s.designation_en}</p>
                        <p className="text-[11px] text-slate-400 font-mono">{s.email}</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-semibold">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={s.canPost}
                          onChange={() => handleToggleStaffPermission(s.id, 'canPost')}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span>Can Post</span>
                      </label>

                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={s.canEdit}
                          onChange={() => handleToggleStaffPermission(s.id, 'canEdit')}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span>Can Edit</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SEE & Reception Video Manager */}
          {activeTab === 'seeVideos' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    {lang === 'np' ? "कक्षा १० एस.इ.इ. तथा रिसेप्सन भिडियो व्यवस्थापन" : "Grade 10 SEE & Reception Video Manager"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {lang === 'np' ? "नयाँ रिसेप्सन/बिदाइ भिडियो वा नमुना सेट कक्षा थप्नुहोस् र व्यवस्थापन गर्नुहोस्।" : "Upload YouTube/MP4 lectures, batch reception ceremonies, and exam solution videos."}
                  </p>
                </div>
              </div>

              {/* Add Video Form */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!seeTitleEn.trim() && !seeTitleNp.trim()) return;
                  if (!seeVideoUrl.trim()) return;

                  const newVideo: SeeVideo = {
                    id: 'see-' + Date.now(),
                    title_en: seeTitleEn || seeTitleNp,
                    title_np: seeTitleNp || seeTitleEn,
                    category: seeCategory,
                    videoUrl: seeVideoUrl,
                    thumbnailUrl: seeThumbnailUrl || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800',
                    duration: seeDuration || '12:00',
                    instructor_en: seeInstructorEn || 'Shree Suryodaya Faculty',
                    instructor_np: seeInstructorNp || 'श्री सूर्योदय शिक्षक परिवार',
                    description_en: seeDescEn || 'Educational SEE resource from Shree Suryodaya Secondary School.',
                    description_np: seeDescNp || 'श्री सूर्योदय माध्यमिक विद्यालयको एस.इ.इ. शैक्षिक भिडियो सामग्री।',
                    viewsCount: 1,
                    dateBS: '२०८१ असोज'
                  };

                  if (onAddSeeVideo) {
                    onAddSeeVideo(newVideo);
                  }
                  setSeeStatusMsg('SEE video added successfully to the portal!');
                  setSeeTitleEn('');
                  setSeeTitleNp('');
                  setSeeVideoUrl('');
                  setSeeDescEn('');
                  setSeeDescNp('');
                  setTimeout(() => setSeeStatusMsg(null), 3500);
                }}
                className="p-6 bg-slate-50 rounded-3xl border border-slate-200 space-y-4"
              >
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-blue-700" />
                  <h4 className="text-sm font-black text-slate-900">Add New Video (Reception / Subject Class)</h4>
                </div>

                {seeStatusMsg && (
                  <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{seeStatusMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Title (English) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SEE 2080 Grade 10 Grand Reception & Farewell"
                      value={seeTitleEn}
                      onChange={(e) => setSeeTitleEn(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Title (Nepali / नेपाली) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. कक्षा १० विशेष स्वागत तथा बिदाइ समारोह (रिसेप्सन)"
                      value={seeTitleNp}
                      onChange={(e) => setSeeTitleNp(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Category *
                    </label>
                    <select
                      value={seeCategory}
                      onChange={(e) => setSeeCategory(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 bg-white font-medium"
                    >
                      <option value="reception">Reception / Farewell (रिसेप्सन)</option>
                      <option value="math">Compulsory Mathematics (गणित)</option>
                      <option value="science">Science & Technology (विज्ञान)</option>
                      <option value="english">English & Grammar (अंग्रेजी)</option>
                      <option value="tips">Exam Strategy & Tips (तयारी सुत्र)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Video URL (YouTube Embed or MP4) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="https://www.youtube.com/embed/..."
                      value={seeVideoUrl}
                      onChange={(e) => setSeeVideoUrl(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Duration (e.g. 18:45)
                    </label>
                    <input
                      type="text"
                      placeholder="18:45"
                      value={seeDuration}
                      onChange={(e) => setSeeDuration(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Instructor / Source (English)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Suryodaya Cultural & Event Committee"
                      value={seeInstructorEn}
                      onChange={(e) => setSeeInstructorEn(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Instructor / Source (Nepali)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. सूर्योदय अतिरिक्त क्रियाकलाप समिति"
                      value={seeInstructorNp}
                      onChange={(e) => setSeeInstructorNp(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Publish SEE Video to Portal</span>
                </button>
              </form>

              {/* Existing Videos List */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                  Current Portal Videos ({seeVideos.length})
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {seeVideos.map((vid) => (
                    <div key={vid.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between gap-3">
                      <div className="flex gap-3">
                        <img src={vid.thumbnailUrl} alt={vid.title_en} className="w-20 h-14 object-cover rounded-xl shadow-sm bg-slate-900 flex-shrink-0" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 text-[10px] font-extrabold uppercase">
                              {vid.category}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">{vid.duration}</span>
                          </div>
                          <h5 className="text-xs font-bold text-slate-900 line-clamp-1 mt-1">{vid.title_en}</h5>
                          <p className="text-[11px] text-slate-500 font-medium line-clamp-1">{vid.title_np}</p>
                        </div>
                      </div>

                      {onDeleteSeeVideo && (
                        <button
                          onClick={() => {
                            if (confirm('Delete this video from portal?')) {
                              onDeleteSeeVideo(vid.id);
                            }
                          }}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition"
                          title="Delete Video"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Analytics */}
          {activeTab === 'analytics' && analytics && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-slate-900">Portal Performance Analytics</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
                  <p className="text-xs text-blue-800 font-bold">{t.statTotalNotices}</p>
                  <p className="text-2xl font-black text-blue-950 mt-1">{analytics.totalNotices}</p>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200">
                  <p className="text-xs text-indigo-800 font-bold">{t.statTotalViews}</p>
                  <p className="text-2xl font-black text-indigo-950 mt-1">{analytics.totalViews}</p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <p className="text-xs text-emerald-800 font-bold">{t.statPushSubscribers}</p>
                  <p className="text-2xl font-black text-emerald-950 mt-1">{analytics.pushSubscribersCount}</p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                  <p className="text-xs text-amber-800 font-bold">{t.statPdfDownloads}</p>
                  <p className="text-2xl font-black text-amber-950 mt-1">{analytics.documentsDownloaded}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: Admin Master Security Key & Passcode Management */}
          {activeTab === 'adminKey' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Key className="w-5 h-5 text-amber-500" />
                  <h3 className="text-base font-extrabold text-slate-900">
                    {lang === 'np' ? "एडमिन सुरक्षा की (Admin Access Key) तथा पासवर्ड व्यवस्थापन" : "Admin Master Key & Security Passcode"}
                  </h3>
                </div>
              </div>

              {/* Master Key Generator Tool */}
              <div className="p-6 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl border border-blue-800/80 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      Master Key Generator
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/40">
                    Active Security
                  </span>
                </div>

                <p className="text-xs text-blue-200/90 leading-relaxed">
                  Generate an encrypted, high-entropy administrative key for Shree Suryodaya Secondary School (Runtigadi-4 Masina, Rolpa). You can set this as your official admin panel key.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative flex-1 w-full">
                    <input
                      type="text"
                      readOnly
                      value={generatedKey || 'SUR-2016-MASINA-9704227689'}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-950/90 text-amber-300 font-mono font-bold text-sm tracking-wider border border-blue-700/60 focus:outline-none"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
                      const key = `SURYODAYA-${randomSuffix}-2016`;
                      setGeneratedKey(key);
                      setNewPass(key);
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition cursor-pointer w-full sm:w-auto"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Generate New Key</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const val = generatedKey || 'SUR-2016-MASINA-9704227689';
                      navigator.clipboard.writeText(val);
                      setKeyCopied(true);
                      setTimeout(() => setKeyCopied(false), 2500);
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition cursor-pointer w-full sm:w-auto"
                  >
                    {keyCopied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-950" />
                        <span>Key Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Key</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-blue-200">
                  <span>Current Active Admin Key: <strong className="text-amber-300 font-mono">@SSSSADMIN2083!</strong></span>
                  <button
                    type="button"
                    onClick={() => {
                      setNewPass('@SSSSADMIN2083!');
                      setCurrentPass(passwordInput || '@SSSSADMIN2083!');
                    }}
                    className="text-amber-400 hover:text-amber-300 underline font-bold"
                  >
                    Reset form to default: @SSSSADMIN2083!
                  </button>
                </div>
              </div>

              {/* Set New Password Form */}
              <form onSubmit={handleChangePassword} className="space-y-4 p-6 bg-slate-50 rounded-3xl border border-slate-200">
                <h4 className="text-sm font-bold text-slate-900">
                  {lang === 'np' ? "नयाँ एडमिन की / पासवर्ड परिवर्तन गर्नुहोस्" : "Save & Activate New Admin Panel Key"}
                </h4>
                
                {passStatus && (
                  <p className={`text-xs font-bold p-3.5 rounded-2xl border ${
                    passStatus.startsWith('Error') 
                      ? 'bg-red-50 text-red-800 border-red-200' 
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}>
                    {passStatus}
                  </p>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Current Password / Key *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter current password (default: @SSSSADMIN2083!)"
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    New Admin Access Key / Passcode (Min 6 characters) *
                  </label>
                  <input
                    type="text"
                    required
                    minLength={6}
                    placeholder="Enter new admin key or paste generated key above"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 font-mono font-bold text-blue-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs py-3.5 rounded-xl transition cursor-pointer shadow flex items-center justify-center gap-2"
                >
                  <Key className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'np' ? "नयाँ एडमिन की सेभ गर्नुहोस् (Save New Key)" : "Save & Update Admin Key"}</span>
                </button>
              </form>

              {/* Contact Reference Note */}
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1">
                <p className="font-bold">Official School Administration Contact:</p>
                <p>Contact Phone: <strong>+977-9704227689 (9704227689)</strong> • Email: <strong>bhapuma.official@gmail.com</strong></p>
                <p className="text-slate-600">Location: Runtigadi-4, Masina, Rolpa (Estd. 2016)</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
