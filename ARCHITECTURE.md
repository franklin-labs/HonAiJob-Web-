# Architecture Technique - Honaijob Frontend

Ce document décrit les choix d'architecture et de conception technique du projet Honaijob Frontend.

## 1. Vue d'ensemble

L'application est une Single Page Application (SPA) construite avec React Router v7. Elle utilise une architecture orientée composants et routes, favorisant la séparation des préoccupations et la réutilisabilité.

## 2. Choix Technologiques

### 2.1 React Router v7
Nous avons choisi React Router v7 pour son approche moderne du routing :
- **Loaders & Actions** : Gestion des données asynchrone découplée de l'UI. Les `loaders` chargent les données avant le rendu de la route, éliminant les cascades de chargement.
- **Form Navigation** : Utilisation de `<Form>` pour gérer les mutations via les standards web (GET/POST), permettant une expérience utilisateur fluide sans rechargement complet.
- **Nested Routes** : Permet de composer des layouts complexes (ex: AppShell entourant le contenu principal).

### 2.2 Tailwind CSS v4 & Shadcn UI
- **Tailwind CSS v4** : Framework utilitaire pour un styling rapide et cohérent. La v4 apporte des améliorations de performance et une configuration simplifiée.
- **Shadcn UI** : Collection de composants réutilisables basés sur Radix UI. Ces composants sont accessibles (a11y) et entièrement personnalisables car le code source est copié dans le projet (`app/components/ui`).

### 2.3 Gestion d'État
- **Server State (Simulé)** : Géré via les loaders de React Router (ex: filtrage des jobs dans `jobs.tsx`).
- **Client State (Global)** : React Context API (`CvContext`) pour les données partagées qui nécessitent une persistance à travers la navigation sans rechargement (ex: liste des CVs, candidatures).
- **Client State (Local)** : `useState` / `useReducer` pour l'état purement UI (ex: ouverture de modales).

## 3. Structure des Dossiers

- `app/routes/` : Contient les modules de route. Chaque fichier exporte un composant par défaut et optionnellement un `loader`, une `action` et des `meta`.
- `app/components/` :
    - `ui/` : Composants atomiques (Boutons, Inputs, Cards).
    - `layout/` : Composants de structure (Sidebar, Header).
- `app/lib/` : Fonctions utilitaires pures.
- `app/context/` : Providers React.

## 4. Flux de Données

1. **Navigation** : L'utilisateur clique sur un lien (`<Link>`).
2. **Loader** : React Router exécute le `loader` associé à la route cible en parallèle.
3. **Rendu** : Une fois les données prêtes, le composant de route est rendu avec `useLoaderData()`.
4. **Interaction** : L'utilisateur soumet un formulaire (`<Form>`).
5. **Action** : (Optionnel) Une `action` traite la soumission, puis React Router revalide les loaders pour mettre à jour l'UI.

## 5. Performance et Optimisation

- **Code Splitting** : Automatique via React Router et Vite. Chaque route est chargée à la demande.
- **Optimisation des Images** : Utilisation de formats modernes et dimensions adaptées.
- **Mémorisation** : Utilisation de `useMemo` et `useCallback` pour les calculs coûteux dans les contextes.

## 6. Accessibilité (A11y)

Le projet vise la conformité WCAG 2.1 AA :
- Utilisation de composants sémantiques HTML5.
- Gestion du focus via Radix UI primitives.
- Contraste de couleurs vérifié (Palette Slate/Blue).
- Support de la navigation au clavier.

## 7. Tests

- **Typecheck** : TypeScript strict pour la sécurité du typage.
- **Linting** : ESLint pour la qualité du code.
- **Tests Unitaires** : (Prévus) Vitest pour tester la logique métier isolée.
