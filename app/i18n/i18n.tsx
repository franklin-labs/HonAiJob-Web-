import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Language = "fr" | "en";

type TranslationKey =
  | "appName"
  | "loginTitle"
  | "loginSubtitle"
  | "loginGoogle"
  | "loginEmail"
  | "loginPassword"
  | "loginSubmit"
  | "loginNoAccount"
  | "headerDashboard"
  | "headerMyCvs"
  | "headerJobs"
  | "headerApplications"
  | "headerSettings"
  | "languageFrench"
  | "languageEnglish"
  | "activeCv"
  | "addCv"
  | "aiRecommendations"
  | "cvScore"
  | "recommendedJobs"
  | "applicationsInProgress"
  | "noCvTitle"
  | "noCvDescription"
  | "uploadCv"
  | "myCvsTitle"
  | "jobOffersTitle"
  | "applicationsTitle"
  | "settingsTitle"
  | "projectsTitle"
  | "newProject"
  | "projectName"
  | "projectDescription"
  | "projectDescriptionPlaceholder"
  | "createProject"
  | "selectProject"
  | "changeProject"
  | "noProjects"
  | "aiDescriptionNotice"
  | "crucialForAi"
  | "openProject"
  | "backToProjects";

type Dictionary = Record<Language, Record<TranslationKey, string>>;

const dictionary: Dictionary = {
  fr: {
    appName: "Honaijob",
    loginTitle: "Se connecter à Honaijob",
    loginSubtitle: "Plateforme intelligente de matching d’emplois",
    loginGoogle: "Continuer avec Google",
    loginEmail: "Adresse e-mail",
    loginPassword: "Mot de passe",
    loginSubmit: "Se connecter",
    loginNoAccount: "Pas encore de compte ? Utilisez Google ou votre e-mail.",
    headerDashboard: "Tableau de bord",
    headerMyCvs: "Mes CV",
    headerJobs: "Offres",
    headerApplications: "Candidatures",
    headerSettings: "Paramètres",
    languageFrench: "Français",
    languageEnglish: "Anglais",
    activeCv: "CV actif",
    addCv: "Ajouter un CV",
    aiRecommendations: "Recommandations IA",
    cvScore: "Score du CV",
    recommendedJobs: "Offres recommandées",
    applicationsInProgress: "Candidatures en cours",
    noCvTitle: "Commencez par déposer un premier CV",
    noCvDescription:
      "Pour activer les recommandations IA et les offres ciblées, importez un CV.",
    uploadCv: "Importer un CV",
    myCvsTitle: "Mes CV",
    jobOffersTitle: "Offres d’emploi",
    applicationsTitle: "Candidatures",
    settingsTitle: "Paramètres",
    projectsTitle: "Mes Projets",
    newProject: "Nouveau Projet",
    projectName: "Nom du projet",
    projectDescription: "Description du projet",
    projectDescriptionPlaceholder: "Décrivez précisément le type de poste, les technologies, le secteur...",
    createProject: "Créer le projet",
    selectProject: "Sélectionnez un projet",
    changeProject: "Changer de projet",
    noProjects: "Aucun projet pour le moment",
    aiDescriptionNotice: "Cette description sera utilisée par notre intelligence artificielle pour identifier les meilleures opportunités pour vous.",
    crucialForAi: "Crucial pour l'IA",
    openProject: "Ouvrir le projet",
    backToProjects: "Retour aux projets",
  },
  en: {
    appName: "Honaijob",
    loginTitle: "Sign in to Honaijob",
    loginSubtitle: "Intelligent job matching platform",
    loginGoogle: "Continue with Google",
    loginEmail: "Email address",
    loginPassword: "Password",
    loginSubmit: "Sign in",
    loginNoAccount: "No account yet? Use Google or your email.",
    headerDashboard: "Dashboard",
    headerMyCvs: "My CVs",
    headerJobs: "Jobs",
    headerApplications: "Applications",
    headerSettings: "Settings",
    languageFrench: "French",
    languageEnglish: "English",
    activeCv: "Active CV",
    addCv: "Add a CV",
    aiRecommendations: "AI recommendations",
    cvScore: "CV score",
    recommendedJobs: "Recommended jobs",
    applicationsInProgress: "Applications in progress",
    noCvTitle: "Start by uploading your first CV",
    noCvDescription:
      "To unlock AI recommendations and targeted offers, upload a CV.",
    uploadCv: "Upload a CV",
    myCvsTitle: "My CVs",
    jobOffersTitle: "Job offers",
    applicationsTitle: "Applications",
    settingsTitle: "Settings",
    projectsTitle: "My Projects",
    newProject: "New Project",
    projectName: "Project Name",
    projectDescription: "Project Description",
    projectDescriptionPlaceholder: "Precisely describe the type of position, technologies, sector...",
    createProject: "Create Project",
    selectProject: "Select a project",
    changeProject: "Change project",
    noProjects: "No projects yet",
    aiDescriptionNotice: "This description will be used by our AI to identify the best opportunities for you.",
    crucialForAi: "Crucial for AI",
    openProject: "Open project",
    backToProjects: "Back to projects",
  },
};

type I18nContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

type I18nProviderProps = {
  children: React.ReactNode;
};

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedLanguage = window.localStorage.getItem("honaijob:language");
    if (storedLanguage === "fr" || storedLanguage === "en") {
      setLanguageState(storedLanguage);
      return;
    }

    const browserLanguage = window.navigator.language.toLowerCase();
    if (browserLanguage.startsWith("fr")) {
      setLanguageState("fr");
    } else {
      setLanguageState("en");
    }
  }, []);

  const setLanguage = (value: Language) => {
    setLanguageState(value);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("honaijob:language", value);
    }
  };

  const t = useMemo(
    () => (key: TranslationKey) => dictionary[language][key],
    [language]
  );

  const value: I18nContextValue = {
    language,
    setLanguage,
    t,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}

