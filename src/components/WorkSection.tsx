import React, { useState } from 'react';
import { Project } from '../types';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { ProjectImage } from './ProjectImage';

interface WorkSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ projects, onSelectProject }) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');

  // Ensure GIS and Sat intel are present among the filter buttons, excluding any 'FEATURED' tag
  const baseTags = ['All', 'SYSTEMS', 'FINTECH', 'GIS', 'Sat intel'];
  const projectTags = Array.from(new Set(projects.flatMap(p => p.tags))).filter(
    tag => tag.toUpperCase() !== 'FEATURED' && !baseTags.some(b => b.toLowerCase() === tag.toLowerCase())
  );
  const allTags = [...baseTags, ...projectTags];

  const filteredProjects = selectedTag === 'All' 
    ? projects 
    : projects.filter(p => 
        p.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase()) ||
        (selectedTag.toLowerCase() === 'sat intel' && (
          p.tags.some(t => t.toLowerCase().includes('sat')) ||
          p.title.toLowerCase().includes('environmental') ||
          p.subtitle.toLowerCase().includes('satellite') ||
          p.description.toLowerCase().includes('satellite')
        )) ||
        (selectedTag.toLowerCase() === 'gis' && (
          p.tags.some(t => t.toLowerCase() === 'gis') ||
          p.description.toLowerCase().includes('geospatial') ||
          p.title.toLowerCase().includes('environmental')
        ))
      );

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

          {/* Interactive Filter Controls (Functional buttons per design skill) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${selectedTag === tag ? 'bg-neutral-100 text-neutral-950 shadow-sm' : 'bg-neutral-900 text-neutral-400 hover:text-neutral-100 border border-neutral-800'}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
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
                  {/* Zero-Pill Metadata with typographic separators */}
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mb-3 font-mono">
                    <span>{project.tags.join(' / ')}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.role}</span>
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
                    <span>View project case study</span>
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
      </div>
    </section>
  );
};
