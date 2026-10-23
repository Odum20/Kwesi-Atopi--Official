import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Film, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { ProjectImage } from './ProjectImage';
import { resolveAssetUrl } from '../lib/resolveAsset';

interface HybridMediaProps {
  src?: string;
  videoUrl?: string;
  alt: string;
  mode?: 'card' | 'modal';
  hoverZoom?: boolean;
  className?: string;
  imageClassName?: string;
}

export function getYouTubeId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/i);
  return match ? match[1] : null;
}

export const HybridMedia: React.FC<HybridMediaProps> = ({
  src,
  videoUrl,
  alt,
  mode = 'card',
  hoverZoom = true,
  className = '',
  imageClassName = '',
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  // Default to muted for guaranteed smooth autoplay across modern browser policies
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [videoError, setVideoError] = useState<boolean>(false);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const [showCenterIcon, setShowCenterIcon] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const resolvedVideoUrl = videoUrl ? resolveAssetUrl(videoUrl) : undefined;
  const youtubeId = getYouTubeId(resolvedVideoUrl);
  const isYouTube = Boolean(youtubeId);

  // 1. PAGE VISIBILITY CONTROLLER: Pause media immediately when screen is hidden/collapsed
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // 2. MODAL MODE AUTOPLAY CONTROLLER: Plays smoothly when opened/viewed
  useEffect(() => {
    if (mode !== 'modal' || !resolvedVideoUrl || isYouTube || videoError) return;

    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          // If unmuted playback was restricted by browser, mute and play smoothly
          video.muted = true;
          setIsMuted(true);
          video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
        });
    }

    return () => {
      video.pause();
      setIsPlaying(false);
    };
  }, [mode, resolvedVideoUrl, isYouTube, videoError]);

  // 3. CARD MODE HOVER CONTROLLER: Instant responsive hover with zero desync
  useEffect(() => {
    if (mode !== 'card' || !resolvedVideoUrl || isYouTube || videoError) return;

    const video = videoRef.current;
    if (!video) return;

    let isCancelled = false;

    if (isHovered) {
      video.muted = true;
      const playVideo = () => {
        if (isCancelled || !videoRef.current) return;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              if (!isCancelled) setIsPlaying(true);
            })
            .catch((err) => {
              if (err.name !== 'AbortError') {
                setIsPlaying(false);
              }
            });
        }
      };

      if (video.readyState >= 2) {
        playVideo();
      } else {
        const onCanPlay = () => {
          playVideo();
          video.removeEventListener('canplay', onCanPlay);
        };
        video.addEventListener('canplay', onCanPlay);
        return () => {
          isCancelled = true;
          video.removeEventListener('canplay', onCanPlay);
        };
      }
    } else {
      isCancelled = true;
      video.pause();
      video.currentTime = 0;
      setIsPlaying(false);
    }

    return () => {
      isCancelled = true;
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [isHovered, mode, resolvedVideoUrl, isYouTube, videoError]);

  // Handle progress updates for modal mode
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 1;
    setCurrentTime(current);
    setProgress((current / total) * 100);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || 0);
  };

  const toggleModalPlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => {
        setIsPlaying(true);
        triggerCenterIconPulse();
      }).catch(() => setIsPlaying(false));
    } else {
      video.pause();
      setIsPlaying(false);
      triggerCenterIconPulse();
    }
  };

  const triggerCenterIconPulse = () => {
    setShowCenterIcon(true);
    setTimeout(() => {
      setShowCenterIcon(false);
    }, 600);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * duration;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // CARD MODE
  if (mode === 'card') {
    return (
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        className={`relative w-full h-full overflow-hidden bg-neutral-950 select-none ${className}`}
      >
        {/* Base Poster Image */}
        <ProjectImage
          src={src || (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : undefined)}
          alt={alt}
          hoverZoom={hoverZoom}
          imageClassName={imageClassName}
        />

        {/* Video Overlay on Hover: Reveals smoothly as soon as hovered */}
        {resolvedVideoUrl && !isYouTube && !videoError && (
          <video
            ref={videoRef}
            src={resolvedVideoUrl}
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setVideoError(true)}
            className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-300 ease-in-out ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Motion / YouTube Indicator Badge */}
        {resolvedVideoUrl && (
          <div
            className={`absolute bottom-2.5 right-2.5 z-20 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-neutral-950/80 border border-neutral-800 text-[10px] font-mono text-neutral-300 backdrop-blur-md pointer-events-none transition-all duration-200 ${
              isHovered ? 'opacity-0 scale-95' : 'opacity-85 scale-100'
            }`}
          >
            {isYouTube ? (
              <>
                <Film className="w-2.5 h-2.5 text-red-400" />
                <span>YouTube Demo</span>
              </>
            ) : (
              <>
                <Film className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
                <span>Motion Preview</span>
              </>
            )}
          </div>
        )}
      </div>
    );
  }

  // MODAL (EXPANDED) MODE: YOUTUBE EMBED
  if (isYouTube && youtubeId) {
    return (
      <div className={`relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-neutral-800 shadow-2xl ${className}`}>
        {/* Added mute=1 and playsinline=1 to guarantee seamless autoplay when opened */}
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1`}
          title={alt}
          className="w-full h-full border-0 rounded-2xl"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />

        {/* YouTube Watch Link */}
        <a
          href={resolvedVideoUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="absolute top-3 left-3 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-950/85 hover:bg-neutral-900 border border-neutral-700/80 text-xs font-medium text-neutral-200 backdrop-blur-md shadow-lg transition-all hover:scale-105 cursor-pointer"
          title="Watch standalone on YouTube"
        >
          <Film className="w-3.5 h-3.5 text-red-500" />
          <span>Watch on YouTube</span>
          <ExternalLink className="w-3 h-3 text-neutral-400" />
        </a>
      </div>
    );
  }

  // MODAL (EXPANDED) MODE: DIRECT HTML5 VIDEO OR FALLBACK
  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden rounded-2xl bg-neutral-950 border border-neutral-800 shadow-2xl group select-none ${className}`}
      onClick={resolvedVideoUrl && !videoError ? toggleModalPlayPause : undefined}
    >
      {resolvedVideoUrl && !videoError ? (
        <div className="relative w-full h-full flex items-center justify-center bg-black">
          <video
            ref={videoRef}
            src={resolvedVideoUrl}
            poster={src ? resolveAssetUrl(src) : undefined}
            playsInline
            autoPlay
            muted={isMuted}
            loop
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onWaiting={() => setIsBuffering(true)}
            onPlaying={() => {
              setIsPlaying(true);
              setIsBuffering(false);
            }}
            onPause={() => setIsPlaying(false)}
            onError={() => {
              setVideoError(true);
              setIsBuffering(false);
            }}
            className="w-full h-full object-contain max-h-[60vh] cursor-pointer"
          />

          {/* Top-Left Always-Visible Standalone Tab Button */}
          <a
            href={resolvedVideoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute top-3 left-3 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-950/85 hover:bg-neutral-900 border border-neutral-700/80 text-xs font-medium text-neutral-200 backdrop-blur-md shadow-lg transition-all hover:scale-105 cursor-pointer"
            title="Open video standalone in new tab"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
            <span>Watch Standalone</span>
          </a>

          {/* Buffering Indicator */}
          {isBuffering && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-xs pointer-events-none z-15">
              <Loader2 className="w-10 h-10 text-emerald-400 animate-spin mb-2" />
              <span className="text-xs font-mono text-neutral-300">Buffering Stream...</span>
            </div>
          )}

          {/* Central Play/Pause Button Overlay */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-all duration-300 z-10 ${
              !isPlaying || showCenterIcon ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-neutral-950/85 border border-neutral-700/80 text-white flex items-center justify-center backdrop-blur-md shadow-2xl transition-transform duration-200 pointer-events-auto cursor-pointer hover:scale-105 active:scale-95">
              {isPlaying ? (
                <Pause className="w-7 h-7 sm:w-8 sm:h-8 text-neutral-100 fill-neutral-100" />
              ) : (
                <Play className="w-7 h-7 sm:w-8 sm:h-8 text-neutral-100 fill-neutral-100 ml-1" />
              )}
            </div>

            {/* Standalone Link Hint under pause button */}
            {!isPlaying && (
              <a
                href={resolvedVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="mt-3 px-3.5 py-1.5 rounded-full bg-neutral-950/90 border border-neutral-700/80 text-[11px] font-mono text-neutral-300 hover:text-white pointer-events-auto hover:border-neutral-500 transition-colors flex items-center gap-1.5 shadow-lg"
              >
                <span>Trouble playing? Click to watch standalone</span>
                <ExternalLink className="w-3 h-3 text-emerald-400" />
              </a>
            )}
          </div>

          {/* Bottom Floating Video Control Bar */}
          <div
            className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 flex flex-col gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Interactive Progress Scrub Bar */}
            <div
              onClick={handleSeek}
              className="w-full h-1.5 bg-neutral-800 hover:h-2.5 rounded-full cursor-pointer relative transition-all"
            >
              <div
                className="h-full bg-emerald-500 rounded-full relative"
                style={{ width: `${progress}%` }}
              >
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100" />
              </div>
            </div>

            {/* Controls row */}
            <div className="flex items-center justify-between text-xs font-mono text-neutral-300">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleModalPlayPause}
                  className="p-1 hover:text-white transition-colors cursor-pointer"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                <span>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-1 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                  title={isMuted ? "Unmute Sound" : "Mute Sound"}
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-4 h-4 text-amber-400" />
                      <span className="text-[10px] text-amber-300 font-medium">Unmute</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-[10px] text-emerald-400 font-medium">Sound On</span>
                    </>
                  )}
                </button>

                {/* Standalone Action in bottom bar */}
                <a
                  href={resolvedVideoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                  title="Open video standalone in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Standalone</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : resolvedVideoUrl && videoError ? (
        /* Fallback Card if video fails to decode */
        <div className="relative w-full h-full min-h-[320px] flex flex-col items-center justify-center bg-neutral-950 p-6 text-center border border-neutral-800 rounded-2xl">
          <AlertCircle className="w-10 h-10 text-amber-400 mb-3" />
          <h4 className="text-base font-semibold text-neutral-200 mb-1">In-App Playback Restricted</h4>
          <p className="text-xs text-neutral-400 max-w-sm mb-5 leading-relaxed">
            The video host cannot stream inside this container, but it can play natively on a dedicated standalone page.
          </p>
          <a
            href={resolvedVideoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-100 text-neutral-950 text-xs font-semibold hover:opacity-90 transition-opacity shadow-md"
          >
            <span>Watch Video Standalone</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      ) : (
        <ProjectImage
          src={src}
          alt={alt}
          hoverZoom={false}
          imageClassName={imageClassName}
        />
      )}
    </div>
  );
};
