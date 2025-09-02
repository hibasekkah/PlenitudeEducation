# PlenitudeEducation
Application Web de Gestion des Formations
🚀 Description

Une application web moderne pour centraliser, automatiser et sécuriser la gestion des formations professionnelles.
Elle permet le suivi des entreprises, participants, formateurs, sessions et plannings, avec génération automatique de documents et notifications par email.

✨ Fonctionnalités principales

Authentification sécurisée (JWT) avec rôles et permissions

Gestion complète : entreprises, formations, modules, ateliers, sessions, participants, RH, formateurs

Tableau de bord interactif avec statistiques en temps réel

Planification avancée des sessions et téléchargement des plannings / feuilles de présence

Espace personnel pour chaque utilisateur (administrateur, RH, formateur, participant)

Génération PDF automatique (attestations, plannings, listes de présence)

Envoi d’emails automatisés (convocations, notifications)

🛠 Technologies

Frontend : React.js, Vite, TailwindCSS, EmailJS

Backend : Laravel 12 (MVC), Composer, MailHog

Authentification : JWT

Base de données : MySQL (via XAMPP)

PDF : DOMPDF

⚡ Installation rapide
Prérequis

PHP ≥ 8.0, Composer

Node.js ≥ 16

MySQL ≥ 8.0

XAMPP ou équivalent

Étapes

# Installer dépendances backend
cd core
composer install

# Installer dépendances frontend
cd core
cd frontend
npm install
cd ..

# Configurer l'environnement
dans .env éditer base de données, clés JWT et Mail



# Migrer la base
php artisan migrate (pour cree un compte admin --seed Admin@example.com AdminAdmin)

# Lancer les serveurs
cd core && php artisan serve     # backend
cd core && cd frontend && npm run dev   # frontend

Lancer MailHog et XAMPP (MySQL)
