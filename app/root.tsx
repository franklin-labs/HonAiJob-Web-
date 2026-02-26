// Point d’entrée de l’application : layout HTML, providers globaux et gestion d’erreurs.
import * as React from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { I18nProvider } from "./i18n/i18n";
import { CvProvider } from "./context/cv-context";
import { Button } from "~/components/ui/button";
import { AlertTriangle, FileQuestion, Lock, ServerCrash, Home } from "lucide-react";

// Liens injectés dans le <head>, notamment la police Inter depuis Google Fonts.
export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

// Layout global HTML : providers de contexte et scripts React Router.
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <I18nProvider>
          <CvProvider>{children}</CvProvider>
        </I18nProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// Composant racine qui laisse React Router gérer l’arbre de routes.
export default function App() {
  return <Outlet />;
}

// Gestion d’erreur globale pour afficher une page d’erreur lisible.
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "Une erreur inattendue s'est produite.";
  let stack: string | undefined;
  let status = 500;
  let Icon = ServerCrash;

  if (isRouteErrorResponse(error)) {
    status = error.status;
    switch (status) {
      case 404:
        message = "Page introuvable";
        details = "La page que vous recherchez n'existe pas ou a été déplacée.";
        Icon = FileQuestion;
        break;
      case 401:
        message = "Non autorisé";
        details = "Vous devez être connecté pour accéder à cette page.";
        Icon = Lock;
        break;
      case 403:
        message = "Accès refusé";
        details = "Vous n'avez pas les droits nécessaires pour accéder à cette ressource.";
        Icon = Lock;
        break;
      case 500:
        message = "Erreur serveur";
        details = "Nos serveurs rencontrent des difficultés. Veuillez réessayer plus tard.";
        Icon = ServerCrash;
        break;
      default:
        message = `Erreur ${status}`;
        details = error.statusText || details;
        Icon = AlertTriangle;
    }
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 ring-8 ring-slate-50">
          <Icon className="h-8 w-8 text-slate-600" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">{message}</h1>
          <p className="text-slate-600">{details}</p>
        </div>

        <div className="pt-4">
          <Button asChild className="w-full bg-[#635bff] hover:bg-[#544dc9] text-white">
            <a href="/" className="flex items-center justify-center gap-2">
              <Home className="h-4 w-4" />
              Retour à l'accueil
            </a>
          </Button>
        </div>

        {stack && (
          <div className="mt-8 text-left">
            <div className="mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Debug Info</div>
            <pre className="max-h-[200px] w-full overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs text-slate-300">
              <code>{stack}</code>
            </pre>
          </div>
        )}
      </div>
      
      <div className="mt-8 flex items-center gap-2 text-sm text-slate-400">
        <img src="/logo.png" alt="Honaijob" className="h-4 w-auto opacity-50" />
        <span>&copy; {new Date().getFullYear()} Honaijob. All rights reserved.</span>
      </div>
    </main>
  );
}
