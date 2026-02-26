import { Outlet, Link } from "react-router";
import { Sparkles, Lock } from "lucide-react";

export default function OfferLayout() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Honaijob</span>
          </Link>
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium bg-slate-100 px-3 py-1 rounded-full">
            <Lock className="h-3 w-3" />
            <span>Paiement 100% Sécurisé</span>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-6xl">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500">
          <div className="flex justify-center gap-6 mb-4">
             <Link to="/legal/terms" className="hover:text-blue-600 hover:underline">CGV & CGU</Link>
             <Link to="/legal/refund" className="hover:text-blue-600 hover:underline">Politique de Remboursement</Link>
             <Link to="/legal/mentions" className="hover:text-blue-600 hover:underline">Mentions Légales</Link>
          </div>
          <p>© {new Date().getFullYear()} Honaijob Inc. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
