<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
            'statut' => 'active',
        ]);
    }
}
