"use client";

import React from "react";
import {
  BookOpen,
  Users,
  FileText,
  Video,
  Clock,
  ArrowUpRight,
  PlusCircle,
  MessageCircle,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { AppRole, UserProfile, ClassItem } from "../../types/lyora";

interface DashboardViewProps {
  currentRole: AppRole;
  currentUser: UserProfile;
  classes: ClassItem[];
  onNavigateTab: (tab: string) => void;
}

export default function DashboardView({
  currentRole,
  currentUser,
  classes,
  onNavigateTab,
}: DashboardViewProps) {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LYORA Integrated Learning Ecosystem</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Selamat Datang Kembali, {currentUser.name}!
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              {currentRole === "teacher" &&
                "Kelola kurikulum, publikasikan tugas terstruktur, evaluasi jawaban murid, dan jadwalkan sesi tatap maya LiveKit dalam satu ruang kerja terpadu."}
              {currentRole === "student" &&
                "Pelajari materi terstruktur, kerjakan tugas tepat waktu, ikuti kuis pemahaman, dan tingkatkan performa akademikmu."}
              {currentRole === "parent" &&
                "Pantau perkembangan pendidikan putra-putri Anda, jadwal belajar, rekap kehadiran, dan catatan evaluasi berkala dari pengajar."}
              {currentRole === "super_admin" &&
                "Pusat kendali multi-tenant workspace, audit aktivitas keamanan sistem, dan pemantauan utilisasi platform LYORA."}
            </p>
          </div>

          {/* Quick CTA per Role */}
          <div className="flex flex-wrap gap-2.5">
            {currentRole === "teacher" && (
              <>
                <button
                  onClick={() => onNavigateTab("classes")}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center space-x-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Buat Kelas</span>
                </button>
                <button
                  onClick={() => onNavigateTab("meet")}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition flex items-center space-x-2"
                >
                  <Video className="w-4 h-4" />
                  <span>Buka Meet</span>
                </button>
              </>
            )}
            {currentRole === "student" && (
              <button
                onClick={() => onNavigateTab("assignments")}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>Lihat Tugas Aktif</span>
              </button>
            )}
            {currentRole === "parent" && (
              <a
                href={`https://wa.me/6281298765432?text=${encodeURIComponent("Halo Pak Budi, saya orang tua Dimas. Ingin menanyakan perkembangan belajar Dimas.")}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Pengajar</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentRole === "teacher" && (
          <>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold">Total Kelas Aktif</span>
                <BookOpen className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900">3 Kelas</div>
              <p className="text-[11px] text-slate-400 mt-1">2 Grup, 1 Kelas Privat</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold">Murid Bimbingan</span>
                <Users className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900">28 Murid</div>
              <p className="text-[11px] text-emerald-600 font-medium mt-1">Tingkat kehadiran 98.5%</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold">Tugas Perlu Dinilai</span>
                <FileText className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900">4 Pengumpulan</div>
              <p className="text-[11px] text-amber-600 font-medium mt-1">Tugas 02: Limit Aljabar</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold">Sesi Virtual Meet</span>
                <Video className="w-4 h-4 text-sky-600" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900">LiveKit Cloud</div>
              <p className="text-[11px] text-sky-600 font-medium mt-1">Sesi terdekat: Kamis 16:00</p>
            </div>
          </>
        )}

        {currentRole === "student" && (
          <>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold">Kelas Terdaftar</span>
                <BookOpen className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900">2 Kelas</div>
              <p className="text-[11px] text-indigo-600 font-medium mt-1">Kalkulus SMA 10 & Fisika 11</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold">Modul Selesai</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900">75% Progres</div>
              <p className="text-[11px] text-slate-400 mt-1">3 dari 4 Modul Terbaca</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold">Tugas Menunggu</span>
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900">1 Tugas</div>
              <p className="text-[11px] text-amber-600 font-medium mt-1">Tenggat 2 hari lagi</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold">Rata-Rata Nilai</span>
                <Sparkles className="w-4 h-4 text-violet-600" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900">92.5 / 100</div>
              <p className="text-[11px] text-emerald-600 font-medium mt-1">Peringkat 2 di kelas</p>
            </div>
          </>
        )}

        {currentRole === "parent" && (
          <>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold">Anak Terhubung</span>
                <Users className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900">Dimas Pratama</div>
              <p className="text-[11px] text-emerald-600 font-medium mt-1">Status: Terverifikasi Bilateral</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold">Tingkat Kehadiran</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900">100%</div>
              <p className="text-[11px] text-slate-400 mt-1">12 Sesi berturut-turut hadir</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold">Nilai Evaluasi Terakhir</span>
                <FileText className="w-4 h-4 text-sky-600" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900">95 (A)</div>
              <p className="text-[11px] text-slate-400 mt-1">Tugas 01: Analisis Domain</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold">Kontak Pengajar</span>
                <MessageCircle className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-lg font-bold text-slate-900">Budi Santoso, S.Pd.</div>
              <p className="text-[11px] text-emerald-600 font-medium mt-1">Tersedia via WhatsApp</p>
            </div>
          </>
        )}

        {currentRole === "super_admin" && (
          <>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold">Total Workspaces</span>
                <BookOpen className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900">2 Tenant</div>
              <p className="text-[11px] text-slate-400 mt-1">1 Tutor, 1 Institusi</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold">Total Pengguna</span>
                <Users className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900">173 Akun</div>
              <p className="text-[11px] text-emerald-600 font-medium mt-1">Semua akun aktif</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold">Utilisasi Penyimpanan</span>
                <FileText className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900">26.0 GB</div>
              <p className="text-[11px] text-slate-400 mt-1">Dari total kuota 110 GB</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold">Integritas Sistem</span>
                <Sparkles className="w-4 h-4 text-violet-600" />
              </div>
              <div className="text-xl font-extrabold text-emerald-600">99.9% Uptime</div>
              <p className="text-[11px] text-slate-400 mt-1">37 Tabel MySQL Sinkron</p>
            </div>
          </>
        )}
      </div>

      {/* Main Classes Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Kelas & Aktivitas Pembelajaran Terkini</h3>
            <p className="text-xs text-slate-500">Daftar kelas yang sedang berjalan aktif dalam semester ini.</p>
          </div>
          <button
            onClick={() => onNavigateTab("classes")}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
          >
            <span>Buka Semua Kelas</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {classes.slice(0, 3).map((cls) => (
            <div
              key={cls.id}
              onClick={() => onNavigateTab("classes")}
              className="group border border-slate-200 hover:border-indigo-400 rounded-2xl p-5 hover:shadow-md transition-all cursor-pointer bg-white flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {cls.educationLevel}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 capitalize">
                    {cls.status}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                  {cls.name}
                </h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{cls.description}</p>
              </div>

              <div className="border-t border-slate-100 pt-3 space-y-2 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Pengampu:</span>
                  <span className="font-semibold text-slate-800">{cls.primaryTeacher}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Kapasitas:</span>
                  <span className="font-semibold text-slate-800">
                    {cls.enrolledStudentsCount} / {cls.maxCapacity} Murid
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Kode Undangan:</span>
                  <code className="font-mono font-bold text-indigo-600 bg-indigo-50/70 px-1.5 py-0.5 rounded text-[11px]">
                    {cls.invitationCode}
                  </code>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
