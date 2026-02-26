import type { Route } from "./+types/jobs";
import { AppShell } from "~/components/layout/app-shell";
import { useI18n } from "~/i18n/i18n";
import { initialJobOffers } from "~/context/cv-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from "~/components/ui/sheet";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { useState, useEffect } from "react";
import { Form, useSubmit, useNavigation, useSearchParams } from "react-router";
import { cn } from "~/lib/utils";
import { 
  Briefcase, 
  MapPin, 
  Filter, 
  Search, 
  Building2, 
  Clock, 
  ArrowRight, 
  CheckCircle, 
  Globe,
  DollarSign,
  Zap,
  Loader2,
  AlertTriangle,
  ExternalLink,
  Share2,
  Bookmark
} from "lucide-react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";

export const meta: Route.MetaFunction = () => [
  { title: "Honaijob – Offres d’emploi" },
];

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q")?.toLowerCase();
  const location = url.searchParams.get("location");
  const contract = url.searchParams.get("contract");
  const experience = url.searchParams.get("experience");

  // Simulate network delay for realistic feel
  await new Promise(resolve => setTimeout(resolve, 300));

  let filteredJobs = initialJobOffers;

  if (query) {
    filteredJobs = filteredJobs.filter(job => 
      job.title.toLowerCase().includes(query) || 
      job.company.toLowerCase().includes(query)
    );
  }
  if (location && location !== "all") {
    filteredJobs = filteredJobs.filter(job => job.location === location);
  }
  if (contract && contract !== "all") {
    filteredJobs = filteredJobs.filter(job => job.contract === contract);
  }
  if (experience && experience !== "all") {
    filteredJobs = filteredJobs.filter(job => job.experience === experience);
  }

  return { 
    jobs: filteredJobs, 
    locations: Array.from(new Set(initialJobOffers.map(j => j.location))),
    filters: {
      q: query || "",
      location: location || "all",
      contract: contract || "all",
      experience: experience || "all"
    }
  };
}

export default function Jobs({ loaderData }: Route.ComponentProps) {
  return (
    <AppShell>
      <JobsContent data={loaderData} />
    </AppShell>
  );
}

