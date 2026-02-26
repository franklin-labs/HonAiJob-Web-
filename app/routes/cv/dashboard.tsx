import { AppShell } from "~/components/layout/app-shell";
import { useCv } from "~/context/cv-context";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "~/components/ui/card";
import { Plus, Upload, Wand2, FileText, Trash2, Edit, Calendar, MoreVertical, Loader2, Check, ChevronsUpDown } from "lucide-react";
import { useNavigate } from "react-router";
import { initialCV } from "~/types/cv";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useState, useRef } from "react";
import { generateCV } from "~/lib/cv-generator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";

const SECTORS = [
  "Tech / Informatique",
  "Marketing / Communication",
  "Finance / Banque",
  "Design / Création",
  "Management / Gestion",
  "Santé / Médical",
  "Vente / Commerce",
  "Immobilier",
  "Construction / BTP",
  "Éducation / Enseignement",
  "Ingénierie",
  "Logistique / Transport",
  "Restauration / Hôtellerie",
  "Tourisme",
  "Art / Culture",
  "Droit / Juridique",
  "Ressources Humaines",
  "Service Client",
  "Administration / Secrétariat",
  "Agriculture / Environnement",
  "Média / Journalisme",
  "Sport / Loisirs",
  "Artisanat",
  "Automobile",
  "Luxe / Mode",
  "Recherche / Sciences",
  "Social / Services à la personne",
  "Autre"
];

export default function CVDashboard() {
  return (
    <AppShell>
      <CVDashboardContent />
    </AppShell>
  );
}

