"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Building2,
  Users,
  HardDrive,
  ClipboardList,
  AlertTriangle,
  CheckCircle2,
  Ban,
  Search,
} from "lucide-react";
import { WorkspaceItem, AuditLogEntry } from "../../types/lyora";

interface AdminConsoleViewProps {
  workspaces: WorkspaceItem[];
  auditLogs: AuditLogEntry[];
}

export default function AdminConsoleView({
  workspaces,
  auditLogs,
}: AdminConsoleViewProps) {
  const [activeTab, setActiveTab] = useState<"workspaces" | "audit">("workspaces");

  return (
    <div className="space-y-6">
      {/* System KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Total Workspaces Terdaftar</span>
          <div className="text-2xl font-black text-slate-900 mt-1">2 Tenant</div>
          <p className="text-[11px] text-slate-400 mt-0.5">1 Independent Tutor, 1 Institution</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Pengguna Aktif</span>
          <div className="text-2xl font-black text-slate-900 mt-1">173 Pengguna</div>
          <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Semua akun tervalidasi</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Storage S3 Terpakai</span>
          <div className="text-2xl font-black text-slate-900 mt-1">26.0 GB / 110 GB</div>
          <p className="text-[11px] text-slate-400 mt-0.5">23.6% Utilisasi</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Status Server & DB</span>
          <div className="text-sm font-black text-emerald-600 mt-1">MySQL 8.0+ / Reverb OK</div>
          <p className="text-[11px] text-slate-400 mt-0.5">37 Relasi skema sinkron</p>
        </div>
      </div>

      {/* View Switcher Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab("workspaces")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === "workspaces" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Daftar Workspace (Multi-Tenant)
        </button>
        <button
          onClick={() => setActiveTab("audit")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === "audit" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Audit Trail & Log Keamanan
        </button>
      </div>

      {/* Tab 1: Workspaces Table */}
      {activeTab === "workspaces" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h4 className="font-bold text-slate-900 text-sm">Manajemen Tenant Workspace</h4>
            <span className="text-xs text-slate-400">Total: {workspaces.length} Workspace</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-100 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Nama Workspace</th>
                  <th className="p-4">Tipe Arsitektur</th>
                  <th className="p-4">Kelas Aktif</th>
                  <th className="p-4">Total Murid</th>
                  <th className="p-4">Storage Terpakai</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {workspaces.map((ws) => (
                  <tr key={ws.id} className="hover:bg-slate-50/60 transition">
                    <td className="p-4 font-bold text-slate-900 flex items-center space-x-2">
                      <Building2 className="w-4 h-4 text-indigo-600" />
                      <span>{ws.name}</span>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                        {ws.type.replace("_", " ")}
                      </span>
                    </td>
                    <td className="p-4 font-semibold">{ws.classesCount} Kelas</td>
                    <td className="p-4 font-semibold">{ws.studentsCount} Murid</td>
                    <td className="p-4 font-semibold">{ws.storageUsed} / {ws.storageQuota}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => alert(`Suspensi/moderasi workspace: ${ws.name}`)}
                        className="px-3 py-1 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 rounded-lg text-[11px] font-bold text-slate-600 transition"
                      >
                        Moderasi
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Audit Logs Table */}
      {activeTab === "audit" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Security Audit Trail (Realtime Log)</h4>
              <p className="text-[11px] text-slate-500">Mencatat seluruh mutasi data sensitif platform.</p>
            </div>
            <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
              Logging Engine Aktif
            </span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <span className="text-slate-400 font-semibold">[{log.timestamp}] </span>
                  <span className="font-bold text-indigo-700">{log.action} </span>
                  <span className="text-slate-800">→ {log.target} </span>
                  <span className="text-slate-500">({log.details})</span>
                </div>
                <div className="text-slate-400 text-[10px] sm:text-right shrink-0">
                  User: {log.user} • IP: {log.ip}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
