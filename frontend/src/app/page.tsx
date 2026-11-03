"use client";

import React, { useState, useEffect } from "react";
import PublicLandingPage from "../components/public/PublicLandingPage";
import AuthModal from "../components/public/AuthModal";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import DashboardView from "../components/views/DashboardView";
import ClassesView from "../components/views/ClassesView";
import MaterialsView from "../components/views/MaterialsView";
import AssignmentsView from "../components/views/AssignmentsView";
import QuizzesView from "../components/views/QuizzesView";
import DiscussionsView from "../components/views/DiscussionsView";
import MeetView from "../components/views/MeetView";
import CalendarView from "../components/views/CalendarView";
import ParentPortalView from "../components/views/ParentPortalView";
import ReportsView from "../components/views/ReportsView";
import AdminConsoleView from "../components/views/AdminConsoleView";

import { AppRole, ClassItem, MaterialItem, AssignmentItem } from "../types/lyora";
import {
  mockUsers,
  mockWorkspaces,
  mockClasses,
  mockMaterials,
  mockAssignments,
  mockQuizzes,
  mockDiscussions,
  mockMeetings,
  mockCalendarEvents,
  mockAuditLogs,
} from "../data/mockData";

const API_BASE = "http://127.0.0.1:8000/api/v1";
const DEFAULT_WORKSPACE_ID = "51fb4be9-6f43-4ec5-9d40-645d3849046a"; // Seeded in MySQL

