"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  X,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { AppRole } from "../../types/lyora";

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: "login" | "register";
  onClose: () => void;
  onLoginSuccess: (role: AppRole, user: any, token?: string) => void;
}

export default function AuthModal({
  isOpen,
  initialMode = "login",
  onClose,
  onLoginSuccess,
}: AuthModalProps) {
  const [authMode, setAuthMode] = useState<"login" | "register">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [intendedRole, setIntendedRole] = useState<"teacher" | "student" | "parent">("student");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleStandardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    const endpoint = authMode === "login" ? "/api/v1/auth/login" : "/api/v1/auth/register";
    const payload =
      authMode === "login"
        ? { email, password }
        : { name, email, password, phone_number: phone, intended_role: intendedRole };

    try {
      const res = await fetch(`http://127.0.0.1:8000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || (data.errors ? Object.values(data.errors)[0] as string : "Gagal memproses autentikasi."));
      }

      // Determine role from backend response
      let resolvedRole: AppRole = "student";
      if (data.user?.is_super_admin) {
        resolvedRole = "super_admin";
      } else if (data.user?.workspaces?.some((w: any) => w.role === "teacher") || email.includes("tutor")) {
        resolvedRole = "teacher";
      } else if (data.user?.children?.length > 0 || email.includes("orangtua")) {
        resolvedRole = "parent";
      }

      if (data.token) {
        localStorage.setItem("lyora_token", data.token);
      }

      onLoginSuccess(resolvedRole, data.user, data.token);
      onClose();
    } catch (err: any) {
      // If backend server is unreachable or error, provide fallback demo login
      setErrorMessage(err.message || "Gagal menghubungi server backend.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoLogin = (role: AppRole) => {
    let mockEmail = "tutor@solvianova.com";
    let mockName = "Budi Santoso, S.Pd.";

    if (role === "student") {
      mockEmail = "murid@solvianova.com";
      mockName = "Dimas Pratama";
    } else if (role === "parent") {
      mockEmail = "orangtua@solvianova.com";
      mockName = "Hendra Pratama";
    } else if (role === "super_admin") {
      mockEmail = "admin@solvianova.com";
      mockName = "Solvia Nova Admin";
    }

    onLoginSuccess(role, {
      name: mockName,
      email: mockEmail,
      is_super_admin: role === "super_admin",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4 selection:bg-indigo-500 selection:text-white">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 border border-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 mx-auto">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {authMode === "login" ? "Masuk ke Akun LYORA" : "Daftar Akun Baru LYORA"}
            </h3>
            <p className="text-xs text-slate-500">Learn. Grow. Achieve. • A Product by Solvia Nova</p>
          </div>
        </div>

        {/* Toggle Mode */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-5 text-xs font-bold">
          <button
            type="button"
            onClick={() => setAuthMode("login")}
            className={`flex-1 py-2 rounded-lg transition-all ${
              authMode === "login" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Masuk
          </button>
          <button
            type="button"
            onClick={() => setAuthMode("register")}
            className={`flex-1 py-2 rounded-lg transition-all ${
              authMode === "register" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Daftar Akun Baru
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleStandardSubmit} className="space-y-3.5 text-xs">
          {authMode === "register" && (
            <div>
              <label className="font-bold text-slate-700 block mb-1">Nama Lengkap *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap Anda"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="font-bold text-slate-700 block mb-1">Alamat Email *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Kata Sandi *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="Minimal 8 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {authMode === "register" && (
            <>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nomor WhatsApp Aktif</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    placeholder="+6281234567890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Peran Akun Utama</label>
                <select
                  value={intendedRole}
                  onChange={(e) => setIntendedRole(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white font-medium"
                >
                  <option value="student">Murid / Siswa (Belajar & Mengikuti Kelas)</option>
                  <option value="teacher">Guru / Tutor (Mengajar & Membuat Kelas)</option>
                  <option value="parent">Orang Tua / Wali (Memantau Belajar Anak)</option>
                </select>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md shadow-indigo-600/20 transition flex items-center justify-center space-x-1.5"
          >
            <span>{isLoading ? "Memproses..." : authMode === "login" ? "Masuk ke LYORA" : "Daftar Sekarang"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 1-Click Fast Demo Login for Evaluators */}
        <div className="mt-6 pt-5 border-t border-slate-100 space-y-2.5">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase tracking-wider">
            <span>Uji Coba Cepat (1-Click Demo)</span>
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin("teacher")}
              className="p-2 bg-indigo-50/70 hover:bg-indigo-100/70 border border-indigo-200/60 rounded-xl font-bold text-indigo-800 text-left transition"
            >
              <p className="truncate">Guru / Tutor</p>
              <p className="text-[10px] text-slate-500 font-normal">Budi Santoso, S.Pd.</p>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin("student")}
              className="p-2 bg-sky-50/70 hover:bg-sky-100/70 border border-sky-200/60 rounded-xl font-bold text-sky-800 text-left transition"
            >
              <p className="truncate">Murid / Siswa</p>
              <p className="text-[10px] text-slate-500 font-normal">Dimas Pratama</p>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin("parent")}
              className="p-2 bg-emerald-50/70 hover:bg-emerald-100/70 border border-emerald-200/60 rounded-xl font-bold text-emerald-800 text-left transition"
            >
              <p className="truncate">Orang Tua / Wali</p>
              <p className="text-[10px] text-slate-500 font-normal">Hendra Pratama</p>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin("super_admin")}
              className="p-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl font-bold text-slate-800 text-left transition"
            >
              <p className="truncate">Super Admin</p>
              <p className="text-[10px] text-slate-500 font-normal">Solvia Nova Admin</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
