import React, { useState, useEffect } from 'react';
import { KPreloader } from './KPreloader';
import { resolveAssetUrl } from '../lib/resolveAsset';

interface ProjectImageProps {
  src?: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  hoverZoom?: boolean;
}

export const ProjectImage: React.FC<ProjectImageProps> = ({
  src,
  alt,
  className = '',
  imageClassName = '',
  hoverZoom = true,
}) => {
  const resolvedSrc = resolveAssetUrl(src);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);

    if (!resolvedSrc) {
      setHasError(true);
      return;
    }

    const img = new Image();
    img.src = resolvedSrc;
    if (img.complete && img.naturalWidth > 0) {
      setIsLoaded(true);
      return;
    }

    img.onload = () => {
      setIsLoaded(true);
    };

    img.onerror = () => {
      setHasError(true);
    };
  }, [resolvedSrc]);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#0a0a0a] flex items-center justify-center ${className}`}>
      {/* Animated K-Circuit Preloader State */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0a0a0a] transition-opacity duration-500">
          <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 shadow-2xl flex flex-col items-center gap-3">
            <KPreloader size={60} isDarkMode={true} />
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-ping" />
              <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400">
                Loading Visual
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Fallback Display if image fails to load or no source */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-950 to-[#080808] p-6 text-center">
          <div className="mb-3 opacity-60">
            <KPreloader size={50} isDarkMode={true} />
          </div>
          <div className="text-xs font-mono text-neutral-400 tracking-wider uppercase mb-1">
            {alt}
          </div>
          <div className="text-[10px] font-mono text-neutral-600">
            Digital Workspace Asset
          </div>
        </div>
      )}

      {/* Actual Rendered Image */}
      {resolvedSrc && !hasError && (
        <img
          src={resolvedSrc}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 scale-100 filter-none' : 'opacity-0 scale-[1.03] blur-sm'
          } ${hoverZoom ? 'group-hover:scale-105' : ''} ${imageClassName}`}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
};
