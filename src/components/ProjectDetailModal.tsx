import React, { useEffect } from 'react';
import { Project } from '../types';
import { X, Github, ExternalLink } from 'lucide-react';
import { ProjectImage } from './ProjectImage';

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
          {/* Clear Picture / Thumbnail with Visit Link on Hover */}
          {targetVisitUrl ? (
            <a
              href={targetVisitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-inner cursor-pointer"
              title={project.liveUrl ? "Visit Live Site" : "View on GitHub"}
            >
              <ProjectImage
                src={project.image}
                alt={project.title}
                hoverZoom={true}
              />

              {/* Hover overlay with visit link icon */}
              <div className="absolute inset-0 bg-neutral-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-10">
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-neutral-950 text-sm font-semibold shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <ExternalLink className="w-4 h-4" />
                  <span>{project.liveUrl ? 'Visit Site' : 'View Code'}</span>
                </div>
              </div>

              {/* Small top-right indicator */}
              <div className="absolute top-3 right-3 p-2 rounded-lg bg-neutral-950/70 backdrop-blur-md border border-neutral-700/60 text-neutral-300 opacity-90 group-hover:opacity-0 transition-opacity z-10">
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>
          ) : (
            <div className="aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-inner">
              <ProjectImage
                src={project.image}
                alt={project.title}
                hoverZoom={false}
              />
            </div>
          )}

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

