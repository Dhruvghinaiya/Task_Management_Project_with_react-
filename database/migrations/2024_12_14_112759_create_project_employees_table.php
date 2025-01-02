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
        Schema::create('project_employees', function (Blueprint $table) {
            // $table->uuid('project_id');
            // $table->uuid('user_id');
            $table->foreignUuid('project_id')->constant('projects')->cascadeOnDelete();
            $table->foreignUuid('user_id')->constant('users')->cascadeOnDelete();
        });
    
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_employees');
    }
};
