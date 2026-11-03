<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DemoDataSeeder extends Seeder
{
    public function run(): void
    {
        $teacherRole = DB::table('roles')->where('name', 'teacher')->first();
        $studentRole = DB::table('roles')->where('name', 'student')->first();
        $parentRole = DB::table('roles')->where('name', 'parent')->first();

        // 1. Create Teacher
        $teacherId = (string) Str::uuid();
        DB::table('users')->updateOrInsert(
            ['email' => 'tutor@solvianova.com'],
            [
                'id' => $teacherId,
                'name' => 'Budi Santoso, S.Pd.',
                'email' => 'tutor@solvianova.com',
                'phone_number' => '+6281298765432',
                'password' => Hash::make('Password123!'),
                'timezone' => 'Asia/Jakarta',
                'is_super_admin' => false,
                'is_active' => true,
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
        $teacher = DB::table('users')->where('email', 'tutor@solvianova.com')->first();

        // 2. Create Student
        $studentId = (string) Str::uuid();
        DB::table('users')->updateOrInsert(
            ['email' => 'murid@solvianova.com'],
            [
                'id' => $studentId,
                'name' => 'Dimas Pratama',
                'email' => 'murid@solvianova.com',
                'phone_number' => '+6281311223344',
                'password' => Hash::make('Password123!'),
                'timezone' => 'Asia/Jakarta',
                'is_super_admin' => false,
                'is_active' => true,
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
        $student = DB::table('users')->where('email', 'murid@solvianova.com')->first();

        // 3. Create Parent
        $parentId = (string) Str::uuid();
        DB::table('users')->updateOrInsert(
            ['email' => 'orangtua@solvianova.com'],
            [
                'id' => $parentId,
                'name' => 'Hendra Pratama',
                'email' => 'orangtua@solvianova.com',
                'phone_number' => '+6281122334455',
                'password' => Hash::make('Password123!'),
                'timezone' => 'Asia/Jakarta',
                'is_super_admin' => false,
                'is_active' => true,
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
        $parent = DB::table('users')->where('email', 'orangtua@solvianova.com')->first();

        // 4. Link Parent to Student
        DB::table('parent_student_links')->updateOrInsert(
            ['parent_user_id' => $parent->id, 'student_user_id' => $student->id],
            [
                'id' => (string) Str::uuid(),
                'parent_user_id' => $parent->id,
                'student_user_id' => $student->id,
                'relationship_type' => 'father',
                'verification_code' => 'LYORA-PARENT-2026',
                'status' => 'verified',
                'code_expires_at' => now()->addDays(30),
                'verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        // 5. Create Workspace
        $workspaceId = (string) Str::uuid();
        DB::table('workspaces')->updateOrInsert(
            ['slug' => 'privat-cerdas'],
            [
                'id' => $workspaceId,
                'name' => 'Privat Cerdas Solvia',
                'slug' => 'privat-cerdas',
                'type' => 'independent_tutor',
                'description' => 'Workspace bimbingan belajar privat eksklusif untuk persiapan ujian nasional dan kompetisi sains.',
                'created_by' => $teacher->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
        $workspace = DB::table('workspaces')->where('slug', 'privat-cerdas')->first();

        // 6. Workspace Members
        DB::table('workspace_members')->updateOrInsert(
            ['workspace_id' => $workspace->id, 'user_id' => $teacher->id],
            [
                'id' => (string) Str::uuid(),
                'workspace_id' => $workspace->id,
                'user_id' => $teacher->id,
                'role_id' => $teacherRole->id,
                'is_owner' => true,
                'status' => 'active',
                'joined_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        DB::table('workspace_members')->updateOrInsert(
            ['workspace_id' => $workspace->id, 'user_id' => $student->id],
            [
                'id' => (string) Str::uuid(),
                'workspace_id' => $workspace->id,
                'user_id' => $student->id,
                'role_id' => $studentRole->id,
                'is_owner' => false,
                'status' => 'active',
                'joined_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        // 7. Subject
        $subjectId = (string) Str::uuid();
        DB::table('subjects')->updateOrInsert(
            ['workspace_id' => $workspace->id, 'name' => 'Matematika Terapan'],
            [
                'id' => $subjectId,
                'workspace_id' => $workspace->id,
                'name' => 'Matematika Terapan',
                'code' => 'MAT-101',
                'description' => 'Aljabar, Kalkulus dasar, dan Pemecahan Masalah Logika.',
                'color_hex' => '#6366F1',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
        $subject = DB::table('subjects')->where('workspace_id', $workspace->id)->where('name', 'Matematika Terapan')->first();

        // 8. Class
        $classId = (string) Str::uuid();
        DB::table('classes')->updateOrInsert(
            ['workspace_id' => $workspace->id, 'name' => 'Kalkulus & Aljabar SMA 10'],
            [
                'id' => $classId,
                'workspace_id' => $workspace->id,
                'subject_id' => $subject->id,
                'name' => 'Kalkulus & Aljabar SMA 10',
                'education_level' => 'SMA Kelas 10',
                'type' => 'group',
                'description' => 'Pembelajaran mendalam konsep fungsi, turunan dasar, dan sistem persamaan linear.',
                'enrollment_policy' => 'instant_join',
                'status' => 'active',
                'primary_teacher_id' => $teacher->id,
                'max_capacity' => 20,
                'academic_period' => '2026/2027 Ganjil',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
        $class = DB::table('classes')->where('workspace_id', $workspace->id)->where('name', 'Kalkulus & Aljabar SMA 10')->first();

        // 9. Class Member
        DB::table('class_members')->updateOrInsert(
            ['class_id' => $class->id, 'student_user_id' => $student->id],
            [
                'id' => (string) Str::uuid(),
                'class_id' => $class->id,
                'student_user_id' => $student->id,
                'enrollment_status' => 'active',
                'enrolled_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        // 10. Invitation Code
        DB::table('class_invitation_codes')->updateOrInsert(
            ['class_id' => $class->id, 'code' => 'LYORA-MAT10'],
            [
                'id' => (string) Str::uuid(),
                'class_id' => $class->id,
                'code' => 'LYORA-MAT10',
                'max_uses' => 50,
                'used_count' => 1,
                'is_active' => true,
                'created_by' => $teacher->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        // 11. Material Topic
        $topicId = (string) Str::uuid();
        DB::table('material_topics')->updateOrInsert(
            ['class_id' => $class->id, 'title' => 'Bab 1: Konsep Dasar Fungsi & Pemetaan'],
            [
                'id' => $topicId,
                'class_id' => $class->id,
                'title' => 'Bab 1: Konsep Dasar Fungsi & Pemetaan',
                'description' => 'Pengenalan domain, kodomain, fungsi surjektif, injektif, dan bijektif.',
                'order_index' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
        $topic = DB::table('material_topics')->where('class_id', $class->id)->where('order_index', 1)->first();

        // 12. Material
        $materialId = (string) Str::uuid();
        DB::table('materials')->updateOrInsert(
            ['class_id' => $class->id, 'title' => 'Modul 01: Relasi & Fungsi Matematika'],
            [
                'id' => $materialId,
                'workspace_id' => $workspace->id,
                'class_id' => $class->id,
                'topic_id' => $topic->id,
                'title' => 'Modul 01: Relasi & Fungsi Matematika',
                'content_type' => 'text',
                'text_content' => '## Relasi dan Fungsi\n\nFungsi f dari himpunan A ke himpunan B adalah relasi khusus yang memasangkan setiap anggota himpunan A tepat satu anggota himpunan B.\n\n### Sifat Fungsi\n1. Injektif (Satu-satu)\n2. Surjektif (Pada)\n3. Bijektif (Korespondensi satu-satu)',
                'allow_download' => true,
                'status' => 'published',
                'published_at' => now(),
                'order_index' => 1,
                'created_by' => $teacher->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        // 13. Assignment
        $assignmentId = (string) Str::uuid();
        DB::table('assignments')->updateOrInsert(
            ['class_id' => $class->id, 'title' => 'Tugas 01: Analisis Domain & Range Fungsi'],
            [
                'id' => $assignmentId,
                'workspace_id' => $workspace->id,
                'class_id' => $class->id,
                'topic_id' => $topic->id,
                'title' => 'Tugas 01: Analisis Domain & Range Fungsi',
                'instructions' => 'Tentukan domain alami dan range dari fungsi-fungsi berikut:\n1. f(x) = sqrt(2x - 6)\n2. g(x) = (3x + 1) / (x - 4)\n\nTuliskan cara pengerjaan lengkap dalam format PDF atau teks langsung.',
                'max_score' => 100.00,
                'deadline' => now()->addDays(7),
                'allow_late_submission' => true,
                'status' => 'published',
                'created_by' => $teacher->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
    }
}
