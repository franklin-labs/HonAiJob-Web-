import { Outlet, Link } from "react-router";
import { Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "~/components/ui/button";

export default function LegalLayout() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header Simplifié */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Honaijob</span>
          </Link>
          
          <Button variant="ghost" asChild className="gap-2">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Retour à l'accueil
            </Link>
          </Button>
        </div>
      </header>

      {/* Contenu */}
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 max-w-4xl">
        <div className="rounded-2xl bg-white p-8 shadow-xl shadow-slate-200/50 sm:p-12">
          <Outlet />
        </div>
      </main>

      {/* Footer Simplifié */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Honaijob Inc. Tous droits réservés.</p>
          <div className="mt-4 flex justify-center gap-6">
            <Link to="/legal/terms" className="hover:text-blue-600 hover:underline">CGV & CGU</Link>
            <Link to="/legal/refund" className="hover:text-blue-600 hover:underline">Politique de Remboursement</Link>
            <Link to="/legal/mentions" className="hover:text-blue-600 hover:underline">Mentions Légales</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
