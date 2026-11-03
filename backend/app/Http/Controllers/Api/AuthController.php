<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ParentStudentLink;
use App\Models\Role;
use App\Models\User;
use App\Models\WorkspaceMember;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'phone_number' => ['nullable', 'string', 'max:30'],
            'intended_role' => ['nullable', 'string', 'in:teacher,student,parent'],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'phone_number' => $validated['phone_number'] ?? null,
            'is_active' => true,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Registrasi akun LYORA berhasil.',
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Email atau password yang Anda masukkan tidak sesuai.'],
            ]);
        }

        if (!$user->is_active) {
            return response()->json([
                'message' => 'Akun Anda dinonaktifkan atau ditangguhkan.',
                'reason' => $user->suspension_reason,
            ], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login berhasil.',
            'user' => $this->enrichUserData($user),
            'token' => $token,
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout berhasil. Sesi telah diakhiri.',
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()->json([
            'user' => $this->enrichUserData($user),
        ]);
    }

    private function enrichUserData(User $user): array
    {
        $memberships = WorkspaceMember::with(['workspace', 'role', 'permissions'])
            ->where('user_id', $user->id)
            ->where('status', 'active')
            ->get();

        $parentLinks = ParentStudentLink::with('student')
            ->where('parent_user_id', $user->id)
            ->where('status', 'verified')
            ->get();

        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'phone_number' => $user->phone_number,
            'avatar_url' => $user->avatar_url,
            'timezone' => $user->timezone,
            'is_super_admin' => (bool) $user->is_super_admin,
            'workspaces' => $memberships->map(fn ($m) => [
                'workspace_id' => $m->workspace->id,
                'name' => $m->workspace->name,
                'slug' => $m->workspace->slug,
                'type' => $m->workspace->type,
                'role' => $m->role->name,
                'is_owner' => $m->is_owner,
                'permissions' => $m->permissions->pluck('name'),
            ]),
            'children' => $parentLinks->map(fn ($l) => [
                'student_id' => $l->student->id,
                'name' => $l->student->name,
                'email' => $l->student->email,
                'relationship' => $l->relationship_type,
            ]),
        ];
    }
}
