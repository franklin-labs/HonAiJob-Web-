// Gestion centralisée des Projets, CV, offres d’emploi et candidatures.
import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import type { UserProject, CvEntry, CvType } from "~/types/cv";

// Modèle de données pour une offre d’emploi.
export type JobOffer = {
  id: string;
  title: string;
  company: string;
  location: string;
  contract: "cdi" | "internship" | "freelance";
  experience: "junior" | "mid" | "senior";
  match: number;
};

// Statuts possibles d’une candidature.
export type ApplicationStatus = "in_progress" | "interview" | "offer" | "rejected";

// Modèle de données pour une candidature liée à un CV.
export type Application = {
  id: string;
  company: string;
  role: string;
  date: string;
  status: ApplicationStatus;
  cvId: string;
};

// Interface du contexte exposée aux composants consommateurs.
type CvContextValue = {
  projects: UserProject[];
  addProject: (project: Omit<UserProject, "id" | "createdAt" | "cvs">) => void;
  removeProject: (id: string) => void;
  getProject: (id: string) => UserProject | undefined;
  
  addCvToProject: (projectId: string, cv: Omit<CvEntry, "id" | "lastAnalysis">) => void;
  removeCvFromProject: (projectId: string, cvId: string) => void;
  
  jobOffers: JobOffer[];
  applications: Application[];
  activeProjectId: string | null;
  setActiveProjectId: (id: string | null) => void;
  activeProject: UserProject | undefined;
};

const CvContext = createContext<CvContextValue | undefined>(undefined);

// Données initiales pour illustrer l'interface.
const initialProjects: UserProject[] = [
  {
    id: "project-1",
    name: "Recherche Tech 2026",
    description: "Candidatures pour des postes de développeur Senior et Lead.",
    createdAt: "2026-02-10",
    cvs: [
      {
        id: "cv-1",
        name: "CV Fullstack React/Node",
        type: "cdi",
        lastAnalysis: "2026-02-15",
        score: 88,
        applicationsInProgress: 2,
      },
      {
        id: "cv-2",
        name: "CV Frontend Architect",
        type: "cdi",
        lastAnalysis: "2026-02-18",
        score: 92,
        applicationsInProgress: 1,
      }
    ]
  },
  {
    id: "project-2",
    name: "Missions Freelance",
    description: "Projets de courte durée et missions de conseil.",
    createdAt: "2026-02-20",
    cvs: [
      {
        id: "cv-3",
        name: "CV Expert TypeScript",
        type: "freelance",
        lastAnalysis: "2026-02-22",
        score: 85,
        applicationsInProgress: 0,
      }
    ]
  }
];

export const initialJobOffers: JobOffer[] = [
  {
    id: "job-1",
    title: "Product Marketing Manager",
    company: "NovaTech",
    location: "Paris",
    contract: "cdi",
    experience: "mid",
    match: 89,
  }
];

export function CvProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<UserProject[]>(initialProjects);
  const [jobOffers] = useState<JobOffer[]>(initialJobOffers);
  const [applications] = useState<Application[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  // Projet actif calculé
  const activeProject = useMemo(() => 
    projects.find(p => p.id === activeProjectId),
  [projects, activeProjectId]);

  // Actions sur les projets
  const addProject = (projectData: Omit<UserProject, "id" | "createdAt" | "cvs">) => {
    const newId = crypto.randomUUID();
    const newProject: UserProject = {
      ...projectData,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0],
      cvs: [],
    };
    setProjects(prev => [...prev, newProject]);
    // On peut optionnellement sélectionner le nouveau projet directement
    setActiveProjectId(newId);
  };

  const removeProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const getProject = (id: string) => projects.find(p => p.id === id);

  // Actions sur les CVs au sein des projets
  const addCvToProject = (projectId: string, cvData: Omit<CvEntry, "id" | "lastAnalysis">) => {
    setProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        const newCv: CvEntry = {
          ...cvData,
          id: crypto.randomUUID(),
          lastAnalysis: new Date().toISOString().split('T')[0],
        };
        return { ...project, cvs: [...project.cvs, newCv] };
      }
      return project;
    }));
  };

  const removeCvFromProject = (projectId: string, cvId: string) => {
    setProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        return { ...project, cvs: project.cvs.filter(cv => cv.id !== cvId) };
      }
      return project;
    }));
  };

  const value = useMemo(() => ({
    projects,
    addProject,
    removeProject,
    getProject,
    addCvToProject,
    removeCvFromProject,
    jobOffers,
    applications,
    activeProjectId,
    setActiveProjectId,
    activeProject,
  }), [projects, jobOffers, applications, activeProjectId, activeProject]);

  return <CvContext.Provider value={value}>{children}</CvContext.Provider>;
}

export function useCv() {
  const context = useContext(CvContext);
  if (context === undefined) {
    throw new Error("useCv must be used within a CvProvider");
  }
  return context;
}
