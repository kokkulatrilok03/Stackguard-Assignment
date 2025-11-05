import { useState } from 'react';

export default function Logo({ className = '', src, size = 'lg' }) {
  const [useFallback, setUseFallback] = useState(false);
  const primarySrc =
    src || 'https://i.ibb.co/kgx416h1/Screenshot-2025-11-05-132645.png';
  const fallbackSrc = '/stackguard-logo.png';
  const sizeMap = { sm: 'h-6 w-6 text-base', md: 'h-7 w-7 text-lg', lg: 'h-8 w-8 text-xl', xl: 'h-9 w-9 text-2xl' };
  const sizeClasses = sizeMap[size] || sizeMap.lg;
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src={useFallback ? fallbackSrc : primarySrc}
        alt="Stackguard logo"
        className={`${sizeClasses.split(' ')[0]} ${sizeClasses.split(' ')[1]} rounded`}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        onError={() => setUseFallback(true)}
      />
      <div className={`${sizeClasses.split(' ')[2]} font-semibold`}>Stackguard</div>
    </div>
  );
}


