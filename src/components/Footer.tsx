import React from 'react';
import { Phone, Calendar, ShieldCheck, MapPin, Mail } from 'lucide-react';
import { Language, translations } from '../i18n/translations';
import { SchoolLogo } from './SchoolLogo';

interface FooterProps {
  lang: Language;
  onOpenEmergency: () => void;
  onOpenCalendar: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onOpenEmergency,
  onOpenCalendar,
  onOpenAdmin
}) => {
  const t = translations[lang];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-12 pb-8 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <SchoolLogo size="sm" />
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
                    {t.schoolName}
                  </h3>
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/40">
                    EST 2016
                  </span>
                </div>
                <p className="text-xs text-amber-400 font-bold tracking-wide mt-0.5">{t.location}</p>
                <p className="text-[11px] text-slate-400 font-medium">{t.schoolNameNepali}</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              {t.tagline}. Dedicated to providing quality public secondary education, holistic discipline, and academic excellence in Nepal.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 font-medium pt-1">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>RUNTIGADI-4-MASINA ROLPA</span>
              </div>
              <button 
                onClick={onOpenEmergency}
                className="flex items-center gap-1.5 bg-blue-900/60 hover:bg-blue-800 text-amber-300 px-3 py-1 rounded-lg border border-blue-700 transition cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.contactLabel}</span>
              </button>
              <a 
                href="mailto:bhapuma.official@gmail.com"
                className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-blue-300 px-3 py-1 rounded-lg border border-slate-700 transition"
              >
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>bhapuma.official@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-1.5 text-xs text-slate-400 font-medium">
              <li>
                <button onClick={onOpenCalendar} className="hover:text-amber-300 transition cursor-pointer">
                  {t.schoolCalendar}
                </button>
              </li>
              <li>
                <button onClick={onOpenEmergency} className="hover:text-amber-300 transition cursor-pointer">
                  {t.emergencyContactsTitle}
                </button>
              </li>
              <li>
                <button onClick={onOpenAdmin} className="hover:text-amber-300 transition cursor-pointer">
                  {t.navAdmin}
                </button>
              </li>
              <li>
                <a href="mailto:bhapuma.official@gmail.com" className="hover:text-amber-300 transition">
                  Email: bhapuma.official@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Affiliation */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Government Approval</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.footerAffiliation}
            </p>
            <p className="text-xs text-amber-400/90 font-mono">
              School Code: 24001 • NEB Affiliation No: 914
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>{t.copyright}</p>
          <p className="text-slate-600">PWA & Offline Caching Enabled</p>
        </div>
      </div>
    </footer>
  );
};
