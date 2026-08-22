import React, { useState } from 'react';
import { Image as ImageIcon, Video, X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { GalleryAlbum } from '../types';
import { Language, translations } from '../i18n/translations';

interface MediaGallerySectionProps {
  albums: GalleryAlbum[];
  lang: Language;
}

export const MediaGallerySection: React.FC<MediaGallerySectionProps> = ({
  albums,
  lang
}) => {
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryAlbum | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const t = translations[lang];

  return (
    <section className="space-y-6 my-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {t.galleryTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Capturing memorable moments, sports competitions, and cultural celebrations at Suryodaya.
          </p>
        </div>
      </div>

      {/* Albums Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {albums.map((alb) => {
          const title = lang === 'np' ? alb.title_np : alb.title_en;

          return (
            <div
              key={alb.id}
              onClick={() => {
                setSelectedAlbum(alb);
                setPhotoIndex(0);
              }}
              className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={alb.coverImage}
                  alt={title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
                  <span className="bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-700/80">
                    {alb.dateBS}
                  </span>
                  <span className="flex items-center gap-1 bg-amber-500 text-slate-950 font-extrabold px-2.5 py-1 rounded-full">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>{alb.photosCount} {t.photosCount}</span>
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-1">
                <span className="text-[10px] font-extrabold uppercase text-blue-700 tracking-wider">
                  {alb.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition line-clamp-2">
                  {title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedAlbum && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
          <div className="relative bg-slate-900 text-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-white">
                  {lang === 'np' ? selectedAlbum.title_np : selectedAlbum.title_en}
                </h3>
                <p className="text-xs text-slate-400">
                  Photo {photoIndex + 1} of {selectedAlbum.photos.length}
                </p>
              </div>

              <button
                onClick={() => setSelectedAlbum(null)}
                className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Lightbox Display */}
            <div className="relative flex-1 bg-black flex items-center justify-center p-4 min-h-[350px]">
              <img
                src={selectedAlbum.photos[photoIndex]}
                alt="Gallery preview"
                referrerPolicy="no-referrer"
                className="max-h-[60vh] max-w-full object-contain rounded-xl shadow-lg"
              />

              <button
                onClick={() => setPhotoIndex((prev) => (prev - 1 + selectedAlbum.photos.length) % selectedAlbum.photos.length)}
                className="absolute left-4 p-3 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 border border-slate-700"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() => setPhotoIndex((prev) => (prev + 1) % selectedAlbum.photos.length)}
                className="absolute right-4 p-3 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 border border-slate-700"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Thumbnail Navigation Row */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-2 overflow-x-auto">
              {selectedAlbum.photos.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setPhotoIndex(idx)}
                  className={`relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 border-2 transition ${
                    idx === photoIndex ? 'border-amber-400 scale-105' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={p} alt="thumb" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
