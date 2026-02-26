// Page d'accueil et de connexion (Landing Page)
import * as React from "react";
import type { Route } from "./+types/login";
import { useNavigate, Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useI18n } from "~/i18n/i18n";
import { 
  Check, 
  Star, 
  Zap, 
  Shield, 
  Globe, 
  ArrowRight, 
  Layout, 
  Briefcase, 
  Sparkles, 
  FileText, 
  Bot, 
  Clock, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Instagram, 
  X, 
  AlertTriangle, 
  ChevronDown, 
  Quote 
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

export const meta: Route.MetaFunction = () => [
  { title: "Honaijob – L'IA qui décroche vos entretiens" },
  { name: "description", content: "Arrêtez de chercher, laissez l'IA travailler. Optimisation CV ATS, lettres de motivation instantanées et candidatures automatiques." },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { t } = useI18n();

  const handleLogin = () => {
    navigate("/projects");
  };

  const handleStart = () => {
    // For now, let's redirect to projects to follow the user's flow
    navigate("/projects");
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Honaijob Logo" className="h-8 w-auto" />
              <span className="text-xl font-bold tracking-tight text-slate-900">Honaijob</span>
            </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#problem" className="hover:text-[#635bff] transition-colors">Pourquoi nous ?</a>
            <a href="#features" className="hover:text-[#635bff] transition-colors">Solutions</a>
            <a href="#pricing" className="hover:text-[#635bff] transition-colors">Tarifs</a>
            <a href="#faq" className="hover:text-[#635bff] transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden sm:flex hover:bg-slate-100 hover:text-[#635bff]" onClick={handleLogin}>
              Se connecter
            </Button>
            <Button onClick={handleStart} className="bg-[#635bff] hover:bg-[#544dc9] shadow-lg shadow-blue-600/20 rounded-full px-6 text-white font-semibold transition-all hover:scale-105">
              Commencer
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section - PAS: Promise & Hook */}
        <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-slate-50/40 to-white"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
              <div className="flex-1 text-center lg:text-left space-y-8">
                <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50/50 px-4 py-1.5 text-sm font-medium text-[#635bff] shadow-sm mb-4 animate-fade-in-up">
                  <span className="flex h-2 w-2 rounded-full bg-[#635bff] mr-2 animate-pulse"></span>
                    Agent IA pour l'Emploi
                </div>
                
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1]">
                  L'unique Agent IA qui <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#635bff] to-purple-600">pirate légalement</span> les ATS pour vous.
                </h1>
                
                <p className="mx-auto lg:mx-0 max-w-2xl text-lg text-slate-600 sm:text-xl leading-relaxed">
                  Générez des CV indétectables par les robots mais irrésistibles pour les recruteurs. Postulez en masse, intelligemment. <span className="font-semibold text-slate-900">3x plus d'entretiens</span> en y passant <span className="font-semibold text-slate-900">10x moins de temps</span>.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                  <Button size="lg" onClick={handleStart} className="w-full sm:w-auto h-14 px-8 text-base bg-[#635bff] hover:bg-[#544dc9] shadow-xl shadow-blue-600/25 rounded-full transition-all hover:-translate-y-1 text-white font-bold">
                    <span className="flex items-center gap-3">
                        <span className="bg-white text-[#635bff] p-1 rounded-full flex items-center justify-center w-6 h-6">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/></svg>
                        </span>
                        Continuer avec Google
                    </span>
                  </Button>
                  <p className="text-xs text-slate-500 sm:hidden mt-2">Pas de carte requise • Annulable à tout moment</p>
                </div>
                
                <div className="hidden sm:flex items-center gap-8 pt-2 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                            {[1,2,3,4].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                        <span className="font-medium text-slate-700">Rejoignez 10,000+ candidats</span>
                    </div>
                    <div className="w-px h-8 bg-slate-200"></div>
                    <div className="flex items-center gap-1">
                        <div className="flex text-amber-400">
                            {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                        </div>
                        <span className="font-medium text-slate-700">4.9/5</span>
                    </div>
                </div>
              </div>
              
              {/* Hero Visual - Dynamic Dashboard */}
              <div className="flex-1 relative w-full max-w-[600px] lg:max-w-none perspective-1000">
                <div className="relative rounded-2xl bg-slate-900 p-2 shadow-2xl shadow-blue-900/20 rotate-y-[-5deg] rotate-x-[5deg] hover:rotate-0 transition-transform duration-500 ease-out border border-slate-800/50 group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-2xl group-hover:opacity-75 transition-opacity"></div>
                    <img 
                        src="/dashboard-preview.png" 
                        alt="Honaijob Dashboard" 
                        className="rounded-xl shadow-inner bg-slate-800 min-h-[350px] w-full object-cover"
                        onError={(e) => {
                            e.currentTarget.src = "https://placehold.co/800x600/1e293b/FFF?text=Dashboard+IA+Honaijob";
                        }}
                    />
                    
                    {/* Floating Notification - Autopilot */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-blue-100 max-w-xs text-center animate-fade-in-up">
                        <div className="w-12 h-12 bg-blue-100 text-[#635bff] rounded-full flex items-center justify-center mx-auto mb-3">
                            <Bot className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-1">Mode Pilotage Auto</h3>
                        <p className="text-sm text-slate-600 mb-3">L'IA a envoyé 12 candidatures pour vous cette nuit.</p>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none">3 Entretiens Décrochés</Badge>
                    </div>

                    <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 animate-bounce-slow hidden sm:block">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                                <Check className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-medium">Réponse reçue</p>
                                <p className="text-sm font-bold text-slate-900">Entretien @Spotify</p>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section - Session 1: L'Invisibilité ATS */}
        <section id="problem" className="py-24 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="flex-1 space-y-6">
                    <div className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-medium text-red-600">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Le Problème
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        99% des CV finissent à la poubelle.
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Les <strong>ATS</strong> (Applicant Tracking Systems) filtrent impitoyablement. Une marge de 2&nbsp;cm au lieu de 2,5&nbsp;cm&nbsp;? Rejeté. Un <strong>mot-clé</strong> manquant&nbsp;? Rejeté.
                    </p>
                    <p className="text-lg text-slate-600 leading-relaxed font-medium">
                        Vous ne vous battez pas contre d'autres candidats, vous vous battez contre un algorithme.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                            <p className="text-3xl font-bold text-slate-900 mb-1">75%</p>
                            <p className="text-sm text-slate-500">des CV jamais lus par un humain</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                            <p className="text-3xl font-bold text-slate-900 mb-1">6 sec</p>
                            <p className="text-sm text-slate-500">temps moyen de lecture recruteur</p>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg border border-slate-100 relative overflow-hidden">
                     <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">REJETÉ</div>
                     <div className="space-y-4 opacity-50 blur-[1px]">
                        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                        <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                        <div className="h-32 bg-slate-100 rounded w-full"></div>
                        <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                     </div>
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-xl shadow-xl border border-red-100 text-center max-w-xs">
                            <X className="w-12 h-12 text-red-500 mx-auto mb-2" />
                            <h3 className="font-bold text-slate-900">Format Incompatible</h3>
                            <p className="text-sm text-slate-500 mt-1">L'ATS n'a pas pu extraire vos compétences.</p>
                        </div>
                     </div>
                </div>
            </div>
          </div>
        </section>

        {/* Solution Section - Session 2: Design & Tech v2.0 */}
        <section id="features" className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-16 mb-32">
                <div className="flex-1 order-2 md:order-1 relative">
                     <div className="absolute inset-0 bg-gradient-to-tr from-[#635bff]/20 to-purple-500/20 rounded-full blur-3xl opacity-50"></div>
                     <div className="relative bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-xl">
                        {/* Simulation of clean CV */}
                        <div className="space-y-6">
                            <div className="flex justify-between items-start border-b border-slate-200 pb-6">
                                <div>
                                    <div className="h-6 bg-slate-800 rounded w-48 mb-2"></div>
                                    <div className="h-4 bg-[#635bff] rounded w-32"></div>
                                </div>
                                <div className="h-12 w-12 bg-slate-200 rounded-full"></div>
                            </div>
                            <div className="space-y-3">
                                <div className="h-4 bg-slate-300 rounded w-1/4"></div>
                                <div className="h-3 bg-slate-200 rounded w-full"></div>
                                <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                            </div>
                        </div>
                        
                        <div className="absolute -right-6 bottom-12 bg-white p-4 rounded-xl shadow-lg border border-green-100 flex items-center gap-3 animate-bounce-slow">
                            <div className="bg-green-100 p-2 rounded-full text-green-600">
                                <Check className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-900">ATS Score</p>
                                <p className="text-green-600 font-bold">100/100</p>
                            </div>
                        </div>
                     </div>
                </div>
                
                <div className="flex-1 space-y-6 order-1 md:order-2">
                    <div className="inline-flex items-center rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-sm font-medium text-purple-600">
                        <Sparkles className="w-4 h-4 mr-2" />
                        HonAiJob
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Passez sous le radar avec l'invisibilité ATS.</h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Notre IA restructure votre parcours pour satisfaire 100% des critères techniques. Une structure invisible pour les robots, mais un design élégant pour les humains.
                    </p>
                    <ul className="space-y-4 pt-4">
                        <li className="flex items-start gap-3">
                            <div className="bg-green-100 p-1 rounded-full text-green-600 mt-1">
                                <Check className="w-3 h-3" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Design "Human-First"</h4>
                                <p className="text-sm text-slate-600">Fini les templates génériques. Nos designs respirent la compétence.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="bg-green-100 p-1 rounded-full text-green-600 mt-1">
                                <Check className="w-3 h-3" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Mots-clés Dynamiques</h4>
                                <p className="text-sm text-slate-600">L'IA injecte les termes exacts recherchés par chaque entreprise.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Session 3: Autopilot */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-16">
                <div className="flex-1 relative">
                    <div className="absolute inset-0 bg-gradient-to-l from-blue-600 to-cyan-500 rounded-2xl blur-xl opacity-20"></div>
                    <div className="relative bg-slate-900 rounded-2xl p-8 border border-slate-800 text-white overflow-hidden">
                        <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="font-mono text-sm text-green-400">PILOTE AUTOMATIQUE ACTIF</span>
                            </div>
                            <span className="text-xs text-slate-500 font-mono">v2.0.4</span>
                        </div>
                        <div className="space-y-6 font-mono text-sm">
                            <div className="flex items-center gap-4">
                                <span className="text-slate-500 w-16">02:14</span>
                                <span className="text-blue-300">Scanning LinkedIn, Indeed, Welcome to the Jungle...</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-slate-500 w-16">02:15</span>
                                <span className="text-white">Found 3 matching positions for "Senior Dev".</span>
                            </div>
                            <div className="flex items-center gap-4 bg-white/5 p-2 rounded -mx-2">
                                <span className="text-slate-500 w-16">02:16</span>
                                <span className="text-green-400">✓ Application sent to Spotify (Score: 98%)</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-slate-500 w-16">02:18</span>
                                <span className="text-blue-300">Customizing cover letter for Airbnb...</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="flex-1 space-y-6">
                    <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-[#635bff]">
                        <Bot className="w-4 h-4 mr-2" />
                        Exclusivité Honaijob
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Votre carrière en pilote automatique.</h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Pendant que vous dormez, Honaijob scanne, adapte votre CV et postule aux meilleures offres. Réveillez-vous avec des entretiens, pas des refus.
                    </p>
                    
                    <div className="bg-amber-50 border border-amber-100 p-4 rounded-lg">
                        <p className="text-sm text-amber-800 font-medium flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Fonctionnalité très demandée.
                        </p>
                    </div>

                </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-24 bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900">Ils ont décroché le job.</h2>
                    <p className="mt-4 text-lg text-slate-600">Rejoignez les milliers d'utilisateurs qui font confiance à Honaijob.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            quote: "J'ai postulé à 50 offres sans réponse. Avec Honaijob, j'ai eu 3 entretiens en une semaine. L'optimisation ATS change tout.",
                            author: "Thomas L.",
                            role: "Développeur Fullstack",
                            company: "Maintenant chez BlaBlaCar"
                        },
                        {
                            quote: "Le mode pilote automatique est incroyable. Je me suis réveillée avec une invitation d'entretien pour mon job de rêve.",
                            author: "Sarah M.",
                            role: "Product Manager",
                            company: "Maintenant chez Qonto"
                        },
                        {
                            quote: "Simple, efficace et redoutable. Je ne postulerai plus jamais 'à la main'. C'est un gain de temps phénoménal.",
                            author: "Karim B.",
                            role: "Data Scientist",
                            company: "Maintenant chez Doctolib"
                        }
                    ].map((testim, i) => (
                        <Card key={i} className="border-none shadow-sm bg-white p-6">
                            <div className="mb-4 text-[#635bff]">
                                <Quote className="w-8 h-8 opacity-50" />
                            </div>
                            <p className="text-slate-700 mb-6 italic">"{testim.quote}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">
                                    {testim.author[0]}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900">{testim.author}</p>
                                    <p className="text-xs text-slate-500">{testim.role}</p>
                                    <p className="text-xs text-[#635bff] font-medium">{testim.company}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        {/* Pricing CTA */}
        <section id="pricing" className="py-24 bg-white relative overflow-hidden">
             <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent"></div>
             <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-[#635bff] rounded-3xl p-8 sm:p-16 text-center text-white shadow-2xl shadow-blue-600/30 relative overflow-hidden max-w-5xl mx-auto">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
                    
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 relative z-10">
                        Investissez en vous pour moins cher qu'un déjeuner.
                    </h2>
                    <div className="relative z-10 mb-8">
                        <span className="text-5xl font-extrabold">9.99€</span>
                        <span className="text-blue-200 text-xl">/mois</span>
                    </div>
                    <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-10 relative z-10">
                        Accès illimité à l'IA, candidatures automatiques, optimisation de CV et lettres de motivation illimitées. Sans engagement.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                        <Button size="lg" onClick={handleStart} className="w-full sm:w-auto bg-white text-[#635bff] hover:bg-blue-50 hover:scale-105 transition-all font-bold h-14 px-8 text-lg rounded-full shadow-lg">
                            Commencer l'essai maintenant
                        </Button>
                    </div>
                    <p className="text-sm text-blue-200 mt-6 relative z-10">
                        Garantie satisfait ou remboursé sous 14 jours. Aucun risque.
                    </p>
                </div>
             </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900">Questions Fréquentes</h2>
                </div>
                <Accordion type="single" collapsible className="w-full bg-white rounded-xl shadow-sm border border-slate-200">
                    <AccordionItem value="item-1" className="px-6 border-b border-slate-100">
                        <AccordionTrigger className="text-left font-medium text-slate-900 hover:text-[#635bff]">Est-ce que Honaijob garantit que je trouverai un emploi ?</AccordionTrigger>
                        <AccordionContent className="text-slate-600">
                            Bien que nous ne puissions pas garantir le résultat final (qui dépend de vos compétences et de l'entretien), nos utilisateurs obtiennent en moyenne 3x plus d'entretiens grâce à l'optimisation ATS et au volume de candidatures envoyées.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="px-6 border-b border-slate-100">
                        <AccordionTrigger className="text-left font-medium text-slate-900 hover:text-[#635bff]">Comment fonctionne le mode "Pilotage Automatique" ?</AccordionTrigger>
                        <AccordionContent className="text-slate-600">
                            Vous définissez vos critères (poste, salaire, localisation). Notre IA scanne les job boards, sélectionne les offres pertinentes et envoie votre candidature optimisée automatiquement. Vous recevez un rapport quotidien.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3" className="px-6 border-b border-slate-100">
                        <AccordionTrigger className="text-left font-medium text-slate-900 hover:text-[#635bff]">Puis-je annuler à tout moment ?</AccordionTrigger>
                        <AccordionContent className="text-slate-600">
                            Absolument. Il n'y a aucun engagement de durée. Vous pouvez annuler votre abonnement en un clic depuis votre espace personnel.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4" className="px-6 border-none">
                        <AccordionTrigger className="text-left font-medium text-slate-900 hover:text-[#635bff]">Est-ce compatible avec mon secteur d'activité ?</AccordionTrigger>
                        <AccordionContent className="text-slate-600">
                            Oui, Honaijob fonctionne pour tous les secteurs (Tech, Marketing, Finance, Santé, etc.). L'IA s'adapte au vocabulaire spécifique de votre industrie.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>

        {/* Final Footer CTA */}
        <section className="py-12 bg-white border-t border-slate-100">
            <div className="container mx-auto px-4 text-center">
                <p className="text-slate-600 mb-4">Ne laissez pas passer votre chance.</p>
                <Button variant="link" onClick={handleStart} className="text-[#635bff] font-bold text-lg hover:underline">
                    Créer mon compte gratuitement <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-1 space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#635bff] text-white">
                            <Sparkles className="h-5 w-5" />
                        </div>
                        <span className="text-xl font-bold text-white">Honaijob</span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        L'intelligence artificielle au service de votre carrière. Créez des CVs parfaits et postulez automatiquement.
                    </p>
                    <div className="flex gap-4 pt-2">
                        <a href="#" className="hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a>
                        <a href="#" className="hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></a>
                        <a href="#" className="hover:text-white transition-colors"><Facebook className="h-5 w-5" /></a>
                        <a href="#" className="hover:text-white transition-colors"><Instagram className="h-5 w-5" /></a>
                    </div>
                </div>
                
                <div>
                    <h3 className="font-semibold text-white mb-4">Produit</h3>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#features" className="hover:text-[#635bff] transition-colors">Fonctionnalités</a></li>
                        <li><a href="#pricing" className="hover:text-[#635bff] transition-colors">Tarifs</a></li>
                        <li><a href="#" className="hover:text-[#635bff] transition-colors">Témoignages</a></li>
                        <li><a href="#faq" className="hover:text-[#635bff] transition-colors">FAQ</a></li>
                    </ul>
                </div>
                
                <div>
                    <h3 className="font-semibold text-white mb-4">Légal</h3>
                    <ul className="space-y-3 text-sm">
                        <li><Link to="/legal/terms" className="hover:text-[#635bff] transition-colors">Conditions Générales</Link></li>
                        <li><Link to="/legal/privacy" className="hover:text-[#635bff] transition-colors">Confidentialité</Link></li>
                        <li><Link to="/legal/mentions" className="hover:text-[#635bff] transition-colors">Mentions Légales</Link></li>
                        <li><Link to="/legal/refund" className="hover:text-[#635bff] transition-colors">Politique de Remboursement</Link></li>
                    </ul>
                </div>
                
                <div>
                    <h3 className="font-semibold text-white mb-4">Contact</h3>
                    <ul className="space-y-3 text-sm">
                        <li><a href="mailto:support@honaijob.com" className="hover:text-[#635bff] transition-colors">support@honaijob.com</a></li>
                        <li><span className="text-slate-500">Paris, France</span></li>
                    </ul>
                </div>
            </div>
            
            <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                <div>
                    © {new Date().getFullYear()} Honaijob AI. Tous droits réservés.
                </div>
                <div className="flex gap-6">
                    <span>Fait avec ❤️ pour les chercheurs d'emploi</span>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}
