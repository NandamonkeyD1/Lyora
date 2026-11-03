"use client";

import React from "react";
import {
  LayoutDashboard,
  Building2,
  BookOpen,
  FileText,
  HelpCircle,
  MessageSquare,
  Video,
  Calendar,
  Users,
  BarChart3,
  Settings,
  GraduationCap,
  Bell,
  UserCheck,
  Shield,
  Layers,
  ClipboardList,
  Clock,
  HeartHandshake,
  CheckCircle,
} from "lucide-react";
import { AppRole } from "../../types/lyora";

interface SidebarProps {
  currentRole: AppRole;
  currentTab: string;
  onSelectTab: (tab: string) => void;
  workspaceName: string;
}

export default function Sidebar({
  currentRole,
  currentTab,
  onSelectTab,
  workspaceName,
}: SidebarProps) {
  // Navigation menus configured strictly per section 10.3 of the specification
  const getNavItems = () => {
    switch (currentRole) {
      case "super_admin":
        return [
          { id: "dashboard", label: "Platform Dashboard", icon: LayoutDashboard },
          { id: "workspaces", label: "Workspaces", icon: Building2 },
          { id: "users", label: "Users Management", icon: Users },
          { id: "reports", label: "Global Reports", icon: BarChart3 },
          { id: "moderation", label: "Moderation", icon: Shield },
          { id: "audit_logs", label: "Audit Logs", icon: ClipboardList },
          { id: "monitoring", label: "System Monitoring", icon: Layers },
          { id: "settings", label: "Global Settings", icon: Settings },
        ];
      case "teacher":
        return [
          { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
          { id: "workspace", label: "Workspace Saya", icon: Building2 },
          { id: "classes", label: "Kelas Saya", icon: BookOpen },
          { id: "materials", label: "Materials", icon: Layers },
          { id: "assignments", label: "Assignments", icon: FileText },
          { id: "quizzes", label: "Quizzes / Exams", icon: HelpCircle },
          { id: "discussions", label: "Discussions", icon: MessageSquare },
          { id: "meet", label: "Meet (LiveKit)", icon: Video },
          { id: "calendar", label: "Calendar", icon: Calendar },
          { id: "students", label: "Students", icon: Users },
          { id: "reports", label: "Reports & Analytics", icon: BarChart3 },
          { id: "settings", label: "Settings", icon: Settings },
        ];
      case "student":
        return [
          { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
          { id: "classes", label: "My Classes", icon: BookOpen },
          { id: "materials", label: "Materials", icon: Layers },
          { id: "assignments", label: "Assignments", icon: FileText },
          { id: "quizzes", label: "Quizzes / Exams", icon: HelpCircle },
          { id: "discussions", label: "Discussions", icon: MessageSquare },
          { id: "meet", label: "Meet (Live)", icon: Video },
          { id: "calendar", label: "Calendar", icon: Calendar },
          { id: "grades", label: "Grades & Progress", icon: BarChart3 },
          { id: "profile", label: "My Profile", icon: UserCheck },
        ];
      case "parent":
        return [
          { id: "dashboard", label: "Child Dashboard", icon: LayoutDashboard },
          { id: "children", label: "Children (Anak)", icon: Users },
          { id: "schedule", label: "Schedule (Jadwal)", icon: Calendar },
          { id: "attendance", label: "Attendance (Presensi)", icon: Clock },
          { id: "assignments", label: "Assignments", icon: FileText },
          { id: "grades", label: "Grades (Nilai)", icon: BarChart3 },
          { id: "progress", label: "Learning Progress", icon: CheckCircle },
          { id: "notes", label: "Teacher Notes", icon: MessageSquare },
          { id: "profile", label: "Parent Profile", icon: HeartHandshake },
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800 selection:bg-indigo-600 selection:text-white">
      {/* Brand Header */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-base tracking-tight text-white">LYORA</span>
              <span className="text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                LMS
              </span>
            </div>
            <p className="text-[10px] text-slate-400 leading-none">by Solvia Nova</p>
          </div>
        </div>
      </div>

      {/* Active Workspace Pill */}
      <div className="px-4 py-3 bg-slate-950/60 border-b border-slate-800/80">
        <div className="flex items-center space-x-2 text-xs">
          <Building2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <div className="truncate">
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Workspace Aktif</p>
            <p className="font-semibold text-slate-200 truncate">{workspaceName}</p>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Menu Utama ({currentRole.replace("_", " ")})
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? "bg-indigo-600 text-white font-semibold shadow-sm shadow-indigo-600/30"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/70"
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 text-[11px] text-slate-400 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>v1.0.0 (MVP Online)</span>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">ID: LYR-26</span>
      </div>
    </aside>
  );
}
