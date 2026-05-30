<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vault_entries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('site_name');
            $table->string('account_username');
            $table->text('encrypted_password');
            $table->text('encrypted_notes')->nullable();
            $table->boolean('is_favorite')->default(false);
            $table->unsignedTinyInteger('password_strength_score')->default(0);
            $table->boolean('two_fa_enabled')->default(false);
            $table->text('encrypted_recovery_codes')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'is_favorite']);
            $table->index(['user_id', 'site_name']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vault_entries');
    }
};