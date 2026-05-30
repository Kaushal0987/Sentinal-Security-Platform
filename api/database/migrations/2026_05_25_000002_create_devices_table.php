<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('devices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('type');
            $table->string('os_name');
            $table->text('notes')->nullable();
            $table->string('update_status')->default('unknown');
            $table->string('trust_level')->default('unknown');
            $table->boolean('encryption_enabled')->default(false);
            $table->boolean('antivirus_enabled')->default(false);
            $table->unsignedTinyInteger('security_score')->default(0);
            $table->timestamp('last_seen_at')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'trust_level']);
            $table->index(['user_id', 'update_status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('devices');
    }
};