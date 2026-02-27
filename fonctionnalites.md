# Fonctionnalités du Frontend - Honaijob

Ce document décrit de manière exhaustive les fonctionnalités implémentées dans l'interface utilisateur de Honaijob.

## 1. Gestion des Projets
Le système est structuré autour de "Projets". Un projet peut correspondre à une recherche d'emploi spécifique (ex: "Développeur Fullstack Spotify").

- **Liste des Projets** : Vue d'ensemble de tous les projets créés avec indicateurs de progression.
- **Création de Projet** : Formulaire pour définir le nom et la description d'un nouvel objectif professionnel.
- **Suppression de Projet** : Possibilité de supprimer un projet et toutes ses données associées (après confirmation).
- **Contexte de Navigation** : Une fois un projet sélectionné, toute la navigation (Dashboard, Jobs, Applications) se synchronise automatiquement avec ce projet.

## 2. Gestion des CV
Honaijob permet de gérer plusieurs versions de CV optimisées par projet.

- **Ajout de CV** : Possibilité d'ajouter plusieurs CV à un même projet.
- **Vue Globale des CV** : Une page dédiée regroupant tous les CV de tous les projets pour une gestion centralisée.
- **Score IA par CV** : Affichage du score de matching moyen pour chaque CV.
- **Gestion Individuelle** : Suppression ou mise à jour spécifique de chaque document.

## 3. Tableau de Bord (Dashboard)
Une vue cockpit pour piloter sa recherche d'emploi au sein d'un projet.

- **Statistiques Rapides** : Nombre de CV créés, score de match moyen, nombre d'offres trouvées et candidatures en cours.
- **Liste des CV du Projet** : Accès rapide aux documents du projet avec leurs scores respectifs.
- **Conseils IA Stratégiques** : Recommandations personnalisées générées par l'IA pour améliorer le score de matching (ex: ajout de mots-clés spécifiques).
- **Navigation Contextuelle** : Boutons d'accès rapide aux détails du projet et à l'optimisation.

## 4. Offres d'Emploi (Jobs)
Moteur de recherche et de consultation d'offres d'emploi intelligentes.

- **Liste des Offres** : Affichage des offres avec calcul en temps réel du pourcentage de matching.
- **Filtrage Avancé** : Filtres par type de contrat (CDI, Freelance, Stage), niveau d'expérience et localisation.
- **Détails de l'Offre (Mobile-Friendly)** : Ouverture des détails dans un panneau coulissant (Sheet) avec description complète et responsabilités.
- **Alertes de Matching** : Message d'avertissement si le score de matching est inférieur à 80%.
- **Candidature Externe** : Redirection sécurisée vers le site du recruteur pour finaliser la candidature.
- **Sauvegarde d'Offres** : Possibilité de mettre de côté des offres pour plus tard.

## 5. Matching IA (AI-Match)
Analyse approfondie de la compatibilité entre un CV et une offre.

- **Score de Compatibilité Détaillé** : Visualisation graphique du score global.
- **Analyse des Compétences** : Barres de progression montrant la maîtrise des compétences requises vs possédées.
- **Points à Améliorer** : Liste précise des compétences manquantes ou des points de friction identifiés par l'IA.
- **Tendances** : Indicateur d'évolution du score suite aux modifications apportées.

## 6. Suivi des Candidatures (Applications)
Tableau de bord pour suivre l'état de chaque candidature envoyée.

- **Suivi des Étapes** : Statut en temps réel (En cours, Entretien, Offre reçue, Refusé).
- **Vue Liste/Tableau** : Interface optimisée pour la lecture sur mobile ou pour la gestion dense sur desktop.
- **Historique** : Date d'envoi et lien vers l'offre originale.

## 7. Paramètres & Profil
Gestion du compte utilisateur et des préférences de l'IA.

- **Profil Utilisateur** : Informations personnelles et photo.
- **Mode Autopilote** : Activation/Désactivation de l'assistance automatique de l'IA.
- **Préférences de Notifications** : Alertes pour les nouveaux matches ou changements de statut.

## 8. Optimisation Mobile (Native Experience)
L'application a été conçue pour offrir une expérience proche d'une application native sur smartphone.

- **Bottom Navigation Bar** : Barre de navigation basse pour un accès rapide au pouce (Dashboard, Jobs, Applications, Paramètres).
- **Responsive Design Radical** : Utilisation de coins très arrondis (`rounded-2xl`), de grands boutons tactiles et d'espacements aérés.
- **Transitions Fluides** : Effets de survol et de clic optimisés pour le tactile.
- **Adaptation Mobile** : Masquage automatique des éléments encombrants (Sidebar) au profit d'interfaces verticales claires.

## 9. Internationalisation (i18n)
Support complet du multilingue (Français/Anglais) pour l'ensemble de l'interface et des messages système.
