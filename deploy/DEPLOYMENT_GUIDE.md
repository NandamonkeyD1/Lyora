# Panduan Deployment & Manajemen Kunci Produksi LYORA
**Produk:** LYORA Learning Management Platform  
**Pengembang:** Solvia Nova  
**Klasifikasi:** EdTech / SaaS Platform  
**Dokumen:** Dokumen Operasional & Kunci Deployment v1.0.0  

---

## 1. Ringkasan Kunci & Kredensial Produksi

Seluruh kunci deployment telah dibuat dan disimpan di folder [`deploy/`](file:///c:/Users/COMPUTER/Downloads/LYORA/deploy/):

| Nama Kunci | Lokasi Berkas | Kegunaan |
| :--- | :--- | :--- |
| **SSH Deploy Key (Private)** | [`deploy/lyora_deploy_key`](file:///c:/Users/COMPUTER/Downloads/LYORA/deploy/lyora_deploy_key) | Digunakan oleh server CI/CD (GitHub Actions / GitLab Runner) atau VPS untuk melakukan `git pull` otomatis tanpa kata sandi. |
| **SSH Deploy Key (Public)** | [`deploy/lyora_deploy_key.pub`](file:///c:/Users/COMPUTER/Downloads/LYORA/deploy/lyora_deploy_key.pub) | Didaftarkan pada menu *Settings -> Deploy Keys* di repositori Git (GitHub/GitLab). |
| **Production APP_KEY** | [`backend/.env.production.example`](file:///c:/Users/COMPUTER/Downloads/LYORA/backend/.env.production.example) | Kunci enkripsi kriptografi AES-256-CBC Laravel untuk sesi, token Sanctum, dan payload aman. |

### Nilai Kunci Produksi yang Telah Digenerate:
* **Public Deploy Key (Ed25519):**
  ```text
  ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIF3fMQ8Y8gCVGOgptGy351GeYwrxQyABjD3se8Mk3fUH deploy-lyora@solvianova.com
  ```
* **Production Laravel `APP_KEY`:**
  ```text
  base64:aHK29LDWbTc0QsQvNA+Hq18XIqO2PlLHxjYUNihcuFw=
  ```

---

## 2. Cara Menggunakan SSH Deploy Key

### A. Daftarkan Public Key ke Repositori GitHub/GitLab
1. Buka repositori proyek LYORA di GitHub / GitLab.
2. Masuk ke **Settings** -> **Deploy Keys** -> **Add Deploy Key**.
3. Beri judul: `LYORA Production Server (Rumahweb/VPS)`.
4. Salin seluruh isi berkas [`lyora_deploy_key.pub`](file:///c:/Users/COMPUTER/Downloads/LYORA/deploy/lyora_deploy_key.pub) dan tempel ke kolom *Key*.
5. Centang *Allow write access* jika server membutuhkan push tag/release, lalu klik **Add Key**.

### B. Konfigurasikan Private Key di Server VPS / Hosting
1. Masuk ke server produksi melalui SSH.
2. Buat berkas identitas di `~/.ssh/id_ed25519_lyora`:
   ```bash
   nano ~/.ssh/id_ed25519_lyora
   # Tempelkan isi berkas deploy/lyora_deploy_key
   chmod 600 ~/.ssh/id_ed25519_lyora
   ```
3. Tambahkan konfigurasi ke `~/.ssh/config`:
   ```text
   Host github.com
       IdentityFile ~/.ssh/id_ed25519_lyora
       IdentitiesOnly yes
   ```
4. Uji koneksi:
   ```bash
   ssh -T git@github.com
   ```

---

## 3. Konfigurasi Lingkungan Produksi (.env)

### Backend (`/var/www/lyora/backend/.env`)
Salin dari berkas [`backend/.env.production.example`](file:///c:/Users/COMPUTER/Downloads/LYORA/backend/.env.production.example):
```bash
cp .env.production.example .env
```
Pastikan variabel berikut telah disesuaikan:
* `APP_URL=https://api.lyora.solvianova.com`
* `FRONTEND_URL=https://lyora.solvianova.com`
* `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` (kredensial MySQL server).
* `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`, `LIVEKIT_HOST` (kredensial LiveKit Cloud).

### Frontend (`/var/www/lyora/frontend/.env.local`)
Salin dari berkas [`frontend/.env.production.example`](file:///c:/Users/COMPUTER/Downloads/LYORA/frontend/.env.production.example):
```bash
cp .env.production.example .env.local
```
Variabel:
* `NEXT_PUBLIC_API_URL=https://api.lyora.solvianova.com/api/v1`
* `NEXT_PUBLIC_APP_URL=https://lyora.solvianova.com`

---

## 4. Eksekusi Deployment Otomatis

Tersedia skrip deployment otomatis di [`deploy/deploy.sh`](file:///c:/Users/COMPUTER/Downloads/LYORA/deploy/deploy.sh).

Jalankan di server produksi:
```bash
chmod +x deploy/deploy.sh
./deploy/deploy.sh
```

Skrip ini secara otomatis:
1. Menarik commit terbaru via Git (`git pull origin main`).
2. Menjalankan `composer install --no-dev --optimize-autoloader`.
3. Menjalankan migrasi database produksi (`php artisan migrate --force`).
4. Mengoptimalkan cache Laravel (`config:cache`, `route:cache`, `view:cache`).
5. Memulai ulang worker antrean (*Supervisor*).
6. Membangun bundel produksi Next.js (`npm run build`) dan memulai ulang proses PM2.

---

## 5. Konfigurasi Layanan Pendukung di Server

* **Nginx Reverse Proxy:** Salin konfigurasi [`deploy/nginx/lyora.conf`](file:///c:/Users/COMPUTER/Downloads/LYORA/deploy/nginx/lyora.conf) ke `/etc/nginx/sites-available/lyora.conf`.
* **Supervisor Daemon:** Salin konfigurasi [`deploy/supervisor-lyora.conf`](file:///c:/Users/COMPUTER/Downloads/LYORA/deploy/supervisor-lyora.conf) ke `/etc/supervisor/conf.d/lyora.conf` untuk menjaga *Laravel Queue Worker* dan *Laravel Reverb WebSocket* tetap berjalan tanpa henti.
