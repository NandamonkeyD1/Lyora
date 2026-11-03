<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class LyoraApiTest extends TestCase
{
    use DatabaseTransactions;

    public function test_super_admin_can_login_and_get_stats(): void
    {
        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'admin@solvianova.com',
            'password' => 'Password123!',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'message',
                'token',
                'user' => ['id', 'name', 'email', 'is_super_admin'],
            ]);

        $token = $response->json('token');

        $statsResponse = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/v1/dashboard/stats');

        $statsResponse->assertStatus(200)
            ->assertJsonPath('role', 'super_admin')
            ->assertJsonStructure([
                'role',
                'stats' => ['total_users', 'total_workspaces', 'total_classes'],
            ]);
    }

    public function test_teacher_can_login_and_view_workspace_classes(): void
    {
        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'tutor@solvianova.com',
            'password' => 'Password123!',
        ]);

        $response->assertStatus(200);
        $token = $response->json('token');

        $classesResponse = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/v1/classes');

        $classesResponse->assertStatus(200)
            ->assertJsonStructure([
                'classes' => [
                    '*' => ['id', 'name', 'education_level', 'status'],
                ],
            ]);
    }

    public function test_student_can_view_materials_and_assignments(): void
    {
        $loginResponse = $this->postJson('/api/v1/auth/login', [
            'email' => 'murid@solvianova.com',
            'password' => 'Password123!',
        ]);

        $loginResponse->assertStatus(200);
        $token = $loginResponse->json('token');

        $classes = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/v1/classes');

        $classId = $classes->json('classes.0.id');
        $this->assertNotNull($classId);

        $materials = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson("/api/v1/classes/{$classId}/materials");

        $materials->assertStatus(200)
            ->assertJsonStructure(['materials']);
    }
}
