import * as React from "react";
import { useNavigate } from "react-router";
import { 
  Plus, 
  FolderKanban, 
  ArrowRight, 
  Clock, 
  FileText, 
  Sparkles,
  Info,
  Trash2
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { useCv } from "~/context/cv-context";
import { useI18n } from "~/i18n/i18n";
import { Badge } from "~/components/ui/badge";

export default function ProjectsIndex() {
  const { projects, addProject, removeProject } = useCv();
  const { t } = useI18n();
  const navigate = useNavigate();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
  const [newProject, setNewProject] = React.useState({ name: "", description: "" });

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProject.name.trim()) {
      addProject(newProject);
      setNewProject({ name: "", description: "" });
      setIsCreateDialogOpen(false);
    }
  };

  const handleRemoveProject = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Voulez-vous vraiment supprimer ce projet et tous ses CV ?")) {
      removeProject(projectId);
    }
  };

  const handleSelectProject = (projectId: string) => {
    // In a real app, you might set the active project in context/localStorage
    navigate(`/dashboard?projectId=${projectId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 lg:p-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">{t("projectsTitle")}</h1>
            <p className="mt-2 text-slate-500">{t("selectProject")}</p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#635bff] hover:bg-[#544dc9] text-white gap-2 shadow-lg shadow-blue-600/10">
                <Plus className="h-4 w-4" />
                {t("newProject")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleCreateProject}>
                <DialogHeader>
                  <DialogTitle>{t("newProject")}</DialogTitle>
                  <DialogDescription>
                    Un projet regroupe vos CV et candidatures pour un objectif spécifique.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-6">
                  <div className="grid gap-2">
                    <Label htmlFor="name">{t("projectName")}</Label>
                    <Input
                      id="name"
                      placeholder="Ex: Recherche Développeur Fullstack"
                      value={newProject.name}
                      onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="description">{t("projectDescription")}</Label>
                      <Badge variant="outline" className="text-[10px] bg-blue-50 text-blue-700 border-blue-100 gap-1">
                        <Sparkles className="h-3 w-3" />
                        {t("crucialForAi")}
                      </Badge>
                    </div>
                    <Textarea
                      id="description"
                      placeholder={t("projectDescriptionPlaceholder")}
                      className="min-h-[120px]"
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    />
                    <p className="text-[12px] text-slate-500 flex items-start gap-1.5 mt-1">
                      <Info className="h-3.5 w-3.5 mt-0.5 text-blue-500 shrink-0" />
                      <span>{t("aiDescriptionNotice")}</span>
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="ghost" onClick={() => setIsCreateDialogOpen(false)}>Annuler</Button>
                  <Button type="submit" className="bg-[#635bff] hover:bg-[#544dc9] text-white">{t("createProject")}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {projects.length === 0 ? (
          <Card className="flex flex-col items-center justify-center border-dashed p-12 text-center bg-white/50">
            <div className="rounded-full bg-blue-50 p-4 mb-4">
              <FolderKanban className="h-10 w-10 text-blue-600" />
            </div>
            <CardTitle className="text-xl">{t("noProjects")}</CardTitle>
            <CardDescription className="max-w-xs mt-2">
              Créez votre premier projet pour commencer à optimiser vos CV et candidatures.
            </CardDescription>
            <Button 
              onClick={() => setIsCreateDialogOpen(true)}
              className="mt-6 bg-[#635bff] hover:bg-[#544dc9] text-white"
            >
              {t("newProject")}
            </Button>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.id} className="group overflow-hidden border-slate-200 transition-all hover:border-blue-300 hover:shadow-md bg-white">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="rounded-lg bg-blue-50 p-2 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <FolderKanban className="h-5 w-5" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-normal">
                        {project.cvs.length} CV{project.cvs.length > 1 ? 's' : ''}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                        onClick={(e) => handleRemoveProject(project.id, e)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight group-hover:text-blue-700 transition-colors">
                    {project.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 mt-1">
                    {project.description || "Aucune description fournie."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{project.createdAt}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      <span>{project.cvs.length} documents</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-slate-50/50 border-t border-slate-100 p-4">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between hover:bg-white hover:text-blue-700"
                    onClick={() => handleSelectProject(project.id)}
                  >
                    {t("openProject")}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
