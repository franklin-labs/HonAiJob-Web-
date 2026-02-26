import type { Route } from "./+types/upsell";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "~/components/ui/card";
import { Check, ArrowRight, Zap, Star } from "lucide-react";
import { useState } from "react";

export const meta: Route.MetaFunction = () => [
  { title: "Offre Spéciale - Honaijob" },
];

export default function Upsell() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleUpgrade = () => {
    setLoading(true);
    // Simulate upgrade processing
    setTimeout(() => {
      setLoading(false);
      navigate("/offer/thank-you?plan=yearly");
    }, 1000);
  };

  const handleSkip = () => {
    navigate("/offer/thank-you?plan=monthly");
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-2 rounded-full mb-8 overflow-hidden">
        <div className="bg-emerald-500 h-full w-[80%] rounded-full animate-pulse"></div>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
          <span className="text-red-600">ATTENDEZ !</span> Votre commande n'est pas tout à fait terminée...
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Nous avons une offre exclusive réservée aux nouveaux membres. Ne fermez pas cette page.
        </p>
      </div>

      <Card className="border-2 border-emerald-500 shadow-2xl bg-white overflow-hidden relative">
        <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-bl-xl uppercase tracking-wider z-10">
          Offre Unique
        </div>
        
        <div className="grid md:grid-cols-2">
          <div className="bg-slate-900 text-white p-8 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-slate-900 opacity-50"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-emerald-400 text-sm font-bold mb-6 border border-white/10">
                <Zap className="h-4 w-4" />
                Économisez 50%
              </div>
              <h2 className="text-3xl font-bold mb-4">Passez à l'Annuel</h2>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Obtenez 12 mois d'accès complet pour le prix de 6. Sécurisez votre tarif à vie et ne vous souciez plus jamais des paiements mensuels.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-slate-400">Prix normal (12 mois)</span>
                  <span className="text-slate-400 line-through decoration-red-500">119.88€</span>
                </div>
                <div className="flex items-center justify-between text-xl font-bold">
                  <span>Prix offre spéciale</span>
                  <span className="text-emerald-400">59.00€</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Ce que vous obtenez en plus :</h3>
            <ul className="space-y-4 mb-8">
              {[
                "2 mois offerts immédiatement",
                "Badge 'Profil Vérifié' sur la plateforme",
                "Accès prioritaire aux nouvelles fonctionnalités IA",
                "Session de coaching CV de groupe (Webinaire)"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 bg-emerald-100 text-emerald-600 rounded-full p-1">
                    <Check className="h-3 w-3" />
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <Button onClick={handleUpgrade} size="lg" className="w-full h-14 text-lg bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-600/20 mb-4 animate-shimmer bg-[linear-gradient(110deg,#059669,45%,#34d399,55%,#059669)] bg-[length:200%_100%] transition-colors">
              Oui, je veux économiser 50% maintenant
            </Button>
            
            <button 
              onClick={handleSkip} 
              className="text-slate-400 text-sm hover:text-slate-600 hover:underline text-center w-full"
            >
              Non merci, je préfère payer 9.99€ chaque mois (119.88€/an)
            </button>
          </div>
        </div>
      </Card>
      
      <div className="mt-8 flex justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
        {/* Logos de confiance (fake) */}
        <div className="font-bold text-slate-400 text-lg flex items-center gap-2"><Star className="h-5 w-5" /> TrustPilot 4.9/5</div>
        <div className="font-bold text-slate-400 text-lg flex items-center gap-2"><Check className="h-5 w-5" /> Verified by Stripe</div>
      </div>
    </div>
  );
}
