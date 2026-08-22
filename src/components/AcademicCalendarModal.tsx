import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Clock, AlertCircle, Sparkles, ChevronRight } from 'lucide-react';
import { AcademicCalendarEvent } from '../types';
import { Language, translations } from '../i18n/translations';

interface AcademicCalendarModalProps {
  events: AcademicCalendarEvent[];
  lang: Language;
  onClose: () => void;
}

export const AcademicCalendarModal: React.FC<AcademicCalendarModalProps> = ({
  events,
  lang,
  onClose
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'holiday' | 'exam' | 'event'>('all');
  const t = translations[lang];

  const filteredEvents = events.filter((e) => {
    if (activeFilter === 'all') return true;
    return e.type === activeFilter;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500 text-slate-950 shadow">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                {t.calendarTitle}
              </h2>
              <p className="text-xs text-amber-300 font-semibold">
                {t.todayIs}: २०८१ असोज ०४ (2026-09-20)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto flex-shrink-0">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
              activeFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-700'
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setActiveFilter('holiday')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
              activeFilter === 'holiday' ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-800'
            }`}
          >
            {t.holidayBadge}
          </button>
          <button
            onClick={() => setActiveFilter('exam')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
              activeFilter === 'exam' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-800'
            }`}
          >
            {t.examBadge}
          </button>
          <button
            onClick={() => setActiveFilter('event')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
              activeFilter === 'event' ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-800'
            }`}
          >
            {t.eventBadge}
          </button>
        </div>

        {/* Events List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {filteredEvents.map((ev) => {
            const title = lang === 'np' ? ev.title_np : ev.title_en;
            const desc = lang === 'np' ? ev.description_np : ev.description_en;

            return (
              <div
                key={ev.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  ev.isHoliday
                    ? 'bg-emerald-50/60 border-emerald-200'
                    : ev.type === 'exam'
                    ? 'bg-indigo-50/60 border-indigo-200'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-3 rounded-2xl font-black text-center min-w-[70px] ${
                    ev.isHoliday ? 'bg-emerald-600 text-white' : 'bg-blue-900 text-white'
                  }`}>
                    <p className="text-xs uppercase opacity-80">BS</p>
                    <p className="text-sm font-extrabold">{ev.dateBS.split(' ')[1] || ev.dateBS}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        ev.isHoliday ? 'bg-emerald-200 text-emerald-900' : 'bg-indigo-200 text-indigo-900'
                      }`}>
                        {ev.type}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">{ev.dateAD}</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mt-1">{title}</h4>
                    {desc && <p className="text-xs text-slate-600 mt-0.5">{desc}</p>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end flex-shrink-0">
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
