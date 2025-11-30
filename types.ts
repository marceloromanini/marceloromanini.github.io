export interface Project {
  id: number;
  title: string;
  category: string;
  image: string; // Placeholder for video thumbnail
  cols: number; // For Bento grid spanning
  rows: number;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Skill {
  name: string;
  level?: number;
}