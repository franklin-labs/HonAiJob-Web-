import type { CV, Experience, Education, Skill } from "~/types/cv";
import { initialCV } from "~/types/cv";

export function generateCV(
  jobTitle: string, 
  experienceLevel: string, 
  keySkills?: string,
  industry?: string,
  description?: string
): CV {
  const id = crypto.randomUUID();
  
  // Parse key skills if provided
  const parsedSkills = keySkills 
    ? keySkills.split(',').map(s => s.trim()).filter(s => s.length > 0)
    : [];

  const baseCV: CV = {
    ...initialCV,
    id,
    title: `CV ${jobTitle}`,
    lastModified: Date.now(),
    personalInfo: {
      ...initialCV.personalInfo,
      fullName: "Prénom Nom",
      title: jobTitle,
      summary: description || `Professionnel passionné avec une expérience solide en ${jobTitle}${industry ? ` dans le secteur ${industry}` : ''}. Motivé par l'innovation et la résolution de problèmes complexes.`,
    },
    skills: generateSkills(jobTitle, parsedSkills, industry),
    experience: generateExperience(jobTitle, experienceLevel, industry),
    education: [
      {
        id: crypto.randomUUID(),
        school: "Votre École / Université",
        degree: "Diplôme obtenu",
        field: industry === "Tech" ? "Informatique" : (industry === "Finance" ? "Finance" : "Domaine d'étude"),
        startDate: "2018-09",
        endDate: "2020-06",
        current: false,
        location: "Ville, Pays",
      }
    ],
    languages: [
      { id: crypto.randomUUID(), name: "Français", level: "Langue maternelle" },
      { id: crypto.randomUUID(), name: "Anglais", level: "Intermédiaire" },
    ],
    interests: ["Centre d'intérêt 1", "Centre d'intérêt 2"],
  };

  return baseCV;
}

function generateSkills(jobTitle: string, customSkills: string[] = [], industry?: string): Skill[] {
  const commonSkills: Skill[] = [
    { id: crypto.randomUUID(), name: "Communication", level: "Advanced" },
    { id: crypto.randomUUID(), name: "Travail d'équipe", level: "Advanced" },
    { id: crypto.randomUUID(), name: "Résolution de problèmes", level: "Advanced" },
  ];

  // Add custom skills first
  const customSkillObjects = customSkills.map(name => ({
    id: crypto.randomUUID(),
    name,
    level: "Expert" as const
  }));

  let domainSkills: Skill[] = [];

  const titleLower = jobTitle.toLowerCase();
  const industryLower = industry?.toLowerCase() || "";

  if (titleLower.includes("dev") || titleLower.includes("fullstack") || industryLower === "tech") {
    domainSkills = [
      { id: crypto.randomUUID(), name: "React", level: "Expert" },
      { id: crypto.randomUUID(), name: "TypeScript", level: "Advanced" },
      { id: crypto.randomUUID(), name: "Node.js", level: "Advanced" },
      { id: crypto.randomUUID(), name: "Tailwind CSS", level: "Expert" },
      { id: crypto.randomUUID(), name: "Git", level: "Advanced" },
    ];
  } else if (titleLower.includes("marketing") || industryLower === "marketing") {
    domainSkills = [
      { id: crypto.randomUUID(), name: "SEO", level: "Expert" },
      { id: crypto.randomUUID(), name: "Google Analytics", level: "Advanced" },
      { id: crypto.randomUUID(), name: "Content Marketing", level: "Expert" },
      { id: crypto.randomUUID(), name: "Social Media", level: "Advanced" },
    ];
  } else if (titleLower.includes("manager") || titleLower.includes("chef") || industryLower === "management") {
    domainSkills = [
      { id: crypto.randomUUID(), name: "Gestion de projet", level: "Expert" },
      { id: crypto.randomUUID(), name: "Leadership", level: "Advanced" },
      { id: crypto.randomUUID(), name: "Planification stratégique", level: "Advanced" },
    ];
  } else if (titleLower.includes("design") || industryLower === "design") {
    domainSkills = [
      { id: crypto.randomUUID(), name: "Figma", level: "Expert" },
      { id: crypto.randomUUID(), name: "Adobe Creative Suite", level: "Advanced" },
      { id: crypto.randomUUID(), name: "UI/UX Design", level: "Expert" },
    ];
  }

  // Combine and deduplicate
  const allSkills = [...customSkillObjects, ...domainSkills, ...commonSkills];
  
  // Simple deduplication by name
  return allSkills.filter((skill, index, self) => 
    index === self.findIndex((t) => t.name === skill.name)
  );
}

function generateExperience(jobTitle: string, level: string, industry?: string): Experience[] {
  const experiences: Experience[] = [];
  const isTech = industry === "Tech" || jobTitle.toLowerCase().includes("dev");

  if (level === "junior") {
    experiences.push({
      id: crypto.randomUUID(),
      company: isTech ? "StartUp Tech" : "Entreprise Innovante",
      position: `Stagiaire ${jobTitle}`,
      startDate: "2022-01",
      endDate: "2022-06",
      current: false,
      location: "Ville, Pays",
      description: "Assistance sur les projets, participation aux réunions d'équipe et apprentissage des processus internes.",
    });
  } else if (level === "mid") {
    experiences.push({
      id: crypto.randomUUID(),
      company: isTech ? "Entreprise SaaS" : "Groupe International",
      position: jobTitle,
      startDate: "2021-03",
      endDate: "",
      current: true,
      location: "Ville, Pays",
      description: "Gestion autonome de projets, encadrement de juniors et amélioration des processus existants.",
    });
    experiences.push({
      id: crypto.randomUUID(),
      company: isTech ? "Agence Web" : "PME Locale",
      position: `Junior ${jobTitle}`,
      startDate: "2019-09",
      endDate: "2021-02",
      current: false,
      location: "Ville, Pays",
      description: "Participation au développement de solutions et collaboration avec l'équipe.",
    });
  } else if (level === "senior") {
    experiences.push({
      id: crypto.randomUUID(),
      company: isTech ? "Grande Entreprise Tech" : "Multinationale",
      position: `Senior ${jobTitle}`,
      startDate: "2020-01",
      endDate: "",
      current: true,
      location: "Ville, Pays",
      description: "Direction technique des projets majeurs, définition de l'architecture et mentorat de l'équipe.",
    });
    experiences.push({
      id: crypto.randomUUID(),
      company: isTech ? "Scale-up" : "Grand Groupe",
      position: jobTitle,
      startDate: "2017-06",
      endDate: "2019-12",
      current: false,
      location: "Ville, Pays",
      description: "Responsable de module critique, optimisation des performances et mise en place de standards.",
    });
  }

  return experiences;
}
