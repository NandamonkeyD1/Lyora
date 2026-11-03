<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('quizzes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('workspace_id')->constrained('workspaces')->cascadeOnDelete();
            $table->foreignUuid('class_id')->constrained('classes')->cascadeOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->unsignedInteger('duration_minutes')->default(60);
            $table->unsignedInteger('max_attempts')->default(1);
            $table->decimal('passing_score', 5, 2)->default(70.00);
            $table->timestamp('start_time')->nullable();
            $table->timestamp('end_time')->nullable();
            $table->boolean('randomize_questions')->default(true);
            $table->boolean('randomize_options')->default(true);
            $table->boolean('show_result_on_finish')->default(false);
            $table->boolean('show_answer_discussion')->default(false);
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->foreignUuid('created_by')->constrained('users')->restrictOnDelete();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['workspace_id', 'class_id'], 'idx_quiz_ws_class');
        });

        Schema::create('quiz_questions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('quiz_id')->constrained('quizzes')->cascadeOnDelete();
            $table->enum('question_type', ['multiple_choice', 'multiple_select', 'true_false', 'short_answer', 'essay']);
            $table->longText('question_text');
            $table->string('question_image_url', 1024)->nullable();
            $table->longText('explanation')->nullable();
            $table->decimal('points', 5, 2)->default(1.00);
            $table->integer('order_index')->default(0);
            $table->timestamps();

            $table->index(['quiz_id', 'order_index'], 'idx_qq_quiz_order');
        });

        Schema::create('quiz_options', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('question_id')->constrained('quiz_questions')->cascadeOnDelete();
            $table->text('option_text');
            $table->string('option_image_url', 1024)->nullable();
            $table->boolean('is_correct')->default(false);
            $table->integer('order_index')->default(0);
        });

        Schema::create('quiz_attempts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('quiz_id')->constrained('quizzes')->cascadeOnDelete();
            $table->foreignUuid('student_user_id')->constrained('users')->cascadeOnDelete();
            $table->integer('attempt_number')->default(1);
            $table->timestamp('started_at')->useCurrent();
            $table->timestamp('completed_at')->nullable();
            $table->decimal('total_score', 5, 2)->nullable();
            $table->enum('status', ['in_progress', 'submitted', 'abandoned', 'graded'])->default('in_progress');
            $table->boolean('is_passed')->nullable();
            $table->timestamps();

            $table->index(['quiz_id', 'student_user_id'], 'idx_qa_quiz_student');
        });

        Schema::create('quiz_answers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('attempt_id')->constrained('quiz_attempts')->cascadeOnDelete();
            $table->foreignUuid('question_id')->constrained('quiz_questions')->cascadeOnDelete();
            $table->json('selected_option_ids')->nullable();
            $table->longText('text_answer')->nullable();
            $table->boolean('is_correct')->nullable();
            $table->decimal('earned_points', 5, 2)->nullable();
            $table->text('teacher_notes')->nullable();
            $table->timestamp('saved_at')->useCurrent();

            $table->unique(['attempt_id', 'question_id'], 'uq_attempt_question');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quiz_answers');
        Schema::dropIfExists('quiz_attempts');
        Schema::dropIfExists('quiz_options');
        Schema::dropIfExists('quiz_questions');
        Schema::dropIfExists('quizzes');
    }
};
