import { useState } from 'react';

interface Props {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export default function Image({ src, alt, className = '', loading = 'lazy' }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-ink-100 via-ink-50 to-ink-100 bg-[length:1000px_100%]" />
      )}
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-ink-100 text-ink-400">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 16l5-5 5 5M14 11l2-2 5 5" />
            <circle cx="9" cy="9" r="1.5" fill="currentColor" />
          </svg>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`h-full w-full object-cover transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
}
