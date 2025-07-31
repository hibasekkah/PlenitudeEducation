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
        Schema::create('session_formation_entreprises', function (Blueprint $table) {
            $table->id();
            $table->date('date_debut');
            $table->date('date_fin');
            $table->enum('etat',['active','termine','annuler','suspendue'])->default('active');
            $table->text('raison_sus')->charset('binary')->nullable();
            $table->text('raison_annulation')->charset('binary')->nullable();
            $table->text('observations')->charset('binary')->nullable();
            $table->unsignedBigInteger('entreprise_id');
            $table->foreign('entreprise_id')
                ->references('id')
                ->on('entreprises')
                ->cascadeOnDelete();
            $table->unsignedBigInteger('formation_id');
            $table->foreign('formation_id')
                ->references('id')
                ->on('formations')
                ->cascadeOnDelete(); 
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('session_formation_entreprises');
    }
};
