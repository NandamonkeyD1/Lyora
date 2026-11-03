<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('learning_progress', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('class_id')->constrained('classes')->cascadeOnDelete();
            $table->foreignUuid('student_user_id')->constrained('users')->cascadeOnDelete();
            $table->unsignedInteger('completed_materials_count')->default(0);
            $table->unsignedInteger('total_materials_count')->default(0);
            $table->unsignedInteger('submitted_assignments_count')->default(0);
            $table->unsignedInteger('total_assignments_count')->default(0);
            $table->decimal('average_assignment_score', 5, 2)->default(0.00);
            $table->decimal('average_quiz_score', 5, 2)->default(0.00);
            $table->decimal('attendance_percentage', 5, 2)->default(0.00);
            $table->timestamps();

            $table->unique(['class_id', 'student_user_id'], 'uq_progress_class_student');
        });

        Schema::create('teacher_notes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('class_id')->constrained('classes')->cascadeOnDelete();
            $table->foreignUuid('student_user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignUuid('teacher_user_id')->constrained('users')->restrictOnDelete();
            $table->longText('note_content');
            $table->boolean('visible_to_parent')->default(true);
            $table->boolean('visible_to_student')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('teacher_notes');
        Schema::dropIfExists('learning_progress');
    }
};