function CVDashboardContent() {
  const { builderCvs, addBuilderCv, deleteBuilderCv } = useCv();
  const navigate = useNavigate();
  
  // Create Dialog State
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newCvTitle, setNewCvTitle] = useState("");
  
  // AI Dialog State
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false);
  const [aiJobTitle, setAiJobTitle] = useState("");
  const [aiExperience, setAiExperience] = useState("junior");
  const [aiSkills, setAiSkills] = useState("");
  const [aiIndustry, setAiIndustry] = useState("");
  const [customIndustry, setCustomIndustry] = useState("");
  const [isSectorOpen, setIsSectorOpen] = useState(false);
  const [aiDescription, setAiDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // File Upload Ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    const id = crypto.randomUUID();
    const newCv = {
      ...initialCV,
      id,
      title: newCvTitle || "Mon nouveau CV",
      lastModified: Date.now(),
    };
    addBuilderCv(newCv);
    setIsCreateDialogOpen(false);
    navigate(`/cv/builder/${id}`);
  };

  const handleAIGenerate = async () => {
    setIsGenerating(true);
    // Simulate AI delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const finalIndustry = aiIndustry === "Autre" ? customIndustry : aiIndustry;
    const cv = generateCV(aiJobTitle || "Professionnel", aiExperience, aiSkills, finalIndustry, aiDescription);
    addBuilderCv(cv);
    
    setIsGenerating(false);
    setIsAIDialogOpen(false);
    navigate(`/cv/builder/${cv.id}`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In a real app, we would send this file to a server to parse it
    // For now, we just create a CV with the filename
    const id = crypto.randomUUID();
    const newCv = {
      ...initialCV,
      id,
      title: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
      lastModified: Date.now(),
    };
    addBuilderCv(newCv);
    navigate(`/cv/builder/${id}`);
  };

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce CV ?")) {
      deleteBuilderCv(id);
    }
  };

  return (
    <div className="space-y-8 pb-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            CV Creator
          </h1>
          <p className="mt-2 text-base text-slate-500">
            Créez, gérez et exportez vos CV professionnels.
          </p>
        </div>
        
        <div className="flex gap-2">
          {/* Upload Button */}
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept=".pdf,.doc,.docx" 
            onChange={handleFileUpload}
          />
          <Button 
            variant="outline" 
            className="gap-2 bg-white shadow-sm hover:bg-slate-50"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-4 w-4" />
            Importer
          </Button>

          {/* AI Generate Button */}
          <Dialog open={isAIDialogOpen} onOpenChange={setIsAIDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2 bg-white shadow-sm hover:bg-slate-50">
                <Wand2 className="h-4 w-4" />
                Générer avec IA
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Générer un CV avec l'IA</DialogTitle>
                <DialogDescription>
                  Répondez à ces quelques questions pour obtenir un CV sur mesure.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="ai-job" className="text-sm font-medium">Poste visé</Label>
                  <Input 
                    id="ai-job" 
                    placeholder="Ex: Product Manager, Développeur React..." 
                    value={aiJobTitle}
                    onChange={(e) => setAiJobTitle(e.target.value)}
                    className="bg-slate-50 border-slate-200"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Niveau d'expérience</Label>
                  <Select value={aiExperience} onValueChange={setAiExperience}>
                    <SelectTrigger className="bg-slate-50 border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="junior">Junior (0-2 ans)</SelectItem>
                      <SelectItem value="mid">Intermédiaire (2-5 ans)</SelectItem>
                      <SelectItem value="senior">Senior (5+ ans)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 flex flex-col">
                  <Label className="text-sm font-medium">Secteur d'activité</Label>
                  <Popover open={isSectorOpen} onOpenChange={setIsSectorOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={isSectorOpen}
                        className="w-full justify-between bg-slate-50 border-slate-200"
                      >
                        {aiIndustry
                          ? SECTORS.find((sector) => sector === aiIndustry) || aiIndustry
                          : "Sélectionnez un secteur..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0">
                      <Command>
                        <CommandInput placeholder="Rechercher un secteur..." />
                        <CommandList>
                          <CommandEmpty>Aucun secteur trouvé.</CommandEmpty>
                          <CommandGroup className="max-h-[300px] overflow-auto">
                            {SECTORS.map((sector) => (
                              <CommandItem
                                key={sector}
                                value={sector}
                                onSelect={() => {
                                  setAiIndustry(sector);
                                  setIsSectorOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    aiIndustry === sector ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {sector}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  {aiIndustry === "Autre" && (
                    <div className="pt-2">
                      <Label htmlFor="custom-industry" className="text-sm font-medium mb-1.5 block">
                        Précisez votre secteur
                      </Label>
                      <Input 
                        id="custom-industry"
                        placeholder="Ex: Biotechnologie, E-sport..." 
                        value={customIndustry}
                        onChange={(e) => setCustomIndustry(e.target.value)}
                        className="bg-slate-50 border-slate-200"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ai-desc" className="text-sm font-medium">Description brève (optionnel)</Label>
                  <Textarea 
                    id="ai-desc" 
                    placeholder="Ex: Passionné par l'innovation, 5 ans d'expérience en gestion d'équipe..." 
                    value={aiDescription}
                    onChange={(e) => setAiDescription(e.target.value)}
                    className="bg-slate-50 border-slate-200 min-h-[60px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ai-skills" className="text-sm font-medium">Compétences clés (optionnel)</Label>
                  <Textarea 
                    id="ai-skills" 
                    placeholder="Ex: Gestion de projet, Agile, Figma, React..." 
                    value={aiSkills}
                    onChange={(e) => setAiSkills(e.target.value)}
                    className="bg-slate-50 border-slate-200 min-h-[80px]"
                  />
                  <p className="text-xs text-slate-500">Séparez les compétences par des virgules.</p>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAIGenerate} disabled={!aiJobTitle || isGenerating} className="w-full sm:w-auto bg-[#635bff] text-white hover:bg-[#544dc9]">
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Génération en cours...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Générer mon CV
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Create New Button */}
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-[#635bff] text-white hover:bg-[#544dc9] shadow-md shadow-blue-500/20">
                <Plus className="h-4 w-4" />
                Nouveau CV
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Créer un nouveau CV</DialogTitle>
                <DialogDescription>
                  Donnez un titre à votre CV pour commencer.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="cv-title">Titre du CV</Label>
                  <Input 
                    id="cv-title" 
                    placeholder="Ex: CV Développeur 2024" 
                    value={newCvTitle}
                    onChange={(e) => setNewCvTitle(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateNew} className="bg-[#635bff] text-white hover:bg-[#544dc9]">
                  Créer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {builderCvs.map((cv) => (
          <Card key={cv.id} className="group relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 border-slate-200">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity group-hover:opacity-100" />
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                  <FileText className="h-6 w-6" />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate(`/cv/builder/${cv.id}`)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Upload className="mr-2 h-4 w-4" />
                      Exporter PDF
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => handleDelete(cv.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardTitle className="mt-4 text-lg">{cv.title}</CardTitle>
              <CardDescription className="flex items-center gap-1 text-xs">
                <Calendar className="h-3 w-3" />
                Modifié le {new Date(cv.lastModified).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
                  {cv.templateId || 'Moderne'}
                </span>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button 
                variant="secondary" 
                className="w-full bg-slate-50 hover:bg-slate-100 text-slate-900 group-hover:bg-[#635bff] group-hover:text-white transition-colors"
                onClick={() => navigate(`/cv/builder/${cv.id}`)}
              >
                Ouvrir l'éditeur
              </Button>
            </CardFooter>
          </Card>
        ))}

        {/* Empty State */}
        {builderCvs.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 p-12 text-center">
            <div className="rounded-full bg-slate-50 p-4 mb-4">
              <FileText className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Aucun CV pour le moment</h3>
            <p className="mt-2 text-sm text-slate-500 max-w-sm">
              Commencez par créer un nouveau CV ou importez-en un existant pour le modifier.
            </p>
            <div className="mt-6 flex gap-3">
              <Button onClick={() => setIsCreateDialogOpen(true)} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Créer vide
              </Button>
              <Button onClick={() => setIsAIDialogOpen(true)} className="bg-[#635bff] text-white">
                <Wand2 className="mr-2 h-4 w-4" />
                Générer avec IA
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
