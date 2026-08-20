import React from 'react';

interface LogoProps {
  variant?: 'badge' | 'horizontal' | 'wordmark' | 'icon-only' | 'center-stacked';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  theme?: 'dark' | 'light'; // dark = black badge/text; light = ivory on dark
}

export const PearlessenceLogo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  theme = 'dark'
}) => {
  const getBadgeDimensions = () => {
    switch (size) {
      case 'sm': return 'w-10 h-10';
      case 'md': return 'w-14 h-14';
      case 'lg': return 'w-20 h-20';
      case 'xl': return 'w-28 h-28';
      default: return 'w-14 h-14';
    }
  };

  const isDark = theme === 'dark';

  if (variant === 'center-stacked') {
    return (
      <div className={`flex flex-col items-center group cursor-pointer select-none ${className}`}>
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="w-2 h-2 rounded-full bg-[#B49B73]"></span>
          <span className="text-lg sm:text-xl tracking-[0.25em] uppercase font-black text-[#111010] font-montserrat">
            PEARLESSENCE
          </span>
          <span className="w-2 h-2 rounded-full bg-[#B49B73]"></span>
        </div>
        <span className="text-[9px] tracking-[0.3em] uppercase font-bold text-[#8C7F72] font-montserrat">
          BANGALORE ATELIER
        </span>
      </div>
    );
  }

  if (variant === 'badge' || variant === 'icon-only') {
    return (
      <div className={`relative flex items-center justify-center select-none ${getBadgeDimensions()} ${className}`}>
        <div className={`w-full h-full rounded-full flex items-center justify-center font-montserrat font-black text-xl shadow-xs border ${
          isDark ? 'bg-[#111010] text-[#FAF8F4] border-[#B49B73]/40' : 'bg-[#FAF8F4] text-[#111010] border-[#D8C9AE]'
        }`}>
          <span>P</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#B49B73] ml-0.5"></span>
        </div>
      </div>
    );
  }

  if (variant === 'wordmark') {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <span
          className={`font-montserrat text-lg sm:text-xl tracking-[0.25em] font-black uppercase ${
            theme === 'light' ? 'text-[#F5F1E8]' : 'text-[#111010]'
          }`}
        >
          PEARLESSENCE
        </span>
      </div>
    );
  }

  // Horizontal lockup for navigation & headers
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <div className="w-8 h-8 rounded-full bg-[#111010] flex items-center justify-center border border-[#B49B73]/40 shadow-xs shrink-0 font-montserrat font-black text-sm text-[#FAF8F4]">
        P
      </div>
      <div className="flex flex-col">
        <span
          className={`font-montserrat text-base sm:text-lg tracking-[0.22em] font-black uppercase leading-none ${
            theme === 'light' ? 'text-[#F5F1E8]' : 'text-[#111010]'
          }`}
        >
          PEARLESSENCE
        </span>
        <span
          className={`text-[8.5px] tracking-[0.25em] uppercase font-bold mt-1 font-montserrat ${
            theme === 'light' ? 'text-[#D8C9AE]' : 'text-[#8C7F72]'
          }`}
        >
          Bangalore Atelier
        </span>
      </div>
    </div>
  );
};
