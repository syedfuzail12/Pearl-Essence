import React from 'react';

interface LogoProps {
  variant?: 'badge' | 'horizontal' | 'wordmark' | 'icon-only' | 'center-stacked' | 'emblem-only';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  theme?: 'dark' | 'light'; // dark = black badge background; light = adapts to container
  showSubtitle?: boolean;
}

/**
 * Pearlessence Official Brand Emblem & Monogram Component
 * Exactly matches the official circular emblem with Didot 'P', botanical leaf flourish,
 * luminous 3D pearl, spaced wordmark, and central pearl divider line.
 */
export const PearlessenceEmblemSVG: React.FC<{
  className?: string;
  withText?: boolean;
  inverted?: boolean;
}> = ({ className = 'w-full h-full', withText = true, inverted = false }) => {
  const bgFill = inverted ? '#FAF8F4' : '#0B0B0B';
  const textFill = inverted ? '#111010' : '#FFFFFF';
  const lineFill = inverted ? '#8C7F72' : '#E8DFCF';

  return (
    <svg
      viewBox="0 0 500 500"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Pearlessence Official Brand Emblem"
    >
      <defs>
        {/* Luminous Realistic 3D Pearl Radial Gradient */}
        <radialGradient id="pearlessence3DPearl" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="20%" stopColor="#FAF8F5" />
          <stop offset="45%" stopColor="#E5DFD5" />
          <stop offset="70%" stopColor="#C4B9AA" />
          <stop offset="90%" stopColor="#968B7A" />
          <stop offset="100%" stopColor="#6E6455" />
        </radialGradient>

        <radialGradient id="pearlessenceMiniPearl" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#F5EFEB" />
          <stop offset="70%" stopColor="#C5BAAA" />
          <stop offset="100%" stopColor="#807565" />
        </radialGradient>

        {/* Soft Drop Shadow for Pearl */}
        <filter id="pearlShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="1" dy="3" stdDeviation="4" floodColor="#000000" floodOpacity="0.6" />
        </filter>

        <filter id="badgeShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000000" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* 1. Circular Outer Badge */}
      <circle cx="250" cy="250" r="244" fill={bgFill} filter="url(#badgeShadow)" />
      <circle cx="250" cy="250" r="240" fill="none" stroke={inverted ? '#D8C9AE' : '#2A2825'} strokeWidth="1" />

      {/* 2. Main Roman Serif 'P' */}
      {/* Vertical Stem with Serifs */}
      <g fill={textFill}>
        {/* Top Serif */}
        <path d="M 194 108 L 250 108 C 248 114 246 117 236 118 L 236 122 L 236 298 L 236 302 C 246 303 248 306 250 312 L 194 312 C 196 306 198 303 208 302 L 208 298 L 208 122 L 208 118 C 198 117 196 114 194 108 Z" />
        {/* Thick Stem Body */}
        <rect x="208" y="118" width="28" height="180" />

        {/* P Upper Bowl Outer and Inner Contour */}
        <path d="M 234 108 C 275 108 332 120 332 168 C 332 216 275 226 234 226 L 234 218 C 265 218 304 210 304 168 C 304 126 265 116 234 116 Z" />
      </g>

      {/* 3. Botanical Leaf & Fluid Swirl Flourish */}
      <g stroke={textFill} fill="none" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Left Leaf Body */}
        <path
          d="M 226 280 C 180 260 166 200 246 150 C 215 190 205 240 226 280 Z"
          fill="none"
          stroke={textFill}
          strokeWidth="3.2"
        />
        {/* Leaf Center Vein */}
        <path d="M 222 265 C 195 220 215 180 246 150" strokeWidth="2.2" />

        {/* Sweeping Swirl Ribbon that cradles the Pearl */}
        <path
          d="M 224 235 C 230 265 240 286 286 286 C 308 286 312 265 292 245"
          strokeWidth="3.2"
          fill="none"
        />
      </g>

      {/* 4. The Iconic Luminous 3D Pearl */}
      <g filter="url(#pearlShadow)">
        {/* Pearl Sphere */}
        <circle cx="288" cy="254" r="19" fill="url(#pearlessence3DPearl)" />
        {/* Specular Highlight Gloss */}
        <ellipse cx="282" cy="248" rx="5" ry="3.5" fill="#FFFFFF" opacity="0.85" transform="rotate(-30 282 248)" />
      </g>

      {/* 5. Brand Wordmark 'PEARLESSENCE' */}
      {withText && (
        <>
          <text
            x="250"
            y="362"
            textAnchor="middle"
            fontFamily="'Cinzel', 'Playfair Display', 'Didot', 'Bodoni MT', 'Manrope', serif"
            fontSize="26"
            fontWeight="500"
            letterSpacing="9"
            fill={textFill}
          >
            PEARLESSENCE
          </text>

          {/* 6. Lower Delicate Divider Line with Center Pearl */}
          <line x1="145" y1="394" x2="236" y2="394" stroke={lineFill} strokeWidth="1.2" />
          <line x1="264" y1="394" x2="355" y2="394" stroke={lineFill} strokeWidth="1.2" />
          <circle cx="250" cy="394" r="6" fill="url(#pearlessenceMiniPearl)" filter="url(#pearlShadow)" />
        </>
      )}
    </svg>
  );
};

