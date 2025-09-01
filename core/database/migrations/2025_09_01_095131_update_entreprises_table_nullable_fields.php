<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('entreprises', function (Blueprint $table) {
            $table->string('nom')->nullable()->change();
            $table->string('secteur')->nullable()->change();
            $table->string('ICE')->nullable()->change();
            $table->string('IF')->nullable()->change();
            $table->string('CNSS')->nullable()->change();
            $table->string('telephone')->nullable()->change();
            $table->string('email')->nullable()->change(); 
            $table->string('adresse')->nullable()->change();
            $table->string('capital')->nullable()->change();
            $table->string('budget')->nullable()->change();
            $table->string('priode')->nullable()->change();
            $table->date('debut_period')->nullable()->change();
            $table->date('fin_period')->nullable()->change();
            $table->string('numero_patente')->nullable()->change();
            $table->integer('nombre_personnels')->nullable()->change();
            $table->integer('nombre_cadres')->nullable()->change();
            $table->integer('nombre_employees')->nullable()->change();
            $table->integer('nombre_ouvriers')->nullable()->change();
            $table->string('nom_gerant')->nullable()->change();
            $table->string('numero_cin_gerant')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('entreprises', function (Blueprint $table) {
            $table->string('capital')->nullable(false)->change();
            $table->string('budget')->nullable(false)->change();
            $table->string('periode')->nullable(false)->change();
            $table->string('numero_patente')->nullable(false)->change();
            
            $table->integer('nombre_personnels')->nullable(false)->change();
            $table->integer('nombre_cadres')->nullable(false)->change();
            $table->integer('nombre_employees')->nullable(false)->change();
            $table->integer('nombre_ouvriers')->nullable(false)->change();
            
            $table->date('debut_periode')->nullable(false)->change();
            $table->date('fin_periode')->nullable(false)->change();
        });
    }
};
