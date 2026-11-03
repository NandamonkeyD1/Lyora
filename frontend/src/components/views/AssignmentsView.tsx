"use client";

import React, { useState } from "react";
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  UploadCloud,
  FileCheck,
  MessageSquare,
  Award,
  PlusCircle,
  Sparkles,
} from "lucide-react";
import { AppRole, AssignmentItem } from "../../types/lyora";

interface AssignmentsViewProps {
  currentRole: AppRole;
  assignments: AssignmentItem[];
  onSubmitAssignment: (assignmentId: string, fileName: string) => void;
  onGradeAssignment: (assignmentId: string, score: number, feedback: string) => void;
}

export default function AssignmentsView({
  currentRole,
  assignments,
  onSubmitAssignment,
  onGradeAssignment,
}: AssignmentsViewProps) {
  const [selectedAsg, setSelectedAsg] = useState<AssignmentItem | null>(assignments[0] || null);
  const [submissionFile, setSubmissionFile] = useState<string>("");
  const [gradeInput, setGradeInput] = useState<number>(95);
  const [feedbackInput, setFeedbackInput] = useState<string>("");
  const [showGradingModal, setShowGradingModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsg || !submissionFile) return;

    onSubmitAssignment(selectedAsg.id, submissionFile);
    setToastMsg("Tugas Anda berhasil diunggah dan disimpan ke server!");
    setSubmissionFile("");
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleGradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsg) return;

    onGradeAssignment(selectedAsg.id, gradeInput, feedbackInput);
    setShowGradingModal(false);
    setToastMsg(`Nilai ${gradeInput} dan feedback berhasil dikirim ke murid.`);
    setTimeout(() => setToastMsg(null), 4000);
  };

  return (
    <div className="space-y-6">
      {toastMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold">{toastMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Assignment List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Daftar Tugas & Evaluasi</h3>
              <p className="text-[11px] text-slate-500">Tenggat, bobot nilai, dan status penyerahan.</p>
            </div>
            {currentRole === "teacher" && (
              <button
                onClick={() => alert("Membuka form pembuatan tugas baru.")}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center space-x-1 shadow-sm transition"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Buat Tugas</span>
              </button>
            )}
          </div>

          <div className="space-y-3">
            {assignments.map((asg) => {
              const isSelected = selectedAsg?.id === asg.id;
              const isGraded = asg.status === "graded";
              const isSubmitted = asg.status === "submitted";

              return (
                <div
                  key={asg.id}
                  onClick={() => setSelectedAsg(asg)}
                  className={`bg-white p-5 rounded-2xl border cursor-pointer transition shadow-sm space-y-3 ${
                    isSelected ? "border-indigo-600 ring-2 ring-indigo-500/10" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                          isGraded
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : isSubmitted
                            ? "bg-sky-50 text-sky-700 border border-sky-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {isGraded ? "Sudah Dinilai" : isSubmitted ? "Diserahkan" : "Sedang Berlangsung"}
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-sm mt-1.5">{asg.title}</h4>
                    </div>

                    {asg.mySubmission?.score !== undefined && (
                      <div className="text-right">
                        <span className="text-base font-extrabold text-indigo-600">
                          {asg.mySubmission.score}
                        </span>
                        <span className="text-[10px] text-slate-400">/{asg.maxScore}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Tenggat: {asg.deadline}</span>
                    </span>
                    <span>
                      {asg.submissionCount}/{asg.totalStudents} Terkumpul
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Assignment View & Action Area */}
        <div className="lg:col-span-7">
          {selectedAsg ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              {/* Header */}
              <div className="border-b border-slate-100 pb-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                    Bobot Maksimal: {selectedAsg.maxScore} Poin
                  </span>
                  <span className="text-xs text-slate-400">Tenggat: {selectedAsg.deadline}</span>
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">{selectedAsg.title}</h2>
              </div>

              {/* Instructions */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Instruksi Soal</h4>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line font-sans">
                  {selectedAsg.instructions}
                </div>
              </div>

              {/* Student Action Area: Upload Submission */}
              {currentRole === "student" && (
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Pengumpulan Jawaban</h4>

                  {selectedAsg.mySubmission?.status === "graded" ? (
                    <div className="bg-emerald-50/70 border border-emerald-200 p-5 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-emerald-800">
                          <Award className="w-5 h-5 text-emerald-600" />
                          <span className="font-bold text-sm">Hasil Evaluasi Guru</span>
                        </div>
                        <div className="text-xl font-black text-emerald-700">
                          {selectedAsg.mySubmission.score} / {selectedAsg.maxScore}
                        </div>
                      </div>
                      <p className="text-xs text-slate-700 italic">
                        "{selectedAsg.mySubmission.feedback || "Pekerjaan diterima dan dinilai dengan baik."}"
                      </p>
                      <span className="text-[10px] text-slate-400 block">
                        Berkas terkirim: {selectedAsg.mySubmission.fileName} (Versi {selectedAsg.mySubmission.version})
                      </span>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-2xl p-6 text-center space-y-2 transition bg-slate-50/50">
                        <UploadCloud className="w-8 h-8 text-indigo-500 mx-auto" />
                        <p className="text-xs font-bold text-slate-800">Pilih Berkas Jawaban (PDF / Gambar / Dokumen)</p>
                        <p className="text-[11px] text-slate-400">Ukuran maksimal berkas 20 MB</p>
                        <input
                          type="text"
                          placeholder="Simulasi nama file: LembarJawaban_Dimas.pdf"
                          value={submissionFile}
                          onChange={(e) => setSubmissionFile(e.target.value)}
                          className="mt-2 w-full max-w-sm px-3 py-1.5 text-xs border border-slate-300 rounded-xl bg-white text-center"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={!submissionFile}
                        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-xl shadow-sm transition"
                      >
                        Kirimkan Tugas Saya
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* Teacher Action Area: Grade Student Submissions */}
              {currentRole === "teacher" && (
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                      Rekap Pengumpulan Murid ({selectedAsg.submissionCount}/{selectedAsg.totalStudents})
                    </h4>
                    <button
                      onClick={() => setShowGradingModal(true)}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition"
                    >
                      Beri Nilai & Masukan
                    </button>
                  </div>

                  <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 text-xs">
                    <div className="p-3.5 flex items-center justify-between bg-slate-50/50">
                      <div>
                        <p className="font-bold text-slate-800">Dimas Pratama</p>
                        <p className="text-[11px] text-slate-400">Terkumpul: 02 Nov 2026 • Versi 1</p>
                      </div>
                      <span className="font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 text-xs">
                        Nilai: 95 / 100
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-400">
              Pilih salah satu tugas untuk melihat rincian instruksi dan pengumpulan.
            </div>
          )}
        </div>
      </div>

      {/* Modal: Teacher Grading */}
      {showGradingModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base">Penilaian & Umpan Balik Tugas</h3>
              <button onClick={() => setShowGradingModal(false)} className="text-slate-400 hover:text-slate-600 text-sm">
                ✕
              </button>
            </div>

            <form onSubmit={handleGradeSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Skor Nilai (Maks. 100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  required
                  value={gradeInput}
                  onChange={(e) => setGradeInput(Number(e.target.value))}
                  className="w-full px-3 py-2 text-base font-extrabold text-indigo-600 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Umpan Balik Guru (Feedback)</label>
                <textarea
                  rows={4}
                  placeholder="Berikan masukan koreksi atau apresiasi..."
                  value={feedbackInput}
                  onChange={(e) => setFeedbackInput(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowGradingModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl font-bold text-slate-700 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition shadow-sm"
                >
                  Simpan Nilai & Publikasikan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
