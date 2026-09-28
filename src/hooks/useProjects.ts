import { useState, useEffect } from 'react';
import { collection, onSnapshot, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Project } from '../types';
import { projectsData, experimentsData } from '../data/projects';

function cleanObject<T extends Record<string, any>>(obj: T): T {
  const cleaned: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

function normalizeProject(id: string, data: any): Project {
  const tags = Array.isArray(data.tags)
    ? data.tags.filter(Boolean)
    : typeof data.tags === 'string'
    ? [data.tags]
    : [];

  const technologies = Array.isArray(data.technologies)
    ? data.technologies.filter(Boolean)
    : typeof data.technologies === 'string'
    ? [data.technologies]
    : ['TypeScript', 'React'];

  const image = data.image || '';
  const screenshots = Array.isArray(data.screenshots) && data.screenshots.length > 0
    ? data.screenshots
    : image
    ? [image]
    : [];

  return {
    id,
    title: data.title || 'Untitled Project',
    subtitle: data.subtitle || data.title || '',
    description: data.description || '',
    image,
    tags: tags.length > 0 ? tags : ['SYSTEMS'],
    year: data.year ? String(data.year) : '2026',
    role: data.role || 'Lead Software Engineer',
    technologies,
    problem: data.problem || '',
    process: data.process || '',
    result: data.result || '',
    liveUrl: data.liveUrl?.trim() || undefined,
    githubUrl: data.githubUrl?.trim() || undefined,
    screenshots,
    isExperiment: Boolean(data.isExperiment)
  };
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [experiments, setExperiments] = useState<Project[]>(experimentsData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'projects'),
      (snapshot) => {
        if (!snapshot.empty) {
          const allItems: Project[] = [];
          snapshot.forEach((docSnap) => {
            allItems.push(normalizeProject(docSnap.id, docSnap.data()));
          });

          // Sort so custom user-added projects (proj-*) appear at top, followed by default works
          allItems.sort((a, b) => {
            const aTime = a.id.startsWith('proj-') ? parseInt(a.id.replace('proj-', ''), 10) : 0;
            const bTime = b.id.startsWith('proj-') ? parseInt(b.id.replace('proj-', ''), 10) : 0;
            if (aTime && bTime) return bTime - aTime;
            if (aTime) return -1;
            if (bTime) return 1;
            return 0;
          });

          const remoteProjects = allItems.filter((p) => !p.isExperiment);
          const remoteExperiments = allItems.filter((p) => p.isExperiment);

          setProjects(remoteProjects);
          setExperiments(remoteExperiments);
          setError(null);
        } else {
          // Seed initial data if Firestore is fresh and empty
          [...projectsData, ...experimentsData].forEach(async (p) => {
            await setDoc(doc(db, 'projects', p.id), cleanObject(p));
          });
        }
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching projects from Firestore:', err);
        setError(err.message || 'Failed to connect to Firestore');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const addProject = async (projectData: Omit<Project, 'id'>) => {
    const id = 'proj-' + Date.now();
    const newProj: Project = { ...projectData, id };
    await setDoc(doc(db, 'projects', id), cleanObject(newProj));
  };

  const updateProject = async (id: string, projectData: Omit<Project, 'id'>) => {
    const updatedProj: Project = { ...projectData, id };
    await setDoc(doc(db, 'projects', id), cleanObject(updatedProj));
  };

  const removeProject = async (id: string) => {
    await deleteDoc(doc(db, 'projects', id));
  };

  return { projects, experiments, loading, error, addProject, updateProject, removeProject };
}

