import React, { useState, useEffect } from 'react';
import { Lock, X } from 'lucide-react';
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
  const [isAdminButtonVisible, setIsAdminButtonVisible] = useState<boolean>(false);

  const { projects, experiments, addProject, updateProject, removeProject } = useProjects();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret key combination: Ctrl + Alt + A (or Cmd + Alt + A on Mac)
      if ((e.ctrlKey || e.metaKey) && e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setIsAdminButtonVisible((prev) => !prev);
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
    <div className="relative min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-neutral-800 selection:text-neutral-100 transition-colors duration-250">
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

      {/* Footer - completely clean, normal users see zero admin controls */}
      <Footer />

      {/* Secret Admin Padlock Button (Only reveals after Ctrl + Alt + A) */}
      {isAdminButtonVisible && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-700/80 rounded-full shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200">
          <button
            onClick={() => setIsAdminOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-100 text-xs font-mono font-medium transition-colors cursor-pointer shadow-sm group"
            title="Open Admin Dashboard"
          >
            <Lock className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>Admin</span>
          </button>
          <button
            onClick={() => setIsAdminButtonVisible(false)}
            className="p-1.5 text-neutral-400 hover:text-neutral-200 rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Hide Admin button"
            aria-label="Hide Admin"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

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
