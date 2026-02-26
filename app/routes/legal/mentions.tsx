import type { Route } from "./+types/mentions";

export const meta: Route.MetaFunction = () => [
  { title: "Mentions Légales - Honaijob" },
  { name: "description", content: "Informations légales obligatoires concernant l'éditeur et l'hébergeur du site Honaijob." },
];

export default function LegalMentions() {
  return (
    <article className="prose prose-slate max-w-none lg:prose-lg">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-8">Mentions Légales</h1>

      <section className="space-y-8 divide-y divide-slate-100">
        <div className="pt-8 first:pt-0">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Éditeur du Site</h2>
          <p>
            Le site Honaijob est édité par :<br />
            <strong>Honaijob SAS</strong><br />
            Société par Actions Simplifiée au capital de 1 000 €<br />
            Immatriculée au RCS de Paris sous le numéro 123 456 789<br />
            Siège social : 123 Avenue de l'Intelligence Artificielle, 75000 Paris, France<br />
            N° TVA Intracommunautaire : FR 12 123456789<br />
            Directeur de la publication : Franklin Delbo
          </p>
        </div>

        <div className="pt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Hébergement</h2>
          <p>
            Le site est hébergé par :<br />
            <strong>Vercel Inc.</strong><br />
            340 S Lemon Ave #4133<br />
            Walnut, CA 91789<br />
            États-Unis<br />
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">https://vercel.com</a>
          </p>
        </div>

        <div className="pt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Propriété Intellectuelle</h2>
          <p>
            L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques. La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
          </p>
        </div>

        <div className="pt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Protection des Données (RGPD)</h2>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de portabilité et d'effacement de vos données personnelles. Pour exercer ce droit, veuillez contacter notre Délégué à la Protection des Données (DPO) à l'adresse : <a href="mailto:dpo@honaijob.com">dpo@honaijob.com</a>.
          </p>
          <p>
            Pour plus d'informations, veuillez consulter notre <a href="/legal/privacy">Politique de Confidentialité</a>.
          </p>
        </div>

        <div className="pt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Contact</h2>
          <p>
            Pour toute question ou réclamation, vous pouvez nous contacter :<br />
            Par email : <a href="mailto:contact@honaijob.com">contact@honaijob.com</a><br />
            Par courrier : À l'adresse du siège social indiquée ci-dessus.
          </p>
        </div>
      </section>
    </article>
  );
}
