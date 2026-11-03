"use client";

import React, { useState } from "react";
import {
  Layers,
  FileText,
  Video,
  ExternalLink,
  Download,
  CheckCircle2,
  PlusCircle,
  Eye,
  BookOpen,
  Lock,
} from "lucide-react";
import { AppRole, MaterialItem } from "../../types/lyora";

interface MaterialsViewProps {
  currentRole: AppRole;
  materials: MaterialItem[];
  onToggleComplete?: (id: string) => void;
  onAddMaterial?: (mat: Partial<MaterialItem>) => void;
}

export default function MaterialsView({
  currentRole,
  materials,
  onToggleComplete,
  onAddMaterial,
}: MaterialsViewProps) {
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialItem | null>(materials[0] || null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTopic, setNewTopic] = useState("Bab 1: Konsep Dasar Fungsi & Pemetaan");
  const [newType, setNewType] = useState<"document" | "video" | "text" | "external_link">("document");
  const [newContent, setNewContent] = useState("");

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    if (onAddMaterial) {
      onAddMaterial({
        title: newTitle,
        topicTitle: newTopic,
        contentType: newType,
        status: "published",
        publishedAt: "Hari ini",
        allowDownload: true,
        textContent: newContent || "Rangkuman materi pembelajaran baru.",
        fileFormat: newType === "document" ? "PDF (1.5 MB)" : newType === "video" ? "MP4 (30 MB)" : undefined,
      });
    }

    setShowUploadModal(false);
    setNewTitle("");
    setNewContent("");
  };

  // Group materials by topic
  const groupedTopics = materials.reduce((acc, item) => {
    if (!acc[item.topicTitle]) {
      acc[item.topicTitle] = [];
    }
    acc[item.topicTitle].push(item);
    return acc;
  }, {} as Record<string, MaterialItem[]>);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column: Topics & Materials Directory */}
      <div className="lg:col-span-5 space-y-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">Direktori Modul & Bab</h3>
            <p className="text-[11px] text-slate-500">Struktur materi pembelajaran terurut.</p>
          </div>
          {(currentRole === "teacher" || currentRole === "super_admin") && (
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center space-x-1 shadow-sm transition"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Unggah</span>
            </button>
          )}
        </div>

        <div className="space-y-4">
          {Object.entries(groupedTopics).map(([topic, items]) => (
            <div key={topic} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-800">{topic}</span>
                <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                  {items.length} Item
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {items.map((mat) => {
                  const isSelected = selectedMaterial?.id === mat.id;
                  return (
                    <div
                      key={mat.id}
                      onClick={() => setSelectedMaterial(mat)}
                      className={`p-4 flex items-center justify-between cursor-pointer transition ${
                        isSelected ? "bg-indigo-50/70 border-l-4 border-indigo-600" : "hover:bg-slate-50/80"
                      }`}
                    >
                      <div className="flex items-center space-x-3 truncate">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                            mat.contentType === "video"
                              ? "bg-rose-50 text-rose-600"
                              : mat.contentType === "external_link"
                              ? "bg-sky-50 text-sky-600"
                              : "bg-indigo-50 text-indigo-600"
                          }`}
                        >
                          {mat.contentType === "video" ? (
                            <Video className="w-4 h-4" />
                          ) : mat.contentType === "external_link" ? (
                            <ExternalLink className="w-4 h-4" />
                          ) : (
                            <FileText className="w-4 h-4" />
                          )}
                        </div>
                        <div className="truncate text-left">
                          <p className={`text-xs font-bold truncate ${isSelected ? "text-indigo-900" : "text-slate-800"}`}>
                            {mat.title}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {mat.fileFormat || mat.contentType.toUpperCase()} • Terbit: {mat.publishedAt}
                          </p>
                        </div>
                      </div>

                      {mat.completedByStudent && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Material Content Reader View */}
      <div className="lg:col-span-7">
        {selectedMaterial ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            {/* Header info */}
            <div className="border-b border-slate-100 pb-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {selectedMaterial.topicTitle}
                </span>
                <div className="flex items-center space-x-2">
                  {selectedMaterial.allowDownload ? (
                    <button
                      onClick={() => alert(`Mengunduh file: ${selectedMaterial.title}`)}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 transition"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Unduh File</span>
                    </button>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-400 flex items-center space-x-1">
                      <Lock className="w-3 h-3" />
                      <span>Unduh Dibatasi Guru</span>
                    </span>
                  )}
                </div>
              </div>

              <h2 className="text-xl font-extrabold text-slate-900">{selectedMaterial.title}</h2>
              <p className="text-xs text-slate-400">
                Format: <strong className="text-slate-700">{selectedMaterial.fileFormat || selectedMaterial.contentType}</strong> • Dipublikasikan pada {selectedMaterial.publishedAt}
              </p>
            </div>

            {/* Content Display */}
            {selectedMaterial.contentType === "external_link" ? (
              <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl space-y-4">
                <ExternalLink className="w-10 h-10 text-indigo-600 mx-auto" />
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Tautan Eksternal Interaktif</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                    Materi ini menautkan ke sumber belajar interaktif pihak ketiga yang telah divalidasi oleh pengajar.
                  </p>
                </div>
                <a
                  href={selectedMaterial.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition"
                >
                  <span>Buka di Tab Baru</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ) : selectedMaterial.contentType === "video" ? (
              <div className="space-y-4">
                <div className="aspect-video bg-slate-900 rounded-2xl flex items-center justify-center text-white relative overflow-hidden group">
                  <div className="w-16 h-16 rounded-full bg-indigo-600/90 group-hover:bg-indigo-600 flex items-center justify-center cursor-pointer shadow-lg transition">
                    <Video className="w-8 h-8 text-white ml-0.5" />
                  </div>
                  <span className="absolute bottom-4 left-4 text-xs font-mono bg-black/60 px-2 py-1 rounded text-slate-300">
                    MP4 1080p • 18:45 menit
                  </span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-600 leading-relaxed">
                  {selectedMaterial.textContent}
                </div>
              </div>
            ) : (
              <div className="prose prose-sm max-w-none text-slate-700 bg-slate-50 p-6 rounded-2xl border border-slate-100 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans">
                {selectedMaterial.textContent}
              </div>
            )}

            {/* Student Mark-as-completed button */}
            {currentRole === "student" && (
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Sudah selesai membaca dan memahami materi ini?</span>
                <button
                  onClick={() => onToggleComplete && onToggleComplete(selectedMaterial.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
                    selectedMaterial.completedByStudent
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{selectedMaterial.completedByStudent ? "Tandai Belum Selesai" : "Tandai Selesai Dibaca"}</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-400">
            Pilih salah satu modul di sebelah kiri untuk membaca konten pembelajaran.
          </div>
        )}
      </div>

      {/* Modal Unggah Materi */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base">Unggah Materi Pembelajaran Baru</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-600 text-sm">
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Judul Materi *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Modul 03: Turunan Fungsi Trigonometri"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Topik / Bab</label>
                  <select
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
                  >
                    <option value="Bab 1: Konsep Dasar Fungsi & Pemetaan">Bab 1: Konsep Dasar Fungsi</option>
                    <option value="Bab 2: Limit dan Kekontinuan Fungsi">Bab 2: Limit & Kekontinuan</option>
                    <option value="Bab 3: Turunan & Aplikasi Diferensial">Bab 3: Turunan Diferensial</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Format Konten</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
                  >
                    <option value="document">Dokumen (PDF, DOCX, PPT)</option>
                    <option value="video">Video Pembelajaran (MP4)</option>
                    <option value="text">Catatan Teks / Markdown</option>
                    <option value="external_link">Tautan Eksternal Web</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Isi Rangkuman / Deskripsi Materi</label>
                <textarea
                  rows={4}
                  placeholder="Tuliskan materi teks atau instruksi belajar..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl font-bold text-slate-700 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition shadow-sm"
                >
                  Terbitkan Materi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
