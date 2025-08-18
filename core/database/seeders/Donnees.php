<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class Donnees extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'nom' => 'hiba',
            'prenom' => 'hiba',
            'email' => 'hiba@example.com',
            'password' => Hash::make('hibahiba'),
            'role' => 'formateur',
            'telephone' => '00000000',
        ]);
        User::create([
            'nom' => 'oualid',
            'prenom' => 'oualid',
            'email' => 'oualid@example.com',
            'password' => Hash::make('oualidoualid'),
            'role' => 'rh',
            'telephone' => '00000000',
            'statut' => 'cadre',
            'entreprise_id' => 1,
        ]);
        User::create([
            'nom' => 'ouafae',
            'prenom' => 'ouafae',
            'email' => 'ouafae@example.com',
            'password' => Hash::make('ouafaeouafae'),
            'role' => 'participant',
            'telephone' => '00000000',
            'statut' => 'employe',
            'entreprise_id' => 1,
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
