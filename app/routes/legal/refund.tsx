import { AlertTriangle, Clock, CheckCircle, Mail } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";

export default function RefundPolicy() {
  return (
    <article className="prose prose-slate max-w-none lg:prose-lg">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-8">Politique de Remboursement</h1>
      <p className="lead text-xl text-slate-600 mb-12">
        Chez Honaijob, nous voulons que vous soyez satisfait de votre investissement. C'est pourquoi nous offrons une garantie de remboursement transparente, soumise aux conditions ci-dessous.
      </p>

      <div className="grid gap-8 md:grid-cols-2 mb-12 not-prose">
        <Card className="border-none shadow-lg bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Délai Strict de 7 Jours</h3>
                <p className="text-slate-600 text-sm">
                  Vous disposez de 7 jours calendaires (168 heures) après votre paiement initial pour demander un remboursement. Passé ce délai, aucune demande ne sera acceptée.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-emerald-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-emerald-100 p-3 text-emerald-600">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Garantie de Résultat</h3>
                <p className="text-slate-600 text-sm">
                  Si vous n'êtes pas satisfait des résultats obtenus avec notre IA, nous vous remboursons intégralement, sans poser de questions complexes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-slate-900">Procédure de Demande</h2>
        <p>Pour initier une demande de remboursement, veuillez suivre scrupuleusement les étapes suivantes :</p>
        
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            <strong>Vérifiez votre éligibilité :</strong> Assurez-vous que votre demande est effectuée dans les 7 jours suivant votre achat.
          </li>
          <li>
            <strong>Envoyez un email :</strong> Écrivez à <a href="mailto:support@honaijob.com" className="text-blue-600 font-medium">support@honaijob.com</a> avec l'objet "Demande de Remboursement".
          </li>
          <li>
            <strong>Incluez les preuves requises :</strong>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-slate-600">
              <li>L'adresse email de votre compte Honaijob.</li>
              <li>Le numéro de transaction ou de facture.</li>
              <li>Une brève explication de la raison (pour nous aider à nous améliorer).</li>
            </ul>
          </li>
          <li>
            <strong>Traitement :</strong> Notre équipe examinera votre demande sous 48h ouvrées. Si elle est conforme, le remboursement sera déclenché immédiatement sur votre moyen de paiement d'origine (comptez 5 à 10 jours bancaires).
          </li>
        </ol>

        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl my-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-amber-900 text-lg mb-2">Cas d'Exclusion et Abus</h3>
              <p className="text-amber-800 text-sm mb-2">
                Le remboursement sera systématiquement refusé dans les cas suivants :
              </p>
              <ul className="list-disc pl-5 text-amber-800 text-sm space-y-1">
                <li>Demande effectuée après le délai de 7 jours.</li>
                <li>Utilisation abusive détectée (ex: génération massive de documents puis demande de remboursement).</li>
                <li>Comptes bannis pour violation des conditions d'utilisation.</li>
                <li>Renouvellements d'abonnement (la garantie ne s'applique qu'au premier mois).</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900">Note Importante</h2>
        <p>
          Le remboursement entraîne la résiliation immédiate de votre abonnement Premium et la perte de l'accès aux fonctionnalités avancées. Vos données et documents générés seront conservés conformément à notre politique de confidentialité, mais ne seront plus modifiables avec les outils Premium.
        </p>
      </section>
    </article>
  );
}
