"use client";

import React, { useState } from "react";
import {
  BookOpen,
  PlusCircle,
  Users,
  Copy,
  Check,
  Search,
  Filter,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { AppRole, ClassItem } from "../../types/lyora";

interface ClassesViewProps {
  currentRole: AppRole;
  classes: ClassItem[];
  onSelectClass: (classId: string) => void;
  onCreateClass: (newClass: Partial<ClassItem>) => void;
  onJoinClass: (code: string) => boolean | Promise<boolean>;
}

export default function ClassesView({
  currentRole,
  classes,
  onSelectClass,
  onCreateClass,
  onJoinClass,
}: ClassesViewProps) {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinCodeInput, setJoinCodeInput] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Form State for new class
  const [newClassName, setNewClassName] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newLevel, setNewLevel] = useState("SMA Kelas 10");
  const [newType, setNewType] = useState<"private" | "group">("group");
  const [newPolicy, setNewPolicy] = useState<"instant_join" | "approval_required">("instant_join");
  const [newCapacity, setNewCapacity] = useState(30);
  const [newDesc, setNewDesc] = useState("");

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;

    onCreateClass({
      name: newClassName,
      subject: newSubject || "Mata Pelajaran Umum",
      educationLevel: newLevel,
      type: newType,
      status: "active",
      enrollmentPolicy: newPolicy,
      maxCapacity: newCapacity,
      description: newDesc || "Kelas baru yang dibuat di platform LYORA.",
      primaryTeacher: "Budi Santoso, S.Pd.",
      invitationCode: `LYORA-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      enrolledStudentsCount: 1,
      color: "from-indigo-600 to-sky-500",
      schedule: "Sesuai kesepakatan pengajar",
    });

    setShowCreateModal(false);
    setNewClassName("");
    setNewDesc("");
    setNotification("Kelas baru berhasil dibuat dan dipublikasikan!");
    setTimeout(() => setNotification(null), 4000);
  };

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinCodeInput.trim()) return;

    const success = await onJoinClass(joinCodeInput.trim().toUpperCase());
    if (success) {
      setNotification(`Berhasil bergabung ke kelas dengan kode ${joinCodeInput}!`);
      setShowJoinModal(false);
      setJoinCodeInput("");
    } else {
      alert("Kode undangan kelas tidak valid. Coba gunakan: LYORA-MAT10 atau LYORA-FIS11");
    }
    setTimeout(() => setNotification(null), 4000);
  };

  const filteredClasses = classes.filter((c) => {
    const matchesStatus = filterStatus === "all" || c.status === filterStatus;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold">{notification}</span>
        </div>
      )}

      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-2">
          {["all", "active", "completed", "draft"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterStatus(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition ${
                filterStatus === tab
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab === "all" ? "Semua Kelas" : tab}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter kelas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48"
            />
          </div>

          {(currentRole === "teacher" || currentRole === "super_admin") && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center space-x-1.5 shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Buat Kelas Baru</span>
            </button>
          )}

          {currentRole === "student" && (
            <button
              onClick={() => setShowJoinModal(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center space-x-1.5 shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Gabung Kode Kelas</span>
            </button>
          )}
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((cls) => (
          <div
            key={cls.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between overflow-hidden group"
          >
            {/* Card Header Strip */}
            <div className={`h-3 bg-gradient-to-r ${cls.color}`} />

            <div className="p-6 space-y-4 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {cls.educationLevel}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                    cls.status === "active"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : cls.status === "completed"
                      ? "bg-slate-100 text-slate-600 border border-slate-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  {cls.status === "completed" ? "Selesai (Read-Only)" : cls.status}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900 text-base group-hover:text-indigo-600 transition">
                  {cls.name}
                </h3>
                <p className="text-xs text-indigo-600 font-semibold mt-0.5">{cls.subject}</p>
                <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">{cls.description}</p>
              </div>

              {/* Class Info Meta */}
              <div className="bg-slate-50 p-3 rounded-xl space-y-1.5 text-[11px] text-slate-600 border border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-400">Guru Pengampu:</span>
                  <span className="font-semibold text-slate-800">{cls.primaryTeacher}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Peserta:</span>
                  <span className="font-semibold text-slate-800">
                    {cls.enrolledStudentsCount} / {cls.maxCapacity} Murid
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Jadwal:</span>
                  <span className="font-semibold text-slate-800 truncate max-w-[160px]">{cls.schedule}</span>
                </div>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-1.5">
                <span className="text-[11px] text-slate-400 font-medium">Kode:</span>
                <code className="font-mono font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200 text-xs">
                  {cls.invitationCode}
                </code>
                <button
                  onClick={() => handleCopyCode(cls.invitationCode)}
                  title="Salin Kode Undangan"
                  className="p-1 hover:bg-slate-200 rounded text-slate-500 transition"
                >
                  {copiedCode === cls.invitationCode ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <button
                onClick={() => onSelectClass(cls.id)}
                className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center space-x-1"
              >
                <span>Buka Kelas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Buat Kelas Baru */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base">Buat Kelas Baru di Workspace</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600 text-sm">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Kelas *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Kalkulus & Aljabar SMA 10"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Mata Pelajaran</label>
                  <input
                    type="text"
                    placeholder="Contoh: Matematika"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Jenjang Pendidikan</label>
                  <select
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
                  >
                    <option value="SD Kelas 1-6">SD / MI</option>
                    <option value="SMP Kelas 7-9">SMP / MTs</option>
                    <option value="SMA Kelas 10">SMA Kelas 10</option>
                    <option value="SMA Kelas 11">SMA Kelas 11</option>
                    <option value="SMA Kelas 12">SMA Kelas 12</option>
                    <option value="Persiapan UTBK SNBT">Persiapan UTBK / SNBT</option>
                    <option value="Umum & Profesional">Umum & Profesional</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tipe Kelas</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
                  >
                    <option value="group">Kelompok (Group Class)</option>
                    <option value="private">Privat 1-on-1 (Private Class)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Kebijakan Pendaftaran</label>
                  <select
                    value={newPolicy}
                    onChange={(e) => setNewPolicy(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
                  >
                    <option value="instant_join">Instant Join (Kode Valid)</option>
                    <option value="approval_required">Approval Required (Persetujuan Guru)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Kapasitas Maksimal Murid</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={newCapacity}
                  onChange={(e) => setNewCapacity(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Deskripsi & Silabus Singkat</label>
                <textarea
                  rows={3}
                  placeholder="Jelaskan tujuan dan ruang lingkup materi pembelajaran..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition shadow-sm"
                >
                  Terbitkan Kelas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Gabung Kode Kelas (Untuk Murid) */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base">Gabung Kelas Melalui Kode</h3>
              <button onClick={() => setShowJoinModal(false)} className="text-slate-400 hover:text-slate-600 text-sm">
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Mintalah kode undangan unik dari gurumu untuk mendaftar langsung ke dalam kelas.
            </p>

            <form onSubmit={handleJoinSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Kode Undangan Kelas</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: LYORA-MAT10"
                  value={joinCodeInput}
                  onChange={(e) => setJoinCodeInput(e.target.value)}
                  className="w-full px-3 py-2.5 font-mono uppercase text-sm font-bold border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Tip Demo: Gunakan kode <code className="text-indigo-600 font-bold">LYORA-MAT10</code>
                </span>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowJoinModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl font-bold text-slate-700 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition shadow-sm"
                >
                  Gabung Sekarang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
