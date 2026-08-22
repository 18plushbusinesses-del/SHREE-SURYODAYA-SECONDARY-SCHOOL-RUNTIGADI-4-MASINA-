import React, { useState } from 'react';
import { 
  Pin, 
  AlertCircle, 
  Calendar, 
  Eye, 
  Share2, 
  FileText, 
  Download, 
  Check, 
  Globe, 
  MessageSquare, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Notice, NoticeCategory } from '../types';
import { Language, translations } from '../i18n/translations';

interface NoticeCardProps {
  notice: Notice;
  lang: Language;
  onSelectNotice: (notice: Notice) => void;
  onOpenPdf: (url: string, title: string) => void;
  onRecordView: (id: string) => void;
}

export const NoticeCard: React.FC<NoticeCardProps> = ({
  notice,
  lang,
  onSelectNotice,
  onOpenPdf,
  onRecordView
}) => {
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const t = translations[lang];

  // Category badge colors
  const getBadgeStyle = (category: NoticeCategory, isUrgent: boolean) => {
    if (isUrgent) {
      return {
        bg: 'bg-red-100 text-red-800 border-red-200',
        label: t.categoryUrgent,
        dot: 'bg-red-500 animate-ping'
      };
    }

    switch (category) {
      case 'holidays':
        return { bg: 'bg-emerald-100 text-emerald-800 border-emerald-200', label: t.categoryHolidays, dot: 'bg-emerald-500' };
      case 'results':
        return { bg: 'bg-blue-100 text-blue-800 border-blue-200', label: t.categoryResults, dot: 'bg-blue-500' };
      case 'exams':
        return { bg: 'bg-indigo-100 text-indigo-800 border-indigo-200', label: t.categoryExams, dot: 'bg-indigo-500' };
      case 'events':
        return { bg: 'bg-purple-100 text-purple-800 border-purple-200', label: t.categoryEvents, dot: 'bg-purple-500' };
      case 'meetings':
        return { bg: 'bg-amber-100 text-amber-800 border-amber-200', label: t.categoryMeetings, dot: 'bg-amber-500' };
      case 'tuition':
        return { bg: 'bg-teal-100 text-teal-800 border-teal-200', label: t.categoryTuition, dot: 'bg-teal-500' };
      case 'routine':
        return { bg: 'bg-cyan-100 text-cyan-800 border-cyan-200', label: t.categoryRoutine, dot: 'bg-cyan-500' };
      default:
        return { bg: 'bg-slate-100 text-slate-800 border-slate-200', label: t.categoryGeneral, dot: 'bg-slate-500' };
    }
  };

  const badge = getBadgeStyle(notice.category, notice.isUrgent);

  const activeTitle = lang === 'np' ? (notice.title_np || notice.title_en) : notice.title_en;
  const activeContent = lang === 'np' ? (notice.content_np || notice.content_en) : notice.content_en;

  // Social sharing logic
  const shareText = `*${notice.title_en}*\n\nRead official notice from Shree Suryodaya Secondary School:\n`;
  const shareUrl = window.location.origin + `/?noticeId=${notice.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    setShowShareMenu(false);
  };

  const shareWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + shareUrl)}`, '_blank');
    setShowShareMenu(false);
  };

  const shareViber = () => {
    window.open(`viber://forward?text=${encodeURIComponent(shareText + shareUrl)}`, '_blank');
    setShowShareMenu(false);
  };

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
    setShowShareMenu(false);
  };

  return (
    <div 
      className={`relative bg-white rounded-2xl border transition-all duration-300 hover:shadow-xl flex flex-col justify-between overflow-hidden group ${
        notice.isUrgent 
          ? 'border-red-300 ring-2 ring-red-500/20 bg-gradient-to-b from-red-50/30 to-white' 
          : notice.isPinned
          ? 'border-amber-300/80 ring-1 ring-amber-400/30 bg-gradient-to-b from-amber-50/20 to-white'
          : 'border-slate-200/90 hover:border-blue-300'
      }`}
    >
      {/* Top Card Body */}
      <div className="p-5 sm:p-6 space-y-3">
        {/* Badges Bar */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badge.bg}`}>
              <span className={`w-2 h-2 rounded-full ${badge.dot}`}></span>
              <span>{badge.label}</span>
            </span>

            {notice.isPinned && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                <Pin className="w-3 h-3 fill-amber-600 text-amber-600" />
                <span>Pinned</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
            <Calendar className="w-3.5 h-3.5" />
            <span>{notice.dateBS}</span>
          </div>
        </div>

        {/* Title */}
        <h3 
          onClick={() => {
            onRecordView(notice.id);
            onSelectNotice(notice);
          }}
          className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition cursor-pointer leading-snug line-clamp-2"
        >
          {activeTitle}
        </h3>

        {/* Content Snippet */}
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
          {activeContent}
        </p>

        {/* Attachments quick preview */}
        {notice.attachments && notice.attachments.length > 0 && (
          <div className="pt-2">
            {notice.attachments.map((att) => (
              <button
                key={att.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenPdf(att.url, att.title_en);
                }}
                className="flex items-center justify-between w-full px-3 py-2 rounded-xl bg-blue-50/60 hover:bg-blue-100/80 border border-blue-200 text-blue-900 text-xs font-semibold transition cursor-pointer"
              >
                <div className="flex items-center gap-2 truncate pr-2">
                  <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="truncate">{att.title_en}</span>
                </div>
                <div className="flex items-center gap-1 text-blue-700 flex-shrink-0">
                  <Download className="w-3.5 h-3.5" />
                  <span>{att.fileSize}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer Bar */}
      <div className="px-5 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            <span>{notice.viewsCount}</span>
          </span>
          <span>•</span>
          <span className="truncate max-w-[120px]">{notice.author}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Social Share Menu Button */}
          <div className="relative">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="p-1.5 rounded-lg hover:bg-slate-200/80 text-slate-600 hover:text-slate-900 transition cursor-pointer"
              title={t.share}
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Share Dropdown */}
            {showShareMenu && (
              <div className="absolute right-0 bottom-full mb-2 w-48 bg-slate-900 text-white rounded-xl shadow-2xl border border-slate-800 p-2 z-30 space-y-1">
                <button
                  onClick={shareWhatsApp}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs hover:bg-slate-800 text-emerald-400 font-semibold cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </button>
                <button
                  onClick={shareFacebook}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs hover:bg-slate-800 text-blue-400 font-semibold cursor-pointer"
                >
                  <Globe className="w-4 h-4" />
                  <span>Facebook</span>
                </button>
                <button
                  onClick={shareViber}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs hover:bg-slate-800 text-purple-400 font-semibold cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Viber</span>
                </button>
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs hover:bg-slate-800 text-amber-300 font-semibold cursor-pointer border-t border-slate-800"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <ExternalLink className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : t.copyLink}</span>
                </button>
              </div>
            )}
          </div>

          {/* Read Details Button */}
          <button
            onClick={() => {
              onRecordView(notice.id);
              onSelectNotice(notice);
            }}
            className="flex items-center gap-1 font-bold text-blue-700 hover:text-blue-900 hover:underline cursor-pointer"
          >
            <span>{t.readFullNotice}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
