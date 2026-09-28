import React from 'react';
import { Project } from '../types';
import { ArrowUpRight, Github, ExternalLink, FlaskConical } from 'lucide-react';
import { ProjectImage } from './ProjectImage';

interface ExperimentsSectionProps {
  experiments: Project[];
  onSelectProject: (project: Project) => void;
}

export const ExperimentsSection: React.FC<ExperimentsSectionProps> = ({ experiments, onSelectProject }) => {
  return (
    <section id="experiments" className="py-24 border-t border-neutral-900 bg-neutral-950/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 font-mono mb-2">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>02 // Laboratory</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100">
              Experiments & Prototypes
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-400">
            Unfinished ideas, DSP sound toys, shader sketches, and rapid technical experiments exploring edge capabilities.
          </p>
        </div>

        {/* Experiments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiments.map((experiment) => (
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
                  Experiment
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2 font-mono">
                    <span>{experiment.tags.join(' · ')}</span>
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
      </div>
    </section>
  );
};
