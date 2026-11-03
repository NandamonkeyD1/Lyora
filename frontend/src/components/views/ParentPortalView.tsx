"use client";

import React, { useState } from "react";
import {
  HeartHandshake,
  MessageCircle,
  CheckCircle2,
  Clock,
  BookOpen,
  Award,
  Calendar,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import { AppRole } from "../../types/lyora";

interface ParentPortalViewProps {
  currentRole: AppRole;
}

export default function ParentPortalView({ currentRole }: ParentPortalViewProps) {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkingCode, setLinkingCode] = useState("");
  const [linkSuccess, setLinkSuccess] = useState(false);

  const handleLinkChild = (e: React.FormEvent) => {
    e.preventDefault();
    if (linkingCode.trim().toUpperCase() === "LYORA-PARENT-2026") {
      setLinkSuccess(true);
      setTimeout(() => setLinkSuccess(false), 4000);
      setShowLinkModal(false);
      setLinkingCode("");
    } else {
      alert("Kode penautan tidak valid. Gunakan demo code: LYORA-PARENT-2026");
    }
  };

  return (
    <div className="space-y-6">
      {linkSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Verifikasi bilateral sukses! Akun anak berhasil ditautkan secara sah.</span>
        </div>
      )}

      {/* Child Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-center space-x-4">
            <img
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150"
              alt="Dimas Pratama"
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-indigo-50"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-extrabold text-slate-900">Dimas Pratama</h3>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Terverifikasi (Anak Kandung)</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Siswa Aktif • SMA Kelas 10 • Terdaftar pada 2 Kelas Bimbingan
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowLinkModal(true)}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 transition flex items-center space-x-1.5"
            >
              <KeyRound className="w-4 h-4 text-slate-500" />
              <span>Tautkan Anak Lain</span>
            </button>

            {/* Direct WhatsApp Button strictly per Section 7.9 of specification */}
            <a
              href={`https://wa.me/6281298765432?text=${encodeURIComponent("Halo Pak Budi Santoso, saya Hendra Pratama (Ayah dari Dimas Pratama). Ingin berkonsultasi mengenai perkembangan belajar matematika Dimas.")}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center space-x-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Hubungi Guru via WhatsApp</span>
            </a>
          </div>
        </div>

        {/* 3 Metric Cards for Parent */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold">Presensi & Kehadiran</span>
              <Clock className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-600">100% Hadir</div>
            <p className="text-[11px] text-slate-400">12 Sesi berturut-turut hadir tepat waktu</p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold">Rata-Rata Tugas & Kuis</span>
              <Award className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-extrabold text-indigo-600">92.5 / 100</div>
            <p className="text-[11px] text-slate-400">Peringkat 2 dari 18 murid sekelas</p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold">Penyelesaian Modul</span>
              <BookOpen className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-800">3 dari 4 Modul</div>
            <p className="text-[11px] text-slate-400">Aktif membaca dan mencatat</p>
          </div>
        </div>

        {/* Teacher Notes Section */}
        <div className="bg-indigo-50/40 p-6 rounded-2xl border border-indigo-100 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-indigo-900">
              Catatan Khusus dari Guru Pengampu
            </h4>
            <span className="text-[11px] text-slate-400 font-medium">02 Nov 2026</span>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed font-sans">
            "Dimas menunjukkan perkembangan yang sangat signifikan pada pemahaman Bab 1 Relasi & Fungsi. Daya nalar
            logikanya tajam saat menganalisis fungsi pecahan rasional. Mohon terus didampingi untuk persiapan kuis
            minggu depan."
          </p>
          <p className="text-xs font-bold text-slate-900">— Budi Santoso, S.Pd. (Tutor Matematika)</p>
        </div>
      </div>

      {/* Modal: Tautkan Akun Anak */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base">Tautkan Akun Siswa (Anak)</h3>
              <button onClick={() => setShowLinkModal(false)} className="text-slate-400 hover:text-slate-600 text-sm">
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Dapatkan kode penautan unik dari akun profil murid (berlaku selama 30 hari) untuk mengakses portal orang tua.
            </p>

            <form onSubmit={handleLinkChild} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Kode Penautan Murid</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: LYORA-PARENT-2026"
                  value={linkingCode}
                  onChange={(e) => setLinkingCode(e.target.value)}
                  className="w-full px-3 py-2.5 font-mono uppercase text-sm font-bold border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl font-bold text-slate-700 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition shadow-sm"
                >
                  Verifikasi & Tautkan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
