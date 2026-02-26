// Déclaration centralisée des routes React Router (fichiers de pages associés).
import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  index("routes/login.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
  route("cvs", "routes/cvs.tsx"),
  route("jobs", "routes/jobs.tsx"),
  route("ai-match", "routes/ai-match.tsx"),
  route("applications", "routes/applications.tsx"),
  route("settings", "routes/settings.tsx"),
  
  // Legal Pages
  layout("routes/legal.tsx", [
    route("legal/terms", "routes/legal/terms.tsx"),
    route("legal/refund", "routes/legal/refund.tsx"),
    route("legal/mentions", "routes/legal/mentions.tsx"),
  ]),

  // Sales Funnel
  layout("routes/offer.tsx", [
    route("offer/checkout", "routes/offer/checkout.tsx"),
    route("offer/upsell", "routes/offer/upsell.tsx"),
    route("offer/thank-you", "routes/offer/thank-you.tsx"),
  ]),

  // Projects & CVs
  route("projects", "routes/projects/index.tsx"),
  route("projects/:id", "routes/projects/detail.tsx"),
] satisfies RouteConfig;
