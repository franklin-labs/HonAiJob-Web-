// Page de matching IA entre le CV actif et une offre type.
import type { Route } from "./+types/ai-match";
import { AppShell } from "~/components/layout/app-shell";
import { useCv } from "~/context/cv-context";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Brain, TrendingUp, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";

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
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Matching IA
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl">
            Analyse détaillée de la compatibilité entre votre CV et l'offre ciblée.
          </p>
        </div>
        <Button className="bg-[#635bff] hover:bg-[#544dc9] text-white shadow-md shadow-blue-500/20">
          <Brain className="mr-2 h-4 w-4" />
          Nouvelle analyse
        </Button>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Colonne gauche : Score global */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-slate-100 shadow-sm overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-slate-900">Score Global</CardTitle>
              <CardDescription>Compatibilité estimée</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <div className="relative flex items-center justify-center w-32 h-32 rounded-full border-8 border-slate-50">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    className={match >= 80 ? "text-emerald-500" : match >= 50 ? "text-amber-500" : "text-red-500"}
                    strokeDasharray={`${match}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-slate-900">{match}%</span>
                  <span className="text-xs font-medium text-slate-500">Excellent</span>
                </div>
              </div>
              <div className="mt-6 w-full space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">CV analysé</span>
                  <span className="font-medium text-slate-900">{firstCv?.name || "Aucun CV"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Poste ciblé</span>
                  <span className="font-medium text-slate-900">Product Marketing Manager</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-100 shadow-sm bg-slate-50/50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Potentiel élevé</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Votre profil correspond à la majorité des critères clés pour ce poste. Quelques ajustements mineurs pourraient maximiser vos chances.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Colonne droite : Détails et recommandations */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">Analyse des compétences</CardTitle>
              <CardDescription>Détail par catégorie de compétences requises</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">{skill.name}</span>
                    <span className="font-semibold text-slate-900">{skill.value}%</span>
                  </div>
                  <Progress value={skill.value} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-slate-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">Recommandations d'amélioration</CardTitle>
              <CardDescription>Actions concrètes pour optimiser votre candidature</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {missingSkills.map((item, index) => (
                  <div key={index} className="flex gap-3 items-start p-3 rounded-lg border border-slate-100 bg-white hover:border-blue-100 transition-colors">
                    <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-slate-800">{item}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button variant="ghost" size="sm" className="h-auto p-0 text-blue-600 hover:text-blue-700 font-medium text-xs hover:bg-transparent">
                          Appliquer cette suggestion <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex gap-3 items-start p-3 rounded-lg border border-emerald-100 bg-emerald-50/50">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-800">Points forts identifiés</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Votre expérience en management et votre maîtrise de l'anglais sont parfaitement alignées avec les attentes.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
