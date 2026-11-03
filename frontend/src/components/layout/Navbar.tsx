"use client";

import React, { useState } from "react";
import {
  Bell,
  Search,
  CheckCircle2,
  ChevronDown,
  Building2,
  LogOut,
  Sparkles,
} from "lucide-react";
import { AppRole, UserProfile } from "../../types/lyora";

interface NavbarProps {
  currentUser: UserProfile;
  currentRole: AppRole;
  onChangeRole: (role: AppRole) => void;
  title: string;
  onLogout: () => void;
}

export default function Navbar({
  currentUser,
  currentRole,
  onChangeRole,
  title,
  onLogout,
}: NavbarProps) {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const notifications = [
    { id: 1, title: "Modul Baru Terbit", desc: "Modul 01: Relasi & Fungsi telah siap dipelajari.", time: "10 mnt lalu" },
    { id: 2, title: "Tenggat Tugas", desc: "Tugas 01 memiliki tenggat dalam 2 hari ke depan.", time: "1 jam lalu" },
    { id: 3, title: "Parent Verified", desc: "Akun orang tua Hendra Pratama terhubung dengan anak.", time: "Kemarin" },
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 sticky top-0 z-40">
      {/* Current Screen Title */}
      <div className="flex items-center space-x-3">
        <h1 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h1>
      </div>

      {/* Center Search */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
        <div className="w-full relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari kelas, modul materi, tugas, atau kuis..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-100 hover:bg-slate-100/80 focus:bg-white border border-transparent focus:border-indigo-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">
        {/* Role Switcher Pill */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center space-x-2 px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded-xl text-xs font-semibold text-indigo-700 hover:bg-indigo-100/70 transition shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span className="capitalize">Peran: {currentRole.replace("_", " ")}</span>
            <ChevronDown className="w-3.5 h-3.5 text-indigo-500" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-1.5 border-b border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Ganti Perspektif Peran</p>
              </div>
              {[
                { id: "teacher", label: "Guru / Tutor", desc: "Budi Santoso, S.Pd." },
                { id: "student", label: "Murid / Siswa", desc: "Dimas Pratama" },
                { id: "parent", label: "Orang Tua / Wali", desc: "Hendra Pratama" },
                { id: "super_admin", label: "Super Admin", desc: "Platform Console" },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    onChangeRole(r.id as AppRole);
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition ${
                    currentRole === r.id ? "bg-indigo-50/70 text-indigo-700 font-bold" : "text-slate-700"
                  }`}
                >
                  <div>
                    <p className="font-semibold">{r.label}</p>
                    <p className="text-[10px] text-slate-400">{r.desc}</p>
                  </div>
                  {currentRole === r.id && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotif(!showNotif)}
            className="w-9 h-9 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-600 relative transition"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-2 right-2 ring-2 ring-white" />
          </button>

          {showNotif && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                <span className="text-xs font-bold text-slate-900">Notifikasi</span>
                <span className="text-[10px] text-indigo-600 font-semibold cursor-pointer">Tandai Dibaca</span>
              </div>
              <div className="space-y-2.5">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 text-xs">
                    <p className="font-semibold text-slate-800">{n.title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{n.desc}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill */}
        <div className="flex items-center space-x-2.5 pl-2 border-l border-slate-200">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20"
          />
          <div className="hidden xl:block text-left text-xs">
            <p className="font-bold text-slate-800 truncate leading-tight">{currentUser.name}</p>
            <p className="text-[10px] text-slate-400 capitalize">{currentRole.replace("_", " ")}</p>
          </div>
        </div>

        {/* Logout / Exit to Public Button */}
        <button
          onClick={onLogout}
          title="Keluar ke Halaman Publik"
          className="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-xl transition flex items-center space-x-1"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline text-xs font-bold text-rose-600">Keluar</span>
        </button>
      </div>
    </header>
  );
}
