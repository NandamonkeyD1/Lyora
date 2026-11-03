<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('parent_student_links', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('parent_user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignUuid('student_user_id')->constrained('users')->cascadeOnDelete();
            $table->enum('relationship_type', ['father', 'mother', 'guardian'])->default('guardian');
            $table->string('verification_code', 32);
            $table->enum('status', ['pending', 'verified', 'rejected', 'revoked'])->default('pending');
            $table->timestamp('code_expires_at');
            $table->timestamp('verified_at')->nullable();
            $table->timestamps();

            $table->unique(['parent_user_id', 'student_user_id'], 'uq_parent_student');
            $table->index('verification_code', 'idx_psl_code');
            $table->index('status', 'idx_psl_status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('parent_student_links');
    }
};
