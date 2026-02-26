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
import { FileText, Plus, Trash2, CheckCircle2, MoreVertical, Calendar, Briefcase, Zap, ExternalLink } from "lucide-react";
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
    <div className="space-y-8 pb-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Mes CV (Vue Globale)
          </h1>
          <p className="mt-2 text-base text-slate-500">
            Retrouvez tous vos CV organisés par projets.
          </p>
        </div>
        
        <Button asChild className="h-10 gap-2 rounded-full bg-[#635bff] px-6 font-medium text-white shadow-md shadow-blue-500/20 transition-all hover:bg-[#544dc9] hover:shadow-lg hover:shadow-blue-500/30">
          <Link to="/dashboard">
            <Plus className="h-4 w-4" />
            Nouveau Projet
          </Link>
        </Button>
      </div>

      {allCvsWithProject.length === 0 ? (
        <Card className="flex min-h-[400px] flex-col items-center justify-center border-dashed border-slate-300 bg-slate-50/50 text-center shadow-none">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100/50 ring-8 ring-blue-50">
            <FileText className="h-8 w-8 text-[#635bff]" />
          </div>
          <h3 className="mt-6 text-lg font-semibold text-slate-900">Aucun CV pour le moment</h3>
          <p className="mt-2 max-w-sm text-sm text-slate-500">Créez ou ouvrez un projet pour y ajouter des CV.</p>
          <Button asChild className="mt-8 rounded-full bg-[#635bff] px-8 hover:bg-[#544dc9]">
            <Link to="/dashboard">Gérer mes projets</Link>
          </Button>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allCvsWithProject.map((cv) => (
            <Card 
              key={cv.id} 
              className="group relative flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50 border-slate-100"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-600 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600">
                    <FileText className="h-6 w-6" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                         <Link to={`/projects/${cv.projectId}`}>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Voir le projet
                         </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600 focus:text-red-600"
                        onClick={() => removeCvFromProject(cv.projectId, cv.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Supprimer le CV
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardTitle className="mt-4 line-clamp-1 text-lg group-hover:text-blue-600 transition-colors">
                  {cv.name}
                </CardTitle>
                <CardDescription className="flex items-center gap-1.5 mt-1">
                  <Briefcase className="h-3 w-3" />
                  Projet: {cv.projectName}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 space-y-4 pt-0">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Score IA</span>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-none">
                    {cv.score}% match
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Candidatures</span>
                  <span className="font-medium text-slate-900">{cv.applicationsInProgress} en cours</span>
                </div>
              </CardContent>

              <CardFooter className="bg-slate-50/50 border-t border-slate-50 px-6 py-4">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Calendar className="h-3.5 w-3.5" />
                    {cv.lastAnalysis}
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 text-xs font-medium text-[#635bff] hover:bg-blue-50" asChild>
                    <Link to={`/projects/${cv.projectId}`}>
                      Gérer
                    </Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
