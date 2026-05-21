import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { icon: 'h-8 w-8 text-sm', text: 'text-lg' },
  md: { icon: 'h-10 w-10 text-base', text: 'text-xl' },
  lg: { icon: 'h-14 w-14 text-xl', text: 'text-3xl' },
};

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const s = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div
        className={`flex shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-brand-400 to-brand-600 font-bold text-surface-950 shadow-soft ${s.icon}`}
        aria-hidden
      >
        C
      </div>
      {showText && (
        <span className={`font-bold tracking-tight text-surface-900 ${s.text}`}>CHATCHAT</span>
      )}
    </div>
  );
};

export default Logo;
