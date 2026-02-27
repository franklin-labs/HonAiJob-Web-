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
  const { projects, addProject, removeProject, setActiveProjectId } = useCv();
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
      // Redirection automatique vers le dashboard du nouveau projet (géré dans CvContext via setActiveProjectId)
      navigate("/dashboard");
    }
  };

  const handleRemoveProject = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Voulez-vous vraiment supprimer ce projet et tous ses CV ?")) {
      removeProject(projectId);
    }
  };

  const handleSelectProject = (projectId: string) => {
    setActiveProjectId(projectId);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-12 pb-24 lg:pb-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 sm:mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">{t("projectsTitle")}</h1>
            <p className="text-sm sm:text-base text-slate-500 font-medium">{t("selectProject")}</p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto bg-[#635bff] hover:bg-[#544dc9] text-white gap-2 shadow-lg shadow-blue-600/20 h-12 sm:h-11 rounded-2xl sm:rounded-full px-6 font-black active:scale-[0.97] transition-all">
                <Plus className="h-5 w-5 sm:h-4 sm:w-4" />
                {t("newProject")}
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[92vw] max-w-[500px] rounded-3xl sm:rounded-3xl border-none shadow-2xl p-6">
              <form onSubmit={handleCreateProject}>
                <DialogHeader className="text-left space-y-2">
                  <DialogTitle className="text-xl font-black text-slate-900">{t("newProject")}</DialogTitle>
                  <DialogDescription className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                    Un projet regroupe vos CV et candidatures pour un objectif spécifique.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-6">
                  <div className="grid gap-2.5">
                    <Label htmlFor="name" className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t("projectName")}</Label>
                    <Input
                      id="name"
                      placeholder="Ex: Recherche Développeur Fullstack"
                      value={newProject.name}
                      onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                      required
                      className="h-12 rounded-2xl bg-slate-50/50 border-slate-100 focus:bg-white focus:border-[#635bff] focus:ring-[#635bff]/10 font-bold transition-all"
                    />
                  </div>
                  <div className="grid gap-2.5">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="description" className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t("projectDescription")}</Label>
                      <Badge variant="outline" className="text-[9px] font-black uppercase tracking-wider bg-blue-50 text-[#635bff] border-none gap-1 px-2 py-0.5 rounded-lg">
                        <Sparkles className="h-3 w-3" />
                        {t("crucialForAi")}
                      </Badge>
                    </div>
                    <Textarea
                      id="description"
                      placeholder={t("projectDescriptionPlaceholder")}
                      className="min-h-[120px] rounded-2xl bg-slate-50/50 border-slate-100 focus:bg-white focus:border-[#635bff] focus:ring-[#635bff]/10 font-bold transition-all resize-none p-4"
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    />
                    <p className="text-[10px] sm:text-[11px] text-slate-400 flex items-start gap-2 mt-1 leading-relaxed font-bold">
                      <Info className="h-4 w-4 mt-0.5 text-blue-400 shrink-0" />
                      <span>{t("aiDescriptionNotice")}</span>
                    </p>
                  </div>
                </div>
                <DialogFooter className="flex flex-col gap-3 sm:flex-row pt-2">
                  <Button type="button" variant="ghost" onClick={() => setIsCreateDialogOpen(false)} className="h-12 rounded-2xl font-black uppercase tracking-widest text-xs text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
                    Annuler
                  </Button>
                  <Button type="submit" className="h-12 bg-[#635bff] hover:bg-[#544dc9] text-white font-black rounded-2xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all">
                    {t("createProject")}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {projects.length === 0 ? (
          <Card className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 p-8 sm:p-16 text-center bg-white/50 rounded-3xl shadow-sm">
            <div className="rounded-2xl bg-blue-50 p-5 mb-6 shadow-inner">
              <FolderKanban className="h-10 w-10 sm:h-12 sm:w-12 text-[#635bff]" />
            </div>
            <CardTitle className="text-xl sm:text-2xl font-black text-slate-900">{t("noProjects")}</CardTitle>
            <CardDescription className="max-w-xs mt-3 text-sm sm:text-base font-medium text-slate-500 leading-relaxed">
              Créez votre premier projet pour commencer à optimiser vos CV et candidatures.
            </CardDescription>
            <Button 
              onClick={() => setIsCreateDialogOpen(true)}
              className="mt-8 sm:mt-10 w-full sm:w-auto bg-[#635bff] hover:bg-[#544dc9] text-white h-12 px-10 rounded-2xl font-black shadow-lg shadow-blue-600/20 active:scale-[0.97] transition-all"
            >
              {t("newProject")}
            </Button>
          </Card>
        ) : (
          <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card 
                key={project.id} 
                className="group overflow-hidden border-none shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 bg-white rounded-3xl cursor-pointer active:scale-[0.98] sm:active:scale-[0.99]"
                onClick={() => handleSelectProject(project.id)}
              >
                <CardHeader className="p-6 sm:p-7 pb-4">
                  <div className="flex items-start justify-between mb-5">
                    <div className="rounded-2xl bg-blue-50 p-3 text-[#635bff] group-hover:bg-[#635bff] group-hover:text-white transition-all group-hover:rotate-3">
                      <FolderKanban className="h-6 w-6" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-slate-50 text-slate-400 font-black px-2.5 py-1 text-[10px] uppercase tracking-wider rounded-lg border-none">
                        {project.cvs.length} CV{project.cvs.length > 1 ? 's' : ''}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        onClick={(e) => handleRemoveProject(project.id, e)}
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-lg sm:text-xl leading-tight group-hover:text-[#635bff] transition-colors font-black text-slate-900 line-clamp-1">
                    {project.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 mt-2 text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                    {project.description || "Aucune description fournie."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-6 sm:px-7 pt-0 pb-6">
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{project.createdAt}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-3.5 w-3.5" />
                      <span>{project.cvs.length} documents</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-slate-50/50 border-t border-slate-50 p-4 sm:p-5 group-hover:bg-blue-50/30 transition-all">
                  <div className="w-full flex items-center justify-between text-xs sm:text-sm font-black uppercase tracking-widest text-slate-400 group-hover:text-[#635bff] transition-colors">
                    {t("openProject")}
                    <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
