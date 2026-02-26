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
  CardFooter,
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
  Clock,
  ArrowLeft,
  Sparkles,
  Info,
  Trash2
} from "lucide-react";
import { cn } from "~/lib/utils";
import { Link, useSearchParams, useNavigate } from "react-router";
import * as React from "react";

export const meta: Route.MetaFunction = () => [
  { title: "Honaijob – Tableau de bord" },
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
  const { 
    projects, 
    getProject, 
    addCvToProject, 
    removeCvFromProject, 
    activeProjectId, 
    setActiveProjectId 
  } = useCv();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const projectIdParam = searchParams.get("projectId");
  
  // Sincronisation du projet actif si passé en paramètre
  React.useEffect(() => {
    if (projectIdParam && projectIdParam !== activeProjectId) {
      setActiveProjectId(projectIdParam);
    }
  }, [projectIdParam, activeProjectId, setActiveProjectId]);

  // Si pas de projectIdParam, on utilise activeProjectId du contexte
  const currentProjectId = projectIdParam || activeProjectId;
  const project = currentProjectId ? getProject(currentProjectId) : (projects.length > 0 ? projects[0] : null);

  React.useEffect(() => {
    if (!project && projects.length === 0) {
      navigate("/projects");
    } else if (!currentProjectId && projects.length > 0) {
      // Si aucun projet n'est sélectionné mais qu'il en existe, on sélectionne le premier
      setActiveProjectId(projects[0].id);
    }
  }, [project, projects, navigate, currentProjectId, setActiveProjectId]);

  if (!project) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="text-center">
          <Clock className="mx-auto h-12 w-12 animate-spin text-blue-500" />
          <p className="mt-4 text-slate-500">Chargement du projet...</p>
        </div>
      </div>
    );
  }

  const handleAddCv = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "").trim();
    if (!name) return;

    addCvToProject(project.id, {
      name,
      type: "cdi",
      score: 0,
      applicationsInProgress: 0,
    });
    // Close dialog logic would go here if we managed its state
  };

  const handleRemoveCv = (cvId: string) => {
    if (confirm("Voulez-vous vraiment supprimer ce CV ?")) {
      removeCvFromProject(project.id, cvId);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Project Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
            <Link to="/projects" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" />
              {t("backToProjects")}
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
              <FolderKanban className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {project.name}
            </h1>
          </div>
          <p className="max-w-2xl text-slate-500 mt-2">
            {project.description || "Aucune description fournie pour ce projet."}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
           <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#635bff] hover:bg-[#544dc9] text-white gap-2 rounded-full px-6 shadow-lg shadow-blue-600/20">
                <Plus className="h-4 w-4" />
                {t("addCv")}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("addCv")}</DialogTitle>
                <DialogDescription>
                  Ajoutez un nouveau CV à ce projet pour l'optimiser.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddCv} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="cvName">Nom du CV</Label>
                  <Input id="cvName" name="name" placeholder="Ex: CV Développeur Senior" required />
                </div>
                <Button type="submit" className="w-full bg-[#635bff] hover:bg-[#544dc9] text-white">
                  Ajouter le CV
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-400">Documents</CardTitle>
            <FileText className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{project.cvs.length}</div>
            <p className="text-xs text-slate-500 mt-1">CVs optimisés</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-400">Candidatures</CardTitle>
            <Send className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {project.cvs.reduce((acc, cv) => acc + (cv.applicationsInProgress || 0), 0)}
            </div>
            <p className="text-xs text-slate-500 mt-1">En cours d'envoi</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-400">Score Moyen</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {project.cvs.length > 0 
                ? Math.round(project.cvs.reduce((acc, cv) => acc + (cv.score || 0), 0) / project.cvs.length) 
                : 0}%
            </div>
            <p className="text-xs text-slate-500 mt-1">Compatibilité ATS</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-[#635bff] text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-white/70">Matching IA</CardTitle>
            <Zap className="h-4 w-4 text-white/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-white/70 mt-1">Offres trouvées</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content: CV List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">{t("myCvsTitle")}</h2>
          </div>

          {project.cvs.length === 0 ? (
            <Card className="border-dashed border-slate-300 bg-slate-50/50 p-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{t("noCvTitle")}</h3>
              <p className="text-sm text-slate-500 mt-2 max-w-xs mx-auto">
                {t("noCvDescription")}
              </p>
              <Button className="mt-6 bg-[#635bff] hover:bg-[#544dc9] text-white">
                {t("uploadCv")}
              </Button>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {project.cvs.map((cv) => (
                <Card key={cv.id} className="group overflow-hidden border-slate-200 transition-all hover:border-blue-300 hover:shadow-md bg-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant={cv.score >= 80 ? "default" : "secondary"} className={cn("font-medium", cv.score >= 80 ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : "bg-slate-100 text-slate-600")}>
                          {cv.score}% Score
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleRemoveCv(cv.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="mt-4 text-lg group-hover:text-blue-700 transition-colors">{cv.name}</CardTitle>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                      <Clock className="h-3 w-3" />
                      <span>Mis à jour le {cv.lastAnalysis}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Candidatures</span>
                      <span className="font-semibold text-slate-900">{cv.applicationsInProgress} en cours</span>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-slate-50/50 border-t border-slate-100 p-3">
                    <Button variant="ghost" className="w-full text-xs h-8 gap-1.5 hover:bg-white hover:text-blue-600">
                      Voir les détails
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar: AI Recommendations & Jobs */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="pb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                <CardTitle className="text-lg">Analyse IA du Projet</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                <p className="text-sm font-semibold text-blue-800 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Conseil Stratégique
                </p>
                <p className="text-xs text-blue-700 mt-2 leading-relaxed">
                  Basé sur la description de votre projet, nous vous suggérons d'ajouter les mots-clés 
                  <span className="font-bold"> "Architecture Cloud"</span> et <span className="font-bold"> "DevOps"</span> à votre CV principal.
                </p>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Prochaines étapes</h4>
                <div className="flex items-start gap-3 text-sm">
                  <div className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="h-3 w-3" />
                  </div>
                  <span className="text-slate-600">Optimiser le CV principal pour "Spotify"</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <div className="h-5 w-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                  </div>
                  <span className="text-slate-600">Ajouter une lettre de motivation IA</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Offres Adaptées</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs text-[#635bff] hover:text-[#544dc9] p-0 h-auto">Voir tout</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "Senior React Dev", company: "Stripe", match: 98 },
                { title: "Frontend Architect", company: "Airbnb", match: 92 },
                { title: "Lead Developer", company: "Doctolib", match: 89 }
              ].map((job, i) => (
                <div key={i} className="group flex items-center justify-between p-3 rounded-lg border border-slate-50 hover:border-blue-100 hover:bg-blue-50/30 transition-all cursor-pointer">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{job.title}</p>
                    <p className="text-xs text-slate-500">{job.company}</p>
                  </div>
                  <Badge variant="outline" className="bg-white text-emerald-600 border-emerald-100">
                    {job.match}% match
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
