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
    <div className="space-y-6 sm:space-y-8 pb-10 sm:pb-8 px-4 sm:px-0">
      {/* En-tête du Dashboard */}
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center border-b border-slate-100 pb-6 sm:pb-8">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 mb-1">
            <Link to="/projects" className="group flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#635bff] transition-colors">
              <ArrowLeft className="h-3 w-3 group-hover:-translate-x-0.5 transition-transform" />
              Mes Projets
            </Link>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl leading-tight">
            {project.name}
          </h1>
          <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
            {project.description || "Gérez vos CV et candidatures pour ce projet."}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild variant="outline" className="h-12 sm:h-11 rounded-2xl sm:rounded-full border-slate-200 font-black text-sm text-slate-600 hover:bg-slate-50 active:scale-[0.97] transition-all">
            <Link to={`/projects/${project.id}`}>
              <Sparkles className="mr-2 h-5 w-5 sm:h-4 sm:w-4 text-[#635bff]" />
              Détails du projet
            </Link>
          </Button>
          <Button className="h-12 sm:h-11 rounded-2xl sm:rounded-full bg-[#635bff] px-6 font-black text-sm text-white shadow-lg shadow-blue-500/20 hover:bg-[#544dc9] active:scale-[0.97] transition-all">
            <Plus className="mr-2 h-5 w-5 sm:h-4 sm:w-4" />
            Nouveau CV
          </Button>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "CV Créés", value: project.cvs.length, icon: FileText, color: "bg-blue-50 text-[#635bff]" },
          { label: "Match Moyen", value: "84%", icon: Zap, color: "bg-emerald-50 text-emerald-600" },
          { label: "Offres", value: "12", icon: Briefcase, color: "bg-purple-50 text-purple-600" },
          { label: "Candidatures", value: "5", icon: Send, color: "bg-amber-50 text-amber-600" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm bg-white rounded-2xl overflow-hidden group hover:shadow-md transition-all">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div className={cn("flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl transition-transform group-hover:scale-110", stat.color)}>
                  <stat.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <span className="text-xl sm:text-2xl font-black text-slate-900">{stat.value}</span>
              </div>
              <p className="mt-3 text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
        {/* Liste des CV récents */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-blue-50 flex items-center justify-center">
                <FileText className="h-4.5 w-4.5 text-[#635bff]" />
              </div>
              CV du projet
            </h2>
            <Link to="/cvs" className="text-xs font-black text-[#635bff] hover:underline uppercase tracking-widest">Voir tout</Link>
          </div>
          
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
            {project.cvs.map((cv) => (
              <Card key={cv.id} className="group relative flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-none ring-1 ring-slate-100 bg-white rounded-2xl">
                <CardHeader className="pb-4 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 transition-all group-hover:bg-blue-50 group-hover:text-[#635bff] group-hover:scale-110 group-hover:rotate-3">
                      <FileText className="h-7 w-7" />
                    </div>
                    <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-lg">
                      <Zap className="mr-1 h-3 w-3 fill-emerald-600" />
                      {cv.score}%
                    </Badge>
                  </div>
                  <CardTitle className="mt-4 text-lg font-black text-slate-900 group-hover:text-[#635bff] transition-colors truncate">
                    {cv.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-6 px-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Candidatures</p>
                      <p className="text-sm font-black text-slate-900">{cv.applicationsInProgress} en cours</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dernière analyse</p>
                      <p className="text-sm font-black text-slate-900">{cv.lastAnalysis}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="mt-auto border-t border-slate-50 p-0">
                  <Button variant="ghost" className="w-full h-14 rounded-none font-black text-[11px] uppercase tracking-widest text-slate-400 hover:text-[#635bff] hover:bg-blue-50/50 transition-all gap-2 group/btn" asChild>
                    <Link to="/ai-match">
                      Optimiser ce CV
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Activité récente / Tips IA */}
        <div className="space-y-6">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-amber-50 flex items-center justify-center">
              <TrendingUp className="h-4.5 w-4.5 text-amber-600" />
            </div>
            Conseils IA
          </h2>
          
          <Card className="border-none shadow-sm bg-gradient-to-br from-white to-slate-50 rounded-[2rem] overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
              <Sparkles className="h-20 w-20 text-[#635bff]" />
            </div>
            <CardHeader className="p-7">
              <CardTitle className="text-xl font-black text-slate-900">Booster votre score</CardTitle>
              <CardDescription className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">Recommandation du jour</CardDescription>
            </CardHeader>
            <CardContent className="p-7 pt-0 space-y-6">
              <div className="flex gap-4 p-5 rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Info className="h-5 w-5 text-[#635bff]" />
                </div>
                <p className="text-sm font-bold text-slate-600 leading-relaxed">
                  Ajoutez <span className="text-slate-900 font-black">"Analyse de données"</span> à vos compétences pour augmenter votre score de <span className="text-emerald-600 font-black">+12%</span> sur ce projet.
                </p>
              </div>
              
              <Button className="w-full h-12 rounded-2xl bg-slate-900 text-white font-black text-sm hover:bg-slate-800 transition-all active:scale-[0.97]">
                Appliquer le conseil
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
