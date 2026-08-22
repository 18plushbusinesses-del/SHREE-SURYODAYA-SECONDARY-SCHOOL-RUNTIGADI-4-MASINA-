import React, { useState } from 'react';
import { 
  Play, 
  Video, 
  Sparkles, 
  Search, 
  Calendar, 
  Eye, 
  Clock, 
  User, 
  BookOpen, 
  Share2, 
  Download, 
  X, 
  Check,
  PartyPopper,
  Calculator,
  Atom,
  Languages,
  Lightbulb,
  FileText
} from 'lucide-react';
import { SeeVideo } from '../types';
import { Language, translations } from '../i18n/translations';

interface SeeCornerSectionProps {
  videos: SeeVideo[];
  lang: Language;
  onOpenPdf?: (url: string, title: string) => void;
}

export const SeeCornerSection: React.FC<SeeCornerSectionProps> = ({
  videos,
  lang,
  onOpenPdf
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePlayingVideo, setActivePlayingVideo] = useState<SeeVideo | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const t = translations[lang];

  const categories = [
    { id: 'all', label: t.seeAllVideos, icon: Video },
    { id: 'reception', label: t.seeReception, icon: PartyPopper },
    { id: 'math', label: t.seeMath, icon: Calculator },
    { id: 'science', label: t.seeScience, icon: Atom },
    { id: 'english', label: t.seeEnglish, icon: Languages },
    { id: 'tips', label: t.seeTips, icon: Lightbulb }
  ];

  const filteredVideos = videos.filter((video) => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    if (!matchesCategory) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const title = (video.title_en + ' ' + video.title_np).toLowerCase();
      const desc = (video.description_en + ' ' + video.description_np).toLowerCase();
      const inst = ((video.instructor_en || '') + ' ' + (video.instructor_np || '')).toLowerCase();
      return title.includes(q) || desc.includes(q) || inst.includes(q);
    }
    return true;
  });

  const handleShareVideo = (video: SeeVideo, e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `Watch "${lang === 'np' ? video.title_np : video.title_en}" - Shree Suryodaya Secondary School SEE Hub: ${window.location.origin}?tab=see&vid=${video.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopiedId(video.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <section className="space-y-6 pt-2" id="see-corner-hub">
      {/* Header Banner for SEE Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 border border-blue-800/60 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'np' ? "कक्षा १० एस.इ.इ. कर्नर" : "Grade 10 SEE Learning & Reception Portal"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {t.seeTitle}
            </h2>
            <p className="text-sm sm:text-base text-blue-200/90 leading-relaxed">
              {t.seeSubtitle}
            </p>
          </div>

          {/* Quick Model Paper Download Badge */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 flex-shrink-0">
            <button
              onClick={() => {
                if (onOpenPdf) {
                  onOpenPdf(
                    '#',
                    lang === 'np' ? "एस.इ.इ. नमुना प्रश्नपत्र तथा परीक्षा तालिका २०८१" : "SEE 2081 Complete Model Sets Routine"
                  );
                }
              }}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg hover:shadow-amber-500/20 transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{lang === 'np' ? "SEE मोडल सेट डाउनलोड" : "Download SEE Model Sets"}</span>
            </button>
            <div className="flex items-center gap-2 text-xs text-blue-200 justify-center">
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>{lang === 'np' ? "६+ विषयगत भिडियो तथा रिसेप्सन" : "6+ Video Lectures & Receptions"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-thin">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                  isSelected
                    ? 'bg-blue-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.seeSearchPlaceholder}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ACTIVE VIDEO EMBEDDED MODAL / PLAYER */}
      {activePlayingVideo && (
        <div className="bg-slate-950 text-white rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-500/50 space-y-4">
          <div className="p-4 sm:p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
              <div>
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">
                  {t.seeNowPlaying}
                </span>
                <h3 className="text-base sm:text-lg font-black text-white">
                  {lang === 'np' ? activePlayingVideo.title_np : activePlayingVideo.title_en}
                </h3>
              </div>
            </div>

            <button
              onClick={() => setActivePlayingVideo(null)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Responsive 16:9 Video Player */}
          <div className="relative w-full aspect-video bg-black flex items-center justify-center">
            {activePlayingVideo.videoUrl.includes('youtube.com') || activePlayingVideo.videoUrl.includes('youtu.be') ? (
              <iframe
                src={`${activePlayingVideo.videoUrl}?autoplay=1`}
                title={lang === 'np' ? activePlayingVideo.title_np : activePlayingVideo.title_en}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <video
                src={activePlayingVideo.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            )}
          </div>

          <div className="p-5 sm:p-6 bg-slate-900/90 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="flex items-center gap-1 text-amber-300 font-bold">
                  <User className="w-3.5 h-3.5" />
                  {lang === 'np' ? activePlayingVideo.instructor_np : activePlayingVideo.instructor_en}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {activePlayingVideo.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {activePlayingVideo.dateBS}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  {activePlayingVideo.viewsCount || 3500} views
                </span>
              </div>

              <button
                onClick={(e) => handleShareVideo(activePlayingVideo, e)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-900/60 hover:bg-blue-800 text-blue-200 text-xs font-bold transition cursor-pointer"
              >
                {copiedId === activePlayingVideo.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share Video</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {lang === 'np' ? activePlayingVideo.description_np : activePlayingVideo.description_en}
            </p>
          </div>
        </div>
      )}

      {/* Videos Grid */}
      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => {
            const isPlaying = activePlayingVideo?.id === video.id;
            return (
              <div
                key={video.id}
                onClick={() => {
                  setActivePlayingVideo(video);
                  // Scroll into view if playing
                  const el = document.getElementById('see-corner-hub');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group bg-white rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-xl cursor-pointer flex flex-col justify-between ${
                  isPlaying ? 'border-amber-500 ring-2 ring-amber-400/50' : 'border-slate-200 hover:border-blue-400'
                }`}
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                  <img
                    src={video.thumbnailUrl}
                    alt={lang === 'np' ? video.title_np : video.title_en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-amber-500/90 text-slate-950 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform group-hover:bg-amber-400">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    {video.category === 'reception' && (
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-500 text-slate-950 text-[11px] font-black tracking-wide shadow">
                        {lang === 'np' ? "रिसेप्सन / बिदाइ" : "Reception"}
                      </span>
                    )}
                    {video.category === 'math' && (
                      <span className="px-2.5 py-0.5 rounded-md bg-blue-600 text-white text-[11px] font-bold shadow">
                        {lang === 'np' ? "अनिवार्य गणित" : "Mathematics"}
                      </span>
                    )}
                    {video.category === 'science' && (
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-600 text-white text-[11px] font-bold shadow">
                        {lang === 'np' ? "विज्ञान तथा प्रविधि" : "Science & Tech"}
                      </span>
                    )}
                    {video.category === 'english' && (
                      <span className="px-2.5 py-0.5 rounded-md bg-purple-600 text-white text-[11px] font-bold shadow">
                        {lang === 'np' ? "अंग्रेजी" : "English"}
                      </span>
                    )}
                    {video.category === 'tips' && (
                      <span className="px-2.5 py-0.5 rounded-md bg-rose-600 text-white text-[11px] font-bold shadow">
                        {lang === 'np' ? "तयारी सुत्र" : "Exam Tips"}
                      </span>
                    )}
                  </div>

                  {/* Duration Pill */}
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 text-white text-[11px] font-mono font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{video.duration}</span>
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500 font-semibold">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                        {video.dateBS}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-slate-400" />
                        {video.viewsCount || 1200}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                      {lang === 'np' ? video.title_np : video.title_en}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
                      {lang === 'np' ? video.description_np : video.description_en}
                    </p>
                  </div>

                  {/* Instructor & Actions Footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                    <span className="font-bold text-slate-700 truncate max-w-[170px]">
                      {lang === 'np' ? video.instructor_np : video.instructor_en}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => handleShareVideo(video, e)}
                        title="Share Link"
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-blue-700 transition cursor-pointer"
                      >
                        {copiedId === video.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Share2 className="w-4 h-4" />
                        )}
                      </button>

                      <button
                        onClick={() => setActivePlayingVideo(video)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-sm transition"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>{lang === 'np' ? "हेर्नुहोस्" : "Watch"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3 max-w-lg mx-auto">
          <Video className="w-10 h-10 text-slate-400 mx-auto" />
          <p className="text-base font-bold text-slate-800">
            {lang === 'np' ? "कुनै भिडियो भेटिएन।" : "No videos found matching your filter."}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold px-4 py-2 rounded-xl"
          >
            Clear Filters
          </button>
        </div>
      )}
    </section>
  );
};
