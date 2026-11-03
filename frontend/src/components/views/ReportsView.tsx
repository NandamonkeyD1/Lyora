"use client";

import React from "react";
import {
  BarChart3,
  Download,
  FileSpreadsheet,
  FileText,
  TrendingUp,
  Users,
  Award,
  CheckCircle2,
} from "lucide-react";
import { AppRole } from "../../types/lyora";

interface ReportsViewProps {
  currentRole: AppRole;
}

export default function ReportsView({ currentRole }: ReportsViewProps) {
  const handleExport = (format: string) => {
    alert(`Mengekspor laporan akademik format: ${format.toUpperCase()} (Tersimpan ke folder Unduhan)`);
  };

  return (
    <div className="space-y-6">
      {/* Header & Export Controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm">Laporan Akademik & Analitik Pembelajaran</h3>
          <p className="text-[11px] text-slate-500">Rekapitulasi nilai, persentase kehadiran, dan progres kurikulum.</p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleExport("pdf")}
            className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Ekspor PDF</span>
          </button>
          <button
            onClick={() => handleExport("excel")}
            className="px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Ekspor Excel</span>
          </button>
          <button
            onClick={() => handleExport("csv")}
            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor CSV</span>
          </button>
        </div>
      </div>

      {/* Analytics Visual Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h4 className="font-bold text-slate-900 text-sm">Distribusi Nilai Siswa (Kalkulus & Aljabar)</h4>
          <div className="space-y-3 pt-2">
            {[
              { grade: "A (Nilai 90 - 100)", count: 8, percentage: 44, color: "bg-emerald-500" },
              { grade: "B (Nilai 80 - 89)", count: 7, percentage: 39, color: "bg-indigo-500" },
              { grade: "C (Nilai 70 - 79)", count: 2, percentage: 11, color: "bg-amber-500" },
              { grade: "D / Remedial (< 70)", count: 1, percentage: 6, color: "bg-rose-500" },
            ].map((row) => (
              <div key={row.grade} className="space-y-1 text-xs">
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>{row.grade}</span>
                  <span>{row.count} Siswa ({row.percentage}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${row.color}`} style={{ width: `${row.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h4 className="font-bold text-slate-900 text-sm">Tingkat Ketuntasan Tugas & Evaluasi</h4>
          <div className="space-y-3 pt-2">
            {[
              { item: "Tugas 01: Analisis Domain", rate: "100%", count: "18 / 18 Murid", color: "bg-emerald-500" },
              { item: "Tugas 02: Limit Aljabar", rate: "78%", count: "14 / 18 Murid", color: "bg-sky-500" },
              { item: "Kuis 01: Pemahaman Fungsi", rate: "94%", count: "17 / 18 Murid", color: "bg-indigo-500" },
              { item: "Presensi Tatap Maya Meet", rate: "98%", count: "Rata-rata 17.6 Murid", color: "bg-violet-500" },
            ].map((row) => (
              <div key={row.item} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-800">{row.item}</p>
                  <p className="text-[11px] text-slate-400">{row.count}</p>
                </div>
                <span className="font-extrabold text-sm text-indigo-600">{row.rate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
