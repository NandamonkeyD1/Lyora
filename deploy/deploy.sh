#!/usr/bin/env bash
# ==============================================================================
# LYORA - Production Automated Deployment Script
# A Product by Solvia Nova
# ==============================================================================

set -e

echo "🚀 [LYORA] Memulai deployment otomatis ke lingkungan produksi..."

# 1. Update source code from Git
echo "📥 [1/6] Menarik pembaruan kode terbaru dari Git..."
git pull origin main

# 2. Backend Laravel Setup
echo "⚙️ [2/6] Memperbarui dependensi backend Laravel..."
cd backend
composer install --no-dev --optimize-autoloader --no-interaction

echo "🗄️ [3/6] Menjalankan migrasi database..."
php artisan migrate --force

echo "🧹 [4/6] Mengoptimalkan cache konfigurasi dan rute Laravel..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Restart queue workers to reload new code
if command -v supervisorctl &> /dev/null; then
    echo "🔄 Memulai ulang worker antrean (supervisor)..."
    sudo supervisorctl restart lyora-worker:* || true
fi
cd ..

# 3. Frontend Next.js Setup
echo "🌐 [5/6] Membangun bundel produksi frontend Next.js..."
cd frontend
npm ci --legacy-peer-deps
npm run build

# Restart PM2 or systemd service for Next.js
if command -v pm2 &> /dev/null; then
    echo "🔄 Memulai ulang Next.js app via PM2..."
    pm2 restart lyora-frontend || pm2 start npm --name "lyora-frontend" -- start
fi
cd ..

echo "✅ [6/6] Deployment LYORA selesai dengan sukses!"
