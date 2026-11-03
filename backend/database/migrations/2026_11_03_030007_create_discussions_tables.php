<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('discussions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('workspace_id')->constrained('workspaces')->cascadeOnDelete();
            $table->foreignUuid('class_id')->constrained('classes')->cascadeOnDelete();
            $table->foreignUuid('material_id')->nullable()->constrained('materials')->nullOnDelete();
            $table->foreignUuid('assignment_id')->nullable()->constrained('assignments')->nullOnDelete();
            $table->foreignUuid('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('title');
            $table->longText('content');
            $table->boolean('is_pinned')->default(false);
            $table->boolean('is_locked')->default(false);
            $table->unsignedInteger('replies_count')->default(0);
            $table->timestamps();
            $table->softDeletes();

            $table->index(['class_id', 'is_pinned'], 'idx_disc_class');
        });

        Schema::create('discussion_replies', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('discussion_id')->constrained('discussions')->cascadeOnDelete();
            $table->foreignUuid('parent_reply_id')->nullable()->constrained('discussion_replies')->cascadeOnDelete();
            $table->foreignUuid('user_id')->constrained('users')->cascadeOnDelete();
            $table->longText('content');
            $table->string('attachment_url', 1024)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('discussion_replies');
        Schema::dropIfExists('discussions');
    }
};
