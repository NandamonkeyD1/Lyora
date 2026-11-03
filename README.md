# LYORA — Integrated Learning Management Platform
### *Learn. Grow. Achieve.*
**A Product by Solvia Nova**

---

## 1. Project Overview

**LYORA** adalah platform *Learning Management System* (LMS) terintegrasi yang dirancang untuk memberdayakan tutor independen serta lembaga pendidikan dalam mengelola aktivitas pembelajaran secara digital, modern, dan terstruktur.

Dikembangkan oleh **Solvia Nova** sebagai solusi teknologi pendidikan generasi baru, LYORA mengintegrasikan guru, murid, orang tua, materi pembelajaran, tugas, ujian berbasis komputer (CBT), evaluasi, diskusi interaktif, dan kelas virtual dalam satu ekosistem yang terpadu.

> **Visi Produk:**  
> *"Empowering Better Learning Through Connected Technology."*

---

## 2. Fitur Utama & Ekosistem Peran

LYORA dirancang berdasarkan prinsip **Zero Bloatware**, keamanan tinggi, dan kemudahan penggunaan:

### 2.1 Peran Pengguna (Role Ecosystem)
1. **Super Admin**: Monitoring sistem, audit logs, manajemen workspace, kuota penyimpanan, dan moderasi platform.
2. **Guru / Tutor**: Manajemen kelas, materi multi-format, bank soal & tugas, penjadwalan kelas virtual, evaluasi nilai, dan komunikasi orang tua.
3. **Murid / Student**: Mengakses kelas, membaca materi, mengerjakan tugas & ujian CBT anti-cheat, berdiskusi, dan memantau perkembangan akademik.
4. **Orang Tua / Parent**: Memantau absensi, grafik perkembangan nilai anak, catatan guru, serta komunikasi instan via portal WhatsApp.

### 2.2 Model Bisnis Ganda
- **Independent Tutor Workspace**: Workspace mandiri untuk tutor privat atau kelas bimbingan belajar kecil.
- **Educational Institution Workspace**: Workspace terstruktur untuk sekolah/lembaga bimbingan dengan manajemen multi-guru, mata pelajaran, dan pelaporan terpusat.

### 2.3 Modul Fungsional
- **Computer-Based Test (CBT)**: 5 tipe soal (Pilihan Ganda, Pilihan Ganda Kompleks, Benar/Salah, Isian Singkat, dan Esai) dengan scoring otomatis dan perlindungan integritas ujian.
- **Virtual Meet Management**: Integrasi LiveKit dengan kuota cerdas (maks. 10 peserta aktif per room sesuai aturan arsitektur).
- **Parent Portal & WhatsApp Sync**: Hubungan real-time guru-orang tua tanpa perantara yang rumit.
- **Instant Join**: Murid dapat bergabung ke kelas via kode unik (*misal: LYORA-MAT10*) langsung dari halaman publik.

---

## 3. Arsitektur Teknologi

LYORA dibangun menggunakan pendekatan **Modular Monolith** yang siap diskalakan secara vertikal maupun horizontal:

```
+-------------------------------------------------------+
|                    Client Layer                       |
|   Next.js 15 (React 19) + Tailwind CSS + Lucide Icons |
+-------------------------------------------------------+
                           │  RESTful API (JSON)
                           ▼
+-------------------------------------------------------+
|                    Backend Layer                      |
|       Laravel 11 / 12 (PHP 8.2+) + Laravel Sanctum    |
+-------------------------------------------------------+
                           │  PDO / Eloquent ORM
                           ▼
+-------------------------------------------------------+
|                   Database Layer                      |
|         MySQL 8.0 (37 Relational Tables + UUID)       |
+-------------------------------------------------------+
```

---

## 4. Struktur Proyek

```
LYORA/
├── backend/                   # Laravel RESTful API Application
│   ├── app/Models/            # Eloquent ORM Models (Workspace, User, Class, etc.)
│   ├── database/migrations/   # 11 Skrip Migrasi (37 Entitas Relasional)
│   ├── database/seeders/      # Role, Super Admin, dan Demo Data Seeder
│   ├── routes/api.php         # Endpoint API v1 (Auth, Workspace, Classes, Quizzes)
│   └── tests/Feature/         # Automated Feature Tests
├── frontend/                  # Next.js App Router Frontend
│   ├── src/app/               # App Router Pages & API Client
│   ├── src/components/        # Modular UI (Sidebar, Navbar, PublicLandingPage, etc.)
│   └── src/views/             # Role-based Views (Dashboard, Classes, CBT, ParentPortal)
├── deploy/                    # Production Deployment Toolkit
│   ├── nginx/lyora.conf       # Nginx Reverse Proxy & Static Files Configuration
│   ├── supervisor-lyora.conf  # Supervisor Process Manager Config
│   ├── deploy.sh              # Skrip Otomasi Deployment Ubuntu Server
│   └── DEPLOYMENT_GUIDE.md    # Panduan Komprehensif Setup Server VPS
└── README.md                  # Dokumentasi Resmi LYORA
```

---

## 5. Cara Menjalankan di Lingkungan Lokal (Development)

### Prasyarat
- PHP >= 8.2 & Composer
- Node.js >= 18.x & npm
- MySQL Server (XAMPP / Standalone)

### 5.1 Backend (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate

# Konfigurasi database di file .env:
# DB_DATABASE=lyora_db
# DB_USERNAME=root
# DB_PASSWORD=

php artisan migrate:fresh --seed
php artisan test
php artisan serve --port=8000
```

### 5.2 Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
# Buka http://localhost:3000 di browser
```

### 5.3 Akun Demo Bawaan
| Peran | Email | Kata Sandi |
| :--- | :--- | :--- |
| **Super Admin** | `admin@solvianova.com` | `password123` |
| **Guru / Tutor** | `tutor@solvianova.com` | `password123` |
| **Murid / Student**| `murid@solvianova.com` | `password123` |
| **Orang Tua** | `orangtua@solvianova.com` | `password123` |

---

## 6. Panduan Deployment Production

Panduan lengkap instalasi pada Ubuntu 22.04 / 24.04 LTS (Nginx, PHP-FPM, Supervisor, SSL Let's Encrypt) dapat dilihat pada dokumen:
📖 [Panduan Deployment LYORA](file:///deploy/DEPLOYMENT_GUIDE.md)

---

## 7. Hak Cipta & Lisensi

Hak Cipta &copy; 2026 **Solvia Nova**. Seluruh hak cipta dilindungi undang-undang.  
Didesain dan dikembangkan dengan standar rekayasa perangkat lunak profesional untuk kemajuan pendidikan modern.
