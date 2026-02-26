// Point d’entrée layout : encapsule les routes dans le gabarit AppShell.
import { Outlet } from "react-router";
import { AppShell } from "~/components/layout/app-shell";

// Composant racine qui intègre le routeur dans le layout global.
export function AppShellRoot() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
