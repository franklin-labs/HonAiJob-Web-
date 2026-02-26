import type { Route } from "./+types/privacy";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Politique de Confidentialité | Honaijob" },
    { name: "description", content: "Politique de confidentialité et protection des données personnelles sur Honaijob." },
  ];
};

export default function Privacy() {
  return (
    <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 hover:prose-a:text-blue-500">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mb-8">Politique de Confidentialité</h1>
      
      <p className="lead text-lg text-slate-600 mb-8">
        Chez Honaijob, la protection de vos données personnelles est notre priorité absolue. Cette politique détaille comment nous collectons, utilisons et protégeons vos informations.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Collecte des Données</h2>
          <p className="text-slate-600">
            Nous collectons les informations que vous nous fournissez directement lorsque vous :
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-600">
            <li>Créez un compte (email, nom, prénom via Google Auth).</li>
            <li>Remplissez votre profil professionnel (CV, expériences, compétences).</li>
            <li>Utilisez nos services de génération de CV ou de lettre de motivation.</li>
            <li>Contactez notre support client.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Utilisation des Données</h2>
          <p className="text-slate-600">
            Vos données sont utilisées exclusivement pour :
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-600">
            <li>Vous fournir nos services (génération de documents, optimisation de CV).</li>
            <li>Améliorer nos algorithmes d'IA (données anonymisées uniquement).</li>
            <li>Vous informer des mises à jour et nouvelles fonctionnalités.</li>
            <li>Assurer la sécurité de votre compte.</li>
          </ul>
          <p className="mt-4 text-slate-600 font-medium">
            Nous ne vendons jamais vos données personnelles à des tiers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Protection des Données</h2>
          <p className="text-slate-600">
            Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles robustes :
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-600">
            <li>Chiffrement des données en transit (TLS/SSL) et au repos.</li>
            <li>Accès restreint aux données personnelles (principe du moindre privilège).</li>
            <li>Audits de sécurité réguliers.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Vos Droits</h2>
          <p className="text-slate-600">
            Conformément au RGPD, vous disposez des droits suivants :
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-600">
            <li><strong>Accès et Rectification :</strong> Vous pouvez consulter et modifier vos informations depuis votre tableau de bord.</li>
            <li><strong>Suppression :</strong> Vous pouvez demander la suppression définitive de votre compte et de toutes vos données.</li>
            <li><strong>Portabilité :</strong> Vous pouvez récupérer vos données dans un format standard.</li>
          </ul>
          <p className="mt-4 text-slate-600">
            Pour exercer ces droits, contactez-nous à <a href="mailto:privacy@honaijob.com">privacy@honaijob.com</a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Cookies</h2>
          <p className="text-slate-600">
            Nous utilisons des cookies essentiels pour le fonctionnement du site (authentification) et des cookies analytiques pour améliorer l'expérience utilisateur. Vous pouvez gérer vos préférences via les paramètres de votre navigateur.
          </p>
        </section>

        <section className="border-t border-slate-200 pt-8 mt-12">
          <p className="text-sm text-slate-500">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </section>
      </div>
    </div>
  );
}
