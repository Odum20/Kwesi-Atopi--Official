import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Maximize2, Film } from 'lucide-react';
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
  const [isMuted, setIsMuted] = useState<boolean>(mode === 'card');
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<boolean>(false);
  const [showCenterIcon, setShowCenterIcon] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const resolvedVideoUrl = videoUrl ? resolveAssetUrl(videoUrl) : undefined;

  // Handle card mode hover / touch motion
  useEffect(() => {
    if (mode !== 'card' || !resolvedVideoUrl || videoError) return;

    const video = videoRef.current;
    if (!video) return;

    if (isHovered) {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay policy or video decoding fallback
            setIsPlaying(false);
          });
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isHovered, mode, resolvedVideoUrl, videoError]);

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
    setIsVideoLoaded(true);
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
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
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
          src={src}
          alt={alt}
          hoverZoom={hoverZoom}
          imageClassName={imageClassName}
        />

        {/* Video Overlay on Hover */}
        {resolvedVideoUrl && !videoError && (
          <>
            <video
              ref={videoRef}
              src={resolvedVideoUrl}
              muted
              loop
              playsInline
              preload="metadata"
              onError={() => setVideoError(true)}
              className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-300 ease-in-out ${
                isHovered && isPlaying ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Small Motion Indicator Badge */}
            <div
              className={`absolute bottom-2.5 right-2.5 z-20 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-neutral-950/80 border border-neutral-800 text-[10px] font-mono text-neutral-300 backdrop-blur-md pointer-events-none transition-all duration-200 ${
                isHovered ? 'opacity-0 scale-95' : 'opacity-85 scale-100'
              }`}
            >
              <Film className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
              <span>Motion Preview</span>
            </div>
          </>
        )}
      </div>
    );
  }

  // MODAL (EXPANDED) MODE
  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden rounded-2xl bg-neutral-950 border border-neutral-800 shadow-2xl group select-none ${className}`}
      onClick={resolvedVideoUrl ? toggleModalPlayPause : undefined}
    >
      {resolvedVideoUrl && !videoError ? (
        <div className="relative w-full h-full flex items-center justify-center bg-black">
          <video
            ref={videoRef}
            src={resolvedVideoUrl}
            poster={src ? resolveAssetUrl(src) : undefined}
            playsInline
            muted={isMuted}
            loop
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={() => setVideoError(true)}
            className="w-full h-full object-contain max-h-[60vh] cursor-pointer"
          />

          {/* Central Play/Pause Button Overlay (User-requested: "if maximised there is a pause button right in the middle") */}
          <div
            className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ${
              !isPlaying || showCenterIcon ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-neutral-950/80 border border-neutral-700/80 text-white flex items-center justify-center backdrop-blur-md shadow-2xl transition-transform duration-200 pointer-events-auto cursor-pointer hover:scale-105 active:scale-95">
              {isPlaying ? (
                <Pause className="w-7 h-7 sm:w-8 sm:h-8 text-neutral-100 fill-neutral-100" />
              ) : (
                <Play className="w-7 h-7 sm:w-8 sm:h-8 text-neutral-100 fill-neutral-100 ml-1" />
              )}
            </div>
          </div>

          {/* Bottom Floating Video Control Bar */}
          <div
            className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 flex flex-col gap-2"
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
                  className="p-1 hover:text-white transition-colors cursor-pointer"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-neutral-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                </button>
              </div>
            </div>
          </div>
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
