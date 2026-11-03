"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  ArrowRight,
  Sparkles,
  BookOpen,
  Users,
  Video,
  FileText,
  ShieldCheck,
  Building2,
  CheckCircle2,
  HeartHandshake,
  MessageCircle,
  HelpCircle,
  BarChart3,
  Search,
  Lock,
  Layers,
  Calendar,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { AppRole } from "../../types/lyora";

interface PublicLandingPageProps {
  onOpenAuth: (mode: "login" | "register") => void;
  onInstantDemo: (role: AppRole) => void;
  onQuickJoin: (code: string) => void;
}

export default function PublicLandingPage({
  onOpenAuth,
  onInstantDemo,
  onQuickJoin,
}: PublicLandingPageProps) {
  const [quickCode, setQuickCode] = useState("");
  const [quickCodeMsg, setQuickCodeMsg] = useState<string | null>(null);

  const handleQuickJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickCode.trim()) return;

    if (quickCode.trim().toUpperCase() === "LYORA-MAT10") {
      setQuickCodeMsg("Kode valid! Anda akan diarahkan ke kelas Kalkulus SMA 10.");
      setTimeout(() => {
        onQuickJoin("LYORA-MAT10");
      }, 1200);
    } else {
      setQuickCodeMsg("Kode tidak ditemukan. Gunakan demo code: LYORA-MAT10");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      {/* 1. Public Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900">LYORA</span>
                <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                  Solvia Nova
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block font-medium">Learn. Grow. Achieve.</p>
            </div>
          </div>

          {/* Navigation Anchors */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-semibold text-slate-600">
            <a href="#solusi-bisnis" className="hover:text-indigo-600 transition">Solusi Bisnis</a>
            <a href="#ekosistem-peran" className="hover:text-indigo-600 transition">Ekosistem 4 Peran</a>
            <a href="#fitur-unggulan" className="hover:text-indigo-600 transition">Fitur Unggulan</a>
            <a href="#gabung-kelas" className="hover:text-indigo-600 transition">Gabung Kelas</a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 text-xs font-bold">
            <button
              onClick={() => onOpenAuth("login")}
              className="px-4 py-2 text-slate-700 hover:text-indigo-600 hover:bg-slate-100/70 rounded-xl transition"
            >
              Masuk
            </button>
            <button
              onClick={() => onOpenAuth("register")}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm transition flex items-center space-x-1.5"
            >
              <span>Daftar Gratis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28 bg-gradient-to-b from-indigo-50/50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold px-3.5 py-1.5 rounded-full bg-indigo-100/80 text-indigo-800 border border-indigo-200 shadow-sm mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Integrated Learning Management Platform • Solvia Nova Product</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
            Empowering Better Learning Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">Connected Technology</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            LYORA bukan sekadar repositori materi biasa. LYORA adalah ekosistem pembelajaran modern yang
            menghubungkan <strong>Guru</strong>, <strong>Murid</strong>, <strong>Orang Tua</strong>, dan <strong>Institusi</strong> dalam
            satu platform terpadu.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <button
              onClick={() => onOpenAuth("register")}
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md shadow-indigo-600/20 transition flex items-center justify-center space-x-2"
            >
              <span>Mulai Buat Workspace Belajar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onInstantDemo("teacher")}
              className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-2xl font-bold text-sm shadow-sm transition flex items-center justify-center space-x-2"
            >
              <span>Jelajahi Demo Interaktif</span>
              <ExternalLink className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          {/* Quick Demo Role Picker Chips */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold mr-1">Masuk instan sebagai:</span>
            <button
              onClick={() => onInstantDemo("teacher")}
              className="px-3 py-1 bg-white hover:bg-indigo-50 border border-slate-200 text-indigo-700 font-bold rounded-xl shadow-xs transition"
            >
              Guru Budi (Tutor)
            </button>
            <button
              onClick={() => onInstantDemo("student")}
              className="px-3 py-1 bg-white hover:bg-sky-50 border border-slate-200 text-sky-700 font-bold rounded-xl shadow-xs transition"
            >
              Murid Dimas (Siswa)
            </button>
            <button
              onClick={() => onInstantDemo("parent")}
              className="px-3 py-1 bg-white hover:bg-emerald-50 border border-slate-200 text-emerald-700 font-bold rounded-xl shadow-xs transition"
            >
              Wali Hendra (Orang Tua)
            </button>
            <button
              onClick={() => onInstantDemo("super_admin")}
              className="px-3 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold rounded-xl shadow-xs transition"
            >
              Super Admin Console
            </button>
          </div>
        </div>
      </section>

      {/* 3. Quick Join Class Widget */}
      <section id="gabung-kelas" className="max-w-4xl mx-auto px-4 -mt-10 relative z-20 w-full">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                Fitur Siswa
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-1">Punya Kode Undangan Kelas?</h3>
              <p className="text-xs text-slate-500">
                Masukkan kode undangan dari guru bimbinganmu untuk langsung bergabung dan mulai belajar.
              </p>
            </div>

            <form onSubmit={handleQuickJoinSubmit} className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Contoh: LYORA-MAT10"
                value={quickCode}
                onChange={(e) => setQuickCode(e.target.value)}
                className="px-3.5 py-2.5 text-xs font-mono font-bold uppercase border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none w-48 bg-slate-50"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition whitespace-nowrap"
              >
                Gabung Kelas
              </button>
            </form>
          </div>

          {quickCodeMsg && (
            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-900 font-semibold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>{quickCodeMsg}</span>
            </div>
          )}
        </div>
      </section>

      {/* 4. Dua Model Bisnis (Section 3) */}
      <section id="solusi-bisnis" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Model Pengguna Bisnis</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Dua Solusi Andal untuk Ekosistem Pendidikan
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            LYORA dirancang dengan arsitektur multi-workspace fleksibel untuk tutor privat mandiri maupun lembaga bimbingan berskala besar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Solution 1: Independent Tutor */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">Independent Tutor Workspace</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ruang kerja mandiri bagi guru privat atau tutor independen untuk mengajar murid secara terstruktur
                tanpa beban birokrasi institusi.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-700 pt-2 font-medium">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Membuat kelas privat 1-on-1 maupun kelas kelompok kecil.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Unggah materi PDF, video MP4, catatan teks, dan tugas berbatas waktu.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sesi tatap maya interaktif (LiveKit) hingga 10 peserta per kelas.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Hubungkan dan koordinasikan perkembangan murid dengan orang tua via WhatsApp.</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onInstantDemo("teacher")}
              className="w-full py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl text-xs transition flex items-center justify-center space-x-1"
            >
              <span>Masuk Sebagai Tutor Independen</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Solution 2: Educational Institution */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">Educational Institution Workspace</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Struktur multi-guru terpusat untuk bimbingan belajar, kursus bahasa, sekolah, atau akademi
                dengan pengaturan izin granular (*role permissions*).
              </p>

              <ul className="space-y-2.5 text-xs text-slate-700 pt-2 font-medium">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Kelola banyak pengajar (*co-teachers*) dan delegasi izin operasional.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Struktur kurikulum per mata pelajaran, tingkatan kelas, dan jadwal terpadu.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Bank soal ujian CBT dengan 5 tipe soal dan penilaian otomatis.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Laporan konsolidasi level institusi dengan ekspor PDF, Excel, dan CSV.</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onInstantDemo("super_admin")}
              className="w-full py-2.5 bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold rounded-xl text-xs transition flex items-center justify-center space-x-1"
            >
              <span>Pelajari Konsol Tata Kelola Institusi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Empat Role Utama (Section 4) */}
      <section id="ekosistem-peran" className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Otorisasi Kontekstual</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">Empat Pilar Utama Ekosistem Pembelajaran</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Hak akses dan peran disesuaikan secara otomatis berdasarkan konteks workspace dan kelas aktif.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              onClick={() => onInstantDemo("teacher")}
              className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700 p-6 rounded-2xl space-y-3 cursor-pointer transition"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base">Guru / Tutor</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Membuat kelas, mengunggah modul, membuat tugas & kuis, menjadwalkan Meet, dan mengevaluasi murid.
              </p>
            </div>

            <div
              onClick={() => onInstantDemo("student")}
              className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700 p-6 rounded-2xl space-y-3 cursor-pointer transition"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base">Murid / Student</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Membaca materi, mengerjakan tugas, mengikuti ujian CBT, berdiskusi, dan menautkan akun orang tua.
              </p>
            </div>

            <div
              onClick={() => onInstantDemo("parent")}
              className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700 p-6 rounded-2xl space-y-3 cursor-pointer transition"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base">Orang Tua / Wali</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Portal khusus memantau kehadiran, jadwal belajar, rekap nilai anak, dan tombol langsung WhatsApp pengajar.
              </p>
            </div>

            <div
              onClick={() => onInstantDemo("super_admin")}
              className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700 p-6 rounded-2xl space-y-3 cursor-pointer transition"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base">Super Admin</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pemantauan kuota penyimpanan, audit trail keamanan sistem, moderasi, dan manajemen multi-workspace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Fitur Unggulan Modul (Section 7) */}
      <section id="fitur-unggulan" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Fitur Terintegrasi</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Lengkap, Terstruktur, dan Berstandar Internasional
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <Layers className="w-6 h-6 text-indigo-600" />
            <h4 className="font-bold text-slate-900 text-sm">Modul Materi Multi-Format</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Mendukung dokumen PDF, video pembelajaran MP4, catatan teks, serta tautan kalkulator Geogebra interaktif.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <FileText className="w-6 h-6 text-emerald-600" />
            <h4 className="font-bold text-slate-900 text-sm">Siklus Tugas & Revisi</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Pengumpulan berkas, riwayat versi pengumpulan, tenggat otomatis, dan penilaian dengan rubrik umpan balik guru.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <HelpCircle className="w-6 h-6 text-amber-600" />
            <h4 className="font-bold text-slate-900 text-sm">CBT Engine (5 Format Soal)</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Pilihan Ganda, Pilihan Ganda Kompleks, Benar/Salah, Isian Singkat, dan Essay dengan timer hitung mundur dan autosave.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <Video className="w-6 h-6 text-rose-600" />
            <h4 className="font-bold text-slate-900 text-sm">LiveKit Meet (Maks. 10 Peserta)</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Tatap maya audio-video kualitas 1080p dengan pembatasan ketat 10 peserta dan rekaman presensi otomatis.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <MessageCircle className="w-6 h-6 text-emerald-600" />
            <h4 className="font-bold text-slate-900 text-sm">WhatsApp Direct Integration</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Tautan wa.me dengan pesan terformat otomatis untuk komunikasi personal guru dan orang tua tanpa menyimpan chat di LMS.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <BarChart3 className="w-6 h-6 text-violet-600" />
            <h4 className="font-bold text-slate-900 text-sm">Laporan PDF, Excel & CSV</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Rekapitulasi nilai, persentase kehadiran, dan performa akademik siap unduh dalam berbagai format standar.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Public Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm">
                L
              </div>
              <span className="font-extrabold text-slate-900 text-base">LYORA Learning Management Platform</span>
            </div>
            <p className="text-xs text-slate-500">
              Developed by <strong>Solvia Nova</strong> • Learn. Grow. Achieve.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
            <p>© 2026 Solvia Nova. All Rights Reserved. Education Technology SaaS Platform.</p>
            <div className="flex items-center space-x-4">
              <span>Keamanan Data & Privasi</span>
              <span>Syarat Layanan</span>
              <span>Bantuan WhatsApp</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
