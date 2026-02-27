// Gabarit principal de l'application (layout) avec navigation, en-tête et contenu.
import { NavLink, useLocation, useNavigate } from "react-router";
import {
  Menu,
  LayoutDashboard,
  FolderKanban,
  FileText,
  Briefcase,
  Send,
  Settings,
  Bell,
  Search,
  LogOut,
  User,
  ChevronDown,
  PanelLeft,
  PenTool
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { useI18n } from "~/i18n/i18n";
import { useCv } from "~/context/cv-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Badge } from "~/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { useState } from "react";

// Propriétés attendues par le composant AppShell.
type AppShellProps = {
  children: React.ReactNode;
};

// Composant qui structure le layout global : sidebar, header, contenu central.
export function AppShell({ children }: AppShellProps) {
  // Récupération de la traduction, de la langue courante et des CV via les contextes.
  const { t, language, setLanguage } = useI18n();
  const { projects, activeProject, setActiveProjectId } = useCv();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Liens principaux de navigation du SaaS.
  const navigationItems = [
    { 
      to: "/dashboard", 
      label: activeProject ? `Projet: ${activeProject.name}` : "Tableau de bord", 
      icon: LayoutDashboard 
    },
    { to: "/jobs", label: t("headerJobs"), icon: Briefcase },
    { to: "/applications", label: t("headerApplications"), icon: Send },
    { to: "/settings", label: t("headerSettings"), icon: Settings },
  ];

  // Détection d’un affichage desktop pour afficher ou non la sidebar en permanence.
  const isDesktop =
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 1024px)").matches;
  const showSidebar = isDesktop || sidebarOpen;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50/50">
      {/* Barre latérale de navigation principale (Cachée sur mobile, sauf si sidebarOpen) */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-white shadow-xl shadow-slate-200/50 transition-all duration-300 ease-in-out lg:static lg:shadow-md",
          sidebarCollapsed ? "lg:w-0 lg:overflow-hidden lg:shadow-none" : "lg:w-72",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className={cn("flex h-full flex-col w-72 transition-opacity duration-200", sidebarCollapsed ? "lg:opacity-0" : "lg:opacity-100")}>
          {/* Logo / nom de l’app et badge du produit */}
          <div className="flex h-16 items-center justify-between px-6 shadow-sm z-10 relative bg-white">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt={t("appName")}
                className="h-8 w-8 rounded-lg object-cover ring-1 ring-slate-900/10"
              />
              <span className="text-lg font-bold tracking-tight text-slate-900">
                {t("appName")}
              </span>
            </div>
          </div>

          {/* Liens de navigation vers les principales sections */}
          <nav className="flex-1 space-y-1 overflow-hidden px-4 py-6">
            {/* Sélecteur de Projet */}
            <div className="mb-6 px-2">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Projet Actif
              </div>
              <Select
                value={activeProject?.id || "none"}
                onValueChange={(value) => {
                  if (value === "all") {
                    setActiveProjectId(null);
                    navigate("/projects");
                  } else {
                    setActiveProjectId(value);
                    navigate("/dashboard");
                  }
                }}
              >
                <SelectTrigger className="w-full bg-slate-50 border-slate-200 text-slate-700 h-10">
                  <SelectValue placeholder="Choisir un projet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="font-medium text-blue-600">
                    <div className="flex items-center gap-2">
                      <FolderKanban className="h-4 w-4" />
                      Tous les projets
                    </div>
                  </SelectItem>
                  <DropdownMenuSeparator />
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Menu
            </div>
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to || (item.to !== "/dashboard" && location.pathname.startsWith(item.to));
              
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive: linkActive }) =>
                    cn(
                      "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out",
                      isActive
                        ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className={cn("h-4 w-4 transition-colors", isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600")} />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Profil utilisateur en bas de sidebar */}
          <div className="p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10 relative bg-white">
            <div className="flex items-center gap-3 rounded-xl bg-slate-50/50 p-3 shadow-sm ring-1 ring-slate-900/5">
              <Avatar className="h-9 w-9 border border-white shadow-sm">
                <AvatarFallback className="bg-blue-100 text-blue-700">JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col overflow-hidden">
                <span className="truncate text-sm font-medium text-slate-900">Franklin Delbo</span>
                <span className="truncate text-xs text-slate-500">franklin@gmail.com</span>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay pour mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-slate-900/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* En-tête avec recherche, notifications et actions */}
        <header className="flex h-16 items-center justify-between bg-white/80 px-4 backdrop-blur-md shadow-sm lg:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Ouvrir le menu</span>
            </button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden h-9 w-9 text-slate-500 hover:bg-slate-100 hover:text-slate-900 lg:flex"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              aria-label={sidebarCollapsed ? "Déplier la sidebar" : "Replier la sidebar"}
            >
              <PanelLeft className={cn("h-5 w-5 transition-transform", sidebarCollapsed ? "rotate-180" : "")} />
            </Button>
            
            {/* Barre de recherche globale */}
            <div className="hidden md:flex md:w-64 lg:w-80">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <Input 
                  type="search" 
                  placeholder="Rechercher..." 
                  className="h-9 w-full rounded-lg border-slate-200 bg-slate-50 pl-9 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Language Selector - Masqué sur petit mobile */}
            <div className="hidden xs:block">
              <Select value={language} onValueChange={(val: "fr" | "en") => setLanguage(val)}>
                <SelectTrigger className="h-9 w-[100px] border-slate-200 bg-white text-xs font-medium focus:ring-blue-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-500 hover:bg-slate-100 hover:text-slate-700">
                <Bell className="h-5 w-5" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-500 hover:bg-slate-100 hover:text-slate-700">
                    <Settings className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Paramètres</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profil</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Déconnexion</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Contenu principal de la page */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-4 pb-24 lg:p-8 lg:pb-8">
          <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </main>

        {/* Barre de navigation native (Bottom Nav) pour mobile */}
        <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 px-2 pb-safe pt-2 backdrop-blur-md lg:hidden">
          <div className="flex items-center justify-around">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to || (item.to !== "/dashboard" && location.pathname.startsWith(item.to));
              
              // On simplifie les labels pour la barre du bas
              const shortLabel = item.to === "/dashboard" ? "Projet" : 
                               item.to === "/jobs" ? "Offres" : 
                               item.to === "/applications" ? "Suivi" : "Réglages";

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 transition-all duration-200",
                    isActive ? "text-blue-600" : "text-slate-500 active:scale-95"
                  )}
                >
                  <div className={cn(
                    "flex h-8 w-12 items-center justify-center rounded-full transition-colors",
                    isActive ? "bg-blue-100/50" : "bg-transparent"
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-medium tracking-tight">
                    {shortLabel}
                  </span>
                </NavLink>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
