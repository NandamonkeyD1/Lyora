"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  BookOpen,
  Video,
  FileText,
  AlertCircle,
} from "lucide-react";
import { AppRole, CalendarEvent } from "../../types/lyora";

interface CalendarViewProps {
  currentRole: AppRole;
  events: CalendarEvent[];
}

export default function CalendarView({ currentRole, events }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState("November 2026");

  return (
    <div className="space-y-6">
      {/* Calendar Header Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm">Kalender Akademik & Jadwal Kelas</h3>
          <p className="text-[11px] text-slate-500">Sinkronisasi jadwal belajar, tenggat tugas, ujian, dan tatap maya.</p>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-600">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-extrabold text-xs text-slate-800 px-3 py-1 bg-slate-50 rounded-lg border border-slate-200">
            {currentMonth}
          </span>
          <button className="p-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-600">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Events Agenda Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((ev) => {
          const isMeeting = ev.type === "meeting";
          const isAssignment = ev.type === "assignment";
          const isExam = ev.type === "exam";

          return (
            <div
              key={ev.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    isMeeting
                      ? "bg-rose-50 text-rose-700 border border-rose-200"
                      : isAssignment
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : isExam
                      ? "bg-violet-50 text-violet-700 border border-violet-200"
                      : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                  }`}
                >
                  {ev.type}
                </span>
                <span className="text-xs font-bold text-slate-400 font-mono">{ev.date}</span>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">{ev.title}</h4>
                <p className="text-xs text-indigo-600 font-semibold mt-0.5">{ev.className}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center space-x-1.5 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{ev.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
