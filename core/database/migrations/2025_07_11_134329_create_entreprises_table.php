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
        Schema::create('entreprises', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('secteur');
            $table->string('ICE');
            $table->string('IF');
            $table->string('CNSS');
            $table->string('telephone');
            $table->string('email'); 
            $table->string('adresse');
            $table->string('capital');
            $table->string('budget');
            $table->string('priode');
            $table->date('debut_period');
            $table->date('fin_period');
            $table->string('doc_rc');
            $table->string('doc_status');
            $table->string('doc_pv');
            $table->string('CIN_gerant');
            $table->string('numero_patente');
            $table->integer('nombre_personnels');
            $table->integer('nombre_cadres');
            $table->integer('nombre_employees');
            $table->integer('nombre_ouvriers');
            $table->string('nom_gerant');
            $table->string('numero_cin_gerant');
            $table->string('adresse_gerant');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entreprises');
    }
};
