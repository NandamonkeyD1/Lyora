<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assignments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('workspace_id')->constrained('workspaces')->cascadeOnDelete();
            $table->foreignUuid('class_id')->constrained('classes')->cascadeOnDelete();
            $table->foreignUuid('topic_id')->nullable()->constrained('material_topics')->nullOnDelete();
            $table->string('title');
            $table->longText('instructions');
            $table->decimal('max_score', 5, 2)->default(100.00);
            $table->timestamp('deadline')->nullable();
            $table->boolean('allow_late_submission')->default(true);
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->foreignUuid('created_by')->constrained('users')->restrictOnDelete();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['workspace_id', 'class_id'], 'idx_assign_ws_class');
            $table->index('deadline', 'idx_assign_deadline');
        });

        Schema::create('assignment_attachments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('assignment_id')->constrained('assignments')->cascadeOnDelete();
            $table->string('file_name');
            $table->string('file_path', 1024);
            $table->unsignedBigInteger('file_size_bytes');
            $table->string('mime_type', 100);
            $table->timestamp('created_at')->useCurrent();
        });

        Schema::create('assignment_submissions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('assignment_id')->constrained('assignments')->cascadeOnDelete();
            $table->foreignUuid('student_user_id')->constrained('users')->cascadeOnDelete();
            $table->integer('current_version')->default(1);
            $table->enum('status', [
                'in_progress',
                'submitted',
                'late',
                'missing',
                'graded',
                'returned_for_revision',
                'resubmitted'
            ])->default('in_progress');
            $table->decimal('score', 5, 2)->nullable();
            $table->text('teacher_feedback')->nullable();
            $table->foreignUuid('graded_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('graded_at')->nullable();
            $table->timestamp('submitted_at')->nullable();
            $table->timestamps();

            $table->unique(['assignment_id', 'student_user_id'], 'uq_assignment_student');
            $table->index('status', 'idx_asub_status');
        });

        Schema::create('submission_versions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('submission_id')->constrained('assignment_submissions')->cascadeOnDelete();
            $table->integer('version_number');
            $table->longText('submission_text')->nullable();
            $table->string('file_path', 1024)->nullable();
            $table->string('file_name')->nullable();
            $table->unsignedBigInteger('file_size_bytes')->nullable();
            $table->text('student_note')->nullable();
            $table->timestamp('submitted_at')->useCurrent();

            $table->index(['submission_id', 'version_number'], 'idx_sv_sub_ver');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('submission_versions');
        Schema::dropIfExists('assignment_submissions');
        Schema::dropIfExists('assignment_attachments');
        Schema::dropIfExists('assignments');
    }
};