export const PearlessenceLogo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  theme = 'dark',
  showSubtitle = true
}) => {
  const isDark = theme === 'dark';

  const getSizeClasses = () => {
    switch (size) {
      case 'xs': return 'w-7 h-7';
      case 'sm': return 'w-9 h-9';
      case 'md': return 'w-12 h-12';
      case 'lg': return 'w-16 h-16 sm:w-20 sm:h-20';
      case 'xl': return 'w-24 h-24 sm:w-28 sm:h-28';
      case '2xl': return 'w-32 h-32 sm:w-40 sm:h-40';
      default: return 'w-12 h-12';
    }
  };

  // Full Circular Badge (Monogram + Botanical Flourish + Pearl + Wordmark + Pearl Divider)
  if (variant === 'badge' || variant === 'emblem-only') {
    return (
      <div className={`relative inline-flex items-center justify-center select-none shrink-0 ${getSizeClasses()} ${className}`}>
        <PearlessenceEmblemSVG
          className="w-full h-full object-contain"
          withText={variant !== 'emblem-only'}
          inverted={!isDark}
        />
      </div>
    );
  }

  // Icon Only (Emblem roundel without bottom wordmark for tight spaces)
  if (variant === 'icon-only') {
    return (
      <div className={`relative inline-flex items-center justify-center select-none shrink-0 ${getSizeClasses()} ${className}`}>
        <PearlessenceEmblemSVG className="w-full h-full object-contain" withText={false} inverted={!isDark} />
      </div>
    );
  }

  // Center Stacked Lockup
  if (variant === 'center-stacked') {
    return (
      <div className={`flex flex-col items-center group select-none text-center ${className}`}>
        <div className="w-16 h-16 sm:w-20 sm:h-20 mb-3 drop-shadow-md">
          <PearlessenceEmblemSVG className="w-full h-full" withText={false} inverted={!isDark} />
        </div>
        <div className="flex flex-col items-center">
          <span
            className={`font-manrope text-xl sm:text-2xl tracking-[0.24em] font-black uppercase ${
              isDark ? 'text-[#111010]' : 'text-[#F5F1E8]'
            }`}
          >
            PEARLESSENCE
          </span>
          {showSubtitle && (
            <div className="flex items-center gap-2 mt-1">
              <span className="w-6 h-px bg-[#B49B73]/60"></span>
              <span className="text-[9.5px] tracking-[0.3em] uppercase font-bold text-[#8C7F72]">
                Bangalore Atelier
              </span>
              <span className="w-6 h-px bg-[#B49B73]/60"></span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Standalone Clean Wordmark
  if (variant === 'wordmark') {
    return (
      <div className={`inline-flex flex-col select-none ${className}`}>
        <span
          className={`font-manrope text-lg sm:text-xl tracking-[0.22em] font-black uppercase ${
            isDark ? 'text-[#111010]' : 'text-[#F5F1E8]'
          }`}
        >
          PEARLESSENCE
        </span>
        {showSubtitle && (
          <span className="text-[8.5px] tracking-[0.28em] uppercase font-bold text-[#8C7F72] mt-0.5">
            Bangalore Atelier
          </span>
        )}
      </div>
    );
  }

  // Default: Horizontal Header Lockup (Official Emblem Badge + Typography)
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full shrink-0 shadow-sm transition-transform group-hover:scale-105">
        <PearlessenceEmblemSVG className="w-full h-full" withText={false} inverted={false} />
      </div>
      <div className="flex flex-col">
        <span
          className={`font-manrope text-lg sm:text-xl tracking-[0.22em] font-black uppercase leading-none ${
            isDark ? 'text-[#111010]' : 'text-[#F5F1E8]'
          }`}
        >
          PEARLESSENCE
        </span>
        {showSubtitle && (
          <span
            className={`text-[8.5px] tracking-[0.26em] uppercase font-bold mt-1 ${
              isDark ? 'text-[#8C7F72]' : 'text-[#D8C9AE]'
            }`}
          >
            Bangalore Atelier
          </span>
        )}
      </div>
    </div>
  );
};
