import { Project } from '../types';

/**
 * Shared tag matcher for both production projects and laboratory experiments.
 */
export function matchesProjectTag(project: Project, tag: string): boolean {
  if (!tag || tag === 'All') return true;
  const tagLower = tag.toLowerCase().trim();

  // 1. Check direct tag array
  if (project.tags && project.tags.some(t => t.toLowerCase().trim() === tagLower)) {
    return true;
  }

  // 2. Semantic matching for Satellite Intelligence
  if (tagLower === 'sat intel' || tagLower === 'satellite') {
    return (
      Boolean(project.tags?.some(t => t.toLowerCase().includes('sat'))) ||
      project.title.toLowerCase().includes('satellite') ||
      project.subtitle.toLowerCase().includes('satellite') ||
      project.description.toLowerCase().includes('satellite') ||
      project.title.toLowerCase().includes('environmental')
    );
  }

  // 3. Semantic matching for GIS / Geospatial
  if (tagLower === 'gis') {
    return (
      Boolean(project.tags?.some(t => t.toLowerCase() === 'gis')) ||
      project.description.toLowerCase().includes('geospatial') ||
      project.subtitle.toLowerCase().includes('geospatial') ||
      project.title.toLowerCase().includes('environmental')
    );
  }

  // 4. Technology match
  if (project.technologies && project.technologies.some(t => t.toLowerCase().trim() === tagLower)) {
    return true;
  }

  return false;
}
