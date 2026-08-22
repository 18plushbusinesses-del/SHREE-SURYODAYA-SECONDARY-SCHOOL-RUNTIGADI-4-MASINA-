import React from 'react';
import { Search, X, Filter, Users, Tag } from 'lucide-react';
import { NoticeCategory, TargetAudience } from '../types';
import { Language, translations } from '../i18n/translations';

interface FilterBarProps {
  lang: Language;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: NoticeCategory | 'all';
  setSelectedCategory: (cat: NoticeCategory | 'all') => void;
  selectedAudience: TargetAudience;
  setSelectedAudience: (aud: TargetAudience) => void;
  resultsCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  lang,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedAudience,
  setSelectedAudience,
  resultsCount
}) => {
  const t = translations[lang];

  const categories: { id: NoticeCategory | 'all'; label: string; iconBg: string }[] = [
    { id: 'all', label: t.allCategories, iconBg: 'bg-slate-800 text-slate-100' },
    { id: 'urgent', label: t.categoryUrgent, iconBg: 'bg-red-600 text-white' },
    { id: 'holidays', label: t.categoryHolidays, iconBg: 'bg-emerald-600 text-white' },
    { id: 'results', label: t.categoryResults, iconBg: 'bg-blue-600 text-white' },
    { id: 'exams', label: t.categoryExams, iconBg: 'bg-indigo-600 text-white' },
    { id: 'events', label: t.categoryEvents, iconBg: 'bg-purple-600 text-white' },
    { id: 'meetings', label: t.categoryMeetings, iconBg: 'bg-amber-600 text-white' },
    { id: 'tuition', label: t.categoryTuition, iconBg: 'bg-teal-600 text-white' },
    { id: 'routine', label: t.categoryRoutine, iconBg: 'bg-cyan-600 text-white' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-5 mb-6 space-y-4">
      {/* Search Input Bar & Audience Selector */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-11 pr-10 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm text-slate-800 bg-slate-50/50 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Target Audience Dropdown */}
        <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2 border border-slate-200 text-xs font-semibold text-slate-700 flex-shrink-0">
          <Users className="w-4 h-4 text-blue-600" />
          <span>{t.targetAudience}:</span>
          <select
            value={selectedAudience}
            onChange={(e) => setSelectedAudience(e.target.value as TargetAudience)}
            className="bg-transparent focus:outline-none font-bold text-blue-900 cursor-pointer"
          >
            <option value="all">{t.audienceAll}</option>
            <option value="students">{t.audienceStudents}</option>
            <option value="parents">{t.audienceParents}</option>
            <option value="teachers">{t.audienceTeachers}</option>
          </select>
        </div>
      </div>

      {/* Category Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase tracking-wider pr-2 border-r border-slate-200 flex-shrink-0">
          <Filter className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Filter</span>
        </div>

        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-md scale-105 ring-2 ring-blue-500/30'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              #{cat.label}
            </button>
          );
        })}
      </div>

      {/* Count Info */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium pt-1 border-t border-slate-100">
        <span>
          Showing <strong>{resultsCount}</strong> notices
        </span>
        {(searchQuery || selectedCategory !== 'all' || selectedAudience !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedAudience('all');
            }}
            className="text-blue-600 font-bold hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
};
