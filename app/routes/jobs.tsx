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
    <div className="space-y-6 sm:space-y-8 pb-10 sm:pb-8">
      {/* Header Section */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between px-1 sm:px-0">
        <div className="space-y-2 sm:space-y-3">
          <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl leading-tight">
            {t("jobOffersTitle")}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-500 max-w-2xl font-medium leading-relaxed">
            Découvrez les opportunités qui correspondent le mieux à votre profil et vos compétences.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <Button 
             variant="outline" 
             className={cn(
               "flex-1 sm:flex-none gap-2 h-12 sm:h-11 px-6 rounded-2xl sm:rounded-full font-black text-sm transition-all active:scale-[0.97]",
               filtersOpen ? "bg-slate-100 border-slate-200 text-slate-900" : "bg-white border-slate-200 text-slate-600 hover:text-[#635bff] hover:border-[#635bff]/30"
             )}
             onClick={() => setFiltersOpen(!filtersOpen)}
           >
            <Filter className="h-4 w-4" />
            {filtersOpen ? "Masquer les filtres" : "Afficher les filtres"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-[300px,1fr]">
        {/* Dialogues de confirmation et alertes */}
        <AlertDialog open={isLowMatchAlertOpen} onOpenChange={setIsLowMatchAlertOpen}>
          <AlertDialogContent className="bg-white rounded-3xl sm:rounded-2xl border-none p-6 sm:p-8 max-w-[90vw] sm:max-w-lg">
            <AlertDialogHeader className="space-y-4">
              <div className="mx-auto sm:mx-0 w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
              <AlertDialogTitle className="text-xl sm:text-2xl font-black text-slate-900 leading-tight text-center sm:text-left">
                Score de correspondance faible
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed text-center sm:text-left">
                Votre profil a un score de <span className="text-amber-600 font-black">{selectedJob?.match}%</span> pour ce poste. Postuler avec un score inférieur à 80% peut réduire vos chances d'être retenu par les systèmes de tri automatique (ATS). 
                <br /><br />
                Souhaitez-vous quand même continuer ou préférez-vous optimiser votre CV pour ce projet ?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col sm:flex-row gap-3 mt-8">
              <AlertDialogCancel className="w-full sm:w-auto h-12 sm:h-11 rounded-2xl sm:rounded-full border-slate-200 font-black text-sm order-2 sm:order-1 active:scale-[0.97] transition-all">
                Optimiser mon CV
              </AlertDialogCancel>
              <AlertDialogAction 
                className="w-full sm:w-auto h-12 sm:h-11 rounded-2xl sm:rounded-full bg-amber-600 hover:bg-amber-700 text-white font-black text-sm order-1 sm:order-2 active:scale-[0.97] transition-all"
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
          <AlertDialogContent className="bg-white rounded-3xl sm:rounded-2xl border-none p-6 sm:p-8 max-w-[90vw] sm:max-w-lg">
            <AlertDialogHeader className="space-y-4">
              <div className="mx-auto sm:mx-0 w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-[#635bff]" />
              </div>
              <AlertDialogTitle className="text-xl sm:text-2xl font-black text-slate-900 leading-tight text-center sm:text-left">
                Prêt à postuler ?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed text-center sm:text-left">
                Vous allez être redirigé vers le site de <strong className="text-slate-900">{selectedJob?.company}</strong> pour finaliser votre candidature pour le poste de <strong className="text-slate-900">{selectedJob?.title}</strong>.
                <br /><br />
                En cliquant sur "Confirmer", nous enregistrerons cette action comme une candidature effectuée dans votre tableau de bord Honaijob.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col sm:flex-row gap-3 mt-8">
              <AlertDialogCancel className="w-full sm:w-auto h-12 sm:h-11 rounded-2xl sm:rounded-full border-slate-200 font-black text-sm order-2 sm:order-1 active:scale-[0.97] transition-all">
                Annuler
              </AlertDialogCancel>
              <AlertDialogAction 
                className="w-full sm:w-auto h-12 sm:h-11 rounded-2xl sm:rounded-full bg-[#635bff] hover:bg-[#544dc9] text-white font-black text-sm order-1 sm:order-2 shadow-lg shadow-blue-500/20 active:scale-[0.97] transition-all"
                onClick={confirmApply}
              >
                Confirmer et postuler
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Filters Sidebar */}
        <aside className={cn(
          "space-y-6 lg:block transition-all duration-300",
          filtersOpen ? "block animate-in fade-in slide-in-from-top-4" : "hidden"
        )}>
          <div className="rounded-[2rem] sm:rounded-3xl bg-white p-6 sm:p-7 shadow-sm lg:sticky lg:top-4 border-none ring-1 ring-slate-100">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest text-[10px] sm:text-xs">Filtres</h2>
              <Button variant="ghost" size="sm" className="h-9 px-4 rounded-xl text-xs font-black text-slate-400 hover:text-[#635bff] hover:bg-blue-50 transition-colors" onClick={() => {
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
            
            <Form method="get" className="space-y-6">
              <div className="space-y-2.5">
                <label className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Recherche</label>
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-[#635bff] transition-colors" />
                  <Input 
                    name="q"
                    placeholder="Poste, entreprise..." 
                    className="pl-11 bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-[#635bff] text-sm h-12 sm:h-11 rounded-2xl sm:rounded-xl transition-all font-medium" 
                    defaultValue={filters.q}
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Localisation</label>
                <Select 
                  name="location" 
                  value={filters.location} 
                  onValueChange={(val) => handleFilterChange("location", val)}
                >
                  <SelectTrigger className="bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-[#635bff] text-sm h-12 sm:h-11 rounded-2xl sm:rounded-xl transition-all font-medium">
                    <SelectValue placeholder="Toutes" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-none shadow-xl">
                    <SelectItem value="all" className="rounded-xl">Toutes les villes</SelectItem>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc} className="rounded-xl">{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2.5">
                <label className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Type de contrat</label>
                <Select 
                  name="contract" 
                  value={filters.contract} 
                  onValueChange={(val) => handleFilterChange("contract", val)}
                >
                  <SelectTrigger className="bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-[#635bff] text-sm h-12 sm:h-11 rounded-2xl sm:rounded-xl transition-all font-medium">
                    <SelectValue placeholder="Tous" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-none shadow-xl">
                    <SelectItem value="all" className="rounded-xl">Tous les contrats</SelectItem>
                    <SelectItem value="cdi" className="rounded-xl">CDI</SelectItem>
                    <SelectItem value="internship" className="rounded-xl">Stage</SelectItem>
                    <SelectItem value="freelance" className="rounded-xl">Freelance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2.5">
                <label className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Niveau d'expérience</label>
                <Select 
                  name="experience" 
                  value={filters.experience} 
                  onValueChange={(val) => handleFilterChange("experience", val)}
                >
                  <SelectTrigger className="bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-[#635bff] text-sm h-12 sm:h-11 rounded-2xl sm:rounded-xl transition-all font-medium">
                    <SelectValue placeholder="Tous" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-none shadow-xl">
                    <SelectItem value="all" className="rounded-xl">Tous niveaux</SelectItem>
                    <SelectItem value="junior" className="rounded-xl">Junior (0-2 ans)</SelectItem>
                    <SelectItem value="mid" className="rounded-xl">Intermédiaire (2-5 ans)</SelectItem>
                    <SelectItem value="senior" className="rounded-xl">Senior (5+ ans)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <button type="submit" className="hidden" />
            </Form>
          </div>
        </aside>

        {/* Jobs List */}
        <section className="space-y-6 relative">
          {isSearching && (
             <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center backdrop-blur-[2px] rounded-3xl">
               <div className="bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3">
                 <Loader2 className="h-6 w-6 animate-spin text-[#635bff]" />
                 <span className="font-black text-sm uppercase tracking-widest text-slate-900">Recherche...</span>
               </div>
             </div>
          )}
        
          <div className="flex items-center justify-between px-2 sm:px-0">
            <h3 className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">
              {jobs.length} offre{jobs.length > 1 ? "s" : ""} disponible{jobs.length > 1 ? "s" : ""}
            </h3>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">
              <span>Trier par:</span>
              <span className="text-[#635bff] cursor-pointer hover:underline underline-offset-4 transition-all">Pertinence</span>
            </div>
          </div>

          <div className="grid gap-5">
            {jobs.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[2.5rem] border-none ring-1 ring-slate-100 shadow-sm">
                    <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                      <Briefcase className="h-10 w-10 text-slate-200" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 leading-tight mb-2">Aucune offre trouvée</h3>
                    <p className="text-sm text-slate-500 font-medium mb-8 max-w-xs mx-auto">Essayez de modifier vos filtres pour voir plus d'opportunités.</p>
                    <Button 
                        variant="outline" 
                        className="h-12 px-8 rounded-2xl border-slate-200 font-black text-sm hover:bg-slate-50 active:scale-[0.97] transition-all"
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
                      <div className="group relative flex cursor-pointer flex-col gap-4 sm:gap-6 rounded-[2rem] bg-white p-6 sm:p-7 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 sm:flex-row sm:items-start border-none ring-1 ring-slate-100 hover:ring-[#635bff]/20 active:scale-[0.98] sm:active:scale-[0.99]">
                        <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-lg sm:text-xl font-black text-[#635bff] ring-1 ring-blue-100/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                          {job.company.substring(0, 2).toUpperCase()}
                        </div>
                        
                        <div className="flex-1 space-y-3 sm:space-y-4">
                          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                            <div className="min-w-0">
                              <h3 className="font-black text-slate-900 group-hover:text-[#635bff] transition-colors text-lg sm:text-xl leading-tight truncate">
                                {job.title}
                              </h3>
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[11px] sm:text-sm font-bold text-slate-400">
                                <span className="text-slate-900 font-black truncate max-w-[150px] sm:max-w-none">{job.company}</span>
                                <span className="text-slate-200 hidden sm:inline">•</span>
                                <span className="flex items-center gap-1.5 truncate">
                                  <MapPin className="h-3.5 w-3.5 text-slate-300" />
                                  {job.location}
                                </span>
                                <span className="text-slate-200 hidden sm:inline">•</span>
                                <span className="text-slate-300 shrink-0 uppercase tracking-widest text-[10px]">Il y a 2 j</span>
                              </div>
                            </div>
                            <Badge className={cn(
                              "w-fit px-3 py-1 text-[10px] sm:text-xs font-black uppercase tracking-wider rounded-lg shrink-0 shadow-sm border-none", 
                              job.match >= 90 ? "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white" : 
                              job.match >= 70 ? "bg-blue-50 text-[#635bff] group-hover:bg-[#635bff] group-hover:text-white" : 
                              "bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white"
                            )}>
                              <Zap className="mr-1.5 h-3 w-3" />
                              {job.match}% Match
                            </Badge>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 pt-1">
                            <Badge variant="secondary" className="bg-slate-50 text-slate-500 font-bold border-0 text-[10px] sm:text-xs px-3 py-1 rounded-lg uppercase tracking-widest">
                              <Briefcase className="mr-2 h-3 w-3 text-slate-300" />
                              {job.contract === "cdi" ? "CDI" : job.contract === "freelance" ? "Freelance" : "Stage"}
                            </Badge>
                            <Badge variant="secondary" className="bg-slate-50 text-slate-500 font-bold border-0 text-[10px] sm:text-xs px-3 py-1 rounded-lg uppercase tracking-widest">
                              <Clock className="mr-2 h-3 w-3 text-slate-300" />
                              {job.experience === "junior" ? "Junior" : job.experience === "mid" ? "Intermédiaire" : "Senior"}
                            </Badge>
                            <Badge variant="secondary" className="bg-slate-50 text-slate-500 font-bold border-0 text-[10px] sm:text-xs px-3 py-1 rounded-lg uppercase tracking-widest">
                              <DollarSign className="mr-2 h-3 w-3 text-slate-300" />
                              45k - 55k €
                            </Badge>
                          </div>
                        </div>

                        <div className="hidden sm:flex sm:flex-col sm:items-end sm:justify-center">
                           <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-50 group-hover:text-[#635bff] transition-all">
                             <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
                           </div>
                        </div>
                      </div>
                    </SheetTrigger>
                    
                    <SheetContent side="bottom" className="flex flex-col h-[94vh] w-full sm:h-full sm:max-w-xl p-0 border-none sm:border-l rounded-t-[2.5rem] sm:rounded-none bg-white overflow-hidden shadow-2xl">
                      <div className="flex-1 overflow-y-auto px-6 py-8 sm:p-10 pb-40">
                        <SheetHeader className="space-y-6 sm:space-y-8 pb-8 sm:pb-10 border-b border-slate-50 text-left">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                            <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-2xl sm:text-3xl font-black text-[#635bff] ring-1 ring-blue-100/50 shadow-inner">
                              {job.company.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="min-w-0 space-y-2">
                              <SheetTitle className="text-2xl sm:text-3xl font-black leading-tight text-slate-900">{job.title}</SheetTitle>
                              <SheetDescription className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-1 text-sm sm:text-lg font-bold">
                                <span className="text-slate-900 font-black">{job.company}</span>
                                <span className="text-slate-200 hidden sm:inline">•</span>
                                <span className="flex items-center gap-2 text-slate-400">
                                  <MapPin className="h-4 w-4 text-slate-300" />
                                  {job.location}
                                </span>
                              </SheetDescription>
                            </div>
                          </div>

                          <div className="flex items-center justify-between gap-4">
                            <div className="flex flex-wrap gap-2.5">
                              <Badge className={cn(
                                "px-4 py-1.5 text-xs sm:text-sm font-black uppercase tracking-widest rounded-xl shadow-sm border-none", 
                                job.match >= 90 ? "bg-emerald-50 text-emerald-600" : 
                                job.match >= 70 ? "bg-blue-50 text-[#635bff]" : 
                                "bg-amber-50 text-amber-600"
                              )} variant="outline">
                                <Zap className="mr-2 h-3.5 w-3.5" />
                                {job.match}% Match
                              </Badge>
                              <Badge variant="secondary" className="bg-slate-50 text-slate-500 border-0 text-xs sm:text-sm px-4 py-1.5 rounded-xl font-black uppercase tracking-widest">
                                {job.contract === "cdi" ? "CDI" : "Stage"}
                              </Badge>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button variant="outline" size="icon" className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl border-slate-200 text-slate-400 hover:text-[#635bff] hover:bg-blue-50 hover:border-blue-100 transition-all active:scale-[0.95]">
                                <Share2 className="h-5 w-5" />
                              </Button>
                              <Button variant="outline" size="icon" className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl border-slate-200 text-slate-400 hover:text-amber-500 hover:bg-amber-50 hover:border-amber-100 transition-all active:scale-[0.95]">
                                <Bookmark className="h-5 w-5" />
                              </Button>
                            </div>
                          </div>

                          <div className="pt-2">
                            <Button variant="link" className="p-0 h-auto text-[#635bff] hover:text-[#544dc9] gap-2.5 text-sm sm:text-base font-black uppercase tracking-widest" asChild>
                              <a href="#" target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4.5 w-4.5" />
                                Voir l'annonce originale
                              </a>
                            </Button>
                          </div>
                        </SheetHeader>

                        <div className="py-8 sm:py-10 space-y-10 sm:space-y-12">
                          <div className="space-y-5">
                            <h4 className="font-black text-slate-900 flex items-center gap-3 text-sm sm:text-base uppercase tracking-widest">
                              <div className="h-8 w-8 rounded-xl bg-blue-50 flex items-center justify-center">
                                <Briefcase className="h-4.5 w-4.5 text-[#635bff]" />
                              </div>
                              À propos du poste
                            </h4>
                            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
                              En tant que <span className="text-slate-900 font-black">{job.title}</span> chez <span className="text-slate-900 font-black">{job.company}</span>, vous rejoindrez une équipe passionnée pour travailler sur des projets innovants. Nous recherchons une personne capable de concevoir des interfaces utilisateurs performantes et accessibles.
                            </p>
                          </div>

                          <div className="space-y-5">
                            <h4 className="font-black text-slate-900 flex items-center gap-3 text-sm sm:text-base uppercase tracking-widest">
                              <div className="h-8 w-8 rounded-xl bg-emerald-50 flex items-center justify-center">
                                <CheckCircle className="h-4.5 w-4.5 text-emerald-500" />
                              </div>
                              Responsabilités
                            </h4>
                            <ul className="space-y-4">
                              {[
                                "Développer de nouvelles fonctionnalités avec React et TypeScript",
                                "Collaborer avec les designers et les PMs",
                                "Optimiser les performances de l'application",
                                "Participer aux revues de code et au mentorat"
                              ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors group">
                                  <div className="h-6 w-6 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                                    <div className="h-2 w-2 rounded-full bg-[#635bff]" />
                                  </div>
                                  <span className="text-sm sm:text-base text-slate-700 font-bold leading-relaxed">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="space-y-5">
                            <h4 className="font-black text-slate-900 flex items-center gap-3 text-sm sm:text-base uppercase tracking-widest">
                              <div className="h-8 w-8 rounded-xl bg-blue-50 flex items-center justify-center">
                                <Zap className="h-4.5 w-4.5 text-[#635bff]" />
                              </div>
                              Pourquoi vous ?
                            </h4>
                            <div className="rounded-[2rem] bg-gradient-to-br from-blue-50 to-indigo-50 p-6 sm:p-8 border border-blue-100/50 shadow-sm relative overflow-hidden group">
                               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500">
                                 <Zap className="h-32 w-32 text-[#635bff]" />
                               </div>
                               <p className="text-[10px] sm:text-xs font-black text-[#635bff] uppercase tracking-[0.2em] mb-4">Points forts de votre profil</p>
                               <ul className="space-y-4 relative z-10">
                                 <li className="flex items-center gap-4 text-sm sm:text-base text-slate-900 font-black">
                                   <div className="h-8 w-8 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                                     <CheckCircle className="h-5 w-5 text-emerald-500" />
                                   </div>
                                   Expérience solide en React (Match)
                                 </li>
                                 <li className="flex items-center gap-4 text-sm sm:text-base text-slate-900 font-black">
                                   <div className="h-8 w-8 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                                     <CheckCircle className="h-5 w-5 text-emerald-500" />
                                   </div>
                                   Connaissance de Tailwind CSS (Match)
                                 </li>
                               </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <SheetFooter className="fixed bottom-0 left-0 right-0 p-6 pb-10 sm:static sm:p-10 bg-white/80 backdrop-blur-xl border-t border-slate-50 shadow-[0_-20px_50px_rgba(0,0,0,0.05)] z-50">
                        <div className="flex w-full gap-4 max-w-lg mx-auto">
                          <Button variant="outline" className="flex-1 border-slate-200 hover:bg-slate-50 text-slate-900 h-14 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-[0.97]">
                            Sauvegarder
                          </Button>
                          <Button 
                            className="flex-[2] bg-[#635bff] hover:bg-[#544dc9] text-white shadow-xl shadow-blue-500/25 h-14 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-[0.97]"
                            onClick={() => handleApplyClick(job)}
                          >
                            Postuler
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
