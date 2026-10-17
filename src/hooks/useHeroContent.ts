import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { HeroContent } from '../types';

export const DEFAULT_HERO_CONTENT: HeroContent = {
  tagline: 'I build things.',
  description: 'Projects, experiments, and production-grade systems. Crafting high-performance software, distributed pipelines, and immersive digital interfaces from Kumasi, Ghana.',
  badge: 'Digital Workspace & Engineering Portfolio',
};

function cleanObject<T extends Record<string, any>>(obj: T): T {
  const cleaned: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

export function useHeroContent() {
  const [heroContent, setHeroContent] = useState<HeroContent>(DEFAULT_HERO_CONTENT);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const heroDocRef = doc(db, 'settings', 'hero');

    const unsubscribe = onSnapshot(
      heroDocRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          setHeroContent({
            tagline: typeof data.tagline === 'string' && data.tagline.trim() ? data.tagline : DEFAULT_HERO_CONTENT.tagline,
            description: typeof data.description === 'string' && data.description.trim() ? data.description : DEFAULT_HERO_CONTENT.description,
            badge: typeof data.badge === 'string' && data.badge.trim() ? data.badge : DEFAULT_HERO_CONTENT.badge,
            updatedAt: data.updatedAt,
          });
          setError(null);
        } else {
          // If no custom doc yet, use defaults
          setHeroContent(DEFAULT_HERO_CONTENT);
        }
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching hero content from Firestore:', err);
        setError(err.message || 'Failed to sync hero content');
        // Fall back gracefully to defaults
        setHeroContent(DEFAULT_HERO_CONTENT);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const updateHeroContent = async (newContent: Partial<HeroContent>) => {
    const heroDocRef = doc(db, 'settings', 'hero');
    const merged: HeroContent = {
      tagline: (newContent.tagline ?? heroContent.tagline).trim() || DEFAULT_HERO_CONTENT.tagline,
      description: (newContent.description ?? heroContent.description).trim() || DEFAULT_HERO_CONTENT.description,
      badge: (newContent.badge ?? heroContent.badge ?? DEFAULT_HERO_CONTENT.badge ?? '').trim(),
      updatedAt: new Date().toISOString(),
    };

    await setDoc(heroDocRef, cleanObject(merged));
    setHeroContent(merged);
  };

  const resetHeroContent = async () => {
    const heroDocRef = doc(db, 'settings', 'hero');
    const resetData: HeroContent = {
      ...DEFAULT_HERO_CONTENT,
      updatedAt: new Date().toISOString(),
    };
    await setDoc(heroDocRef, cleanObject(resetData));
    setHeroContent(resetData);
  };

  return { heroContent, loading, error, updateHeroContent, resetHeroContent };
}
