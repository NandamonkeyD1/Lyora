<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\Workspace;
use App\Models\WorkspaceMember;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class WorkspaceController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->is_super_admin) {
            $workspaces = Workspace::withCount(['members', 'classes'])->get();
        } else {
            $workspaces = Workspace::whereHas('members', function ($q) use ($user) {
                $q->where('user_id', $user->id)->where('status', 'active');
            })->withCount(['members', 'classes'])->get();
        }

        return response()->json([
            'workspaces' => $workspaces,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'in:independent_tutor,institution'],
            'description' => ['nullable', 'string'],
        ]);

        $user = $request->user();
        $slug = Str::slug($validated['name']) . '-' . Str::lower(Str::random(5));

        $workspace = Workspace::create([
            'name' => $validated['name'],
            'slug' => $slug,
            'type' => $validated['type'],
            'description' => $validated['description'] ?? null,
            'created_by' => $user->id,
            'is_active' => true,
        ]);

        $teacherRole = Role::where('name', 'teacher')->firstOrFail();

        WorkspaceMember::create([
            'workspace_id' => $workspace->id,
            'user_id' => $user->id,
            'role_id' => $teacherRole->id,
            'is_owner' => true,
            'status' => 'active',
        ]);

        return response()->json([
            'message' => 'Workspace berhasil dibuat.',
            'workspace' => $workspace,
        ], 201);
    }

    public function show(Request $request, string $id): JsonResponse
    {
        $workspace = Workspace::with(['creator', 'classes.primaryTeacher'])
            ->withCount(['members', 'classes'])
            ->findOrFail($id);

        return response()->json([
            'workspace' => $workspace,
        ]);
    }
}