function JobsContent({ data }: { data: Route.ComponentProps["loaderData"] }) {
  const { t } = useI18n();
  const { jobs, locations, filters } = data;
  const submit = useSubmit();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  
  const isSearching = navigation.state === "loading" && navigation.location.pathname === "/jobs";

  const [filtersOpen, setFiltersOpen] = useState(true);
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [isLowMatchAlertOpen, setIsLowMatchAlertOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  // Helper to submit form on change
  const handleFilterChange = (key: string, value: string) => {
    const formData = new FormData();
    // Preserve other params
    if (key !== "q") formData.set("q", filters.q);
    if (key !== "location") formData.set("location", filters.location);
    if (key !== "contract") formData.set("contract", filters.contract);
    if (key !== "experience") formData.set("experience", filters.experience);
    
    // Set new value
    formData.set(key, value);
    
    submit(formData, { method: "get", replace: true });
  };

  const handleApplyClick = (job: any) => {
    setSelectedJob(job);
    if (job.match < 80) {
      setIsLowMatchAlertOpen(true);
    } else {
      setIsApplyDialogOpen(true);
    }
  };

  const confirmApply = () => {
    if (selectedJob) {
      // Enregistrement de la candidature dans le dashboard (simulation ou API)
      console.log(`Candidature enregistrée pour ${selectedJob.title} chez ${selectedJob.company}`);
      
      // Fermeture du dialogue
      setIsApplyDialogOpen(false);
      
      // Redirection vers le site externe (URL réelle de l'offre si disponible, sinon lien factice)
      const externalUrl = selectedJob.externalUrl || "https://www.google.com/search?q=" + encodeURIComponent(selectedJob.title + " " + selectedJob.company);
      window.open(externalUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Header Section */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {t("jobOffersTitle")}
          </h1>
          <p className="mt-2 text-base text-slate-500 max-w-2xl">
            Découvrez les opportunités qui correspondent le mieux à votre profil et vos compétences.
          </p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="hidden sm:flex gap-2" onClick={() => setFiltersOpen(!filtersOpen)}>
            <Filter className="h-4 w-4" />
            Filtres
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px,1fr]">
        {/* Dialogues de confirmation et alertes */}
        <AlertDialog open={isLowMatchAlertOpen} onOpenChange={setIsLowMatchAlertOpen}>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-amber-600">
                <AlertTriangle className="h-5 w-5" />
                Score de correspondance faible
              </AlertDialogTitle>
              <AlertDialogDescription className="text-slate-600">
                Votre profil a un score de {selectedJob?.match}% pour ce poste. Postuler avec un score inférieur à 80% peut réduire vos chances d'être retenu par les systèmes de tri automatique (ATS). 
                <br /><br />
                Souhaitez-vous quand même continuer ou préférez-vous optimiser votre CV pour ce projet ?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-slate-200">Optimiser mon CV</AlertDialogCancel>
              <AlertDialogAction 
                className="bg-amber-600 hover:bg-amber-700 text-white"
                onClick={() => {
                  setIsLowMatchAlertOpen(false);
                  setIsApplyDialogOpen(true);
                }}
              >
                Continuer quand même
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Prêt à postuler ?</AlertDialogTitle>
              <AlertDialogDescription className="text-slate-600">
                Vous allez être redirigé vers le site de <strong>{selectedJob?.company}</strong> pour finaliser votre candidature pour le poste de <strong>{selectedJob?.title}</strong>.
                <br /><br />
                En cliquant sur "Confirmer", nous enregistrerons cette action comme une candidature effectuée dans votre tableau de bord Honaijob.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-slate-200">Annuler</AlertDialogCancel>
              <AlertDialogAction 
                className="bg-[#635bff] hover:bg-[#544dc9] text-white"
                onClick={confirmApply}
              >
                Confirmer et postuler
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Filters Sidebar */}
        <aside className={cn(
          "space-y-6 lg:block",
          filtersOpen ? "block" : "hidden"
        )}>
          <div className="rounded-xl bg-white p-5 shadow-md sticky top-4 border-none">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">Filtres</h2>
              <Button variant="ghost" size="sm" className="h-8 text-xs text-slate-500" onClick={() => {
                const formData = new FormData();
                formData.set("q", "");
                formData.set("location", "all");
                formData.set("contract", "all");
                formData.set("experience", "all");
                submit(formData, { method: "get", replace: true });
              }}>
                Réinitialiser
              </Button>
            </div>
            
            <Form method="get" className="space-y-5" onChange={(e) => {
                // Auto-submit for input changes if needed, but for text input usually wait for enter or debounce
                // For select components, we handle onValueChange separately below
            }}>
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-700">Recherche</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                  <Input 
                    name="q"
                    placeholder="Poste, entreprise..." 
                    className="pl-9 bg-slate-50 border-slate-200 focus:bg-white" 
                    defaultValue={filters.q}
                    onChange={(e) => {
                        // Debounce could be added here
                        // For now, let's submit on Enter or use a button, 
                        // or auto-submit with delay? 
                        // Simple approach: user presses Enter.
                    }}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-700">Localisation</label>
                <Select 
                  name="location" 
                  value={filters.location} 
                  onValueChange={(val) => handleFilterChange("location", val)}
                >
                  <SelectTrigger className="bg-slate-50 border-slate-200">
                    <SelectValue placeholder="Toutes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les villes</SelectItem>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-700">Type de contrat</label>
                <Select 
                  name="contract" 
                  value={filters.contract} 
                  onValueChange={(val) => handleFilterChange("contract", val)}
                >
                  <SelectTrigger className="bg-slate-50 border-slate-200">
                    <SelectValue placeholder="Tous" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les contrats</SelectItem>
                    <SelectItem value="cdi">CDI</SelectItem>
                    <SelectItem value="internship">Stage</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-700">Niveau d'expérience</label>
                <Select 
                  name="experience" 
                  value={filters.experience} 
                  onValueChange={(val) => handleFilterChange("experience", val)}
                >
                  <SelectTrigger className="bg-slate-50 border-slate-200">
                    <SelectValue placeholder="Tous" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous niveaux</SelectItem>
                    <SelectItem value="junior">Junior (0-2 ans)</SelectItem>
                    <SelectItem value="mid">Intermédiaire (2-5 ans)</SelectItem>
                    <SelectItem value="senior">Senior (5+ ans)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Hidden submit button to allow Enter key submission for search */}
              <button type="submit" className="hidden" />
            </Form>
          </div>
        </aside>

        {/* Jobs List */}
        <section className="space-y-6 relative">
          {isSearching && (
             <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center backdrop-blur-[1px]">
               <Loader2 className="h-8 w-8 animate-spin text-primary" />
             </div>
          )}
        
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-600">
              {jobs.length} offre{jobs.length > 1 ? "s" : ""} disponible{jobs.length > 1 ? "s" : ""}
            </h3>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Trier par:</span>
              <span className="font-medium text-slate-900 cursor-pointer">Pertinence</span>
            </div>
          </div>

          <div className="grid gap-4">
            {jobs.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <Briefcase className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                    <h3 className="text-sm font-medium text-slate-900">Aucune offre trouvée</h3>
                    <p className="text-xs text-slate-500 mt-1">Essayez de modifier vos filtres</p>
                    <Button 
                        variant="link" 
                        className="mt-2 text-primary"
                        onClick={() => {
                            const formData = new FormData();
                            formData.set("q", "");
                            formData.set("location", "all");
                            formData.set("contract", "all");
                            formData.set("experience", "all");
                            submit(formData, { method: "get", replace: true });
                        }}
                    >
                        Réinitialiser les filtres
                    </Button>
                </div>
            ) : (
                jobs.map((job) => (
                  <Sheet key={job.id}>
                    <SheetTrigger asChild>
                      <div className="group relative flex cursor-pointer flex-col gap-4 rounded-xl bg-white p-5 shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-start ring-1 ring-slate-900/5 hover:ring-slate-900/10">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 text-base font-bold text-[#635bff] ring-1 ring-slate-100 group-hover:from-blue-100 group-hover:to-indigo-100">
                          {job.company.substring(0, 2).toUpperCase()}
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                            <div>
                              <h3 className="font-semibold text-slate-900 group-hover:text-[#635bff] transition-colors text-lg">
                                {job.title}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-slate-500">
                                <span className="font-medium text-slate-700">{job.company}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {job.location}
                                </span>
                                <span>•</span>
                                <span className="text-slate-400">Il y a 2 jours</span>
                              </div>
                            </div>
                            <Badge className={cn(
                              "w-fit px-3 py-1 text-sm font-medium", 
                              job.match >= 90 ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" : 
                              job.match >= 70 ? "bg-blue-50 text-blue-700 hover:bg-blue-100" : 
                              "bg-amber-50 text-amber-700 hover:bg-amber-100"
                            )}>
                              <Zap className="mr-1 h-3 w-3" />
                              {job.match}% Match
                            </Badge>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 pt-1">
                            <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-normal border-0">
                              <Briefcase className="mr-1 h-3 w-3 text-slate-400" />
                              {job.contract === "cdi" ? "CDI" : job.contract === "freelance" ? "Freelance" : "Stage"}
                            </Badge>
                            <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-normal border-0">
                              <Clock className="mr-1 h-3 w-3 text-slate-400" />
                              {job.experience === "junior" ? "Junior" : job.experience === "mid" ? "Intermédiaire" : "Senior"}
                            </Badge>
                            <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-normal border-0">
                              <DollarSign className="mr-1 h-3 w-3 text-slate-400" />
                              45k - 55k €
                            </Badge>
                          </div>
                        </div>

                        <div className="hidden sm:flex sm:flex-col sm:items-end sm:justify-between">
                           <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600">
                             <ArrowRight className="h-5 w-5" />
                           </Button>
                        </div>
                      </div>
                    </SheetTrigger>
                    
                    <SheetContent className="flex flex-col h-full w-full sm:max-w-xl p-0">
                      <div className="flex-1 overflow-y-auto p-6">
                        <SheetHeader className="space-y-4 pb-6 border-b text-left">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 text-xl font-bold text-[#635bff] ring-1 ring-slate-100">
                                {job.company.substring(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <SheetTitle className="text-xl">{job.title}</SheetTitle>
                                <SheetDescription className="flex items-center gap-2 mt-1 text-base">
                                  <span className="font-medium text-slate-900">{job.company}</span>
                                  <span>•</span>
                                  <span>{job.location}</span>
                                </SheetDescription>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-[#635bff]">
                                <Share2 className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-amber-500">
                                <Bookmark className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-3">
                            <Badge className={cn(
                              "px-3 py-1 text-sm", 
                              job.match >= 90 ? "bg-emerald-50 text-emerald-700" : 
                              job.match >= 70 ? "bg-blue-50 text-blue-700" : 
                              "bg-amber-50 text-amber-700"
                            )}>
                              {job.match}% de correspondance
                            </Badge>
                            <Badge variant="outline" className="border-slate-200 text-slate-700">
                              {job.contract === "cdi" ? "CDI" : "Stage"}
                            </Badge>
                            <Badge variant="outline" className="border-slate-200 text-slate-700">
                              Télétravail partiel
                            </Badge>
                          </div>

                          <div className="pt-2">
                            <Button variant="link" className="p-0 h-auto text-[#635bff] gap-2 text-sm" asChild>
                              <a href="#" target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                                Voir l'annonce originale sur le site du recruteur
                              </a>
                            </Button>
                          </div>
                        </SheetHeader>

                        <div className="py-6 space-y-8">
                          <div className="space-y-3">
                            <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                              <Briefcase className="h-4 w-4 text-[#635bff]" />
                              À propos du poste
                            </h4>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              En tant que {job.title} chez {job.company}, vous rejoindrez une équipe passionnée pour travailler sur des projets innovants. Nous recherchons une personne capable de concevoir des interfaces utilisateurs performantes et accessibles.
                            </p>
                          </div>

                          <div className="space-y-3">
                            <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#635bff]" />
                              Responsabilités
                            </h4>
                            <ul className="text-sm text-slate-600 space-y-2 list-disc pl-4">
                              <li>Développer de nouvelles fonctionnalités avec React et TypeScript</li>
                              <li>Collaborer avec les designers et les PMs</li>
                              <li>Optimiser les performances de l'application</li>
                              <li>Participer aux revues de code et au mentorat</li>
                            </ul>
                          </div>

                          <div className="space-y-3">
                            <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                              <Zap className="h-4 w-4 text-[#635bff]" />
                              Pourquoi vous ?
                            </h4>
                            <div className="rounded-lg bg-blue-50/50 p-4 border border-blue-100">
                               <p className="text-sm text-blue-900 mb-2 font-medium">Points forts de votre profil :</p>
                               <ul className="text-sm text-blue-800 space-y-1">
                                 <li className="flex items-center gap-2">
                                   <CheckCircle className="h-3 w-3 text-blue-600" />
                                   Expérience solide en React (Match)
                                 </li>
                                 <li className="flex items-center gap-2">
                                   <CheckCircle className="h-3 w-3 text-blue-600" />
                                   Connaissance de Tailwind CSS (Match)
                                 </li>
                               </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <SheetFooter className="p-6 bg-white border-t mt-auto shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
                        <div className="flex w-full gap-3">
                          <Button variant="outline" className="flex-1 border-slate-200 hover:bg-slate-50 text-slate-700 h-11">
                            Sauvegarder
                          </Button>
                          <Button 
                            className="flex-1 bg-[#635bff] hover:bg-[#544dc9] text-white shadow-md shadow-blue-500/20 h-11"
                            onClick={() => handleApplyClick(job)}
                          >
                            Postuler maintenant
                          </Button>
                        </div>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
