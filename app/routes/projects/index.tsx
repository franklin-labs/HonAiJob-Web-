// Page d'index des projets. Redirige vers le tableau de bord ou liste les projets.
import { Navigate } from "react-router";

export default function ProjectsIndex() {
  return <Navigate to="/dashboard" replace />;
}
