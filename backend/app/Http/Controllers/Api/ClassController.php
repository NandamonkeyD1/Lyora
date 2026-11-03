<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ClassInvitationCode;
use App\Models\ClassMember;
use App\Models\LmsClass;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ClassController extends Controller
{
    public function index(Request $request, ?string $workspaceId = null): JsonResponse
    {
        $user = $request->user();

        $query = LmsClass::with(['primaryTeacher', 'subject'])->withCount(['members', 'materials', 'assignments']);

        if ($workspaceId) {
            $query->where('workspace_id', $workspaceId);
        }

        // Non-admin can only see classes they teach or are enrolled in, or active classes in their workspace
        if (!$user->is_super_admin) {
            $query->where(function ($q) use ($user) {
                $q->where('primary_teacher_id', $user->id)
                  ->orWhereHas('teachers', fn ($t) => $t->where('teacher_user_id', $user->id))
                  ->orWhereHas('members', fn ($m) => $m->where('student_user_id', $user->id)->where('enrollment_status', 'active'))
                  ->orWhere('status', 'active');
            });
        }

        $classes = $query->latest()->get();

        return response()->json([
            'classes' => $classes,
        ]);
    }

    public function store(Request $request, string $workspaceId): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'education_level' => ['required', 'string', 'max:100'],
            'type' => ['required', 'string', 'in:private,group'],
            'description' => ['nullable', 'string'],
            'enrollment_policy' => ['required', 'string', 'in:instant_join,approval_required'],
            'max_capacity' => ['nullable', 'integer', 'min:1', 'max:500'],
            'subject_id' => ['nullable', 'uuid', 'exists:subjects,id'],
        ]);

        $user = $request->user();

        $class = LmsClass::create([
            'workspace_id' => $workspaceId,
            'subject_id' => $validated['subject_id'] ?? null,
            'name' => $validated['name'],
            'education_level' => $validated['education_level'],
            'type' => $validated['type'],
            'description' => $validated['description'] ?? null,
            'enrollment_policy' => $validated['enrollment_policy'],
            'status' => 'active',
            'primary_teacher_id' => $user->id,
            'max_capacity' => $validated['max_capacity'] ?? 50,
        ]);

        // Auto-generate invitation code
        ClassInvitationCode::create([
            'class_id' => $class->id,
            'code' => 'LYORA-' . strtoupper(Str::random(6)),
            'max_uses' => $class->max_capacity,
            'is_active' => true,
            'created_by' => $user->id,
        ]);

        return response()->json([
            'message' => 'Kelas berhasil dibuat.',
            'class' => $class->load(['primaryTeacher', 'invitationCodes']),
        ], 201);
    }

    public function show(Request $request, string $id): JsonResponse
    {
        $class = LmsClass::with([
            'primaryTeacher',
            'subject',
            'topics.materials',
            'assignments',
            'invitationCodes' => fn ($q) => $q->where('is_active', true),
            'members.student',
        ])->withCount(['members', 'materials', 'assignments'])->findOrFail($id);

        return response()->json([
            'class' => $class,
        ]);
    }

    public function join(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'code' => ['required', 'string'],
        ]);

        $code = ClassInvitationCode::with('class')
            ->where('code', trim($validated['code']))
            ->where('is_active', true)
            ->first();

        if (!$code) {
            return response()->json([
                'message' => 'Kode undangan tidak valid atau sudah kedaluwarsa.',
            ], 404);
        }

        $class = $code->class;
        $user = $request->user();

        // Check double enrollment
        $existing = ClassMember::where('class_id', $class->id)
            ->where('student_user_id', $user->id)
            ->first();

        if ($existing) {
            return response()->json([
                'message' => 'Anda sudah terdaftar di kelas ini.',
                'status' => $existing->enrollment_status,
                'class' => $class,
            ], 422);
        }

        $status = $class->enrollment_policy === 'instant_join' ? 'active' : 'pending';

        $member = ClassMember::create([
            'class_id' => $class->id,
            'student_user_id' => $user->id,
            'enrollment_status' => $status,
            'enrolled_at' => $status === 'active' ? now() : null,
        ]);

        $code->increment('used_count');

        return response()->json([
            'message' => $status === 'active'
                ? 'Berhasil bergabung dengan kelas!'
                : 'Permintaan bergabung telah diajukan. Menunggu persetujuan guru.',
            'enrollment_status' => $status,
            'class' => $class,
        ]);
    }
}
