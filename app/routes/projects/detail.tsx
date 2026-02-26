// Page de détail d'un projet listant ses CVs.
import { useParams, Link, useNavigate } from "react-router";
import { AppShell } from "~/components/layout/app-shell";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { 
  Plus, 
  FileText, 
  ArrowLeft, 
  MoreVertical, 
  Trash2, 
  ExternalLink,
  Zap,
  CheckCircle2,
  Clock,
  Briefcase
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "~/components/ui/dropdown-menu";

export default function ProjectDetail() {
  const { id } = useParams();
  const { getProject, removeProject, addCvToProject, removeCvFromProject } = useCv();
  const navigate = useNavigate();
  const project = getProject(id || "");

  if (!project) {
    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h2 className="text-xl font-bold">Projet non trouvé</h2>
          <Button variant="link" onClick={() => navigate("/dashboard")}>
            Retour au tableau de bord
          </Button>
        </div>
      </AppShell>
    );
  }

  const handleAddCv = (event: React.FormEventHandler<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const type = formData.get("type") as any;
    if (!name) return;

    addCvToProject(project.id, {
      name,
      type,
      score: Math.floor(Math.random() * 30) + 60, // Score simulé
      applicationsInProgress: 0,
    });
    // Fermer le dialog (via state ou reload si nécessaire, ici simple reset)
    event.currentTarget.reset();
  };

  return (
    <AppShell>
      <div className="space-y-8 pb-8">
        {/* Navigation / Header */}
        <div className="flex flex-col gap-4">
          <Link 
            to="/dashboard" 
            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#635bff] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux projets
          </Link>
          
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">{project.name}</h1>
              <p className="text-lg text-slate-500 max-w-2xl">{project.description}</p>
              <div className="flex items-center gap-4 mt-4">
                <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-500">
                  <Clock className="mr-1.5 h-3.5 w-3.5" />
                  Créé le {project.createdAt}
                </Badge>
                <Badge variant="outline" className="bg-blue-50 border-blue-100 text-blue-600">
                  <FileText className="mr-1.5 h-3.5 w-3.5" />
                  {project.cvs.length} CV{project.cvs.length > 1 ? 's' : ''}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="h-10 gap-2 rounded-full bg-[#635bff] px-6 font-medium text-white shadow-md shadow-blue-500/20 transition-all hover:bg-[#544dc9]">
                    <Plus className="h-4 w-4" />
                    Ajouter un CV
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Ajouter un CV au projet</DialogTitle>
                    <DialogDescription>
                      Importez ou créez une nouvelle variante de votre CV pour ce projet.
                    </DialogDescription>
                  </DialogHeader>
                  <form className="space-y-4 pt-4" onSubmit={handleAddCv}>
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom du CV</Label>
                      <Input id="name" name="name" placeholder="Ex: CV Fullstack - Version Senior" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Type de contrat visé</Label>
                      <Select name="type" defaultValue="cdi">
                        <SelectTrigger>
                          <SelectValue placeholder="Choisir un type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cdi">CDI</SelectItem>
                          <SelectItem value="freelance">Freelance</SelectItem>
                          <SelectItem value="internship">Stage / Alternance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" className="w-full bg-[#635bff] hover:bg-[#544dc9]">
                      Ajouter le CV
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem 
                    className="text-red-600 focus:text-red-600"
                    onClick={() => {
                      if (confirm("Supprimer ce projet et tous ses CVs ?")) {
                        removeProject(project.id);
                        navigate("/dashboard");
                      }
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Supprimer le projet
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* List of CVs */}
        <div className="grid gap-6">
          <h2 className="text-xl font-bold text-slate-900">CVs dans ce projet</h2>
          {project.cvs.length === 0 ? (
            <Card className="flex min-h-[200px] flex-col items-center justify-center border-dashed border-slate-300 bg-slate-50/50 text-center shadow-none">
              <FileText className="h-8 w-8 text-slate-400" />
              <p className="mt-2 text-sm text-slate-500">Aucun CV n'a encore été ajouté à ce projet.</p>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {project.cvs.map((cv) => (
                <Card key={cv.id} className="group relative overflow-hidden border-none bg-white shadow-sm transition-all hover:shadow-md">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-base font-bold">{cv.name}</CardTitle>
                          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-0.5">{cv.type}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-slate-50 text-slate-600">
                        Score IA: {cv.score}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between border-t border-slate-50 pt-4 mt-2">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase text-slate-400 font-bold">Dernière analyse</span>
                          <span className="text-xs font-medium text-slate-600">{cv.lastAnalysis}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase text-slate-400 font-bold">Candidatures</span>
                          <span className="text-xs font-medium text-slate-600">{cv.applicationsInProgress} en cours</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                         <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600" onClick={() => removeCvFromProject(project.id, cv.id)}>
                            <Trash2 className="h-4 w-4" />
                         </Button>
                         <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs font-medium">
                            <ExternalLink className="h-3.5 w-3.5" />
                            Détails
                         </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* AI Analysis for this project */}
        <div className="grid gap-6 lg:grid-cols-3">
           <Card className="lg:col-span-2 border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                 <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-[#635bff]" />
                    <CardTitle className="text-lg">Analyse IA du Projet</CardTitle>
                 </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                 <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                       <p className="text-sm font-semibold text-slate-900">Points forts du projet</p>
                       <ul className="space-y-1.5">
                          {['Structure claire', 'Mots-clés pertinents', 'Expériences quantifiées'].map((item, i) => (
                             <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                {item}
                             </li>
                          ))}
                       </ul>
                    </div>
                    <div className="space-y-2">
                       <p className="text-sm font-semibold text-slate-900">Opportunités d'amélioration</p>
                       <ul className="space-y-1.5">
                          {['Ajouter des certifications', 'Détailler les stacks techniques', 'Résumer les soft skills'].map((item, i) => (
                             <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                                <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                                {item}
                             </li>
                          ))}
                       </ul>
                    </div>
                 </div>
                 <div className="rounded-xl bg-blue-50/50 p-4 border border-blue-100">
                    <p className="text-sm text-blue-800 leading-relaxed italic">
                       "Votre profil pour ce projet est solide. Je vous recommande de créer un CV spécifique pour les offres de 'Lead Developer' si vous visez des postes plus seniors dans ce projet."
                    </p>
                 </div>
              </CardContent>
           </Card>

           <Card className="border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="bg-[#635bff]/5 border-b border-[#635bff]/10">
                 <CardTitle className="text-lg flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-[#635bff]" />
                    Offres Matchées
                 </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 px-0">
                 <div className="divide-y divide-slate-50">
                    {[
                       { company: "NovaTech", role: "Frontend Dev", match: 92 },
                       { company: "BlueWave", role: "React Engineer", match: 88 },
                       { company: "DataSync", role: "JS Architect", match: 85 },
                    ].map((job, i) => (
                       <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                          <div>
                             <p className="text-sm font-bold text-slate-900">{job.role}</p>
                             <p className="text-xs text-slate-500">{job.company}</p>
                          </div>
                          <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-none">
                             {job.match}% match
                          </Badge>
                       </div>
                    ))}
                 </div>
                 <div className="px-6 py-4">
                    <Button variant="link" className="w-full text-slate-400 hover:text-[#635bff] text-xs h-auto p-0">
                       Voir toutes les offres compatibles
                    </Button>
                 </div>
              </CardContent>
           </Card>
        </div>
      </div>
    </AppShell>
  );
}
