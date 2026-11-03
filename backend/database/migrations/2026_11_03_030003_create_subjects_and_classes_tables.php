<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('subjects', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('workspace_id')->constrained('workspaces')->cascadeOnDelete();
            $table->string('name');
            $table->string('code', 50)->nullable();
            $table->text('description')->nullable();
            $table->string('color_hex', 10)->default('#4F46E5');
            $table->timestamps();
            $table->softDeletes();

            $table->index('workspace_id', 'idx_subjects_ws');
        });

        Schema::create('classes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('workspace_id')->constrained('workspaces')->cascadeOnDelete();
            $table->foreignUuid('subject_id')->nullable()->constrained('subjects')->nullOnDelete();
            $table->string('name');
            $table->string('education_level', 100);
            $table->enum('type', ['private', 'group'])->default('group');
            $table->text('description')->nullable();
            $table->string('cover_image_url', 1024)->nullable();
            $table->enum('enrollment_policy', ['instant_join', 'approval_required'])->default('instant_join');
            $table->enum('status', ['draft', 'active', 'completed', 'archived'])->default('draft');
            $table->foreignUuid('primary_teacher_id')->constrained('users')->restrictOnDelete();
            $table->unsignedInteger('max_capacity')->default(50);
            $table->string('academic_period', 100)->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['workspace_id', 'status'], 'idx_classes_ws_status');
            $table->index('primary_teacher_id', 'idx_classes_primary_teacher');
        });

        Schema::create('class_teachers', function (Blueprint $table) {
            $table->foreignUuid('class_id')->constrained('classes')->cascadeOnDelete();
            $table->foreignUuid('teacher_user_id')->constrained('users')->cascadeOnDelete();
            $table->enum('role', ['primary', 'co_teacher', 'assistant'])->default('co_teacher');
            $table->timestamp('created_at')->useCurrent();
            $table->primary(['class_id', 'teacher_user_id']);
        });

        Schema::create('class_members', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('class_id')->constrained('classes')->cascadeOnDelete();
            $table->foreignUuid('student_user_id')->constrained('users')->cascadeOnDelete();
            $table->enum('enrollment_status', ['pending', 'active', 'rejected', 'left', 'removed', 'completed'])->default('pending');
            $table->timestamp('enrolled_at')->nullable();
            $table->foreignUuid('approved_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->unique(['class_id', 'student_user_id'], 'uq_class_student');
            $table->index('enrollment_status', 'idx_cm_status');
        });

        Schema::create('class_invitation_codes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('class_id')->constrained('classes')->cascadeOnDelete();
            $table->string('code', 32)->unique();
            $table->unsignedInteger('max_uses')->nullable();
            $table->unsignedInteger('used_count')->default(0);
            $table->timestamp('expires_at')->nullable();
            $table->boolean('is_active')->default(true);
            $table->foreignUuid('created_by')->constrained('users')->cascadeOnDelete();
            $table->timestamps();

            $table->index('code', 'idx_cic_code');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('class_invitation_codes');
        Schema::dropIfExists('class_members');
        Schema::dropIfExists('class_teachers');
        Schema::dropIfExists('classes');
        Schema::dropIfExists('subjects');
    }
};
