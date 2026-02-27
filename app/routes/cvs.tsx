// Page de gestion globale de tous les CV de l’utilisateur à travers tous les projets.
import type { Route } from "./+types/cvs";
import { AppShell } from "~/components/layout/app-shell";
import { useI18n } from "~/i18n/i18n";
import { useCv } from "~/context/cv-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { FileText, Plus, Trash2, CheckCircle2, MoreVertical, Calendar, Briefcase, Zap, ExternalLink, ArrowRight } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { cn } from "~/lib/utils";
import { Link } from "react-router";

export const meta: Route.MetaFunction = () => [
  { title: "Honaijob – Mes CV" },
];

export default function Cvs() {
  return (
    <AppShell>
      <CvsContent />
    </AppShell>
  );
}

function CvsContent() {
  const { t } = useI18n();
  const { projects, removeCvFromProject } = useCv();
  
  // Aplatir tous les CVs de tous les projets pour une vue globale
  const allCvsWithProject = projects.flatMap(project => 
    project.cvs.map(cv => ({
      ...cv,
      projectId: project.id,
      projectName: project.name
    }))
  );

  return (
    <div className="space-y-6 sm:space-y-8 pb-10 sm:pb-8 px-4 sm:px-0">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center border-b border-slate-100 pb-6 sm:pb-8">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl leading-tight">
            Mes CV (Vue Globale)
          </h1>
          <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
            Retrouvez tous vos CV organisés par projets.
          </p>
        </div>
        
        <Button asChild className="w-full sm:w-auto h-12 sm:h-11 gap-2 rounded-2xl sm:rounded-full bg-[#635bff] px-6 font-black text-sm text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-[#544dc9] active:scale-[0.97]">
          <Link to="/projects">
            <Plus className="h-5 w-5 sm:h-4 sm:w-4" />
            Nouveau Projet
          </Link>
        </Button>
      </div>

      {allCvsWithProject.length === 0 ? (
        <Card className="flex min-h-[400px] flex-col items-center justify-center border-2 border-dashed border-slate-200 bg-slate-50/30 text-center shadow-none rounded-[2rem] p-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50/50 ring-1 ring-blue-100 mb-6">
            <FileText className="h-10 w-10 text-[#635bff]" />
          </div>
          <h3 className="text-xl font-black text-slate-900">Aucun CV pour le moment</h3>
          <p className="mt-2 max-w-sm text-sm sm:text-base text-slate-500 font-medium">Créez ou ouvrez un projet pour y ajouter des CV.</p>
          <Button asChild className="mt-8 h-12 rounded-2xl bg-[#635bff] px-8 font-black hover:bg-[#544dc9] active:scale-[0.97] transition-all">
            <Link to="/projects">Gérer mes projets</Link>
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allCvsWithProject.map((cv) => (
            <Card 
              key={cv.id} 
              className="group relative flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-none ring-1 ring-slate-100 bg-white rounded-2xl"
            >
              <CardHeader className="pb-4 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 transition-all group-hover:bg-blue-50 group-hover:text-[#635bff] group-hover:scale-110 group-hover:rotate-3">
                    <FileText className="h-7 w-7" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-slate-400 hover:bg-slate-50 active:scale-90 transition-all">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-2xl border-none shadow-2xl p-2 min-w-[180px]">
                      <DropdownMenuItem asChild className="rounded-xl font-bold text-slate-600 focus:text-[#635bff] focus:bg-blue-50 cursor-pointer h-11 px-4">
                         <Link to={`/projects/${cv.projectId}`}>
                            <ExternalLink className="mr-3 h-4.5 w-4.5" />
                            Voir le projet
                         </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="rounded-xl font-bold text-red-500 focus:text-red-600 focus:bg-red-50 cursor-pointer h-11 px-4 mt-1"
                        onClick={() => {
                          if (confirm("Voulez-vous vraiment supprimer ce CV ?")) {
                            removeCvFromProject(cv.projectId, cv.id);
                          }
                        }}
                      >
                        <Trash2 className="mr-3 h-4.5 w-4.5" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mt-4 space-y-1">
                  <CardTitle className="text-lg font-black text-slate-900 group-hover:text-[#635bff] transition-colors truncate">
                    {cv.name}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-blue-50 text-[#635bff] border-none font-black text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-lg truncate max-w-full">
                      {cv.projectName}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-6 px-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Score IA</p>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 text-emerald-600">
                        <Zap className="h-3.5 w-3.5 fill-emerald-600" />
                        <span className="text-sm font-black">{cv.score}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">En cours</p>
                    <p className="text-sm font-black text-slate-900">{cv.applicationsInProgress}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="mt-auto border-t border-slate-50 p-0">
                <Button variant="ghost" className="w-full h-14 rounded-none font-black text-[11px] uppercase tracking-widest text-slate-400 hover:text-[#635bff] hover:bg-blue-50/50 transition-all gap-2 group/btn" asChild>
                  <Link to={`/projects/${cv.projectId}`}>
                    Gérer le CV
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
