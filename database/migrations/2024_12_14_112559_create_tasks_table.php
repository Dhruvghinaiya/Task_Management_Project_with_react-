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
        Schema::create('tasks', function (Blueprint $table) {
            $table->uuid('id')->primary(); 
            $table->string('name'); 
            $table->text('description')->nullable(); 
            $table->enum('status', ['pending', 'in_progress', 'completed'])->default('pending'); 
            // $table->uuid('project_id'); 
            // $table->uuid('assigned_to')->nullable(); 
            $table->date('start_date')->nullable(); 
            $table->date('end_date')->nullable(); 
            // $table->uuid('created_by'); 
            // $table->uuid('updated_by'); 
            $table->timestamps(); 

            $table->foreignUuid('project_id')->constant('projects')->cascadeOnDelete();
            $table->foreignUuid('assigned_to')->constant('users')->cascadeOnDelete();
            $table->foreignUuid('created_by')->constant('users')->cascadeOnDelete();
            $table->foreignUuid('updated_by')->constant('id')->on('users')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
