import type { Route } from "./+types/thank-you";
import { useNavigate, useSearchParams } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { CheckCircle, ArrowRight, Download } from "lucide-react";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export const meta: Route.MetaFunction = () => [
  { title: "Bienvenue - Honaijob" },
];

export default function ThankYou() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const plan = searchParams.get("plan") || "monthly";

  useEffect(() => {
    // Fire confetti on mount
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const random = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto py-12 text-center">
      <div className="mb-8 flex justify-center">
        <div className="h-24 w-24 bg-emerald-100 rounded-full flex items-center justify-center animate-bounce-slow">
          <CheckCircle className="h-12 w-12 text-emerald-600" />
        </div>
      </div>

      <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
        Félicitations ! Vous êtes inscrit.
      </h1>
      <p className="text-xl text-slate-600 mb-12">
        Votre compte {plan === 'yearly' ? 'Annuel' : 'Premium'} est activé. Préparez-vous à transformer votre recherche d'emploi.
      </p>

      <Card className="border-none shadow-xl bg-white mb-12 text-left">
        <CardContent className="p-8">
          <h3 className="font-bold text-lg mb-4">Prochaines étapes :</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="bg-blue-100 text-blue-600 h-8 w-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <h4 className="font-bold text-slate-900">Accédez à votre tableau de bord</h4>
                <p className="text-slate-600 text-sm">C'est votre quartier général pour gérer vos candidatures.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-blue-100 text-blue-600 h-8 w-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <h4 className="font-bold text-slate-900">Importez votre CV actuel</h4>
                <p className="text-slate-600 text-sm">Notre IA va l'analyser et suggérer des améliorations immédiates.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-blue-100 text-blue-600 h-8 w-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <h4 className="font-bold text-slate-900">Postulez en 1 clic</h4>
                <p className="text-slate-600 text-sm">Utilisez l'extension ou le moteur de recherche interne pour trouver des offres.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={handleGoToDashboard} size="lg" className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/25 rounded-xl">
          Accéder à mon espace
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
      
      <p className="mt-8 text-sm text-slate-400">
        Un email de confirmation avec votre facture a été envoyé à votre adresse.
      </p>
    </div>
  );
}
