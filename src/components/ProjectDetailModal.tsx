import React, { useEffect } from 'react';
import { Project } from '../types';
import { X, Github, ExternalLink } from 'lucide-react';
import { ProjectImage } from './ProjectImage';
import { HybridMedia } from './HybridMedia';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const targetVisitUrl = project.liveUrl || project.githubUrl;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/80 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl my-auto max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800/80 bg-neutral-950/70 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            {project.tags && project.tags.length > 0 && (
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-neutral-800 text-neutral-300 border border-neutral-700/50">
                {project.tags.join(' / ')}
              </span>
            )}
            {project.year && (
              <span className="text-xs text-neutral-400 font-mono">
                {project.year}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Main Visual / Video Hybrid Motion Container */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-inner group">
            <HybridMedia
              src={project.image}
              videoUrl={project.videoUrl}
              alt={project.title}
              mode="modal"
            />

            {/* Quick Visit Site Pill button floating at top right if link exists */}
            {targetVisitUrl && (
              <a
                href={targetVisitUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="absolute top-3 right-3 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-950/80 hover:bg-neutral-900 border border-neutral-700/80 text-xs font-medium text-neutral-200 backdrop-blur-md shadow-lg transition-all hover:scale-105 cursor-pointer"
                title={project.liveUrl ? "Visit Live Site" : "View Code on GitHub"}
              >
                <span>{project.liveUrl ? 'Visit Site' : 'View Code'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Title & Subtitle */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-100 mb-2">
              {project.title}
            </h2>
            {project.subtitle && project.subtitle !== project.title && (
              <p className="text-base text-neutral-400 font-medium leading-relaxed">
                {project.subtitle}
              </p>
            )}
          </div>

          {/* Full Description */}
          {project.description && (
            <div className="pt-2">
              <h3 className="text-xs uppercase tracking-wider text-neutral-500 font-mono mb-2">
                Overview & Details
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </div>
          )}

          {/* Possible GitHub and Visit Link Icons Below */}
          {(project.liveUrl || project.githubUrl) && (
            <div className="pt-6 border-t border-neutral-800/80 flex flex-wrap items-center justify-end gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-sm font-medium transition-colors border border-neutral-700/60 shadow-sm"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-100 hover:opacity-90 text-neutral-950 text-sm font-medium transition-opacity shadow-sm"
                >
                  <span>Visit Link</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

