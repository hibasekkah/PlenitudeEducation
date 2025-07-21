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
        Schema::create('seances', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->time('heure_debut');
            $table->time('heure_fin');
            $table->enum('etat',['activer','terminer','annuler','reporter'])->default('activer');
            $table->text('Observations')->charset('binary')->nullable();
            $table->unsignedBigInteger('session_id')->nullable();
            $table->foreign('session_id')
                ->references('id')
                ->on('session_formation_entreprises')
                ->nullOnDelete();

            $table->unsignedBigInteger('formateur_id')->nullable();
            $table->foreign('formateur_id')
                ->references('id')
                ->on('users')
                ->nullOnDelete();

            $table->unsignedBigInteger('module_id')->nullable();
            $table->foreign('module_id')
                ->references('id')
                ->on('modules')
                ->nullOnDelete();

            $table->unsignedBigInteger('atelier_id')->nullable();
            $table->foreign('atelier_id')
                ->references('id')
                ->on('ateliers')
                ->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seances');
    }
};
