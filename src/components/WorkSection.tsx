import React from 'react';
import { Project } from '../types';
import { ArrowUpRight, Github, ExternalLink, ArrowDown, RotateCcw } from 'lucide-react';
import { ProjectImage } from './ProjectImage';
import { KPreloader } from './KPreloader';
import { matchesProjectTag } from '../lib/tagFilter';

interface WorkSectionProps {
  projects: Project[];
  experiments?: Project[];
  selectedTag: string;
  onSelectTag: (tag: string) => void;
  loading?: boolean;
  onSelectProject: (project: Project) => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({
  projects,
  experiments = [],
  selectedTag,
  onSelectTag,
  loading = false,
  onSelectProject,
}) => {
  // Ensure primary domains are present, plus unique tags from both projects and experiments
  const baseTags = ['All', 'SYSTEMS', 'FINTECH', 'GIS', 'Sat intel'];
  const allItemTags = Array.from(
    new Set([...projects, ...experiments].flatMap((p) => p.tags || []))
  ).filter(
    (tag) => tag.toUpperCase() !== 'FEATURED' && !baseTags.some((b) => b.toLowerCase() === tag.toLowerCase())
  );
  const allTags = [...baseTags, ...allItemTags];

  const filteredProjects = projects.filter((p) => matchesProjectTag(p, selectedTag));
  const matchingExperimentsCount = experiments.filter((e) => matchesProjectTag(e, selectedTag)).length;

  return (
    <section id="work" className="py-24 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-neutral-500 font-mono mb-2">01 // Portfolio</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100">
              Work
            </h2>
          </div>

          {/* Interactive Filter Controls */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => onSelectTag(tag)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-neutral-100 text-neutral-950 shadow-sm'
                    : 'bg-neutral-900 text-neutral-400 hover:text-neutral-100 border border-neutral-800'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid or Section Preloader */}
        {loading ? (
          <div className="w-full py-32 rounded-3xl bg-neutral-900/40 border border-neutral-800/80 flex flex-col items-center justify-center gap-4">
            <KPreloader size={80} />
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neutral-400 animate-ping" />
              <span className="text-xs uppercase font-mono tracking-widest text-neutral-400">
                Syncing Live Products...
              </span>
            </div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-neutral-900/30 rounded-2xl border border-neutral-800/80 p-8 flex flex-col items-center justify-center">
            {/* Centered K animate preloader seamless on dark & light modes */}
            <div className="flex items-center justify-center mb-4">
              <KPreloader size={64} />
            </div>

            {matchingExperimentsCount > 0 ? (
              <>
                <h3 className="text-base font-semibold text-neutral-200 mb-1">
                  0 live products for <span className="text-neutral-100 font-mono">"{selectedTag}"</span>
                </h3>
                <p className="text-xs text-neutral-400 font-mono mb-6 max-w-md">
                  Found {matchingExperimentsCount} experimenting prototype{matchingExperimentsCount > 1 ? 's' : ''} under active development.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      const el = document.getElementById('experiments');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-100 hover:bg-white text-xs font-semibold text-neutral-950 transition-colors cursor-pointer shadow-sm"
                  >
                    <span>View {matchingExperimentsCount} Experimenting Prototype{matchingExperimentsCount > 1 ? 's' : ''}</span>
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onSelectTag('All')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-xs font-mono text-neutral-400 hover:text-neutral-200 border border-neutral-800 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Filter</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm font-mono text-neutral-400 mb-4">
                  No live products found matching category "{selectedTag}".
                </p>
                <button
                  onClick={() => onSelectTag('All')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-xs font-mono text-neutral-300 border border-neutral-800 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to All</span>
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group bg-neutral-900/60 border border-neutral-800/80 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Thumbnail Container with Image Zoom */}
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-950">
                  <ProjectImage
                    src={project.image}
                    alt={project.title}
                    hoverZoom={true}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />

                  {/* Floating Year badge / Quick Action */}
                  <div className="absolute top-4 right-4 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-mono text-neutral-300 border border-neutral-800 pointer-events-none z-20">
                    {project.year}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Zero-Pill Metadata with typographic separators and clickable tag filtering */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 mb-3 font-mono">
                      {project.tags.map((tag, idx) => (
                        <React.Fragment key={tag}>
                          {idx > 0 && <span className="text-neutral-600">/</span>}
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectTag(tag);
                            }}
                            className="hover:text-neutral-200 transition-colors"
                          >
                            {tag}
                          </span>
                        </React.Fragment>
                      ))}
                      <span aria-hidden="true" className="text-neutral-600">·</span>
                      <span className="text-neutral-500">{project.role}</span>
                    </div>

                    <h3 className="text-xl font-bold text-neutral-100 mb-2 flex items-center justify-between">
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-neutral-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </h3>

                    <p className="text-sm text-neutral-400 line-clamp-2 leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  {/* Card footer links */}
                  <div className="pt-4 border-t border-neutral-800/60 flex items-center justify-between text-xs font-medium text-neutral-300">
                    <span className="group-hover:underline flex items-center gap-1">
                      <span>View project</span>
                    </span>

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-neutral-300 hover:text-neutral-100 transition-colors"
                          title="GitHub Repository"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-neutral-300 hover:text-neutral-100 transition-colors"
                          title="Live Preview"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
