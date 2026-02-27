import type { Route } from "./+types/applications";
import { AppShell } from "~/components/layout/app-shell";
import { useI18n } from "~/i18n/i18n";
import { useCv } from "~/context/cv-context";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { 
  Building2, 
  Calendar, 
  MoreHorizontal, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowUpRight
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { cn } from "~/lib/utils";

export const meta: Route.MetaFunction = () => [
  { title: "Honaijob – Candidatures" },
];

export default function Applications() {
  return (
    <AppShell>
      <ApplicationsContent />
    </AppShell>
  );
}

function ApplicationsContent() {
  const { t } = useI18n();
  const { applications } = useCv();

  const filtered = applications;

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "in_progress":
        return { label: "En cours", color: "bg-amber-50 text-amber-700 border-amber-200", icon: Clock };
      case "interview":
        return { label: "Entretien", color: "bg-blue-50 text-blue-700 border-blue-200", icon: Calendar };
      case "offer":
        return { label: "Offre reçue", color: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCircle2 };
      default:
        return { label: "Refusé", color: "bg-slate-50 text-slate-600 border-slate-200", icon: XCircle };
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-8 px-4 sm:px-0">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between border-b border-slate-200 pb-6 sm:pb-8">
        <div className="space-y-2">
          <h1 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl lg:text-3xl leading-tight">
            {t("applicationsTitle")}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl leading-relaxed">
            Suivez l'avancement de vos processus de recrutement et optimisez vos chances avec l'IA.
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="outline" className="flex-1 sm:flex-none gap-2 border-slate-200 text-slate-700 h-10 rounded-xl font-bold hover:bg-slate-50 transition-all active:scale-[0.98]">
            <Filter className="h-4 w-4" />
            Filtrer
          </Button>
          <Button className="flex-[2] sm:flex-none bg-[#635bff] hover:bg-[#544dc9] text-white shadow-lg shadow-blue-500/20 h-10 rounded-xl font-bold transition-all active:scale-[0.98]">
            Nouvelle
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-1.5 space-y-0 px-4 pt-4 sm:px-6 sm:pt-6">
            <CardTitle className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">Total</CardTitle>
            <div className="p-1.5 bg-slate-50 rounded-lg">
              <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400" />
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
            <div className="text-xl sm:text-2xl font-black text-slate-900 leading-none">{filtered.length}</div>
            <p className="text-[10px] sm:text-xs text-slate-500 mt-1 font-medium">Candidatures</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-1.5 space-y-0 px-4 pt-4 sm:px-6 sm:pt-6">
            <CardTitle className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">En cours</CardTitle>
            <div className="p-1.5 bg-amber-50 rounded-lg">
              <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
            <div className="text-xl sm:text-2xl font-black text-slate-900 leading-none">
              {filtered.filter(a => a.status === 'in_progress').length}
            </div>
            <p className="text-[10px] sm:text-xs text-slate-500 mt-1 font-medium">Suivi actif</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-1.5 space-y-0 px-4 pt-4 sm:px-6 sm:pt-6">
            <CardTitle className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">Entretiens</CardTitle>
            <div className="p-1.5 bg-blue-50 rounded-lg">
              <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
            <div className="text-xl sm:text-2xl font-black text-slate-900 leading-none">
              {filtered.filter(a => a.status === 'interview').length}
            </div>
            <p className="text-[10px] sm:text-xs text-slate-500 mt-1 font-medium">Planifiés</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-emerald-50 rounded-2xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-1.5 space-y-0 px-4 pt-4 sm:px-6 sm:pt-6">
            <CardTitle className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-600/70">Offres</CardTitle>
            <div className="p-1.5 bg-white rounded-lg">
              <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
            <div className="text-xl sm:text-2xl font-black text-emerald-900 leading-none">
              {filtered.filter(a => a.status === 'offer').length}
            </div>
            <p className="text-[10px] sm:text-xs text-emerald-600/70 mt-1 font-medium">Reçues</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Rechercher une entreprise..." 
              className="h-10 pl-10 bg-white border-slate-200 rounded-xl text-sm focus:ring-[#635bff]/10 focus:border-[#635bff] transition-all" 
            />
          </div>
        </div>

        {/* Table/List for Mobile */}
        <div className="rounded-2xl border-none bg-white shadow-sm overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden sm:block">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="hover:bg-transparent border-slate-100">
                  <TableHead className="w-[300px] font-bold text-xs uppercase tracking-widest text-slate-400 px-6 py-4">Entreprise</TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-widest text-slate-400 px-6 py-4">Poste</TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-widest text-slate-400 px-6 py-4">Date</TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-widest text-slate-400 px-6 py-4">Statut</TableHead>
                  <TableHead className="text-right font-bold text-xs uppercase tracking-widest text-slate-400 px-6 py-4">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center text-slate-400 font-medium">
                      Aucune candidature trouvée.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((application) => {
                    const status = getStatusConfig(application.status);
                    const StatusIcon = status.icon;
                    
                    return (
                      <TableRow key={application.id} className="hover:bg-slate-50/30 border-slate-100 transition-colors">
                        <TableCell className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-sm font-black text-slate-600 border border-slate-100">
                              {application.company.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900">{application.company}</div>
                              <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Paris, France</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <div className="font-bold text-slate-700">{application.role}</div>
                        </TableCell>
                        <TableCell className="px-6 py-4 text-sm font-medium text-slate-400">
                          {application.date}
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <Badge variant="outline" className={cn("gap-1.5 font-bold text-[10px] uppercase tracking-wider rounded-lg px-2 py-0.5 border-none", status.color)}>
                            <StatusIcon className="h-3 w-3" />
                            {status.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-6 py-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-all">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="rounded-xl border-slate-100 shadow-xl">
                              <DropdownMenuItem className="rounded-lg font-medium cursor-pointer">
                                <ArrowUpRight className="mr-2 h-4 w-4 text-slate-400" />
                                Voir l'offre
                              </DropdownMenuItem>
                              <DropdownMenuItem className="rounded-lg font-medium cursor-pointer">
                                <Calendar className="mr-2 h-4 w-4 text-slate-400" />
                                Ajouter un entretien
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile List */}
          <div className="sm:hidden divide-y divide-slate-50">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-slate-400 font-medium text-sm">
                Aucune candidature trouvée.
              </div>
            ) : (
              filtered.map((application) => {
                const status = getStatusConfig(application.status);
                const StatusIcon = status.icon;
                
                return (
                  <div key={application.id} className="p-4 flex flex-col gap-3 active:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-sm font-black text-slate-600 border border-slate-100">
                          {application.company.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 leading-none">{application.company}</div>
                          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mt-1">Paris, France</div>
                        </div>
                      </div>
                      <Badge variant="outline" className={cn("gap-1 font-bold text-[9px] uppercase tracking-wider rounded-lg px-2 py-0.5 border-none", status.color)}>
                        <StatusIcon className="h-2.5 w-2.5" />
                        {status.label}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between mt-1">
                      <div>
                        <div className="text-sm font-bold text-slate-700">{application.role}</div>
                        <div className="text-[11px] font-medium text-slate-400 mt-0.5">{application.date}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600 rounded-full bg-slate-50 active:scale-95 transition-all">
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600 rounded-full bg-slate-50 active:scale-95 transition-all">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
