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
    <div className="space-y-8 pb-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {t("applicationsTitle")}
          </h1>
          <p className="mt-2 text-base text-slate-500">
            Suivez l'avancement de vos processus de recrutement en temps réel.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 border-slate-200 text-slate-700">
            <Filter className="h-4 w-4" />
            Filtrer
          </Button>
          <Button className="bg-[#635bff] hover:bg-[#544dc9] text-white shadow-md shadow-blue-500/20">
            Nouvelle candidature
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total</CardTitle>
            <Building2 className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{filtered.length}</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">En cours</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {filtered.filter(a => a.status === 'in_progress').length}
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Entretiens</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {filtered.filter(a => a.status === 'interview').length}
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Offres</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {filtered.filter(a => a.status === 'offer').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Rechercher une entreprise..." 
              className="pl-9 bg-white border-slate-200 shadow-sm" 
            />
          </div>
        </div>

        <div className="rounded-xl border-none bg-white shadow-md overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent border-slate-100">
                <TableHead className="w-[300px] font-medium text-slate-500">Entreprise</TableHead>
                <TableHead className="font-medium text-slate-500">Poste</TableHead>
                <TableHead className="font-medium text-slate-500">Date d'envoi</TableHead>
                <TableHead className="font-medium text-slate-500">Statut</TableHead>
                <TableHead className="text-right font-medium text-slate-500">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-slate-500">
                    Aucune candidature trouvée.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((application) => {
                  const status = getStatusConfig(application.status);
                  const StatusIcon = status.icon;
                  
                  return (
                    <TableRow key={application.id} className="hover:bg-slate-50/50 border-slate-100 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-600">
                            {application.company.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">{application.company}</div>
                            <div className="text-xs text-slate-500">Paris, France</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-slate-700">{application.role}</div>
                      </TableCell>
                      <TableCell className="text-slate-500">
                        {application.date}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("gap-1 font-normal", status.color)}>
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <ArrowUpRight className="mr-2 h-4 w-4" />
                              Voir l'offre
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" />
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
      </div>
    </div>
  );
}
