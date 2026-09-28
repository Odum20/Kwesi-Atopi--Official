import React from 'react';
import { Project } from '../types';
import { ArrowUpRight, Github, ExternalLink, ArrowUp, RotateCcw } from 'lucide-react';
import { ProjectImage } from './ProjectImage';
import { KPreloader } from './KPreloader';
import { matchesProjectTag } from '../lib/tagFilter';

interface ExperimentsSectionProps {
  experiments: Project[];
  projects?: Project[];
  selectedTag: string;
  onSelectTag: (tag: string) => void;
  loading?: boolean;
  onSelectProject: (project: Project) => void;
}

export const ExperimentsSection: React.FC<ExperimentsSectionProps> = ({
  experiments,
  projects = [],
  selectedTag,
  onSelectTag,
  loading = false,
  onSelectProject,
}) => {
  const filteredExperiments = experiments.filter((e) => matchesProjectTag(e, selectedTag));
  const matchingProjectsCount = projects.filter((p) => matchesProjectTag(p, selectedTag)).length;

  return (
    <section id="experiments" className="py-24 border-t border-neutral-900 bg-neutral-950/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 font-mono mb-2">
              <span>02 // Experimenting Prototypes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100">
              Experimenting Prototypes
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-400">
            Unfinished ideas, DSP sound toys, shader sketches, and rapid technical experiments exploring edge capabilities.
          </p>
        </div>

        {/* Experiments Grid or Section Preloader */}
        {loading ? (
          <div className="w-full py-32 rounded-3xl bg-neutral-900/40 border border-neutral-800/80 flex flex-col items-center justify-center gap-4">
            <KPreloader size={80} />
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neutral-400 animate-ping" />
              <span className="text-xs uppercase font-mono tracking-widest text-neutral-400">
                Syncing Experimenting Prototypes...
              </span>
            </div>
          </div>
        ) : filteredExperiments.length === 0 ? (
          <div className="text-center py-20 bg-neutral-900/30 rounded-2xl border border-neutral-800/80 p-8 flex flex-col items-center justify-center">
            {/* Centered K animate preloader seamless on dark & light modes */}
            <div className="flex items-center justify-center mb-4">
              <KPreloader size={64} />
            </div>

            {matchingProjectsCount > 0 ? (
              <>
                <h3 className="text-base font-semibold text-neutral-200 mb-1">
                  0 experimenting prototypes matching <span className="text-neutral-100 font-mono">"{selectedTag}"</span>
                </h3>
                <p className="text-xs text-neutral-400 font-mono mb-6 max-w-md">
                  Found {matchingProjectsCount} live product{matchingProjectsCount > 1 ? 's' : ''} in the Work section above.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      const el = document.getElementById('work');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-100 hover:bg-white text-xs font-semibold text-neutral-950 transition-colors cursor-pointer shadow-sm"
                  >
                    <span>View {matchingProjectsCount} Live Product{matchingProjectsCount > 1 ? 's' : ''} in Work</span>
                    <ArrowUp className="w-3.5 h-3.5" />
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
                  No experimenting prototypes found matching category "{selectedTag}".
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
            {filteredExperiments.map((experiment) => (
              <div
                key={experiment.id}
                onClick={() => onSelectProject(experiment)}
                className="group bg-neutral-950 border border-neutral-800/80 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[16/9] overflow-hidden bg-neutral-900">
                  <ProjectImage
                    src={experiment.image}
                    alt={experiment.title}
                    hoverZoom={true}
                    imageClassName="opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-mono text-neutral-300 border border-neutral-800 z-20 pointer-events-none">
                    Experimenting Prototype
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 mb-2 font-mono">
                      {experiment.tags.map((tag, idx) => (
                        <React.Fragment key={tag}>
                          {idx > 0 && <span className="text-neutral-600">·</span>}
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
                    </div>

                    <h3 className="text-lg font-bold text-neutral-100 mb-2 flex items-center justify-between">
                      <span>{experiment.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-neutral-100 transition-all" />
                    </h3>

                    <p className="text-sm text-neutral-400 line-clamp-2 leading-relaxed mb-6">
                      {experiment.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-900 flex items-center justify-between text-xs font-medium text-neutral-300">
                    <span className="group-hover:underline">Explore prototype</span>
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      {experiment.githubUrl && (
                        <a
                          href={experiment.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 bg-neutral-900 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-neutral-100 transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {experiment.liveUrl && (
                        <a
                          href={experiment.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 bg-neutral-900 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-neutral-100 transition-colors"
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
