"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Pin,
  Lock,
  Send,
  CornerDownRight,
  ShieldCheck,
  PlusCircle,
} from "lucide-react";
import { AppRole, DiscussionThread } from "../../types/lyora";

interface DiscussionsViewProps {
  currentRole: AppRole;
  discussions: DiscussionThread[];
  onAddReply: (threadId: string, replyText: string) => void;
}

export default function DiscussionsView({
  currentRole,
  discussions,
  onAddReply,
}: DiscussionsViewProps) {
  const [selectedThread, setSelectedThread] = useState<DiscussionThread | null>(discussions[0] || null);
  const [replyInput, setReplyInput] = useState("");

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedThread || !replyInput.trim()) return;

    onAddReply(selectedThread.id, replyInput);
    setReplyInput("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Threads List */}
      <div className="lg:col-span-5 space-y-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">Forum Diskusi Kelas</h3>
            <p className="text-[11px] text-slate-500">Tanya jawab materi dan pembahasan tugas.</p>
          </div>
          <button
            onClick={() => alert("Form buat topik diskusi baru.")}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center space-x-1 shadow-sm transition"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Topik Baru</span>
          </button>
        </div>

        <div className="space-y-3">
          {discussions.map((thread) => {
            const isSelected = selectedThread?.id === thread.id;
            return (
              <div
                key={thread.id}
                onClick={() => setSelectedThread(thread)}
                className={`bg-white p-5 rounded-2xl border cursor-pointer transition shadow-sm space-y-2.5 ${
                  isSelected ? "border-indigo-600 ring-2 ring-indigo-500/10" : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {thread.isPinned && (
                      <span className="flex items-center space-x-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        <Pin className="w-3 h-3 fill-current" />
                        <span>Disematkan</span>
                      </span>
                    )}
                    <span className="text-[10px] font-semibold text-slate-400">{thread.createdAt}</span>
                  </div>
                  <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                    {thread.replies.length} Balasan
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm leading-snug">{thread.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2">{thread.content}</p>

                <div className="flex items-center space-x-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">{thread.authorName}</span>
                  <span>•</span>
                  <span className="capitalize">{thread.authorRole}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Discussion Thread Reader & Replies */}
      <div className="lg:col-span-7">
        {selectedThread ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6 flex flex-col justify-between min-h-[500px]">
            <div className="space-y-6">
              {/* Thread Header */}
              <div className="border-b border-slate-100 pb-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <img
                      src={selectedThread.authorAvatar}
                      alt={selectedThread.authorName}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold text-slate-900 text-xs">{selectedThread.authorName}</p>
                      <p className="text-[10px] text-slate-400">{selectedThread.authorRole} • {selectedThread.createdAt}</p>
                    </div>
                  </div>

                  {currentRole === "teacher" && (
                    <div className="flex items-center space-x-1 text-slate-400">
                      <button
                        onClick={() => alert("Moderasi: Sematkan topik diskusi.")}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500"
                        title="Sematkan Topik"
                      >
                        <Pin className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => alert("Moderasi: Kunci diskusi.")}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500"
                        title="Kunci Diskusi"
                      >
                        <Lock className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <h2 className="text-lg font-extrabold text-slate-900">{selectedThread.title}</h2>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                  {selectedThread.content}
                </div>
              </div>

              {/* Threaded Replies List */}
              <div className="space-y-3">
                <h5 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  Tanggapan Diskusi ({selectedThread.replies.length})
                </h5>

                <div className="space-y-3 pl-2 sm:pl-4 border-l-2 border-indigo-100">
                  {selectedThread.replies.map((rep) => (
                    <div key={rep.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{rep.authorName} ({rep.authorRole})</span>
                        <span className="text-[10px] text-slate-400">{rep.createdAt}</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{rep.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reply Input Form */}
            <form onSubmit={handleSendReply} className="pt-4 border-t border-slate-100 flex items-center space-x-2">
              <input
                type="text"
                placeholder="Tuliskan balasan diskusi atau pertanyaan tambahan..."
                value={replyInput}
                onChange={(e) => setReplyInput(e.target.value)}
                className="flex-1 px-4 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!replyInput.trim()}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-sm"
              >
                <span>Kirim</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-400">
            Pilih topik diskusi untuk melihat alur percakapan.
          </div>
        )}
      </div>
    </div>
  );
}
