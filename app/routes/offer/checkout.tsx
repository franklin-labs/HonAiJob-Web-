import type { Route } from "./+types/checkout";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Check, ShieldCheck, Star, CreditCard, Lock } from "lucide-react";
import { useState } from "react";

// Meta tags for the checkout page
export const meta: Route.MetaFunction = () => [
  { title: "Paiement Sécurisé - Honaijob" },
];

export default function Checkout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      navigate("/offer/upsell");
    }, 1500);
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
      {/* Colonne de gauche : Récapitulatif et Avantages */}
      <div className="lg:col-span-1 space-y-6 order-2 lg:order-1">
        <Card className="border-none shadow-lg bg-white overflow-hidden">
          <div className="bg-slate-900 p-6 text-white">
            <h3 className="text-lg font-bold">Récapitulatif de la commande</h3>
          </div>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="font-medium text-slate-900">Abonnement Premium</div>
              <div className="font-bold text-slate-900">9.99€ / mois</div>
            </div>
            <ul className="space-y-3 mb-6">
              {[
                "Accès illimité à l'IA",
                "Génération de CV & Lettres",
                "Suivi des candidatures",
                "Support prioritaire"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                  <Check className="h-4 w-4 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
            <Separator className="my-4 shadow-none" />
            <div className="flex justify-between items-center text-lg font-bold text-slate-900">
              <span>Total aujourd'hui</span>
              <span>9.99€</span>
            </div>
          </CardContent>
          <div className="bg-blue-50 p-4 border-t border-blue-100">
            <div className="flex gap-3">
              <ShieldCheck className="h-5 w-5 text-blue-600 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-blue-900 uppercase tracking-wide mb-1">Garantie 7 jours</p>
                <p className="text-xs text-blue-800 leading-relaxed">
                  Satisfait ou remboursé. Envoyez un simple email sous 7 jours pour récupérer votre argent.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Témoignage */}
        <Card className="border-none shadow-md bg-white">
          <CardContent className="p-6">
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-4 w-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <p className="text-slate-600 text-sm italic mb-4">
              "Le meilleur investissement pour ma carrière. J'ai décroché 3 entretiens la première semaine."
            </p>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                JD
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Julie D.</p>
                <p className="text-xs text-slate-500">Product Manager</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Colonne de droite : Formulaire */}
      <div className="lg:col-span-2 order-1 lg:order-2">
        <Card className="border-none shadow-xl bg-white">
          <CardHeader>
            <CardTitle className="text-2xl">Finaliser votre inscription</CardTitle>
            <CardDescription>Entrez vos informations pour accéder immédiatement à la plateforme.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" placeholder="Jean" required className="shadow-sm border-slate-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" placeholder="Dupont" required className="shadow-sm border-slate-200" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email professionnel</Label>
                <Input id="email" type="email" placeholder="jean.dupont@exemple.com" required className="shadow-sm border-slate-200" />
              </div>

              <Separator className="my-6 shadow-none" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Paiement par Carte</Label>
                  <div className="flex gap-2">
                    {/* Fake card icons */}
                    <div className="h-6 w-10 bg-slate-100 rounded border border-slate-200"></div>
                    <div className="h-6 w-10 bg-slate-100 rounded border border-slate-200"></div>
                  </div>
                </div>
                
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input placeholder="Numéro de carte" className="pl-10 shadow-sm border-slate-200" required />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="MM / AA" className="shadow-sm border-slate-200" required />
                  <Input placeholder="CVC" className="shadow-sm border-slate-200" required />
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg text-xs text-slate-500 flex items-start gap-2 border border-slate-100">
                <Lock className="h-3 w-3 mt-0.5 flex-shrink-0" />
                <p>
                  Vos informations de paiement sont chiffrées et sécurisées. En cliquant sur le bouton ci-dessous, vous acceptez nos <a href="/legal/terms" target="_blank" className="underline hover:text-slate-900">Conditions Générales de Vente</a> et reconnaissez que votre abonnement se renouvellera automatiquement chaque mois jusqu'à résiliation.
                </p>
              </div>

              <Button type="submit" size="lg" className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/25" disabled={loading}>
                {loading ? "Traitement en cours..." : "Payer 9.99€ et Accéder"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
