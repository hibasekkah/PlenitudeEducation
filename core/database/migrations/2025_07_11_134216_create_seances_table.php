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
            $table->dateTime('Heure_debut');
            $table->dateTime('Heure_fin');
            $table->integer('duree');
            $table->string('lieu');
            $table->string('etat');
            $table->text('Observations')->charset('binary')->nullable();
            $table->unsignedBigInteger('formateur_id')->nullable();
            $table->foreign('formateur_id')
                ->references('id')
                ->on('users')
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
