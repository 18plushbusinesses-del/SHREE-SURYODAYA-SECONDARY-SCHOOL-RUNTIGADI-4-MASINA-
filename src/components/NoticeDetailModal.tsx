import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Share2, 
  Calendar, 
  User, 
  Eye, 
  FileText, 
  Download, 
  Check, 
  MessageSquare, 
  Globe, 
  Pin,
  Building2,
  Sparkles
} from 'lucide-react';
import { Notice } from '../types';
import { Language, translations } from '../i18n/translations';

interface NoticeDetailModalProps {
  notice: Notice | null;
  lang: Language;
  onClose: () => void;
  onOpenPdf: (url: string, title: string) => void;
}

export const NoticeDetailModal: React.FC<NoticeDetailModalProps> = ({
  notice,
  lang,
  onClose,
  onOpenPdf
}) => {
  if (!notice) return null;

  const [copied, setCopied] = useState(false);
  const [activeViewLang, setActiveViewLang] = useState<Language>(lang);
  const t = translations[lang];

  const handlePrint = () => {
    window.print();
  };

  const shareText = `*${notice.title_en}*\n\nRead official notice from Shree Suryodaya Secondary School:\n`;
  const shareUrl = window.location.origin + `/?noticeId=${notice.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const title = activeViewLang === 'np' ? (notice.title_np || notice.title_en) : notice.title_en;
  const content = activeViewLang === 'np' ? (notice.content_np || notice.content_en) : notice.content_en;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Official School Header Bar */}
        <div className="bg-slate-900 text-white p-6 border-b border-slate-800 flex items-start justify-between gap-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-blue-600 p-0.5 shadow-md flex-shrink-0">
              <div className="w-full h-full bg-slate-900 rounded-2xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                {t.schoolNameNepali}
              </p>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                {t.schoolName}
              </h2>
              <p className="text-xs text-slate-400">{t.location}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* Top Meta info */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                notice.isUrgent ? 'bg-red-100 text-red-800 border-red-200' : 'bg-blue-100 text-blue-800 border-blue-200'
              }`}>
                {notice.isUrgent ? t.categoryUrgent : notice.category.toUpperCase()}
              </span>

              {notice.isPinned && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                  <Pin className="w-3 h-3 fill-amber-600 text-amber-600" />
                  <span>Pinned</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                <span>{notice.dateBS} ({notice.dateAD})</span>
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                <span>{notice.viewsCount} views</span>
              </span>
            </div>
          </div>

          {/* Language View Switcher */}
          <div className="flex items-center justify-between bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <span className="text-xs font-bold text-slate-600 px-3">
              Switch Display Language:
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveViewLang('en')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  activeViewLang === 'en' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setActiveViewLang('np')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  activeViewLang === 'np' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                नेपाली
              </button>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
            {title}
          </h1>

          {/* Content Body */}
          <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
            {content}
          </div>

          {/* Attachments & PDFs */}
          {notice.attachments && notice.attachments.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                Official Document Downloads & Attachments
              </h4>
              {notice.attachments.map((att) => (
                <div 
                  key={att.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-blue-50/80 border border-blue-200 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{att.title_en}</p>
                      <p className="text-xs text-blue-800">{att.fileType.toUpperCase()} • {att.fileSize}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenPdf(att.url, att.title_en)}
                    className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{t.downloadPdf}</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Publisher Sign-off */}
          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-slate-400" />
              <span>{t.publishedBy}: <strong>{notice.author}</strong></span>
            </span>
            <span>Target: <strong className="capitalize">{notice.targetAudience}</strong></span>
          </div>
        </div>

        {/* Modal Action Footer Bar */}
        <div className="bg-slate-50 p-4 sm:px-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + shareUrl)}`, '_blank')}
              className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            <button
              onClick={() => window.open(`viber://forward?text=${encodeURIComponent(shareText + shareUrl)}`, '_blank')}
              className="p-2.5 rounded-xl bg-purple-100 text-purple-800 hover:bg-purple-200 transition font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Viber</span>
            </button>

            <button
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}
              className="p-2.5 rounded-xl bg-blue-100 text-blue-800 hover:bg-blue-200 transition font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">Facebook</span>
            </button>

            <button
              onClick={handleCopy}
              className="p-2.5 rounded-xl bg-slate-200 text-slate-800 hover:bg-slate-300 transition font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : t.copyLink}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Notice</span>
            </button>

            <button
              onClick={onClose}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer"
            >
              {t.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
