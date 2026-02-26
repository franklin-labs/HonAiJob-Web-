// Page principale de tableau de bord centrée sur les Projets et leurs CVs associés.
import type { Route } from "./+types/dashboard";
import { AppShell } from "~/components/layout/app-shell";
import { useI18n } from "~/i18n/i18n";
import { useCv } from "~/context/cv-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { 
  Plus, 
  FolderKanban,
  FileText,
  TrendingUp, 
  Briefcase, 
  Send, 
  Zap, 
  ArrowRight,
  CheckCircle2,
  Clock
} from "lucide-react";
import { cn } from "~/lib/utils";
import { Link } from "react-router";

export const meta: Route.MetaFunction = () => [
  { title: "Honaijob – Mes Projets" },
];

export default function Dashboard() {
  return (
    <AppShell>
      <DashboardContent />
    </AppShell>
  );
}

function DashboardContent() {
  const { t } = useI18n();
  const { projects, addProject } = useCv();
  const hasProjects = projects.length > 0;

  const handleAddProject: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const description = String(formData.get("description") || "").trim();
    if (!name) return;
    
    addProject({
      name,
      description,
    });
    event.currentTarget.reset();
  };

  return (
    <div className="space-y-8 pb-8">
      {/* En-tête de section avec bouton d'action */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Mes Projets
          </h1>
          <p className="mt-2 text-base text-slate-500">
            Gérez vos candidatures par projets. Un projet peut regrouper plusieurs CVs.
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="h-10 gap-2 rounded-full bg-[#635bff] px-6 font-medium text-white shadow-md shadow-blue-500/20 transition-all hover:bg-[#544dc9] hover:shadow-lg hover:shadow-blue-500/30">
              <Plus className="h-4 w-4" />
              Nouveau Projet
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Créer un nouveau projet</DialogTitle>
              <DialogDescription>
                Regroupez vos CVs et candidatures pour un objectif précis (ex: Recherche Alternance, CDI Tech).
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-4 pt-4" onSubmit={handleAddProject}>
              <div className="space-y-2">
                <Label htmlFor="name">Nom du projet</Label>
                <Input id="name" name="name" placeholder="Ex: Recherche CDI Frontend" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (optionnel)</Label>
                <Textarea id="description" name="description" placeholder="Décrivez votre objectif..." />
              </div>
              <Button type="submit" className="w-full bg-[#635bff] hover:bg-[#544dc9]">
                Créer le projet
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {!hasProjects ? (
        <Card className="flex min-h-[400px] flex-col items-center justify-center border-dashed border-slate-300 bg-slate-50/50 text-center shadow-none">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100/50 ring-8 ring-blue-50">
            <FolderKanban className="h-8 w-8 text-[#635bff]" />
          </div>
          <h3 className="mt-6 text-lg font-semibold text-slate-900">Aucun projet pour le moment</h3>
          <p className="mt-2 max-w-sm text-sm text-slate-500">Commencez par créer un projet pour organiser vos CVs et vos candidatures.</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-8 rounded-full bg-[#635bff] px-8 hover:bg-[#544dc9]">
                Créer mon premier projet
              </Button>
            </DialogTrigger>
            <DialogContent>
               {/* Même formulaire que plus haut */}
               <DialogHeader>
                  <DialogTitle>Créer un nouveau projet</DialogTitle>
                  <DialogDescription>
                    Un projet vous permet de regrouper plusieurs CVs et candidatures.
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4 pt-4" onSubmit={handleAddProject}>
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom du projet</Label>
                    <Input id="name" name="name" placeholder="Ex: Recherche CDI Frontend" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description (optionnel)</Label>
                    <Textarea id="description" name="description" placeholder="Décrivez votre objectif..." />
                  </div>
                  <Button type="submit" className="w-full bg-[#635bff] hover:bg-[#544dc9]">
                    Créer le projet
                  </Button>
                </form>
            </DialogContent>
          </Dialog>
        </Card>
      ) : (
        <div className="space-y-8">
          {/* Stats Summary */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="shadow-sm hover:shadow-lg transition-all duration-300 bg-white border-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">Projets</CardTitle>
                <FolderKanban className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{projects.length}</div>
                <p className="text-xs text-slate-500 mt-1">
                  Projets actifs
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-sm hover:shadow-lg transition-all duration-300 bg-white border-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">Total CVs</CardTitle>
                <FileText className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">
                  {projects.reduce((acc, p) => acc + p.cvs.length, 0)}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Tous projets confondus
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-sm hover:shadow-lg transition-all duration-300 bg-white border-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">Candidatures</CardTitle>
                <Send className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">12</div>
                <p className="text-xs text-slate-500 mt-1">
                  En cours de traitement
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-sm hover:shadow-lg transition-all duration-300 bg-white border-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">Match IA</CardTitle>
                <Zap className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">85%</div>
                <p className="text-xs text-slate-500 mt-1">
                  Moyenne de compatibilité
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link key={project.id} to={`/projects/${project.id}`}>
                <Card className="group h-full overflow-hidden border-none bg-white shadow-sm transition-all hover:shadow-md hover:ring-1 hover:ring-[#635bff]/20">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-600 transition-colors group-hover:bg-[#635bff]/10 group-hover:text-[#635bff]">
                        <FolderKanban className="h-6 w-6" />
                      </div>
                      <Badge variant="outline" className="border-slate-200 bg-slate-50 text-slate-500">
                        {project.cvs.length} CV{project.cvs.length > 1 ? 's' : ''}
                      </Badge>
                    </div>
                    <CardTitle className="mt-4 text-xl group-hover:text-[#635bff] transition-colors">{project.name}</CardTitle>
                    <CardDescription className="line-clamp-2 mt-2 min-h-[40px]">
                      {project.description || "Aucune description fournie."}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-4 text-sm text-slate-500 border-t border-slate-50 pt-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{project.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-1 ml-auto font-medium text-[#635bff] opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1">
                        <span>Ouvrir</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* AI Recommendations */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Recommandations Globales</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              {[
                {
                  title: "Optimisation de projet",
                  desc: "Votre projet 'Recherche Tech' bénéficierait d'un CV plus orienté 'Management'.",
                  icon: Zap,
                  color: "text-amber-600",
                  bg: "bg-amber-50"
                },
                {
                  title: "Nouvelle opportunité",
                  desc: "3 offres CDI à Lyon correspondent à votre CV Frontend Architect.",
                  icon: TrendingUp,
                  color: "text-emerald-600",
                  bg: "bg-emerald-50"
                },
                {
                  title: "Complétion de profil",
                  desc: "Associez un CV à votre projet 'Missions Freelance' pour voir les scores.",
                  icon: CheckCircle2,
                  color: "text-blue-600",
                  bg: "bg-blue-50"
                }
              ].map((item, i) => (
                <Card key={i} className="border-none shadow-sm hover:shadow-md transition-all bg-white overflow-hidden">
                  <div className={cn("h-1 w-full", item.bg.replace('bg-', 'bg-').replace('-50', '-500'))} />
                  <CardContent className="pt-6 flex items-start gap-4">
                    <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors", item.bg, item.color)}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
