<?php

namespace Database\Seeders;

use App\Models\Atelier;
use App\Models\Entreprise;
use App\Models\Formation;
use App\Models\Module;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'nom' => 'Admin',
            'prenom' => 'Admin',
            'email' => 'Admin@example.com',
            'password' => Hash::make('AdminAdmin'),
            'role' => 'admin',
            'telephone' => '00000000',
        ]);

        Entreprise::create([
            'nom' => 'plenitude',
            'secteur' => 'it',
            'ICE' => '123456789',
            'IF' => '123456789',
            'CNSS' => '123456789',
            'telephone' => '0123456789',
            'email' => 'plenitude@gmail.com',
            'adresse' => 'fes',
            'capital' => '450000',
            'budget' => '20000',
            'priode' => '12',
            'debut_period' => '2025-12-12',
            'fin_period' => '2026-12-12',
            'numero_patente' => '1234567890',
            'nombre_personnels' => '200',
            'nombre_cadres' => '12',
            'nombre_employees' => '120',
            'nombre_ouvriers' => '5',
            'nom_gerant' => 'Mr amrani',
            'numero_cin_gerant' => 'cgt28745',
            'adresse_gerant' => 'fes'
        ]);

        Entreprise::create([
            'nom' => 'hiba beton',
            'secteur' => 'construction',
            'ICE' => '123456789',
            'IF' => '123456789',
            'CNSS' => '123456789',
            'telephone' => '0123456789',
            'email' => 'beton@gmail.com',
            'adresse' => 'fes',
            'capital' => '40000',
            'budget' => '50000',
            'priode' => '12',
            'debut_period' => '2025-09-01',
            'fin_period' => '2026-09-01',
            'numero_patente' => '1234567890',
            'nombre_personnels' => '200',
            'nombre_cadres' => '12',
            'nombre_employees' => '120',
            'nombre_ouvriers' => '5',
            'nom_gerant' => 'hiba beton',
            'numero_cin_gerant' => 'tj4445',
            'adresse_gerant' => 'fes'
        ]);

        Entreprise::create([
            'nom' => 'CGI',
            'secteur' => 'it & consulting',
            'ICE' => '123456789',
            'IF' => '123456789',
            'CNSS' => '123456789',
            'telephone' => '0123456789',
            'email' => 'CGI@gmail.com',
            'adresse' => 'fes',
            'capital' => '35000000',
            'budget' => '20000',
            'priode' => '12',
            'debut_period' => '2025-11-20',
            'fin_period' => '2026-11-20',
            'numero_patente' => '1234567890',
            'nombre_personnels' => '2200',
            'nombre_cadres' => '70',
            'nombre_employees' => '1200',
            'nombre_ouvriers' => '50',
            'nom_gerant' => 'CGI gerant',
            'numero_cin_gerant' => 'fhy6778',
            'adresse_gerant' => 'fes'
        ]);

        Entreprise::create([
            'nom' => 'alten',
            'secteur' => 'it & consulting',
            'ICE' => '123456789',
            'IF' => '123456789',
            'CNSS' => '123456789',
            'telephone' => '0123456789',
            'email' => 'alten@gmail.com',
            'adresse' => 'fes',
            'capital' => '3000000',
            'budget' => '40000',
            'priode' => '12',
            'debut_period' => '2025-07-15',
            'fin_period' => '2026-07-15',
            'numero_patente' => '1234567890',
            'nombre_personnels' => '2200',
            'nombre_cadres' => '70',
            'nombre_employees' => '1200',
            'nombre_ouvriers' => '50',
            'nom_gerant' => 'alten gerant',
            'numero_cin_gerant' => 'yfr6778',
            'adresse_gerant' => 'fes'
        ]);




        Formation::create([
            'intitule' => 'Comptabilite generale',
            'objectifs' => 'Comprendre les principes de base : notions d’actif, passif, charges, produits et logique débit/crédit.
            Savoir enregistrer les opérations courantes : achats, ventes, banque, salaires, amortissements.
            Établir les états financiers : bilan, compte de résultat et documents légaux conformes au Plan Comptable Général.
            Assurer la conformité fiscale : préparer les déclarations (TVA, IS…) et déterminer le résultat imposable.
            Analyser les informations comptables : lire et interpréter les états financiers pour appuyer la prise de décision.',
            'duree' => '30',
            'niveau' => 'debutant',
            'cout' => '12000',
            'categorie' => 'comptabilite'
        ]);


        Formation::create([
            'intitule' => 'Comptabilité analytique',
            'objectifs' => 'Comprendre les principes de la comptabilité analytique pour le suivi des coûts.
            Savoir répartir les charges directes et indirectes.
            Établir des calculs de coûts complets et partiels.
            Utiliser les données pour améliorer la rentabilité.
            Mettre en place un système de contrôle de gestion efficace.',
            'duree' => '25',
            'niveau' => 'intermediaire',
            'cout' => '15000',
            'categorie' => 'comptabilite'
        ]);

        Formation::create([
            'intitule' => 'Gestion de trésorerie',
            'objectifs' => 'Maîtriser les bases de la gestion de trésorerie en entreprise.
            Élaborer un budget de trésorerie et suivre les flux financiers.
            Optimiser les encaissements et décaissements.
            Analyser les prévisions et prévenir les tensions de liquidité.
            Utiliser des outils de suivi et de reporting efficaces.',
            'duree' => '20',
            'niveau' => 'debutant',
            'cout' => '10000',
            'categorie' => 'finance'
        ]);

        Formation::create([
            'intitule' => 'Fiscalité des entreprises',
            'objectifs' => 'Connaître les principaux impôts et taxes applicables aux entreprises.
            \nMaîtriser le calcul et la déclaration de la TVA.
            \nComprendre le calcul de l’impôt sur les sociétés.
            \nIdentifier les obligations fiscales et leurs échéances.
            \nSavoir anticiper et optimiser la charge fiscale dans le respect de la loi.',
            'duree' => '30',
            'niveau' => 'avance',
            'cout' => '18000',
            'categorie' => 'fiscalite'
        ]);

        Formation::create([
            'intitule' => 'Initiation à la gestion budgétaire',
            'objectifs' => 'Comprendre le rôle du budget dans la gestion d’entreprise.
            Élaborer un budget prévisionnel réaliste.
            Suivre et analyser les écarts entre prévisions et réalisations.
            Adapter les budgets en fonction des évolutions.
            Utiliser le budget comme outil d’aide à la décision.',
            'duree' => '15',
            'niveau' => 'debutant',
            'cout' => '9000',
            'categorie' => 'gestion'
        ]);


        Module::create(['titre' => 'Principes de base de la comptabilité', 'categorie' => 'théorie', 'formation_id' => 1]);
        Module::create(['titre' => 'Enregistrement des opérations courantes', 'categorie' => 'pratique', 'formation_id' => 1]);
        Module::create(['titre' => 'Établissement des états financiers', 'categorie' => 'pratique', 'formation_id' => 1]);
        Module::create(['titre' => 'Conformité fiscale et déclarations', 'categorie' => 'juridique', 'formation_id' => 1]);

        Module::create(['titre' => 'Fondements de la comptabilité analytique', 'categorie' => 'théorie', 'formation_id' => 2]);
        Module::create(['titre' => 'Répartition des charges directes/indirectes', 'categorie' => 'pratique', 'formation_id' => 2]);
        Module::create(['titre' => 'Calcul des coûts complets et partiels', 'categorie' => 'pratique', 'formation_id' => 2]);
        Module::create(['titre' => 'Contrôle de gestion et analyse', 'categorie' => 'stratégie', 'formation_id' => 2]);

        Module::create(['titre' => 'Bases de la gestion de trésorerie', 'categorie' => 'théorie', 'formation_id' => 3]);
        Module::create(['titre' => 'Élaboration du budget de trésorerie', 'categorie' => 'pratique', 'formation_id' => 3]);
        Module::create(['titre' => 'Optimisation des flux financiers', 'categorie' => 'stratégie', 'formation_id' => 3]);
        Module::create(['titre' => 'Outils de reporting financier', 'categorie' => 'technique', 'formation_id' => 3]);

        Module::create(['titre' => 'Panorama des impôts et taxes', 'categorie' => 'juridique', 'formation_id' => 4]);
        Module::create(['titre' => 'Calcul et déclaration de TVA', 'categorie' => 'pratique', 'formation_id' => 4]);
        Module::create(['titre' => 'Impôt sur les sociétés', 'categorie' => 'fiscal', 'formation_id' => 4]);
        Module::create(['titre' => 'Optimisation fiscale légale', 'categorie' => 'stratégie', 'formation_id' => 4]);

        Module::create(['titre' => 'Rôle du budget en entreprise', 'categorie' => 'théorie', 'formation_id' => 5]);
        Module::create(['titre' => 'Construction du budget prévisionnel', 'categorie' => 'pratique', 'formation_id' => 5]);
        Module::create(['titre' => 'Analyse des écarts budgétaires', 'categorie' => 'analyse', 'formation_id' => 5]);
        Module::create(['titre' => 'Budget comme outil décisionnel', 'categorie' => 'management', 'formation_id' => 5]);

        Atelier::create([
            'type' => 'Atelier pratique - Enregistrement comptable',
            'materiels' => 'Ordinateurs, logiciel comptable, cas pratiques',
            'observations' => 'Prévoir des exercices sur les écritures courantes',
            'lieu' => '23 Rue Abdelkrim El Khattabi, Fès',
            'formation_id' => 1
        ]);

        Atelier::create([
            'type' => 'Atelier fiscal - Déclarations TVA',
            'materiels' => 'Modèles de déclaration, PC avec logiciel fiscal',
            'observations' => 'Insister sur les délais de déclaration',
            'lieu' => '45 Avenue Hassan II, Fès',
            'formation_id' => 1
        ]);

        // Ateliers pour la formation "Comptabilité analytique"
        Atelier::create([
            'type' => 'Atelier calcul des coûts',
            'materiels' => 'Cas d\'entreprise, tableurs',
            'observations' => 'Prévoir des cas sectoriels différents',
            'lieu' => '12 Rue du Liban, Fès',
            'formation_id' => 2
        ]);

        Atelier::create([
            'type' => 'Atelier contrôle de gestion',
            'materiels' => 'Tableaux de bord, indicateurs clés',
            'observations' => 'Travailler sur des données réelles anonymisées',
            'lieu' => '8 Rue Baghdad, Fès',
            'formation_id' => 2
        ]);

        // Ateliers pour la formation "Gestion de trésorerie"
        Atelier::create([
            'type' => 'Atelier budget de trésorerie',
            'materiels' => 'Modèles Excel, cas pratiques',
            'observations' => 'Insister sur la prévision des flux',
            'lieu' => '30 Avenue des Forces Armées Royales, Fès',
            'formation_id' => 3
        ]);

        Atelier::create([
            'type' => 'Atelier outils de reporting',
            'materiels' => 'Logiciels de gestion, templates',
            'observations' => 'Comparer différents outils du marché',
            'lieu' => '15 Rue Mohammed Diouri, Fès',
            'formation_id' => 3
        ]);

        // Ateliers pour la formation "Fiscalité des entreprises"
        Atelier::create([
            'type' => 'Atelier calcul IS',
            'materiels' => 'PC avec logiciel fiscal, cas pratiques',
            'observations' => 'Traiter différents régimes fiscaux',
            'lieu' => '22 Avenue Mohammed Slaoui, Fès',
            'formation_id' => 4
        ]);

        Atelier::create([
            'type' => 'Atelier optimisation fiscale',
            'materiels' => 'Jurisprudence, documentation fiscale',
            'observations' => 'Rester dans le cadre légal strict',
            'lieu' => '5 Rue de la Liberté, Fès',
            'formation_id' => 4
        ]);

        // Ateliers pour la formation "Initiation à la gestion budgétaire"
        Atelier::create([
            'type' => 'Atelier construction budgétaire',
            'materiels' => 'Modèles prédéfinis, cas concrets',
            'observations' => 'Adapter aux différentes tailles d\'entreprise',
            'lieu' => '10 Avenue Lalla Meryem, Fès',
            'formation_id' => 5
        ]);

        Atelier::create([
            'type' => 'Atelier analyse des écarts',
            'materiels' => 'Données historiques, outils d\'analyse',
            'observations' => 'Méthodes de correction des écarts',
            'lieu' => '7 Rue de Palestine, Fès',
            'formation_id' => 5
        ]);

        User::create([
            'nom' => 'Alaoui',
            'prenom' => 'Hassan',
            'email' => 'rh.plenitude@formation.ma',
            'password' => Hash::make('rh123'),
            'role' => 'rh',
            'telephone' => '0611223344',
            'statut' => 'cadre',
            'entreprise_id' => 1
        ]);

        // Participants Plenitude
        User::create([
            'nom' => 'Bennis',
            'prenom' => 'Samira',
            'email' => 's.bennis@plenitude.ma',
            'password' => Hash::make('participant123'),
            'role' => 'participant',
            'telephone' => '0612345678',
            'statut' => 'cadre',
            'specialite_fonction' => 'Développeur Senior',
            'entreprise_id' => 1
        ]);

        User::create([
            'nom' => 'Mansouri',
            'prenom' => 'Karim',
            'email' => 'k.mansouri@plenitude.ma',
            'password' => Hash::make('participant123'),
            'role' => 'participant',
            'telephone' => '0623456789',
            'statut' => 'employé',
            'specialite_fonction' => 'Chef de projet',
            'entreprise_id' => 1
        ]);

        User::create([
            'nom' => 'Zeroual',
            'prenom' => 'Fatima',
            'email' => 'f.zeroual@plenitude.ma',
            'password' => Hash::make('participant123'),
            'role' => 'participant',
            'telephone' => '0634567890',
            'statut' => 'employé',
            'specialite_fonction' => 'Analyste QA',
            'entreprise_id' => 1
        ]);

        User::create([
            'nom' => 'ElFassi',
            'prenom' => 'Mehdi',
            'email' => 'm.elfassi@plenitude.ma',
            'password' => Hash::make('participant123'),
            'role' => 'participant',
            'telephone' => '0645678901',
            'statut' => 'ouvrier',
            'specialite_fonction' => 'Technicien réseau',
            'entreprise_id' => 1
        ]);

        // Hiba Béton (Construction) - entreprise_id = 2
        User::create([
            'nom' => 'Rahmouni',
            'prenom' => 'Leila',
            'email' => 'rh.hibabeton@formation.ma',
            'password' => Hash::make('rh123'),
            'role' => 'rh',
            'telephone' => '0656789012',
            'statut' => 'cadre',
            'entreprise_id' => 2
        ]);

        // Participants Hiba Béton
        User::create([
            'nom' => 'Toumi',
            'prenom' => 'Abdellah',
            'email' => 'a.toumi@hibabeton.ma',
            'password' => Hash::make('participant123'),
            'role' => 'participant',
            'telephone' => '0667890123',
            'statut' => 'cadre',
            'specialite_fonction' => 'Ingénieur BTP',
            'entreprise_id' => 2
        ]);

        User::create([
            'nom' => 'Berrada',
            'prenom' => 'Nadia',
            'email' => 'n.berrada@hibabeton.ma',
            'password' => Hash::make('participant123'),
            'role' => 'participant',
            'telephone' => '0678901234',
            'statut' => 'employé',
            'specialite_fonction' => 'Dessinatrice projeteuse',
            'entreprise_id' => 2
        ]);

        User::create([
            'nom' => 'Khalfi',
            'prenom' => 'Youssef',
            'email' => 'y.khalfi@hibabeton.ma',
            'password' => Hash::make('participant123'),
            'role' => 'participant',
            'telephone' => '0689012345',
            'statut' => 'ouvrier',
            'specialite_fonction' => 'Maçon',
            'entreprise_id' => 2
        ]);

        User::create([
            'nom' => 'Saidi',
            'prenom' => 'Rachid',
            'email' => 'r.saidi@hibabeton.ma',
            'password' => Hash::make('participant123'),
            'role' => 'participant',
            'telephone' => '0690123456',
            'statut' => 'ouvrier',
            'specialite_fonction' => 'Carreleur',
            'entreprise_id' => 2
        ]);

        // CGI (IT & Consulting) - entreprise_id = 3
        User::create([
            'nom' => 'Benjelloun',
            'prenom' => 'Omar',
            'email' => 'rh.cgi@formation.ma',
            'password' => Hash::make('rh123'),
            'role' => 'rh',
            'telephone' => '0698765432',
            'statut' => 'cadre',
            'entreprise_id' => 3
        ]);

        // Participants CGI
        User::create([
            'nom' => 'Lahlou',
            'prenom' => 'Amina',
            'email' => 'a.lahlou@cgi.ma',
            'password' => Hash::make('participant123'),
            'role' => 'participant',
            'telephone' => '0687654321',
            'statut' => 'cadre',
            'specialite_fonction' => 'Consultante SAP',
            'entreprise_id' => 3
        ]);

        User::create([
            'nom' => 'Cherkaoui',
            'prenom' => 'Youssef',
            'email' => 'y.cherkaoui@cgi.ma',
            'password' => Hash::make('participant123'),
            'role' => 'participant',
            'telephone' => '0676543210',
            'statut' => 'employé',
            'specialite_fonction' => 'Développeur',
            'entreprise_id' => 3
        ]);

        User::create([
            'nom' => 'Idrissi',
            'prenom' => 'Nadia',
            'email' => 'n.idrissi@cgi.ma',
            'password' => Hash::make('participant123'),
            'role' => 'participant',
            'telephone' => '0665432109',
            'statut' => 'employé',
            'specialite_fonction' => 'Business Analyst',
            'entreprise_id' => 3
        ]);

        User::create([
            'nom' => 'Bouzidi',
            'prenom' => 'Karim',
            'email' => 'k.bouzidi@cgi.ma',
            'password' => Hash::make('participant123'),
            'role' => 'participant',
            'telephone' => '0654321098',
            'statut' => 'ouvrier',
            'specialite_fonction' => 'Technicien Helpdesk',
            'entreprise_id' => 3
        ]);

        // Alten (IT & Consulting) - entreprise_id = 4
        User::create([
            'nom' => 'ElKhattabi',
            'prenom' => 'Fatima',
            'email' => 'rh.alten@formation.ma',
            'password' => Hash::make('rh123'),
            'role' => 'rh',
            'telephone' => '0643210987',
            'statut' => 'cadre',
            'entreprise_id' => 4
        ]);

        // Participants Alten
        User::create([
            'nom' => 'Zahir',
            'prenom' => 'Mehdi',
            'email' => 'm.zahir@alten.ma',
            'password' => Hash::make('participant123'),
            'role' => 'participant',
            'telephone' => '0632109876',
            'statut' => 'cadre',
            'specialite_fonction' => 'Architecte Logiciel',
            'entreprise_id' => 4
        ]);

        User::create([
            'nom' => 'Bouhlal',
            'prenom' => 'Samir',
            'email' => 's.bouhlal@alten.ma',
            'password' => Hash::make('participant123'),
            'role' => 'participant',
            'telephone' => '0621098765',
            'statut' => 'employé',
            'specialite_fonction' => 'Scrum Master',
            'entreprise_id' => 4
        ]);

        User::create([
            'nom' => 'Naciri',
            'prenom' => 'Leila',
            'email' => 'l.naciri@alten.ma',
            'password' => Hash::make('participant123'),
            'role' => 'participant',
            'telephone' => '0610987654',
            'statut' => 'employé',
            'specialite_fonction' => 'UX Designer',
            'entreprise_id' => 4
        ]);

        User::create([
            'nom' => 'Daoudi',
            'prenom' => 'Hamza',
            'email' => 'h.daoudi@alten.ma',
            'password' => Hash::make('participant123'),
            'role' => 'participant',
            'telephone' => '0609876543',
            'statut' => 'ouvrier',
            'specialite_fonction' => 'Technicien Maintenance',
            'entreprise_id' => 4
        ]);

        User::create([
            'nom' => 'ElKouri',
            'prenom' => 'Ahmed',
            'email' => 'formateur.compta@formation.ma',
            'password' => Hash::make('Formateur123@'),
            'role' => 'formateur',
            'telephone' => '0612345678',
            'specialite_fonction' => 'Comptabilité générale',
            'entreprise_id' => null,
            'statut' => null
        ]);

        // Formateur 2 - Fiscalité
        User::create([
            'nom' => 'Benkirane',
            'prenom' => 'Fatima',
            'email' => 'formateur.fiscal@formation.ma',
            'password' => Hash::make('Formateur123@'),
            'role' => 'formateur',
            'telephone' => '0623456789',
            'specialite_fonction' => 'Fiscalité des entreprises',
            'entreprise_id' => null,
            'statut' => null
        ]);

        // Formateur 3 - Gestion
        User::create([
            'nom' => 'Mouline',
            'prenom' => 'Khalid',
            'email' => 'formateur.gestion@formation.ma',
            'password' => Hash::make('Formateur123@'),
            'role' => 'formateur',
            'telephone' => '0634567890',
            'specialite_fonction' => 'Gestion budgétaire',
            'entreprise_id' => null,
            'statut' => null
        ]);

        // Formateur 4 - Comptabilité analytique
        User::create([
            'nom' => 'Zerouali',
            'prenom' => 'Mehdi',
            'email' => 'formateur.analytique@formation.ma',
            'password' => Hash::make('Formateur123@'),
            'role' => 'formateur',
            'telephone' => '0645678901',
            'specialite_fonction' => 'Comptabilité analytique',
            'entreprise_id' => null,
            'statut' => null
        ]);

        // Formateur 5 - Trésorerie
        User::create([
            'nom' => 'Bennani',
            'prenom' => 'Leila',
            'email' => 'formateur.treso@formation.ma',
            'password' => Hash::make('Formateur123@'),
            'role' => 'formateur',
            'telephone' => '0656789012',
            'specialite_fonction' => 'Gestion de trésorerie',
            'entreprise_id' => null,
            'statut' => null
        ]);

        // Formateur 6 - Fiscalité avancée
        User::create([
            'nom' => 'Cherkaoui',
            'prenom' => 'Youssef',
            'email' => 'formateur.fiscal2@formation.ma',
            'password' => Hash::make('Formateur123@'),
            'role' => 'formateur',
            'telephone' => '0667890123',
            'specialite_fonction' => 'Fiscalité avancée',
            'entreprise_id' => null,
            'statut' => null
        ]);
                
    }
}
