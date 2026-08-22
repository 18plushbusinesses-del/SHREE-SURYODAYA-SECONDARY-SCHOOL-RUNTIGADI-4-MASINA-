import React, { useState } from 'react';

interface SchoolLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  showTextLabel?: boolean;
  useVectorOnly?: boolean;
}

export const SchoolLogo: React.FC<SchoolLogoProps> = ({
  size = 'md',
  className = '',
  showTextLabel = false,
  useVectorOnly = false
}) => {
  const [imageError, setImageError] = useState(false);

  const dimensionClasses = {
    xs: 'w-8 h-8',
    sm: 'w-11 h-11',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
    '2xl': 'w-40 h-40'
  };

  const pixelDimensions = {
    xs: 32,
    sm: 44,
    md: 56,
    lg: 80,
    xl: 112,
    '2xl': 160
  };

  const currentDim = dimensionClasses[size] || dimensionClasses.md;
  const px = pixelDimensions[size] || 56;

  // Use the 3D high-res emblem image if available, else SVG vector emblem
  const imageAssetUrl = '/src/assets/images/school_emblem_logo_1787348509058.jpg';

  return (
    <div className={`relative inline-flex items-center gap-3 ${className}`}>
      <div 
        className={`relative ${currentDim} rounded-full overflow-hidden flex-shrink-0 shadow-xl transition-transform duration-300 hover:scale-105 select-none`}
        style={{
          boxShadow: '0 4px 20px -2px rgba(14, 165, 233, 0.35), 0 0 0 1px rgba(251, 191, 36, 0.4)'
        }}
      >
        {!useVectorOnly && !imageError ? (
          <img
            src={imageAssetUrl}
            alt="Shree Suryodaya Secondary School Official Emblem"
            className="w-full h-full object-cover rounded-full"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
          />
        ) : (
          /* High-Precision SVG Official Emblem */
          <svg
            viewBox="0 0 300 300"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Outer Metallic Gradient */}
              <linearGradient id="metallicBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e3a8a" />
                <stop offset="30%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#60a5fa" />
                <stop offset="70%" stopColor="#1d4ed8" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>

              {/* Gold Ring Gradient */}
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d97706" />
                <stop offset="40%" stopColor="#fde047" />
                <stop offset="60%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>

              {/* Deep Blue Core Gradient */}
              <radialGradient id="deepRoyalCore" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1e40af" />
                <stop offset="60%" stopColor="#0c1e5b" />
                <stop offset="100%" stopColor="#03071e" />
              </radialGradient>

              {/* Glowing Cyan Glow */}
              <radialGradient id="cyanGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
              </radialGradient>

              {/* Text Arc Paths */}
              {/* Top Arc (Clockwise) */}
              <path
                id="topTextPath"
                d="M 45,150 A 105,105 0 0,1 255,150"
                fill="none"
              />
              {/* Bottom Arc (Clockwise for easy reading) */}
              <path
                id="bottomTextPath"
                d="M 255,150 A 105,105 0 0,1 45,150"
                fill="none"
              />
            </defs>

            {/* 1. Outer Metallic Bezel Ring */}
            <circle cx="150" cy="150" r="148" fill="url(#metallicBlue)" stroke="url(#goldGradient)" strokeWidth="3" />

            {/* 2. Concentric Gold Accent Ring */}
            <circle cx="150" cy="150" r="140" fill="#0f172a" stroke="url(#goldGradient)" strokeWidth="2.5" />

            {/* 3. White / Pearl Ring for School Name */}
            <circle cx="150" cy="150" r="134" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />

            {/* Side Stars on White Ring */}
            {/* Left Star */}
            <g transform="translate(32, 150) scale(0.6)">
              <polygon points="0,-12 3,-3 12,-3 5,2 8,11 0,6 -8,11 -5,2 -12,-3 -3,-3" fill="#1e3a8a" />
            </g>
            {/* Right Star */}
            <g transform="translate(268, 150) scale(0.6)">
              <polygon points="0,-12 3,-3 12,-3 5,2 8,11 0,6 -8,11 -5,2 -12,-3 -3,-3" fill="#1e3a8a" />
            </g>

            {/* Curved Typography: Top & Bottom */}
            <text fill="#0f2963" fontSize="13.5" fontWeight="900" letterSpacing="1.8" fontFamily="system-ui, -apple-system, sans-serif">
              <textPath href="#topTextPath" startOffset="50%" textAnchor="middle">
                SHREE SURYODAYA SECONDARY SCHOOL
              </textPath>
            </text>

            <text fill="#0f2963" fontSize="12.5" fontWeight="800" letterSpacing="1.5" fontFamily="system-ui, -apple-system, sans-serif">
              <textPath href="#bottomTextPath" startOffset="50%" textAnchor="middle">
                RUNTIGADI-4 MASINA, ROLPA
              </textPath>
            </text>

            {/* 4. Inner Gold & Metallic Blue Border */}
            <circle cx="150" cy="150" r="88" fill="url(#metallicBlue)" stroke="url(#goldGradient)" strokeWidth="2.5" />
            
            {/* 5. Center Royal Blue Core */}
            <circle cx="150" cy="150" r="82" fill="url(#deepRoyalCore)" />
            <circle cx="150" cy="150" r="70" fill="url(#cyanGlow)" />

            {/* 6. Geometric 6-Pointed Star of Wisdom */}
            <g transform="translate(150, 142) scale(1.15)">
              <polygon
                points="0,-42 36,21 -36,21"
                fill="none"
                stroke="url(#goldGradient)"
                strokeWidth="2"
                strokeOpacity="0.85"
              />
              <polygon
                points="0,42 36,-21 -36,-21"
                fill="none"
                stroke="url(#goldGradient)"
                strokeWidth="2"
                strokeOpacity="0.85"
              />
            </g>

            {/* 7. Center Open Book (Symbol of Knowledge & Light) */}
            <g transform="translate(150, 138) scale(0.95)">
              {/* Sunrays emerging from book */}
              <circle cx="0" cy="-14" r="10" fill="#fbbf24" opacity="0.9" />
              <line x1="0" y1="-28" x2="0" y2="-20" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
              <line x1="-10" y1="-24" x2="-6" y2="-18" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
              <line x1="10" y1="-24" x2="6" y2="-18" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />

              {/* Book Left Page */}
              <path
                d="M 0,2 C -10,0 -22,-6 -30,-4 C -30,16 -22,18 -2,22 Z"
                fill="#ffffff"
                stroke="#e2e8f0"
                strokeWidth="1.5"
              />
              {/* Book Right Page */}
              <path
                d="M 0,2 C 10,0 22,-6 30,-4 C 30,16 22,18 2,22 Z"
                fill="#ffffff"
                stroke="#e2e8f0"
                strokeWidth="1.5"
              />
              {/* Book Spine */}
              <path d="M 0,2 L 0,22" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
              
              {/* Lines on pages */}
              <line x1="-24" y1="3" x2="-8" y2="4" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="-24" y1="9" x2="-8" y2="10" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="-24" y1="15" x2="-8" y2="16" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />

              <line x1="8" y1="4" x2="24" y2="3" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="8" y1="10" x2="24" y2="9" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="8" y1="16" x2="24" y2="15" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
            </g>

            {/* 8. Established Badge "Estd. 2016" */}
            <g transform="translate(150, 186)">
              <rect x="-42" y="-9" width="84" height="18" rx="9" fill="#0f172a" stroke="url(#goldGradient)" strokeWidth="1.5" />
              <text
                x="0"
                y="3.5"
                textAnchor="middle"
                fill="#fde047"
                fontSize="9.5"
                fontWeight="900"
                letterSpacing="0.8"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                ESTD. 2016
              </text>
            </g>

            {/* 9. Bottom Academic Torch / Laurels */}
            <g transform="translate(150, 208) scale(0.65)">
              <path d="M-15,0 C-12,8 -2,12 0,14 C2,12 12,8 15,0" fill="none" stroke="#fbbf24" strokeWidth="2" />
              <circle cx="0" cy="0" r="3" fill="#60a5fa" />
            </g>
          </svg>
        )}
      </div>

      {showTextLabel && (
        <div className="flex flex-col">
          <span className="text-base sm:text-lg font-black text-white tracking-tight uppercase leading-tight">
            SHREE SURYODAYA SECONDARY SCHOOL
          </span>
          <div className="flex items-center gap-2 text-xs sm:text-sm mt-0.5 flex-wrap">
            <span className="font-bold text-amber-400">RUNTIGADI-4-MASINA ROLPA</span>
            <span className="text-slate-500">•</span>
            <span className="text-amber-300 font-extrabold">EST 2016</span>
          </div>
        </div>
      )}
    </div>
  );
};
