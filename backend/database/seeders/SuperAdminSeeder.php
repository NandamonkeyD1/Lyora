<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class SuperAdminSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->updateOrInsert(
            ['email' => 'admin@solvianova.com'],
            [
                'id' => (string) Str::uuid(),
                'name' => 'Solvia Nova Super Admin',
                'email' => 'admin@solvianova.com',
                'phone_number' => '+6281234567890',
                'password' => Hash::make('Password123!'),
                'timezone' => 'Asia/Jakarta',
                'is_super_admin' => true,
                'is_active' => true,
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
    }
}
