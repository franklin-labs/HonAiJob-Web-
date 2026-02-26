# Honaijob Frontend

Application de gestion de candidatures intelligente, construite avec React Router v7, Tailwind CSS v4, et Shadcn UI.

## 🚀 Fonctionnalités Clés

- **Routing Moderne** : Utilisation de React Router v7 avec loaders, actions et nested routes.
- **Interface Utilisateur** : Design système inspiré de Stripe, propre et accessible (WCAG 2.1 AA).
- **Composants Réutilisables** : Basés sur Radix UI et stylisés avec Tailwind CSS.
- **Gestion d'État** : Context API pour la gestion locale des données (CVs, Offres, Candidatures).
- **Internationalisation** : Support i18n intégré.
- **Responsive Design** : Adapté à tous les écrans (Mobile First).

## 🛠️ Stack Technique

- **Framework** : [React Router v7](https://reactrouter.com/) (anciennement Remix)
- **Langage** : TypeScript
- **Styles** : [Tailwind CSS v4](https://tailwindcss.com/)
- **Composants UI** : [Shadcn UI](https://ui.shadcn.com/) (Radix UI)
- **Icônes** : [Lucide React](https://lucide.dev/)
- **Build Tool** : Vite

## 📦 Installation et Démarrage

1. **Cloner le dépôt**
   ```bash
   git clone <url-du-repo>
   cd frontend-honaijob
   ```

2. **Installer les dépendances**
   ```bash
   pnpm install
   # ou
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   pnpm dev
   # ou
   npm run dev
   ```
   L'application sera accessible sur `http://localhost:5173`.

4. **Lancer les tests**
   ```bash
   pnpm typecheck
   # Pour les tests unitaires (à venir)
   # pnpm test
   ```

## 🏗️ Structure du Projet

```
app/
├── components/         # Composants UI et Layouts
│   ├── layout/         # Layouts globaux (AppShell, etc.)
│   └── ui/             # Composants de base (Button, Card, etc.)
├── context/            # Contextes React (CvContext, AuthContext)
├── i18n/               # Configuration i18n et traductions
├── lib/                # Utilitaires (cn, formatters)
├── routes/             # Routes de l'application (Pages)
│   ├── _index.tsx      # Page d'accueil / Login
│   ├── dashboard.tsx   # Tableau de bord
│   ├── jobs.tsx        # Recherche d'emploi (avec Loaders)
│   └── ...
├── root.tsx            # Point d'entrée de l'application React
└── routes.ts           # Configuration des routes (File System Routing)
```

## 🎨 Design System

Le design suit une approche "Stripe-inspired" :
- **Couleurs** : Palette principale bleue (`#635bff`), fonds gris clair (`slate-50`), surfaces blanches avec ombres douces.
- **Typographie** : Inter (via Google Fonts).
- **Espacement** : Grille de 4px (Tailwind standard).
- **Arrondi** : `rounded-xl` pour les cartes et conteneurs principaux.

## 🔒 Sécurité et Accessibilité

- **Authentification** : Simulation d'authentification Google (OAuth flow placeholder).
- **Accessibilité** :
  - Contraste suffisant pour le texte.
  - Navigation au clavier sur tous les éléments interactifs.
  - Labels ARIA pour les icônes et boutons sans texte.

## 🤝 Contribution

1. Forker le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request
# HonAiJob-Web-
