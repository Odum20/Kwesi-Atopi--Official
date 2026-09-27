import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WorkSection } from './components/WorkSection';
import { ExperimentsSection } from './components/ExperimentsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { AdminModal } from './components/AdminModal';
import { useProjects } from './hooks/useProjects';
import { Project } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('work');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  const { projects, experiments, addProject, updateProject, removeProject } = useProjects();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setIsAdminOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-neutral-800 selection:text-neutral-100">
      {/* Sticky Navigation */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Content */}
      <main className="flex-1">
        <Hero
          onExploreWork={() => handleNavigate('work')}
          onContact={() => handleNavigate('contact')}
        />

        <WorkSection
          projects={projects}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        <ExperimentsSection
          experiments={experiments}
          onSelectProject={(exp) => setSelectedProject(exp)}
        />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Admin Dashboard & Cloud Publisher Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        projects={projects}
        experiments={experiments}
        onAddProject={addProject}
        onUpdateProject={updateProject}
        onDeleteProject={removeProject}
      />
    </div>
  );
}
