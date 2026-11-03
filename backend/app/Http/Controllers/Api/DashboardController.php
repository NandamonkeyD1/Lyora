<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Assignment;
use App\Models\AssignmentSubmission;
use App\Models\ClassMember;
use App\Models\LmsClass;
use App\Models\Material;
use App\Models\ParentStudentLink;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function stats(Request $request): JsonResponse
    {
        $user = $request->user();

        // 1. Super Admin Context
        if ($user->is_super_admin) {
            return response()->json([
                'role' => 'super_admin',
                'stats' => [
                    'total_users' => User::count(),
                    'total_workspaces' => Workspace::count(),
                    'total_classes' => LmsClass::count(),
                    'total_materials' => Material::count(),
                    'total_assignments' => Assignment::count(),
                    'storage_used_bytes' => Workspace::sum('storage_used_bytes'),
                ],
            ]);
        }

        // 2. Parent Context
        $parentLinks = ParentStudentLink::with('student')
            ->where('parent_user_id', $user->id)
            ->where('status', 'verified')
            ->get();

        if ($parentLinks->isNotEmpty()) {
            $childrenData = $parentLinks->map(function ($link) {
                $studentId = $link->student_user_id;
                $enrolledClasses = ClassMember::where('student_user_id', $studentId)
                    ->where('enrollment_status', 'active')
                    ->with('class')
                    ->get();

                return [
                    'student' => $link->student,
                    'classes_count' => $enrolledClasses->count(),
                    'classes' => $enrolledClasses->map(fn ($c) => [
                        'id' => $c->class->id,
                        'name' => $c->class->name,
                        'education_level' => $c->class->education_level,
                    ]),
                ];
            });

            return response()->json([
                'role' => 'parent',
                'stats' => [
                    'children_count' => $parentLinks->count(),
                    'children' => $childrenData,
                ],
            ]);
        }

        // 3. Teacher Context (has created classes or is teacher in workspace)
        $teacherClasses = LmsClass::where('primary_teacher_id', $user->id)->get();
        if ($teacherClasses->isNotEmpty()) {
            $classIds = $teacherClasses->pluck('id');
            $totalStudents = ClassMember::whereIn('class_id', $classIds)
                ->where('enrollment_status', 'active')
                ->distinct('student_user_id')
                ->count();

            $pendingSubmissions = AssignmentSubmission::whereHas('assignment', fn ($q) => $q->whereIn('class_id', $classIds))
                ->where('status', 'submitted')
                ->count();

            return response()->json([
                'role' => 'teacher',
                'stats' => [
                    'classes_count' => $teacherClasses->count(),
                    'students_count' => $totalStudents,
                    'assignments_count' => Assignment::whereIn('class_id', $classIds)->count(),
                    'pending_reviews' => $pendingSubmissions,
                ],
                'recent_classes' => $teacherClasses->take(5),
            ]);
        }

        // 4. Student Context
        $enrolledClasses = ClassMember::where('student_user_id', $user->id)
            ->where('enrollment_status', 'active')
            ->with('class.primaryTeacher')
            ->get();

        $enrolledClassIds = $enrolledClasses->pluck('class_id');
        $pendingAssignments = Assignment::whereIn('class_id', $enrolledClassIds)
            ->whereDoesntHave('submissions', fn ($q) => $q->where('student_user_id', $user->id)->whereIn('status', ['submitted', 'graded']))
            ->count();

        return response()->json([
            'role' => 'student',
            'stats' => [
                'enrolled_classes_count' => $enrolledClasses->count(),
                'pending_assignments_count' => $pendingAssignments,
                'completed_assignments_count' => AssignmentSubmission::where('student_user_id', $user->id)->where('status', 'graded')->count(),
            ],
            'classes' => $enrolledClasses->map(fn ($m) => $m->class),
        ]);
    }
}
