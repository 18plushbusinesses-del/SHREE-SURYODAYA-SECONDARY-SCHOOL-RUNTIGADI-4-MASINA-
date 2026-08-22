import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  AlertTriangle, 
  Award, 
  Calendar, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { Language, translations } from '../i18n/translations';
import { Notice } from '../types';

interface HeroBannerProps {
  lang: Language;
  urgentNotices: Notice[];
  onSelectNotice: (notice: Notice) => void;
  onOpenCalendar: () => void;
  onSelectTab: (tab: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  lang,
  urgentNotices,
  onSelectNotice,
  onOpenCalendar,
  onSelectTab
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const t = translations[lang];

  const slides = [
    {
      id: 'slide-1',
      type: 'urgent',
      bgImage: '/src/assets/images/school_hero_banner_1786585998844.jpg',
      badge: lang === 'np' ? 'अति जरुरी सूचना' : 'URGENT ANNOUNCEMENT',
      title: lang === 'np' 
        ? 'एस.इ.इ. (SEE) मोडल बोर्ड परीक्षा तालिका तथा प्रवेशपत्र वितरण २०८३'
        : 'SEE Model Board Examination Routine & Admit Card Distribution 2083',
      desc: lang === 'np'
        ? 'कक्षा १० का सम्पूर्ण छात्रछात्रालाई असोज १५ देखि सञ्चालन हुने परीक्षाको तालिका र प्रवेशपत्र वितरण सम्बन्धी जानकारी।'
        : 'Important notice regarding SEE Pre-Board Exams commencing Ashoj 15 and admit card distribution from Account Office.',
      actionLabel: t.readFullNotice,
      noticeRef: urgentNotices[0] || null
    },
    {
      id: 'slide-see',
      type: 'see',
      bgImage: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1200',
      badge: lang === 'np' ? 'एस.इ.इ. कर्नर तथा भिडियो कक्षाहरू' : 'SEE HUB & VIDEO LECTURES',
      title: lang === 'np'
        ? 'कक्षा १० का छात्रछात्राको स्वागत तथा बिदाइ (रिसेप्सन) र नमुना सेट भिडियोहरू'
        : 'Grade 10 SEE Reception Videos, Model Exam Solutions & Classes',
      desc: lang === 'np'
        ? 'गणित, विज्ञान, अंग्रेजी व्याकरण तथा विगतका रिसेप्सन समारोहका विशेष भिडियोहरू हेर्नुहोस्।'
        : 'Watch compulsory math, science, English lectures and school reception ceremony highlights.',
      actionLabel: lang === 'np' ? 'SEE भिडियोहरू हेर्नुहोस्' : 'Watch SEE Videos',
      tabRef: 'see'
    },
    {
      id: 'slide-2',
      type: 'topper',
      bgImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
      badge: lang === 'np' ? 'शैक्षणिक गौरव २०८२' : 'ACADEMIC HONOR ROLL',
      title: lang === 'np'
        ? 'एस.इ.इ. राष्ट्रिय बोर्ड परीक्षा २०८२ मा सूर्योदयका छात्रछात्राको सर्वोत्कृष्ट नतिजा!'
        : 'Shree Suryodaya Students Achieve Top District Honors in SEE Board Exam!',
      desc: lang === 'np'
        ? 'आयुष्मा शर्मा (GPA 3.95 A+) र रोहन तामाङ (GPA 3.88 A+) लगायत सम्पूर्ण उत्तीर्ण विद्यार्थीहरूमा बधाई!'
        : 'Congratulations to Aayushma Sharma (GPA 3.95 A+) and Rohan Tamang (GPA 3.88 A+) for outstanding success.',
      actionLabel: t.navTopPerformers,
      tabRef: 'topPerformers'
    },
    {
      id: 'slide-3',
      type: 'holiday',
      bgImage: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1200',
      badge: lang === 'np' ? 'बिदाको सूचना' : 'FESTIVAL VACATION NOTICE',
      title: lang === 'np'
        ? 'बडा दशैं, शुभ दीपावली तथा छठ पर्वको पावन अवसरमा सार्वजनिक बिदा'
        : 'Grand Dashain, Tihar & Chhath Festival Vacation Notice',
      desc: lang === 'np'
        ? 'अाश्विन २४ देखि कार्तिक २० गतेसम्म विद्यालय बिदा रहनेछ। कार्तिक २१ देखि नियमित पठनपाठन।'
        : 'School will remain closed from Ashoj 24 to Kartik 20. Regular classes resume on Kartik 21 at 10:00 AM.',
      actionLabel: t.readFullNotice,
      noticeRef: urgentNotices[1] || null
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const active = slides[currentSlide];

  return (
    <div className="relative overflow-hidden bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 my-6">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src={active.bgImage}
          alt="School Hero"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-30 transform scale-105 transition-all duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/40"></div>
      </div>

      {/* Content Slide Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-16 text-white min-h-[360px] flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-4 w-fit">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{active.badge}</span>
        </div>

        <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-tight mb-4 tracking-tight drop-shadow-md">
          {active.title}
        </h2>

        <p className="text-slate-300 text-sm md:text-base max-w-2xl mb-8 leading-relaxed">
          {active.desc}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => {
              if (active.noticeRef) {
                onSelectNotice(active.noticeRef);
              } else if (active.tabRef) {
                onSelectTab(active.tabRef);
              }
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>{active.actionLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenCalendar}
            className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold px-5 py-3 rounded-xl border border-slate-700 transition cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>{t.schoolCalendar}</span>
          </button>
        </div>
      </div>

      {/* Controls & Indicators */}
      <div className="absolute bottom-4 right-6 z-20 flex items-center gap-2">
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="p-2 rounded-full bg-slate-800/80 text-white hover:bg-slate-700 border border-slate-700 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5 px-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentSlide ? 'w-6 bg-amber-400' : 'w-2 bg-slate-600'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="p-2 rounded-full bg-slate-800/80 text-white hover:bg-slate-700 border border-slate-700 transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
