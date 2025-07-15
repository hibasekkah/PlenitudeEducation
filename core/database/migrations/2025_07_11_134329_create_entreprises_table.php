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
            $table->string('nom',100);
            $table->string('secteur');
            $table->string('SIRET');
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
