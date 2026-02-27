// Page de matching IA entre le CV actif et une offre type.
import type { Route } from "./+types/ai-match";
import { AppShell } from "~/components/layout/app-shell";
import { useCv } from "~/context/cv-context";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Brain, TrendingUp, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "~/lib/utils";

// Métadonnées de la page “Matching IA”.
export const meta: Route.MetaFunction = () => [
  { title: "Honaijob – Matching IA" },
];

// Route enveloppée dans le layout global.
export default function AiMatch() {
  return (
    <AppShell>
      <AiMatchContent />
    </AppShell>
  );
}

// Contenu principal : score global et recommandations détaillées.
function AiMatchContent() {
  const { projects } = useCv();
  const firstProject = projects[0];
  const firstCv = firstProject?.cvs[0];

  // Valeurs de démonstration pour le matching et les compétences.
  const match = 84;

  const skills = [
    { name: "Stratégie marketing", value: 90 },
    { name: "Copywriting", value: 80 },
    { name: "Analyse de données", value: 70 },
    { name: "Gestion de projet", value: 60 },
  ];

  const missingSkills = [
    "Mettre en avant les outils d’analytics utilisés (GA4, Mixpanel)",
    "Ajouter des résultats chiffrés sur les campagnes récentes",
    "Préciser l’expertise sur un secteur spécifique (SaaS B2B)",
  ];

  return (
    <div className="space-y-6 sm:space-y-8 pb-10 sm:pb-8 px-4 sm:px-0">
      <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-6 sm:pb-8">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl leading-tight">
            Matching IA
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-2xl font-medium leading-relaxed">
            Analyse détaillée de la compatibilité entre votre CV et l'offre ciblée.
          </p>
        </div>
        <Button className="w-full sm:w-auto h-12 sm:h-11 bg-[#635bff] hover:bg-[#544dc9] text-white shadow-lg shadow-blue-500/20 rounded-2xl sm:rounded-full font-black text-sm transition-all active:scale-[0.97]">
          <Brain className="mr-2 h-5 w-5 sm:h-4 sm:w-4" />
          Nouvelle analyse
        </Button>
      </header>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
        {/* Colonne gauche : Score global */}
        <div className="lg:col-span-1 space-y-6 sm:space-y-8">
          <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#635bff] to-indigo-400" />
            <CardHeader className="pb-4 sm:pb-6 p-6">
              <CardTitle className="text-lg font-black text-slate-900 uppercase tracking-widest text-[10px] sm:text-xs">Score Global</CardTitle>
              <CardDescription className="text-xs sm:text-sm font-medium text-slate-400">Compatibilité estimée</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-8 sm:py-10 px-6">
              <div className="relative flex items-center justify-center w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-slate-50 shadow-inner group transition-transform hover:scale-105 duration-500">
                <svg className="absolute inset-0 w-full h-full -rotate-90 p-1" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />
                  <path
                    className={cn(
                      "transition-all duration-1000 ease-out",
                      match >= 80 ? "text-emerald-500" : match >= 50 ? "text-amber-500" : "text-red-500"
                    )}
                    strokeDasharray={`${match}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="flex flex-col items-center relative z-10">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900 leading-none">{match}%</span>
                  <span className={cn(
                    "text-[10px] sm:text-xs font-black uppercase tracking-widest mt-2",
                    match >= 80 ? "text-emerald-600" : match >= 50 ? "text-amber-600" : "text-red-600"
                  )}>Excellent</span>
                </div>
              </div>
              <div className="mt-8 sm:mt-10 w-full space-y-4">
                <div className="flex justify-between items-center text-xs sm:text-sm font-bold">
                  <span className="text-slate-400 uppercase tracking-widest text-[10px]">CV analysé</span>
                  <span className="text-slate-900 font-black truncate max-w-[150px]">{firstCv?.name || "Sans titre"}</span>
                </div>
                <div className="h-px bg-slate-50 w-full" />
                <div className="flex justify-between items-center text-xs sm:text-sm font-bold">
                  <span className="text-slate-400 uppercase tracking-widest text-[10px]">Cible</span>
                  <span className="text-slate-900 font-black truncate max-w-[150px]">Job Offer Type</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden">
            <CardHeader className="pb-4 sm:pb-6 p-6 bg-slate-50/30">
              <CardTitle className="text-lg font-black text-slate-900 uppercase tracking-widest text-[10px] sm:text-xs">Tendances</CardTitle>
            </CardHeader>
            <CardContent className="py-6 px-6">
              <div className="flex items-center gap-5">
                <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#635bff] shadow-sm">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-black text-slate-900">+12% ce mois</p>
                  <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Amélioration du score</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Colonne droite : Détails des compétences et points d'amélioration */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden">
            <CardHeader className="pb-4 sm:pb-6 p-6 border-b border-slate-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-xl">
                  <CheckCircle2 className="h-5 w-5 text-[#635bff]" />
                </div>
                <CardTitle className="text-lg font-black text-slate-900">Analyse des Compétences</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6 sm:space-y-8">
                {skills.map((skill) => (
                  <div key={skill.name} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base font-black text-slate-700">{skill.name}</span>
                      <span className="text-xs sm:text-sm font-black text-[#635bff] bg-blue-50 px-2.5 py-1 rounded-lg">{skill.value}%</span>
                    </div>
                    <Progress value={skill.value} className="h-2.5 sm:h-3 rounded-full bg-slate-100" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden border-l-4 border-l-amber-400">
            <CardHeader className="pb-4 sm:pb-6 p-6 bg-amber-50/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-xl shadow-sm">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <CardTitle className="text-lg font-black text-slate-900">Points à Améliorer</CardTitle>
                  <CardDescription className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-amber-600/70 mt-0.5">Recommandations IA</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-4">
                {missingSkills.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors group">
                    <div className="h-6 w-6 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                      <ArrowRight className="h-3.5 w-3.5 text-[#635bff]" />
                    </div>
                    <span className="text-sm sm:text-base text-slate-600 font-bold leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
