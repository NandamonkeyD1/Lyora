<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Assignment;
use App\Models\AssignmentSubmission;
use App\Models\LmsClass;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AssignmentController extends Controller
{
    public function index(Request $request, string $classId): JsonResponse
    {
        $user = $request->user();

        $assignments = Assignment::with(['topic', 'author'])
            ->withCount('submissions')
            ->where('class_id', $classId)
            ->where('status', 'published')
            ->latest()
            ->get();

        // If user is student, also attach their own submission
        $submissions = AssignmentSubmission::whereIn('assignment_id', $assignments->pluck('id'))
            ->where('student_user_id', $user->id)
            ->get()
            ->keyBy('assignment_id');

        $result = $assignments->map(function ($assignment) use ($submissions) {
            $data = $assignment->toArray();
            $data['my_submission'] = $submissions->get($assignment->id);
            return $data;
        });

        return response()->json([
            'assignments' => $result,
        ]);
    }

    public function store(Request $request, string $classId): JsonResponse
    {
        $class = LmsClass::findOrFail($classId);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'instructions' => ['required', 'string'],
            'max_score' => ['nullable', 'numeric', 'min:1', 'max:100'],
            'deadline' => ['nullable', 'date'],
            'allow_late_submission' => ['nullable', 'boolean'],
            'topic_id' => ['nullable', 'uuid', 'exists:material_topics,id'],
        ]);

        $assignment = Assignment::create([
            'workspace_id' => $class->workspace_id,
            'class_id' => $class->id,
            'topic_id' => $validated['topic_id'] ?? null,
            'title' => $validated['title'],
            'instructions' => $validated['instructions'],
            'max_score' => $validated['max_score'] ?? 100.00,
            'deadline' => $validated['deadline'] ?? null,
            'allow_late_submission' => $validated['allow_late_submission'] ?? true,
            'status' => 'published',
            'created_by' => $request->user()->id,
        ]);

        return response()->json([
            'message' => 'Tugas berhasil diterbitkan.',
            'assignment' => $assignment,
        ], 201);
    }
}
