import React, { useState } from 'react';
import { 
  GraduationCap, 
  Globe, 
  PhoneCall, 
  Calendar as CalendarIcon, 
  Bell, 
  ShieldCheck, 
  Menu, 
  X,
  Sparkles,
  Download,
  Image as ImageIcon,
  Award,
  Video,
  Mail
} from 'lucide-react';
import { Language, translations } from '../i18n/translations';
import { SchoolLogo } from './SchoolLogo';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenEmergency: () => void;
  onOpenCalendar: () => void;
  onOpenPushPrompt: () => void;
  onOpenAdmin: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  pushEnabled: boolean;
  isOffline: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  onOpenEmergency,
  onOpenCalendar,
  onOpenPushPrompt,
  onOpenAdmin,
  activeSection,
  setActiveSection,
  pushEnabled,
  isOffline
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  const navItems = [
    { id: 'notices', label: t.navNotices, icon: GraduationCap },
    { id: 'see', label: t.navSee, icon: Video },
    { id: 'calendar', label: t.navCalendar, icon: CalendarIcon, onClick: onOpenCalendar },
    { id: 'topPerformers', label: t.navTopPerformers, icon: Award },
    { id: 'gallery', label: t.navGallery, icon: ImageIcon },
    { id: 'documents', label: t.navDocuments, icon: Download },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white shadow-xl border-b border-slate-800">
      {/* Top Utility Announcement Ribbon */}
      <div className="bg-blue-950/90 border-b border-blue-800/50 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-blue-200">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-bold text-white tracking-wide">SHREE SURYODAYA SECONDARY SCHOOL</span>
            <span className="hidden sm:inline text-blue-300">|</span>
            <span className="hidden sm:inline text-amber-300 font-medium">RUNTIGADI-4-MASINA ROLPA</span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline px-1.5 py-0.5 rounded bg-blue-900/80 text-amber-300 text-[10px] font-bold border border-blue-700">EST 2016</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenEmergency}
              className="flex items-center gap-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 hover:text-amber-200 px-2.5 py-0.5 rounded-full border border-amber-500/40 font-bold transition cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.contactLabel}</span>
            </button>
            <span className="text-slate-600 hidden md:inline">|</span>
            <a
              href="mailto:bhapuma.official@gmail.com"
              className="hidden md:flex items-center gap-1.5 text-blue-200 hover:text-white transition"
              title="Official Email"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>bhapuma.official@gmail.com</span>
            </a>
            <span className="text-slate-600">|</span>
            <button
              onClick={onOpenCalendar}
              className="flex items-center gap-1.5 text-blue-200 hover:text-white transition cursor-pointer"
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>{t.schoolCalendar}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand & Action Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-4">
        {/* School Branding Logo & Typography */}
        <div 
          onClick={() => setActiveSection('notices')} 
          className="flex items-center gap-3.5 cursor-pointer group"
        >
          {/* Official Emblem Component */}
          <SchoolLogo size="sm" />

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-xl md:text-2xl font-black tracking-tight text-white group-hover:text-amber-300 transition-colors uppercase">
                SHREE SURYODAYA SECONDARY SCHOOL
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[11px] font-extrabold border border-amber-500/40">
                EST 2016
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap text-xs sm:text-sm mt-0.5">
              <span className="font-bold text-amber-400 tracking-wide">
                RUNTIGADI-4-MASINA ROLPA
              </span>
              <span className="text-slate-500 hidden sm:inline">•</span>
              <span className="text-slate-300 font-medium hidden md:inline">
                {t.schoolNameNepali}
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Controls */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Notification Alert Trigger */}
          <button
            onClick={onOpenPushPrompt}
            className={`relative p-2.5 rounded-xl border transition cursor-pointer ${
              pushEnabled 
                ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-300' 
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
            title={pushEnabled ? t.pushEnabled : t.enablePush}
          >
            <Bell className="w-5 h-5" />
            {!pushEnabled && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping"></span>
            )}
          </button>

          {/* Bilingual Language Switcher */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold px-3.5 py-2 rounded-xl shadow border border-blue-500/30 transition-all cursor-pointer"
          >
            <Globe className="w-4 h-4 text-amber-300" />
            <span>{t.languageToggle}</span>
          </button>

          {/* Admin Portal Button */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3.5 py-2 rounded-xl shadow-md transition cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{t.navAdmin}</span>
          </button>
        </div>

        {/* Mobile menu hamburger toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onToggleLang}
            className="p-2 rounded-lg bg-slate-800 text-amber-400 font-bold text-xs flex items-center gap-1 border border-slate-700"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'नेपा' : 'EN'}</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-800 text-slate-200 hover:text-white border border-slate-700"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Main Navigation Sub-Bar */}
      <nav className="hidden lg:block bg-slate-950/80 border-t border-slate-800/80 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-1 py-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.onClick) {
                      item.onClick();
                    } else {
                      setActiveSection(item.id);
                    }
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-slate-400 font-medium">
            {t.estd}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-slate-800 px-4 py-4 space-y-3">
          <div className="grid grid-cols-1 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (item.onClick) {
                      item.onClick();
                    } else {
                      setActiveSection(item.id);
                    }
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800/60 text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-5 h-5 text-amber-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEmergency();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-amber-500/20 text-amber-300 text-sm font-bold border border-amber-500/40"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>{t.contactLabel}</span>
            </button>

            <a
              href="mailto:bhapuma.official@gmail.com"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-blue-900/40 text-blue-200 text-sm font-semibold border border-blue-700/50"
            >
              <Mail className="w-4 h-4 text-blue-400" />
              <span>bhapuma.official@gmail.com</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPushPrompt();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-800 text-emerald-400 text-sm font-semibold border border-slate-700"
            >
              <Bell className="w-4 h-4" />
              <span>{pushEnabled ? t.pushEnabled : t.enablePush}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 text-sm font-bold shadow"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t.navAdmin}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
