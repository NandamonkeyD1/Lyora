<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LmsClass;
use App\Models\Material;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MaterialController extends Controller
{
    public function index(Request $request, string $classId): JsonResponse
    {
        $class = LmsClass::findOrFail($classId);

        $materials = Material::with(['topic', 'author'])
            ->where('class_id', $classId)
            ->where('status', 'published')
            ->orderBy('order_index')
            ->get();

        return response()->json([
            'materials' => $materials,
        ]);
    }

    public function store(Request $request, string $classId): JsonResponse
    {
        $class = LmsClass::findOrFail($classId);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content_type' => ['required', 'string', 'in:text,document,video,external_link'],
            'text_content' => ['nullable', 'string'],
            'external_url' => ['nullable', 'url'],
            'topic_id' => ['nullable', 'uuid', 'exists:material_topics,id'],
        ]);

        $material = Material::create([
            'workspace_id' => $class->workspace_id,
            'class_id' => $class->id,
            'topic_id' => $validated['topic_id'] ?? null,
            'title' => $validated['title'],
            'content_type' => $validated['content_type'],
            'text_content' => $validated['text_content'] ?? null,
            'external_url' => $validated['external_url'] ?? null,
            'status' => 'published',
            'published_at' => now(),
            'created_by' => $request->user()->id,
        ]);

        return response()->json([
            'message' => 'Materi berhasil diterbitkan.',
            'material' => $material,
        ], 201);
    }
}
