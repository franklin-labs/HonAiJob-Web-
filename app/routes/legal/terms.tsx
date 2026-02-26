import type { Route } from "./+types/terms";

export const meta: Route.MetaFunction = () => [
  { title: "Conditions Générales de Vente et d'Utilisation - Honaijob" },
  { name: "description", content: "Consultez nos CGV et CGU. Utilisation du service, abonnements, et garantie de remboursement 7 jours." },
];

export default function Terms() {
  return (
    <article className="prose prose-slate max-w-none lg:prose-lg">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-8">Conditions Générales de Vente et d'Utilisation (CGV/CGU)</h1>
      <p className="lead text-xl text-slate-600 mb-8">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">1. Préambule</h2>
        <p>
          Les présentes Conditions Générales de Vente et d'Utilisation (ci-après "CGV/CGU") régissent l'accès et l'utilisation de la plateforme Honaijob (ci-après "le Service"), ainsi que les conditions de souscription aux abonnements proposés.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">2. Objet du Service</h2>
        <p>
          Honaijob est un assistant de recherche d'emploi alimenté par l'intelligence artificielle, permettant aux utilisateurs d'optimiser leurs CVs, de générer des lettres de motivation et de suivre leurs candidatures.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">3. Abonnements et Tarifs</h2>
        <p>
          L'accès complet aux fonctionnalités du Service nécessite la souscription d'un abonnement mensuel au tarif de <strong>9.99€ TTC/mois</strong>. Ce tarif est susceptible d'évoluer, les utilisateurs seront informés de toute modification au moins 30 jours à l'avance.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 bg-blue-50 p-6 rounded-xl border border-blue-100">4. Garantie "Satisfait ou Remboursé" (7 Jours)</h2>
        <div className="pl-4 border-l-4 border-blue-500 space-y-4">
          <p>
            Conformément à notre engagement qualité, nous offrons une garantie de remboursement d'une durée stricte de <strong>7 jours calendaires</strong> à compter de la date et de l'heure de la souscription initiale.
          </p>
          <p>
            <strong>Conditions d'éligibilité :</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>La demande doit être formulée dans les 7 jours suivant l'achat (date et heure faisant foi).</li>
            <li>L'utilisateur doit justifier d'une utilisation réelle du service (ex: avoir généré au moins un document ou effectué une action sur la plateforme).</li>
            <li>Le compte ne doit pas avoir enfreint les présentes CGU (abus, partage de compte, utilisation frauduleuse).</li>
          </ul>
          <p>
            Passé ce délai de 7 jours, aucun remboursement ne sera accordé, quel que soit le motif, y compris pour les périodes non utilisées d'un mois entamé.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">5. Droit de Rétractation</h2>
        <p>
          Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour les contrats de fourniture d'un contenu numérique non fourni sur un support matériel dont l'exécution a commencé après accord préalable exprès du consommateur et renoncement exprès à son droit de rétractation. En souscrivant au Service et en l'utilisant immédiatement, vous renoncez expressément à votre droit de rétractation légal de 14 jours, au profit de notre garantie commerciale de 7 jours décrite à l'article 4.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">6. Résiliation</h2>
        <p>
          L'abonnement est sans engagement de durée. Vous pouvez le résilier à tout moment depuis votre espace client. La résiliation prendra effet à la fin de la période de facturation en cours. Aucun remboursement au prorata n'est effectué pour le mois en cours.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">7. Responsabilité</h2>
        <p>
          Honaijob ne garantit pas l'obtention d'un emploi ou d'un entretien. Le Service est une obligation de moyens et non de résultat. Nous ne saurions être tenus responsables des décisions prises par les recruteurs.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">8. Loi Applicable</h2>
        <p>
          Les présentes CGV/CGU sont soumises au droit français. Tout litige relatif à leur interprétation et/ou à leur exécution relève des tribunaux français compétents.
        </p>
      </section>
    </article>
  );
}
