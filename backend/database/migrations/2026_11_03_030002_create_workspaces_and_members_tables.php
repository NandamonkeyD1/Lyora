<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('workspaces', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('slug')->unique();
            $table->enum('type', ['independent_tutor', 'institution'])->default('independent_tutor');
            $table->text('description')->nullable();
            $table->string('logo_url', 1024)->nullable();
            $table->string('banner_url', 1024)->nullable();
            $table->text('address')->nullable();
            $table->string('contact_email')->nullable();
            $table->string('contact_phone', 30)->nullable();
            $table->string('website_url', 500)->nullable();
            $table->unsignedBigInteger('storage_quota_bytes')->default(10737418240); // 10 GB
            $table->unsignedBigInteger('storage_used_bytes')->default(0);
            $table->boolean('is_active')->default(true);
            $table->foreignUuid('created_by')->constrained('users')->restrictOnDelete();
            $table->timestamps();
            $table->softDeletes();

            $table->index('slug', 'idx_workspaces_slug');
            $table->index('type', 'idx_workspaces_type');
        });

        Schema::create('roles', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name', 100)->unique(); // 'teacher', 'student', 'parent'
            $table->string('display_name', 150);
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::create('permissions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name', 150)->unique(); // e.g. 'workspace.classes.manage'
            $table->string('module', 100);
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::create('role_permissions', function (Blueprint $table) {
            $table->foreignUuid('role_id')->constrained('roles')->cascadeOnDelete();
            $table->foreignUuid('permission_id')->constrained('permissions')->cascadeOnDelete();
            $table->primary(['role_id', 'permission_id']);
        });

        Schema::create('workspace_members', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('workspace_id')->constrained('workspaces')->cascadeOnDelete();
            $table->foreignUuid('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignUuid('role_id')->constrained('roles')->restrictOnDelete();
            $table->boolean('is_owner')->default(false);
            $table->enum('status', ['active', 'inactive', 'suspended'])->default('active');
            $table->timestamp('joined_at')->useCurrent();
            $table->timestamps();

            $table->unique(['workspace_id', 'user_id'], 'uq_workspace_user');
            $table->index('role_id', 'idx_wm_role');
            $table->index('status', 'idx_wm_status');
        });

        Schema::create('workspace_permissions', function (Blueprint $table) {
            $table->foreignUuid('workspace_member_id')->constrained('workspace_members')->cascadeOnDelete();
            $table->foreignUuid('permission_id')->constrained('permissions')->cascadeOnDelete();
            $table->foreignUuid('granted_by')->constrained('users')->restrictOnDelete();
            $table->timestamp('created_at')->useCurrent();
            $table->primary(['workspace_member_id', 'permission_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('workspace_permissions');
        Schema::dropIfExists('workspace_members');
        Schema::dropIfExists('role_permissions');
        Schema::dropIfExists('permissions');
        Schema::dropIfExists('roles');
        Schema::dropIfExists('workspaces');
    }
};
