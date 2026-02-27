// Page de détail d'un projet listant ses CVs.
import * as React from "react";
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
  const { 
    getProject, 
    removeProject, 
    addCvToProject, 
    removeCvFromProject,
    activeProjectId,
    setActiveProjectId
  } = useCv();
  const navigate = useNavigate();
  const project = getProject(id || "");

  // Sincronisation du projet actif
  React.useEffect(() => {
    if (id && id !== activeProjectId) {
      setActiveProjectId(id);
    }
  }, [id, activeProjectId, setActiveProjectId]);

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

  const handleAddCv = (event: React.FormEvent<HTMLFormElement>) => {
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
      <div className="space-y-6 sm:space-y-8 pb-24 sm:pb-12 px-4 sm:px-0">
        {/* Navigation / Header */}
        <div className="flex flex-col gap-5">
          <Link 
            to="/dashboard" 
            className="flex items-center gap-2 text-[11px] font-black text-slate-400 hover:text-[#635bff] transition-colors w-fit uppercase tracking-widest py-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Retour aux projets
          </Link>
          
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start border-b border-slate-100 pb-8">
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 leading-tight">{project.name}</h1>
              <p className="text-sm sm:text-lg text-slate-500 max-w-2xl leading-relaxed font-medium">{project.description}</p>
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <Badge variant="outline" className="bg-slate-50 border-none text-slate-400 py-1.5 px-3 rounded-xl font-bold text-[10px] uppercase tracking-wider">
                  <Clock className="mr-2 h-3.5 w-3.5" />
                  Créé le {project.createdAt}
                </Badge>
                <Badge variant="outline" className="bg-blue-50 border-none text-[#635bff] py-1.5 px-3 rounded-xl font-bold text-[10px] uppercase tracking-wider">
                  <FileText className="mr-2 h-3.5 w-3.5" />
                  {project.cvs.length} CV{project.cvs.length > 1 ? 's' : ''}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex-1 sm:flex-none h-12 sm:h-11 gap-2 rounded-2xl sm:rounded-full bg-[#635bff] px-6 font-black text-sm text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-[#544dc9] active:scale-[0.97]">
                    <Plus className="h-5 w-5 sm:h-4 sm:w-4" />
                    Ajouter un CV
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[92vw] max-w-[450px] rounded-3xl sm:rounded-3xl border-none shadow-2xl p-6">
                  <DialogHeader className="text-left space-y-2">
                    <DialogTitle className="text-xl font-black text-slate-900">Ajouter un CV</DialogTitle>
                    <DialogDescription className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                      Importez ou créez une nouvelle variante de votre CV pour ce projet.
                    </DialogDescription>
                  </DialogHeader>
                  <form className="space-y-6 pt-6" onSubmit={handleAddCv}>
                    <div className="space-y-2.5">
                      <Label htmlFor="name" className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nom du CV</Label>
                      <Input id="name" name="name" placeholder="Ex: CV Fullstack - Version Senior" required className="h-12 rounded-2xl bg-slate-50/50 border-slate-100 focus:bg-white focus:border-[#635bff] focus:ring-[#635bff]/10 font-bold transition-all" />
                    </div>
                    <div className="space-y-2.5">
                      <Label htmlFor="type" className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Type de contrat visé</Label>
                      <Select name="type" defaultValue="cdi">
                        <SelectTrigger className="h-12 rounded-2xl bg-slate-50/50 border-slate-100 focus:bg-white focus:border-[#635bff] focus:ring-[#635bff]/10 font-bold transition-all">
                          <SelectValue placeholder="Choisir un type" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-none shadow-xl">
                          <SelectItem value="cdi" className="font-bold rounded-xl">CDI</SelectItem>
                          <SelectItem value="freelance" className="font-bold rounded-xl">Freelance</SelectItem>
                          <SelectItem value="internship" className="font-bold rounded-xl">Stage / Alternance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" className="w-full h-12 bg-[#635bff] hover:bg-[#544dc9] text-white font-black rounded-2xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all">
                      Ajouter le CV
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="h-12 w-12 sm:h-11 sm:w-11 rounded-2xl sm:rounded-full border-slate-100 bg-slate-50/50 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all active:scale-[0.95]">
                    <MoreVertical className="h-5 w-5 sm:h-4 sm:w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-2xl border-none shadow-2xl p-2">
                  <DropdownMenuItem 
                    className="text-red-500 focus:text-red-600 focus:bg-red-50 py-3 rounded-xl font-bold cursor-pointer transition-colors"
                    onClick={() => {
                      if (confirm("Supprimer ce projet et tous ses CVs ?")) {
                        removeProject(project.id);
                        navigate("/dashboard");
                      }
                    }}
                  >
                    <Trash2 className="mr-3 h-4.5 w-4.5" />
                    Supprimer le projet
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* List of CVs */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">Mes CVs</h2>
          </div>
          {project.cvs.length === 0 ? (
            <Card className="flex min-h-[200px] flex-col items-center justify-center border-2 border-dashed border-slate-100 bg-slate-50/50 text-center shadow-none rounded-3xl p-8">
              <div className="h-16 w-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-slate-300" />
              </div>
              <p className="text-sm text-slate-400 font-bold max-w-[200px]">Aucun CV n'a encore été ajouté à ce projet.</p>
            </Card>
          ) : (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              {project.cvs.map((cv) => (
                <Card key={cv.id} className="group relative overflow-hidden border-none bg-white shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 rounded-3xl active:scale-[0.98] sm:active:scale-[0.99]">
                  <CardHeader className="p-6 sm:p-7 pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#635bff] transition-all group-hover:bg-[#635bff] group-hover:text-white group-hover:rotate-3">
                          <FileText className="h-6 w-6" />
                        </div>
                        <div className="min-w-0">
                          <CardTitle className="text-lg font-black line-clamp-1 text-slate-900 group-hover:text-[#635bff] transition-colors">{cv.name}</CardTitle>
                          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black mt-1">{cv.type}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none font-black text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-lg">
                        {cv.score}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="px-6 sm:px-7 pb-6 pt-0">
                    <div className="flex items-center justify-between border-t border-slate-50 pt-5 mt-2">
                      <div className="flex items-center gap-5 sm:gap-8">
                        <div className="flex flex-col">
                          <span className="text-[9px] uppercase text-slate-300 font-black tracking-widest">Analyse</span>
                          <span className="text-xs font-bold text-slate-500 mt-0.5">{cv.lastAnalysis}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[9px] uppercase text-slate-300 font-black tracking-widest">Postulé</span>
                          <span className="text-xs font-bold text-slate-500 mt-0.5">{cv.applicationsInProgress} fois</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                         <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all active:scale-[0.95]" onClick={() => removeCvFromProject(project.id, cv.id)}>
                            <Trash2 className="h-4.5 w-4.5" />
                         </Button>
                         <Button variant="outline" size="sm" className="h-10 gap-2 text-[10px] font-black uppercase tracking-widest rounded-xl border-slate-100 bg-slate-50/50 hover:bg-white hover:border-[#635bff]/20 transition-all active:scale-[0.95]">
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

        {/* AI Analysis and Jobs matching */}
        <div className="grid gap-6 lg:grid-cols-3">
           <Card className="lg:col-span-2 border-none shadow-sm bg-white overflow-hidden rounded-3xl active:scale-[0.99] transition-transform">
              <CardHeader className="bg-slate-50/30 border-b border-slate-50 p-6 sm:p-7">
                 <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#635bff]/10 rounded-2xl">
                      <Zap className="h-5 w-5 text-[#635bff]" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-black tracking-tight text-slate-900">Analyse IA du Projet</CardTitle>
                 </div>
              </CardHeader>
              <CardContent className="p-6 sm:p-8 space-y-8">
                 <div className="grid gap-8 sm:grid-cols-2">
                    <div className="space-y-4">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Points forts</p>
                       <ul className="space-y-3.5">
                          {['Structure claire', 'Mots-clés pertinents', 'Expériences quantifiées'].map((item, i) => (
                             <li key={i} className="flex items-center gap-4 text-sm text-slate-600 font-bold">
                                <div className="h-6 w-6 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 shadow-sm">
                                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                                </div>
                                {item}
                             </li>
                          ))}
                       </ul>
                    </div>
                    <div className="space-y-4">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Opportunités</p>
                       <ul className="space-y-3.5">
                          {['Ajouter des certifications', 'Détailler les stacks techniques', 'Résumer les soft skills'].map((item, i) => (
                             <li key={i} className="flex items-center gap-4 text-sm text-slate-600 font-bold">
                                <div className="h-6 w-6 rounded-full bg-amber-50 flex items-center justify-center shrink-0 shadow-sm">
                                  <div className="h-2 w-2 rounded-full bg-amber-400" />
                                </div>
                                {item}
                             </li>
                          ))}
                       </ul>
                    </div>
                 </div>
                 <div className="rounded-2xl bg-gradient-to-br from-[#635bff]/5 to-indigo-50/50 p-5 sm:p-6 border border-[#635bff]/10 shadow-inner">
                    <p className="text-sm text-slate-600 leading-relaxed font-bold italic">
                      "Votre profil pour ce projet est solide. Je vous recommande de créer un CV spécifique pour les offres de 'Lead Developer' si vous visez des postes plus seniors."
                    </p>
                 </div>
              </CardContent>
           </Card>

           <Card className="border-none shadow-sm bg-white overflow-hidden rounded-3xl active:scale-[0.99] transition-transform">
              <CardHeader className="bg-[#635bff]/5 border-b border-[#635bff]/10 p-6 sm:p-7">
                 <CardTitle className="text-lg sm:text-xl flex items-center gap-3 font-black tracking-tight text-slate-900">
                    <div className="p-2.5 bg-[#635bff]/10 rounded-2xl">
                      <Briefcase className="h-5 w-5 text-[#635bff]" />
                    </div>
                    Offres Matchées
                 </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                 <div className="divide-y divide-slate-50">
                    {[
                       { company: "NovaTech", role: "Frontend Dev", match: 92 },
                       { company: "BlueWave", role: "React Engineer", match: 88 },
                       { company: "DataSync", role: "JS Architect", match: 85 },
                    ].map((job, i) => (
                       <div key={i} className="flex items-center justify-between px-6 py-5 hover:bg-slate-50 transition-all cursor-pointer group/item active:bg-slate-100">
                          <div className="min-w-0">
                             <p className="text-sm font-black text-slate-900 group-hover/item:text-[#635bff] transition-colors truncate leading-tight">{job.role}</p>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{job.company}</p>
                          </div>
                          <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-lg shrink-0">
                             {job.match}%
                          </Badge>
                       </div>
                    ))}
                 </div>
                 <div className="p-6 sm:p-7">
                    <Button variant="outline" className="w-full text-[10px] font-black uppercase tracking-widest h-12 rounded-2xl border-slate-100 bg-slate-50/50 text-slate-400 hover:text-[#635bff] hover:bg-white hover:border-[#635bff]/20 transition-all active:scale-[0.97]" asChild>
                       <Link to="/jobs">Voir toutes les offres</Link>
                    </Button>
                 </div>
              </CardContent>
           </Card>
        </div>
      </div>
    </AppShell>
  );
}
