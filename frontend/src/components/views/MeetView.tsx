"use client";

import React, { useState } from "react";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  MonitorUp,
  PhoneOff,
  Users,
  MessageSquare,
  ShieldAlert,
  Clock,
  PlusCircle,
  Sparkles,
} from "lucide-react";
import { AppRole, LiveMeeting } from "../../types/lyora";

interface MeetViewProps {
  currentRole: AppRole;
  meetings: LiveMeeting[];
}

export default function MeetView({ currentRole, meetings }: MeetViewProps) {
  const [inCall, setInCall] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [screenShare, setScreenShare] = useState(false);
  const [activeMeeting, setActiveMeeting] = useState<LiveMeeting | null>(meetings[0] || null);

  const handleJoinCall = (meeting: LiveMeeting) => {
    setActiveMeeting(meeting);
    setInCall(true);
  };

  const handleLeaveCall = () => {
    setInCall(false);
  };

  return (
    <div className="space-y-6">
      {/* Active Video Call Screen */}
      {inCall && activeMeeting ? (
        <div className="bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[650px] animate-in fade-in">
          {/* Room Bar */}
          <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-white shrink-0">
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
              <div>
                <h3 className="font-extrabold text-sm">{activeMeeting.title}</h3>
                <p className="text-[10px] text-slate-400 font-mono">
                  Room: {activeMeeting.roomName} • LiveKit Cloud WebRTC
                </p>
              </div>
            </div>

            {/* Capacity Enforcement Rule: Max 10 pax */}
            <div className="flex items-center space-x-2 bg-indigo-950/80 px-3 py-1.5 rounded-xl border border-indigo-700/40 text-indigo-300 text-xs font-semibold">
              <Users className="w-3.5 h-3.5" />
              <span>Kapasitas: 3 / 10 Peserta (Maks. 10 Sesuai Spek)</span>
            </div>
          </div>

          {/* Video Grid Simulation */}
          <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 overflow-y-auto">
            {/* Primary Host Video */}
            <div className="md:col-span-2 bg-slate-900 rounded-2xl relative overflow-hidden border border-slate-800 flex items-center justify-center min-h-[300px]">
              <div className="text-center space-y-2">
                <div className="w-20 h-20 rounded-full bg-indigo-600/30 text-indigo-400 font-extrabold text-2xl flex items-center justify-center mx-auto border-2 border-indigo-500/30">
                  BS
                </div>
                <p className="text-slate-200 text-sm font-bold">Budi Santoso, S.Pd. (Guru Pengampu)</p>
                <p className="text-slate-500 text-xs font-mono">1080p Adaptive Stream Aktif</p>
              </div>
              <span className="absolute bottom-3 left-3 bg-black/60 px-2.5 py-1 rounded-lg text-white text-xs font-semibold">
                Host • Mic Nyala
              </span>
            </div>

            {/* Side Student Feeds */}
            <div className="space-y-4 flex flex-col">
              <div className="flex-1 bg-slate-900 rounded-2xl relative overflow-hidden border border-slate-800 flex items-center justify-center min-h-[140px]">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-600/30 text-emerald-400 font-bold text-base flex items-center justify-center mx-auto">
                    DP
                  </div>
                  <p className="text-slate-200 text-xs font-semibold mt-1">Dimas Pratama</p>
                </div>
                <span className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[10px] text-white">
                  Murid • Presensi Hadir
                </span>
              </div>

              <div className="flex-1 bg-slate-900 rounded-2xl relative overflow-hidden border border-slate-800 flex items-center justify-center min-h-[140px]">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-sky-600/30 text-sky-400 font-bold text-base flex items-center justify-center mx-auto">
                    SR
                  </div>
                  <p className="text-slate-200 text-xs font-semibold mt-1">Siti Rahmawati</p>
                </div>
                <span className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[10px] text-white">
                  Murid • Presensi Hadir
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Floating Control Bar */}
          <div className="h-20 bg-slate-900 border-t border-slate-800 px-6 flex items-center justify-center space-x-3 shrink-0">
            <button
              onClick={() => setMicOn(!micOn)}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition ${
                micOn ? "bg-slate-800 text-white hover:bg-slate-700" : "bg-rose-600 text-white hover:bg-rose-700"
              }`}
              title={micOn ? "Matikan Mikrofon" : "Nyalakan Mikrofon"}
            >
              {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setVideoOn(!videoOn)}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition ${
                videoOn ? "bg-slate-800 text-white hover:bg-slate-700" : "bg-rose-600 text-white hover:bg-rose-700"
              }`}
              title={videoOn ? "Matikan Kamera" : "Nyalakan Kamera"}
            >
              {videoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setScreenShare(!screenShare)}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition ${
                screenShare ? "bg-indigo-600 text-white" : "bg-slate-800 text-white hover:bg-slate-700"
              }`}
              title="Bagi Layar (Screen Share)"
            >
              <MonitorUp className="w-5 h-5" />
            </button>

            <button
              onClick={handleLeaveCall}
              className="px-6 h-12 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center space-x-2 shadow-lg transition"
            >
              <PhoneOff className="w-5 h-5" />
              <span>Tinggalkan Sesi</span>
            </button>
          </div>
        </div>
      ) : (
        /* Meeting Schedule & Pre-Join Catalog */
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Virtual Classroom (LiveKit Cloud)</h3>
              <p className="text-[11px] text-slate-500">
                Tatap maya audio-video berkualitas tinggi dengan batas maksimal 10 peserta per kelas.
              </p>
            </div>
            {currentRole === "teacher" && (
              <button
                onClick={() => alert("Form penjadwalan sesi tatap maya baru.")}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 shadow-sm transition"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Jadwalkan Meet Baru</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {meetings.map((meet) => (
              <div
                key={meet.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {meet.className}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      Maksimal 10 Peserta
                    </span>
                  </div>

                  <h4 className="font-extrabold text-slate-900 text-base">{meet.title}</h4>
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{meet.scheduledTime}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl text-[11px] text-slate-600 space-y-1.5 border border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tuan Rumah (Host):</span>
                    <span className="font-semibold text-slate-800">{meet.hostName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Pencatatan Presensi:</span>
                    <span className="font-semibold text-emerald-600">Otomatis Tercatat ke MySQL</span>
                  </div>
                </div>

                <button
                  onClick={() => handleJoinCall(meet)}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-2 shadow-sm transition"
                >
                  <Video className="w-4 h-4" />
                  <span>Masuk Ruang Kelas Virtual (Join Room)</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
