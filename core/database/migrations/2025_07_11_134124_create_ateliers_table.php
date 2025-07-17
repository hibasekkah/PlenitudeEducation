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
        Schema::create('ateliers', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->string('materiels')->nullable();
            $table->text('observations')->nullable()->charset('binary');
            $table->string('lieu')->nullable();
            $table->float('duree');
            $table->unsignedBigInteger('formation_id')->nullable();
            $table->foreign('formation_id')
                    ->references('id')
                    ->on('formations')
                    ->nullOnDelete();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ateliers');
    }
};
