import { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
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

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [experiments, setExperiments] = useState<Project[]>(experimentsData);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'projects'), (snapshot) => {
      if (!snapshot.empty) {
        const remoteProjects: Project[] = [];
        const remoteExperiments: Project[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data() as Project;
          const proj = { ...data, id: docSnap.id };
          if (proj.id === 'environmental-intelligence') {
            if (!proj.tags.includes('Sat intel') || !proj.tags.includes('GIS')) {
              proj.tags = ['GIS', 'Sat intel'];
              setDoc(doc(db, 'projects', proj.id), { tags: ['GIS', 'Sat intel'] }, { merge: true });
            }
          }
          if (proj.isExperiment) {
            remoteExperiments.push(proj);
          } else {
            remoteProjects.push(proj);
          }
        });
        if (remoteProjects.length > 0) setProjects(remoteProjects);
        if (remoteExperiments.length > 0) setExperiments(remoteExperiments);
      } else {
        // Seed initial data if empty
        [...projectsData, ...experimentsData].forEach(async (p) => {
          await setDoc(doc(db, 'projects', p.id), cleanObject(p));
        });
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching projects from Firestore:", error);
      setLoading(false);
    });

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

  return { projects, experiments, loading, addProject, updateProject, removeProject };
}
