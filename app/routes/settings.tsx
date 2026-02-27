import type { Route } from "./+types/settings";
import { AppShell } from "~/components/layout/app-shell";
import { useI18n } from "~/i18n/i18n";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Switch } from "~/components/ui/switch";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { User, Bell, Shield, LogOut, Loader2, Mail, Lock, Smartphone, Globe, Zap, Bot, CheckCircle, Info } from "lucide-react";
import { useState } from "react";
import { Badge } from "~/components/ui/badge";

export const meta: Route.MetaFunction = () => [
  { title: "Honaijob – Paramètres" },
];

export default function Settings() {
  return (
    <AppShell>
      <SettingsContent />
    </AppShell>
  );
}

function SettingsContent() {
  const { t, language, setLanguage } = useI18n();
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [autopilotMode, setAutopilotMode] = useState(false);

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 max-w-4xl mx-auto px-4 sm:px-0">
      <div className="space-y-2 border-b border-slate-200 pb-6 sm:pb-8">
        <h1 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl lg:text-3xl leading-tight">
          {t("settingsTitle")}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xl">
          Gérez vos préférences personnelles, vos notifications et les paramètres de votre compte IA.
        </p>
      </div>

      {/* Profile Section */}
      <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden">
        <CardHeader className="bg-slate-50/30 border-b border-slate-50 p-4 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-xl shadow-sm">
              <User className="h-5 w-5 text-[#635bff]" />
            </div>
            <div>
              <CardTitle className="text-base sm:text-lg font-bold text-slate-900">Profil Public</CardTitle>
              <CardDescription className="text-[11px] sm:text-xs font-medium text-slate-400 mt-0.5">Vos informations de connexion (Synchronisées via Google).</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative inline-block">
              <Avatar className="h-20 w-20 border-4 border-white shadow-md">
                <AvatarFallback className="bg-blue-50 text-xl text-[#635bff] font-black">JD</AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-sm">
                <CheckCircle className="h-3 w-3 text-white" />
              </div>
            </div>
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900">Compte Google</h3>
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none font-bold text-[10px] uppercase tracking-wider px-2 py-0.5">Connecté</Badge>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                Votre photo et vos informations sont synchronisées avec votre compte Google principal.
              </p>
            </div>
          </div>
          
          <Separator className="bg-slate-50" />
          
          <div className="grid gap-5">
            <div className="space-y-2.5">
              <Label htmlFor="email" className="text-sm font-bold text-slate-700 px-1">Adresse Email</Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <Input 
                  id="email" 
                  defaultValue="john.doe@example.com" 
                  readOnly
                  className="h-11 pl-11 bg-slate-50 border-slate-100 text-slate-500 cursor-not-allowed rounded-xl font-medium" 
                />
              </div>
              <div className="flex items-center gap-2 px-1">
                <Info className="h-3 w-3 text-slate-300" />
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                  Géré par Google • Non modifiable ici
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Autopilot Mode Section */}
      <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden relative">
        <div className="absolute top-4 right-4 z-10">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#635bff] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#635bff]"></span>
          </span>
        </div>
        
        <CardHeader className="bg-slate-50/30 border-b border-slate-50 p-4 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-xl shadow-sm">
              <Bot className="h-5 w-5 text-[#635bff]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <CardTitle className="text-base sm:text-lg font-bold text-slate-900">Pilotage Automatique</CardTitle>
                <Badge className="bg-[#635bff]/10 text-[#635bff] hover:bg-[#635bff]/20 border-none font-bold text-[9px] uppercase tracking-wider px-2 py-0.5">Bientôt</Badge>
              </div>
              <CardDescription className="text-[11px] sm:text-xs font-medium text-slate-400 mt-0.5 truncate">Laissez l'IA gérer vos candidatures intelligemment.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 p-4 sm:p-6">
           <div className="flex items-center justify-between gap-6 p-4 rounded-2xl border border-slate-50 bg-slate-50/30">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-bold text-slate-900">Activer le Pilotage Automatique</span>
                <span className="text-xs text-slate-500 font-medium leading-relaxed">
                  L'IA postulera automatiquement aux offres correspondant à votre profil (Max 10/jour).
                </span>
              </div>
              <Switch 
                checked={autopilotMode} 
                onCheckedChange={setAutopilotMode} 
                disabled 
                className="data-[state=checked]:bg-[#635bff]"
              />
            </div>
            
            <div className="rounded-2xl bg-blue-50/50 p-4 border border-blue-100/50">
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-blue-100 rounded-lg text-blue-600">
                  <Zap className="h-4 w-4" />
                </div>
                <div className="text-xs sm:text-sm text-blue-800">
                  <p className="font-bold mb-1 uppercase tracking-wider text-[10px]">Boostez votre recherche</p>
                  <p className="font-medium leading-relaxed opacity-80">
                    Le mode automatique utilisera vos CVs et lettres de motivation optimisés pour maximiser vos chances de réponse. 
                    Inscrivez-vous à la liste d'attente pour être notifié.
                  </p>
                </div>
              </div>
            </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden">
        <CardHeader className="bg-slate-50/30 border-b border-slate-50 p-4 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-xl shadow-sm">
              <Bell className="h-5 w-5 text-[#635bff]" />
            </div>
            <div>
              <CardTitle className="text-base sm:text-lg font-bold text-slate-900">Préférences</CardTitle>
              <CardDescription className="text-[11px] sm:text-xs font-medium text-slate-400 mt-0.5">Gérez vos notifications et la langue de l'interface.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 p-4 sm:p-6">
          <div className="space-y-5">
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <Label htmlFor="language" className="flex flex-col space-y-1 px-1">
                <span className="text-sm font-bold text-slate-900">Langue de l'interface</span>
                <span className="text-xs font-medium text-slate-400">Choisissez votre langue préférée.</span>
              </Label>
              <Select value={language} onValueChange={(val: any) => setLanguage(val)}>
                <SelectTrigger id="language" className="w-full sm:w-[180px] h-10 bg-slate-50 border-slate-100 rounded-xl font-bold text-slate-700">
                  <SelectValue placeholder="Choisir une langue" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-100">
                  <SelectItem value="fr" className="font-bold rounded-lg">Français</SelectItem>
                  <SelectItem value="en" className="font-bold rounded-lg">English</SelectItem>
                  <SelectItem value="es" className="font-bold rounded-lg">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator className="bg-slate-50" />

            <div className="flex items-center justify-between gap-6 p-4 rounded-2xl border border-slate-50 bg-slate-50/30">
              <Label htmlFor="email-notifs" className="flex flex-col space-y-1">
                <span className="text-sm font-bold text-slate-900">Notifications Email</span>
                <span className="text-xs font-medium text-slate-400 leading-relaxed">Recevoir des emails pour les nouvelles offres matchées.</span>
              </Label>
              <Switch 
                id="email-notifs" 
                checked={emailNotifs} 
                onCheckedChange={setEmailNotifs} 
                className="data-[state=checked]:bg-[#635bff]"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
