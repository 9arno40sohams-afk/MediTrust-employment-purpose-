import React from 'react';

interface MediTrustLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showTagline?: boolean;
  showBadges?: boolean;
  variant?: 'appIcon' | 'horizontal' | 'badge';
  whiteVariant?: boolean;
}

export const MediTrustLogo: React.FC<MediTrustLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = false,
  showBadges = false,
  variant = 'horizontal',
  whiteVariant = false,
}) => {
  // Dimensions
  const iconSizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    '2xl': 'w-36 h-36',
  }[size];

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
    '2xl': 'text-5xl',
  }[size];

  const taglineSizes = {
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-sm',
    xl: 'text-base',
    '2xl': 'text-lg',
  }[size];

  // SVG representation perfectly matching the uploaded logo:
  // - Rounded royal blue squircle
  // - White medical cross
  // - Cyan & green leaf swoosh wrapping around cross
  // - Fast delivery scooter with rider and + on box
  const SvgIcon = (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-md select-none"
    >
      <defs>
        {/* Background gradient from deep royal blue to sapphire */}
        <linearGradient id="mt_bg" x1="10" y1="10" x2="190" y2="190" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0a54cf" />
          <stop offset="0.6" stopColor="#003eaf" />
          <stop offset="1" stopColor="#002776" />
        </linearGradient>

        {/* Leaf gradient vibrant green to lime */}
        <linearGradient id="mt_leaf_grad" x1="70" y1="50" x2="140" y2="130" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3bf589" />
          <stop offset="0.5" stopColor="#5be22d" />
          <stop offset="1" stopColor="#1eb345" />
        </linearGradient>

        {/* Cyan swirl gradient */}
        <linearGradient id="mt_cyan_swirl" x1="40" y1="30" x2="150" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00f2fe" />
          <stop offset="1" stopColor="#4facfe" />
        </linearGradient>

        {/* Soft shadow for cross */}
        <filter id="mt_shadow" x="35" y="35" width="130" height="130" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#001845" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Blue Squircle Base */}
      <rect x="8" y="8" width="184" height="184" rx="46" fill="url(#mt_bg)" />
      
      {/* Subtle border highlight */}
      <rect x="8.5" y="8.5" width="183" height="183" rx="45.5" stroke="white" strokeOpacity="0.22" strokeWidth="1.5" />

      {/* Swirling Circular Arc (Cyan to Green) */}
      <path
        d="M 60 70 A 52 52 0 1 1 128 152"
        stroke="url(#mt_cyan_swirl)"
        strokeWidth="6.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.95"
      />
      {/* Top Leaf Accent on the circle */}
      <path
        d="M 124 35 C 135 32, 148 42, 142 56 C 136 50, 130 42, 124 35 Z"
        fill="#3bf589"
      />

      {/* Main Medical White Cross */}
      <g filter="url(#mt_shadow)">
        {/* Vertical beam */}
        <rect x="82" y="44" width="36" height="88" rx="14" fill="#FFFFFF" />
        {/* Horizontal beam */}
        <rect x="56" y="70" width="88" height="36" rx="14" fill="#FFFFFF" />
      </g>

      {/* Vibrant Green Leaf Overlapping the Cross */}
      <path
        d="M 94 135 C 92 105, 115 85, 142 75 C 138 105, 125 130, 94 135 Z"
        fill="url(#mt_leaf_grad)"
      />
      {/* Leaf center vein */}
      <path
        d="M 98 131 C 112 115, 124 98, 140 78"
        stroke="#108632"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.65"
      />

      {/* Fast Delivery Scooter & Rider with Medical Box */}
      <g transform="translate(132, 85) scale(0.48)">
        {/* Speed motion lines */}
        <line x1="-30" y1="26" x2="-8" y2="26" stroke="#4ade80" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="-38" y1="40" x2="-10" y2="40" stroke="#4ade80" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="-24" y1="54" x2="-8" y2="54" stroke="#4ade80" strokeWidth="4.5" strokeLinecap="round" />

        {/* Rider Helmet */}
        <circle cx="48" cy="8" r="11" fill="#FFFFFF" />
        
        {/* Rider Body */}
        <path d="M 44 20 L 52 38 L 40 50" stroke="#FFFFFF" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        
        {/* Medicine Box on back with Cyan + */}
        <rect x="12" y="14" width="26" height="26" rx="5" fill="#FFFFFF" />
        {/* Cyan Plus on Box */}
        <rect x="22" y="19" width="6" height="16" rx="2" fill="#0284c7" />
        <rect x="17" y="24" width="16" height="6" rx="2" fill="#0284c7" />

        {/* Scooter Chassis & Handlebars */}
        <path d="M 48 35 L 60 48 L 56 68" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M 22 55 L 42 68 L 58 68" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="round" fill="none" />
        
        {/* Front Wheel */}
        <circle cx="68" cy="74" r="12" stroke="#FFFFFF" strokeWidth="6" fill="#002776" />
        {/* Back Wheel */}
        <circle cx="20" cy="74" r="12" stroke="#FFFFFF" strokeWidth="6" fill="#002776" />
      </g>
    </svg>
  );

  // If appIcon variant (square full card preview like the uploaded logo)
  if (variant === 'appIcon') {
    return (
      <div className={`relative flex flex-col items-center text-center p-6 rounded-3xl bg-gradient-to-b from-[#0a54cf] via-[#003eaf] to-[#002060] text-white shadow-2xl border border-blue-400/30 overflow-hidden ${className}`}>
        {/* Glow behind */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-400/15 rounded-full blur-2xl pointer-events-none" />

        {/* Graphic Emblem */}
        <div className="w-28 h-28 sm:w-32 sm:h-32 mb-3">
          {SvgIcon}
        </div>

        {/* MediTrust Typography */}
        <div className="flex items-baseline justify-center font-display tracking-tight text-3xl sm:text-4xl font-black">
          <span className="text-white drop-shadow-sm">Medi</span>
          <span className="text-[#64e72f] drop-shadow-sm">Trust</span>
        </div>

        {/* Tagline */}
        <div className="text-sm font-semibold text-slate-100 mt-1 tracking-wide">
          Your Care, My Dear
        </div>

        {/* Heartbeat ECG Divider */}
        <div className="flex items-center justify-center gap-2 w-full my-3">
          <div className="h-[1.5px] bg-gradient-to-r from-transparent to-blue-200/60 flex-1" />
          <svg className="w-6 h-6 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
            <path d="M9 12h2l1 -2l2 4l1 -2h2" />
          </svg>
          <div className="h-[1.5px] bg-gradient-to-l from-transparent to-blue-200/60 flex-1" />
        </div>

        {/* Pillars / Subtitle */}
        <div className="text-[11px] text-blue-100/90 font-medium flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <span>Online Medicine Ordering</span>
          <span className="text-[#64e72f] font-bold">|</span>
          <span>Local Pharmacy Network</span>
          <span className="text-[#64e72f] font-bold">|</span>
          <span>Fast & Reliable Delivery</span>
        </div>
      </div>
    );
  }

  // Default horizontal navigation brand mark
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* App Icon Mark */}
      <div className={`${iconSizeClasses} shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        {SvgIcon}
      </div>

      {/* Brand Text Elements */}
      <div className="flex flex-col leading-tight">
        <div className={`font-display font-black tracking-tight ${titleSizes} flex items-baseline`}>
          <span className={whiteVariant ? 'text-white' : 'text-slate-900 group-hover:text-blue-950 transition-colors'}>Medi</span>
          <span className="text-[#52d929] drop-shadow-2xs">Trust</span>
        </div>

        {showTagline ? (
          <div className={`flex items-center gap-1.5 font-semibold tracking-normal text-xs ${whiteVariant ? 'text-blue-100' : 'text-blue-900'}`}>
            <span>Your Care, My Dear</span>
            <span className="text-[#52d929]">♥</span>
          </div>
        ) : (
          <span className={`text-[11px] font-medium tracking-tight ${whiteVariant ? 'text-blue-200/80' : 'text-slate-500'}`}>
            Online Medicine Platform
          </span>
        )}

        {showBadges && (
          <div className={`hidden md:flex items-center gap-1.5 text-[10px] mt-0.5 ${whiteVariant ? 'text-blue-200/70' : 'text-slate-500'}`}>
            <span>Online Medicine</span>
            <span>•</span>
            <span>Local Pharmacy Network</span>
            <span>•</span>
            <span className={whiteVariant ? 'text-[#52d929] font-medium' : 'text-emerald-700 font-medium'}>Fast Delivery</span>
          </div>
        )}
      </div>
    </div>
  );
};
