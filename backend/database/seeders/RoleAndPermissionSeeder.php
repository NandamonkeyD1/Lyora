<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class RoleAndPermissionSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Roles
        $roles = [
            [
                'id' => (string) Str::uuid(),
                'name' => 'teacher',
                'display_name' => 'Guru / Tutor',
                'description' => 'Pendidik pengampu yang mengelola materi, kelas, tugas, kuis, evaluasi, dan interaksi pembelajaran.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => (string) Str::uuid(),
                'name' => 'student',
                'display_name' => 'Murid / Siswa',
                'description' => 'Peserta didik yang mengikuti kelas, mempelajari materi, mengerjakan tugas, dan mengikuti ujian.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => (string) Str::uuid(),
                'name' => 'parent',
                'display_name' => 'Orang Tua / Wali',
                'description' => 'Wali murid yang terverifikasi untuk memantau kehadiran, nilai, dan perkembangan belajar anak.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($roles as $role) {
            DB::table('roles')->updateOrInsert(['name' => $role['name']], $role);
        }

        // 2. Permissions
        $permissions = [
            // Workspace Permissions
            [
                'name' => 'workspace.members.manage',
                'module' => 'workspace',
                'description' => 'Mengundang, menyetujui, dan mengelola anggota workspace.',
            ],
            [
                'name' => 'workspace.teachers.manage',
                'module' => 'workspace',
                'description' => 'Menugaskan dan mengelola staf pengajar di level institusi.',
            ],
            [
                'name' => 'workspace.classes.manage',
                'module' => 'workspace',
                'description' => 'Membuat, mengedit, dan mengarsipkan kelas di dalam workspace.',
            ],
            [
                'name' => 'workspace.reports.view',
                'module' => 'workspace',
                'description' => 'Melihat ringkasan laporan konsolidasi seluruh kelas dan guru.',
            ],
            [
                'name' => 'workspace.settings.manage',
                'module' => 'workspace',
                'description' => 'Mengubah konfigurasi identitas dan pengaturan workspace.',
            ],
            // Class Permissions
            [
                'name' => 'class.materials.manage',
                'module' => 'class',
                'description' => 'Mengunggah, mengedit, dan menjadwalkan publikasi materi.',
            ],
            [
                'name' => 'class.assignments.manage',
                'module' => 'class',
                'description' => 'Membuat tugas, batas waktu, dan mengelola submission.',
            ],
            [
                'name' => 'class.quizzes.manage',
                'module' => 'class',
                'description' => 'Membuat kuis, bank soal, dan jadwal ujian.',
            ],
            [
                'name' => 'class.grades.manage',
                'module' => 'class',
                'description' => 'Memberikan penilaian, revisi, dan umpan balik tugas/ujian.',
            ],
            [
                'name' => 'class.meetings.manage',
                'module' => 'class',
                'description' => 'Menjadwalkan dan memulai sesi video live classroom.',
            ],
            [
                'name' => 'class.discussions.moderate',
                'module' => 'class',
                'description' => 'Memoderasi, menyematkan, atau mengunci forum diskusi kelas.',
            ],
        ];

        foreach ($permissions as $perm) {
            DB::table('permissions')->updateOrInsert(
                ['name' => $perm['name']],
                [
                    'id' => (string) Str::uuid(),
                    'name' => $perm['name'],
                    'module' => $perm['module'],
                    'description' => $perm['description'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }

        // 3. Assign Default Permissions to Teacher Role
        $teacherRole = DB::table('roles')->where('name', 'teacher')->first();
        if ($teacherRole) {
            $allPerms = DB::table('permissions')->get();
            foreach ($allPerms as $perm) {
                DB::table('role_permissions')->updateOrInsert([
                    'role_id' => $teacherRole->id,
                    'permission_id' => $perm->id,
                ]);
            }
        }
    }
}
