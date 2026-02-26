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
import { User, Bell, Shield, LogOut, Loader2, Mail, Lock, Smartphone, Globe, Zap, Bot } from "lucide-react";
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
    <div className="space-y-8 pb-8 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {t("settingsTitle")}
        </h1>
        <p className="text-base text-slate-500">
          Gérez vos préférences personnelles et les paramètres de l'application.
        </p>
      </div>

      {/* Profile Section */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-[#635bff]" />
            <CardTitle className="text-lg font-semibold text-slate-900">Profil Public</CardTitle>
          </div>
          <CardDescription>Vos informations de connexion (Gérées via Google).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <Avatar className="h-20 w-20 border-4 border-white shadow-md">
              <AvatarFallback className="bg-blue-100 text-xl text-blue-700 font-bold">JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-slate-900">Compte Google</h3>
                <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">Connecté</Badge>
              </div>
              <p className="text-sm text-slate-500">
                Votre photo et vos informations sont synchronisées avec Google.
              </p>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid gap-4 sm:grid-cols-1">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <Input 
                  id="email" 
                  defaultValue="john.doe@example.com" 
                  readOnly
                  className="pl-9 bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed" 
                />
              </div>
              <p className="text-xs text-slate-400">
                L'adresse email est gérée par votre compte Google et ne peut pas être modifiée ici.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Autopilot Mode Section */}
      <Card className="border-slate-200 shadow-sm overflow-hidden relative overflow-visible">
        <div className="absolute -top-3 -right-3 z-10">
          <span className="relative flex h-6 w-6">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-6 w-6 bg-blue-500"></span>
          </span>
        </div>
        
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-[#635bff]" />
              <CardTitle className="text-lg font-semibold text-slate-900">Mode Pilotage Automatique</CardTitle>
            </div>
            <Badge className="bg-[#635bff] hover:bg-[#544dc9] text-white border-0">Bientôt disponible</Badge>
          </div>
          <CardDescription>Laissez l'IA gérer vos candidatures pendant que vous dormez.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
           <div className="flex items-center justify-between space-x-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium leading-none text-slate-900">Activer le Pilotage Automatique</span>
                <span className="text-sm text-slate-500">
                  L'IA postulera automatiquement aux offres correspondant à votre profil (Max 10/jour).
                </span>
              </div>
              <Switch 
                checked={autopilotMode} 
                onCheckedChange={setAutopilotMode} 
                disabled 
              />
            </div>
            
            <div className="rounded-lg bg-blue-50 p-4 border border-blue-100">
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">Boostez votre recherche</p>
                  <p>
                    Le mode automatique utilisera vos CVs et lettres de motivation optimisés pour maximiser vos chances de réponse. 
                    Inscrivez-vous à la liste d'attente pour être notifié du lancement.
                  </p>
                </div>
              </div>
            </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-[#635bff]" />
            <CardTitle className="text-lg font-semibold text-slate-900">Préférences</CardTitle>
          </div>
          <CardDescription>Gérez vos notifications et la langue de l'interface.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-4">
             <div className="flex items-center justify-between space-x-4">
              <Label htmlFor="language" className="flex flex-col space-y-1">
                <span>Langue</span>
                <span className="font-normal text-slate-500">La langue de l'interface utilisateur.</span>
              </Label>
              <Select value={language} onValueChange={(val: any) => setLanguage(val)}>
                <SelectTrigger id="language" className="w-[180px] bg-slate-50 border-slate-200">
                  <SelectValue placeholder="Choisir une langue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between space-x-4">
              <Label htmlFor="email-notifs" className="flex flex-col space-y-1">
                <span>Notifications Email</span>
                <span className="font-normal text-slate-500">Recevoir des emails pour les nouvelles offres.</span>
              </Label>
              <Switch id="email-notifs" checked={emailNotifs} onCheckedChange={setEmailNotifs} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