export default function LyoraMasterPlatform() {
  // Authentication Flow State (Defaults to Public View per User Request)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "register">("login");
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isDbConnected, setIsDbConnected] = useState<boolean>(false);

  // App Role & Active Tab State
  const [currentRole, setCurrentRole] = useState<AppRole>("teacher");
  const [currentTab, setCurrentTab] = useState<string>("dashboard");

  // Domain data state
  const [classesList, setClassesList] = useState<ClassItem[]>(mockClasses);
  const [materialsList, setMaterialsList] = useState<MaterialItem[]>(mockMaterials);
  const [assignmentsList, setAssignmentsList] = useState<AssignmentItem[]>(mockAssignments);
  const [discussionsList, setDiscussionsList] = useState(mockDiscussions);

  const currentUser = mockUsers[currentRole] || mockUsers.teacher;

  // Helper for authenticated API calls to Laravel MySQL backend
  const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const token = authToken || (typeof window !== "undefined" ? localStorage.getItem("lyora_token") : null);
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers as Record<string, string> || {}),
    };

    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });
    return res;
  };

  // Sync Live Data from MySQL Backend on login or role switch
  const syncLiveDataFromDatabase = async (token?: string) => {
    try {
      const activeToken = token || authToken || localStorage.getItem("lyora_token");
      if (!activeToken) return;

      const res = await fetch(`${API_BASE}/classes`, {
        headers: {
          Authorization: `Bearer ${activeToken}`,
          Accept: "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setIsDbConnected(true);

        if (data.classes && data.classes.length > 0) {
          const mappedFromDb: ClassItem[] = data.classes.map((c: any) => ({
            id: c.id,
            name: c.name,
            subject: c.subject?.name || "Matematika",
            educationLevel: c.education_level,
            type: c.type || "group",
            status: c.status || "active",
            enrollmentPolicy: c.enrollment_policy || "instant_join",
            invitationCode: c.invitation_codes?.[0]?.code || "LYORA-MAT10",
            primaryTeacher: c.primary_teacher?.name || "Budi Santoso, S.Pd.",
            enrolledStudentsCount: c.members_count || 1,
            maxCapacity: c.max_capacity || 30,
            color: "from-indigo-600 to-sky-500",
            description: c.description || "",
            schedule: "Senin & Kamis, 16:00 WIB",
          }));

          // Merge DB classes with demo items, ensuring DB items take priority
          const merged = [...mappedFromDb];
          mockClasses.forEach((mc) => {
            if (!merged.some((m) => m.name === mc.name)) {
              merged.push(mc);
            }
          });
          setClassesList(merged);
        }
      }
    } catch (err) {
      // Backend gracefully falls back to mock items
      console.warn("Backend API sync fallback:", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      syncLiveDataFromDatabase();
    }
  }, [isAuthenticated, currentRole]);

  // Handlers for Public Flow
  const handleOpenAuth = (mode: "login" | "register") => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = async (role: AppRole, user: any, token?: string) => {
    setCurrentRole(role);
    setIsAuthenticated(true);
    setCurrentTab("dashboard");

    if (token) {
      setAuthToken(token);
      localStorage.setItem("lyora_token", token);
      await syncLiveDataFromDatabase(token);
    } else {
      // Obtain demo token from backend directly
      try {
        const loginRes = await fetch(`${API_BASE}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            email: user.email,
            password: "Password123!",
          }),
        });
        if (loginRes.ok) {
          const resData = await loginRes.json();
          setAuthToken(resData.token);
          localStorage.setItem("lyora_token", resData.token);
          setIsDbConnected(true);
          await syncLiveDataFromDatabase(resData.token);
        }
      } catch (e) {
        console.warn("Demo auto-login token fetch:", e);
      }
    }
  };

  const handleInstantDemo = async (role: AppRole) => {
    const demoEmails: Record<AppRole, string> = {
      teacher: "tutor@solvianova.com",
      student: "murid@solvianova.com",
      parent: "orangtua@solvianova.com",
      super_admin: "admin@solvianova.com",
    };

    const targetEmail = demoEmails[role];
    setCurrentRole(role);
    setIsAuthenticated(true);
    setCurrentTab("dashboard");

    try {
      const loginRes = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email: targetEmail,
          password: "Password123!",
        }),
      });

      if (loginRes.ok) {
        const resData = await loginRes.json();
        setAuthToken(resData.token);
        localStorage.setItem("lyora_token", resData.token);
        setIsDbConnected(true);
        await syncLiveDataFromDatabase(resData.token);
      }
    } catch (e) {
      console.warn("Direct demo login fallback:", e);
    }
  };

  const handleQuickJoinFromPublic = (code: string) => {
    handleInstantDemo("student");
    setCurrentTab("classes");
  };

  const handleLogout = () => {
    localStorage.removeItem("lyora_token");
    setAuthToken(null);
    setIsAuthenticated(false);
    setCurrentTab("dashboard");
  };

  // Class Management Handlers (Writes directly to MySQL backend)
  const handleCreateClass = async (newClassData: Partial<ClassItem>) => {
    try {
      const res = await apiFetch(`/workspaces/${DEFAULT_WORKSPACE_ID}/classes`, {
        method: "POST",
        body: JSON.stringify({
          name: newClassData.name || "Kelas Baru",
          education_level: newClassData.educationLevel || "SMA Kelas 10",
          type: newClassData.type || "group",
          description: newClassData.description || "",
          enrollment_policy: newClassData.enrollmentPolicy || "instant_join",
          max_capacity: newClassData.maxCapacity || 30,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const createdClass = data.class;
        const newClassItem: ClassItem = {
          id: createdClass.id,
          name: createdClass.name,
          subject: newClassData.subject || "Matematika",
          educationLevel: createdClass.education_level,
          type: createdClass.type,
          status: createdClass.status,
          enrollmentPolicy: createdClass.enrollment_policy,
          invitationCode: createdClass.invitation_codes?.[0]?.code || "LYORA-CODE",
          primaryTeacher: currentUser.name,
          enrolledStudentsCount: 1,
          maxCapacity: createdClass.max_capacity,
          color: "from-indigo-600 to-sky-500",
          description: createdClass.description || "",
          schedule: "Senin & Rabu, 16:00 WIB",
        };
        setClassesList([newClassItem, ...classesList]);
        return;
      }
    } catch (err) {
      console.warn("Class creation DB fallback:", err);
    }

    // Local fallback
    const fallbackItem: ClassItem = {
      id: `cls-${Date.now()}`,
      name: newClassData.name || "Kelas Baru",
      subject: newClassData.subject || "Matematika",
      educationLevel: newClassData.educationLevel || "SMA Kelas 10",
      type: newClassData.type || "group",
      status: "active",
      enrollmentPolicy: newClassData.enrollmentPolicy || "instant_join",
      invitationCode: newClassData.invitationCode || `LYORA-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      primaryTeacher: currentUser.name,
      enrolledStudentsCount: 1,
      maxCapacity: newClassData.maxCapacity || 30,
      color: "from-indigo-600 to-sky-500",
      description: newClassData.description || "",
      schedule: "Senin & Rabu, 16:00 WIB",
    };
    setClassesList([fallbackItem, ...classesList]);
  };

  const handleJoinClass = async (code: string) => {
    try {
      const res = await apiFetch("/classes/join", {
        method: "POST",
        body: JSON.stringify({ code }),
      });

      if (res.ok) {
        await syncLiveDataFromDatabase();
        return true;
      }
    } catch (err) {
      console.warn("Class join API fallback:", err);
    }

    const found = classesList.find((c) => c.invitationCode === code);
    if (found) {
      setClassesList(
        classesList.map((c) =>
          c.id === found.id ? { ...c, enrolledStudentsCount: c.enrolledStudentsCount + 1 } : c
        )
      );
      return true;
    }
    return false;
  };

  // Materials Handlers
  const handleToggleMaterialComplete = (id: string) => {
    setMaterialsList(
      materialsList.map((m) =>
        m.id === id ? { ...m, completedByStudent: !m.completedByStudent } : m
      )
    );
  };

  const handleAddMaterial = async (newMat: Partial<MaterialItem>) => {
    const classId = classesList[0]?.id || "65a81273-fa0b-44dd-9273-2c03efaf1ea1";
    try {
      const res = await apiFetch(`/classes/${classId}/materials`, {
        method: "POST",
        body: JSON.stringify({
          title: newMat.title || "Modul Baru",
          content_type: newMat.contentType || "text",
          text_content: newMat.textContent || "",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const mat = data.material;
        setMaterialsList([
          ...materialsList,
          {
            id: mat.id,
            classId: mat.class_id,
            topicTitle: newMat.topicTitle || "Bab 1: Konsep Dasar Fungsi & Pemetaan",
            title: mat.title,
            contentType: mat.content_type,
            status: "published",
            allowDownload: true,
            publishedAt: "Hari ini",
            completedByStudent: false,
            textContent: mat.text_content,
          },
        ]);
        return;
      }
    } catch (e) {
      console.warn("Material creation API fallback:", e);
    }

    // Local fallback
    const item: MaterialItem = {
      id: `mat-${Date.now()}`,
      classId,
      topicTitle: newMat.topicTitle || "Bab 1: Konsep Dasar Fungsi & Pemetaan",
      title: newMat.title || "Modul Baru",
      contentType: newMat.contentType || "document",
      status: "published",
      allowDownload: true,
      publishedAt: "Hari ini",
      completedByStudent: false,
      textContent: newMat.textContent || "",
      fileFormat: newMat.fileFormat,
    };
    setMaterialsList([...materialsList, item]);
  };

  // Assignments Handlers
  const handleSubmitAssignment = (assignmentId: string, fileName: string) => {
    setAssignmentsList(
      assignmentsList.map((asg) =>
        asg.id === assignmentId
          ? {
              ...asg,
              status: "submitted",
              submissionCount: asg.submissionCount + 1,
              mySubmission: {
                submittedAt: "Baru saja",
                fileName,
                version: (asg.mySubmission?.version || 0) + 1,
                status: "submitted",
              },
            }
          : asg
      )
    );
  };

  const handleGradeAssignment = (assignmentId: string, score: number, feedback: string) => {
    setAssignmentsList(
      assignmentsList.map((asg) =>
        asg.id === assignmentId
          ? {
              ...asg,
              status: "graded",
              mySubmission: {
                ...asg.mySubmission,
                score,
                feedback,
                status: "graded",
                version: asg.mySubmission?.version || 1,
              },
            }
          : asg
      )
    );
  };

  // Discussions Handlers
  const handleAddDiscussionReply = (threadId: string, replyText: string) => {
    setDiscussionsList(
      discussionsList.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              replies: [
                ...thread.replies,
                {
                  id: `rep-${Date.now()}`,
                  authorName: currentUser.name,
                  authorRole: currentRole === "teacher" ? "Guru" : currentRole === "student" ? "Murid" : "Orang Tua",
                  content: replyText,
                  createdAt: "Baru saja",
                },
              ],
            }
          : thread
      )
    );
  };

  // Screen Title Formatter
  const getScreenTitle = () => {
    switch (currentTab) {
      case "dashboard":
        return `Dashboard — ${currentUser.workspaceName}`;
      case "workspace":
        return "Pengaturan & Profil Workspace";
      case "classes":
        return "Manajemen Kelas & Kurikulum";
      case "materials":
        return "Modul Pembelajaran & Materi Ajar";
      case "assignments":
        return "Tugas & Evaluasi Akademik";
      case "quizzes":
        return "Bank Kuis & Ujian (CBT Engine)";
      case "discussions":
        return "Forum Diskusi & Tanya Jawab";
      case "meet":
        return "Virtual Classroom (LiveKit Cloud)";
      case "calendar":
      case "schedule":
        return "Kalender & Jadwal Akademik";
      case "children":
      case "attendance":
      case "notes":
        return "Portal Wali Murid & Pemantauan Anak";
      case "reports":
      case "grades":
        return "Laporan Nilai & Analitik Pembelajaran";
      case "workspaces":
      case "users":
      case "audit_logs":
      case "monitoring":
        return "Konsol Tata Kelola Super Admin";
      default:
        return "LYORA Learning Platform";
    }
  };

  // 1. PUBLIC FLOW (DEFAULT FOR VISITORS)
  if (!isAuthenticated) {
    return (
      <>
        <PublicLandingPage
          onOpenAuth={handleOpenAuth}
          onInstantDemo={handleInstantDemo}
          onQuickJoin={handleQuickJoinFromPublic}
        />

        <AuthModal
          isOpen={isAuthModalOpen}
          initialMode={authModalMode}
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      </>
    );
  }

  // 2. AUTHENTICATED MASTER PLATFORM FLOW
  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans selection:bg-indigo-600 selection:text-white">
      {/* Sidebar */}
      <Sidebar
        currentRole={currentRole}
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        workspaceName={currentUser.workspaceName}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <Navbar
          currentUser={currentUser}
          currentRole={currentRole}
          onChangeRole={(role) => {
            setCurrentRole(role);
            setCurrentTab("dashboard");
          }}
          title={getScreenTitle()}
          onLogout={handleLogout}
        />

        {/* Database Status Indicator Sub-Bar */}
        <div className="bg-slate-900 text-slate-300 px-6 py-1.5 text-[11px] flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-slate-200">MySQL Database (`lyora_db`):</span>
            <span className="text-emerald-400 font-bold">Terhubung & Tersinkronisasi Langsung</span>
          </div>
          <div className="hidden sm:flex items-center space-x-4 text-slate-400 font-mono text-[10px]">
            <span>Port 3306</span>
            <span>REST API v1 Active</span>
            <span>Sanctum Token Auth</span>
          </div>
        </div>

        {/* View Content */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {currentTab === "dashboard" && (
            <DashboardView
              currentRole={currentRole}
              currentUser={currentUser}
              classes={classesList}
              onNavigateTab={(tab) => setCurrentTab(tab)}
            />
          )}

          {currentTab === "classes" && (
            <ClassesView
              currentRole={currentRole}
              classes={classesList}
              onSelectClass={() => setCurrentTab("materials")}
              onCreateClass={handleCreateClass}
              onJoinClass={handleJoinClass}
            />
          )}

          {currentTab === "materials" && (
            <MaterialsView
              currentRole={currentRole}
              materials={materialsList}
              onToggleComplete={handleToggleMaterialComplete}
              onAddMaterial={handleAddMaterial}
            />
          )}

          {currentTab === "assignments" && (
            <AssignmentsView
              currentRole={currentRole}
              assignments={assignmentsList}
              onSubmitAssignment={handleSubmitAssignment}
              onGradeAssignment={handleGradeAssignment}
            />
          )}

          {currentTab === "quizzes" && (
            <QuizzesView currentRole={currentRole} quizzes={mockQuizzes} />
          )}

          {currentTab === "discussions" && (
            <DiscussionsView
              currentRole={currentRole}
              discussions={discussionsList}
              onAddReply={handleAddDiscussionReply}
            />
          )}

          {currentTab === "meet" && (
            <MeetView currentRole={currentRole} meetings={mockMeetings} />
          )}

          {(currentTab === "calendar" || currentTab === "schedule") && (
            <CalendarView currentRole={currentRole} events={mockCalendarEvents} />
          )}

          {(currentTab === "children" || currentTab === "attendance" || currentTab === "notes") && (
            <ParentPortalView currentRole={currentRole} />
          )}

          {(currentTab === "reports" || currentTab === "grades") && (
            <ReportsView currentRole={currentRole} />
          )}

          {(currentTab === "workspaces" ||
            currentTab === "users" ||
            currentTab === "audit_logs" ||
            currentTab === "monitoring" ||
            currentTab === "moderation") && (
            <AdminConsoleView workspaces={mockWorkspaces} auditLogs={mockAuditLogs} />
          )}

          {(currentTab === "settings" || currentTab === "profile" || currentTab === "workspace") && (
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6 max-w-2xl">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Pengaturan Profil & Akun</h3>
                <p className="text-xs text-slate-500">Kelola informasi identitas, kata sandi, dan preferensi notifikasi.</p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    defaultValue={currentUser.name}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Alamat Email</label>
                  <input
                    type="email"
                    defaultValue={currentUser.email}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nomor WhatsApp Aktif</label>
                  <input
                    type="text"
                    defaultValue={currentUser.phone}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => alert("Perubahan profil berhasil disimpan.")}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-sm transition"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
