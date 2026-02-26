// Types de données pour l'application Honaijob.

export interface UserProject {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  cvs: CvEntry[];
}

export type CvType = "student" | "cdi" | "freelance" | "internship";

export interface CvEntry {
  id: string;
  name: string;
  type: CvType;
  lastAnalysis: string;
  score: number;
  applicationsInProgress: number;
}

// Types pour le CV lui-même (si on garde la structure pour de futures fonctionnalités ou imports)
export interface CV {
  id: string;
  title: string;
  lastModified: number;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    linkedin?: string;
    website?: string;
    summary: string;
    title: string;
  };
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  interests: string[];
  projects: CVProjectEntry[];
  sectionOrder: string[];
  templateId: string;
  sectionTitles?: Record<string, string>;
  design: CVDesign;
}

export interface CVProjectEntry {
  id: string;
  name: string;
  description: string;
  link?: string;
  date?: string;
}

export interface CVDesign {
  font: 'sans' | 'serif' | 'mono';
  accentColor: string;
  spacing: 'compact' | 'normal' | 'relaxed';
  headerStyle: 'modern' | 'classic' | 'minimal';
  sectionTitleCase: 'uppercase' | 'capitalize' | 'normal';
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  margins: 'compact' | 'normal' | 'relaxed';
  isATS?: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
  location?: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  location?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Language {
  id: string;
  name: string;
  level: string;
}
