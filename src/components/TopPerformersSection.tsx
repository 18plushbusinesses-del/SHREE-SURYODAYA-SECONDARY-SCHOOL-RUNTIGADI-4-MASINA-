import React from 'react';
import { Award, Trophy, Star, Sparkles, CheckCircle } from 'lucide-react';
import { TopPerformer } from '../types';
import { Language, translations } from '../i18n/translations';

interface TopPerformersSectionProps {
  topPerformers: TopPerformer[];
  lang: Language;
}

export const TopPerformersSection: React.FC<TopPerformersSectionProps> = ({
  topPerformers,
  lang
}) => {
  const t = translations[lang];

  return (
    <section className="bg-gradient-to-b from-slate-900 to-slate-950 text-white py-12 px-6 sm:px-10 rounded-3xl shadow-2xl border border-slate-800 my-10 relative overflow-hidden">
      {/* Glow background effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Trophy className="w-3.5 h-3.5" />
            <span>Academic Honor Roll</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t.topPerformersTitle}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            {t.topPerformersSubtitle}
          </p>
        </div>

        {/* Performer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topPerformers.map((student, idx) => {
            const isFirst = student.rank === 1;
            const name = lang === 'np' ? student.studentName_np : student.studentName_en;
            const exam = lang === 'np' ? student.examTitle_np : student.examTitle_en;

            return (
              <div
                key={student.id}
                className={`relative bg-slate-800/80 rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between ${
                  isFirst
                    ? 'border-amber-400/80 ring-2 ring-amber-400/20 bg-gradient-to-b from-amber-950/30 via-slate-800 to-slate-900'
                    : 'border-slate-700/80 hover:border-slate-500'
                }`}
              >
                {/* Rank Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-amber-400 text-slate-950 font-extrabold text-xs px-3 py-1 rounded-full shadow">
                  <Star className="w-3.5 h-3.5 fill-slate-950" />
                  <span>#{student.rank} Rank</span>
                </div>

                <div className="space-y-4">
                  {/* Photo Avatar */}
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-lg mx-auto">
                    <img
                      src={student.photoUrl}
                      alt={name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Student Details */}
                  <div className="text-center space-y-1">
                    <h3 className="text-lg font-extrabold text-white">
                      {name}
                    </h3>
                    <p className="text-xs font-bold text-amber-300">
                      {student.gpaOrPercentage}
                    </p>
                    <p className="text-xs text-slate-400 font-medium">
                      {exam}
                    </p>
                  </div>
                </div>

                {/* Achievement Badge tag */}
                {student.achievementBadge && (
                  <div className="mt-4 pt-3 border-t border-slate-700/80 text-center">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
                      <CheckCircle className="w-3 h-3" />
                      <span>{student.achievementBadge}</span>
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
