<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('calendars', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('workspace_id')->constrained('workspaces')->cascadeOnDelete();
            $table->foreignUuid('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignUuid('class_id')->nullable()->constrained('classes')->nullOnDelete();
            $table->string('title');
            $table->enum('event_type', ['class_session', 'meeting', 'assignment_deadline', 'exam', 'reminder']);
            $table->timestamp('start_time');
            $table->timestamp('end_time');
            $table->boolean('is_all_day')->default(false);
            $table->uuid('reference_id')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'start_time', 'end_time'], 'idx_cal_time');
        });

        Schema::create('notifications', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignUuid('workspace_id')->nullable()->constrained('workspaces')->cascadeOnDelete();
            $table->string('event_type', 100);
            $table->string('title');
            $table->text('body');
            $table->json('data')->nullable();
            $table->timestamp('read_at')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'read_at'], 'idx_notif_user_read');
        });

        Schema::create('notification_preferences', function (Blueprint $table) {
            $table->foreignUuid('user_id')->primary()->constrained('users')->cascadeOnDelete();
            $table->boolean('email_assignment_created')->default(true);
            $table->boolean('email_assignment_graded')->default(true);
            $table->boolean('email_exam_reminder')->default(true);
            $table->boolean('email_meeting_reminder')->default(true);
            $table->boolean('inapp_all_events')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notification_preferences');
        Schema::dropIfExists('notifications');
        Schema::dropIfExists('calendars');
    }
};
