export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  year: string;
  role: string;
  technologies: string[];
  problem: string;
  process: string;
  result: string;
  liveUrl?: string;
  githubUrl?: string;
  screenshots: string[];
  isExperiment?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  summary: string;
  content: string;
  tags: string[];
  slug: string;
}
