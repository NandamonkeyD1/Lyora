<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('meetings', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('workspace_id')->constrained('workspaces')->cascadeOnDelete();
            $table->foreignUuid('class_id')->constrained('classes')->cascadeOnDelete();
            $table->string('title');
            $table->string('room_name', 100)->unique();
            $table->text('description')->nullable();
            $table->timestamp('scheduled_start');
            $table->timestamp('scheduled_end')->nullable();
            $table->timestamp('actual_start')->nullable();
            $table->timestamp('actual_end')->nullable();
            $table->enum('status', ['scheduled', 'in_progress', 'completed', 'cancelled'])->default('scheduled');
            $table->unsignedInteger('max_participants')->default(10);
            $table->foreignUuid('host_user_id')->constrained('users')->restrictOnDelete();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['workspace_id', 'class_id'], 'idx_meet_ws_class');
            $table->index('room_name', 'idx_meet_room');
        });

        Schema::create('meeting_participants', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('meeting_id')->constrained('meetings')->cascadeOnDelete();
            $table->foreignUuid('user_id')->constrained('users')->cascadeOnDelete();
            $table->enum('role', ['host', 'participant'])->default('participant');
            $table->timestamp('first_joined_at')->nullable();
            $table->timestamp('last_left_at')->nullable();
            $table->unsignedInteger('total_duration_seconds')->default(0);
            $table->enum('attendance_status', ['present', 'absent', 'late', 'excused'])->default('absent');
            $table->timestamps();

            $table->unique(['meeting_id', 'user_id'], 'uq_meeting_user');
        });

        Schema::create('meeting_participant_sessions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('meeting_participant_id')->constrained('meeting_participants')->cascadeOnDelete();
            $table->timestamp('joined_at')->useCurrent();
            $table->timestamp('left_at')->nullable();
            $table->unsignedInteger('duration_seconds')->default(0);
            $table->string('connection_client', 100)->nullable();
        });

        Schema::create('meeting_events', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('meeting_id')->constrained('meetings')->cascadeOnDelete();
            $table->string('event_type', 100);
            $table->json('event_payload')->nullable();
            $table->timestamp('received_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('meeting_events');
        Schema::dropIfExists('meeting_participant_sessions');
        Schema::dropIfExists('meeting_participants');
        Schema::dropIfExists('meetings');
    }
};
