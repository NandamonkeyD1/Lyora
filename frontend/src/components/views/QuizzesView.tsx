"use client";

import React, { useState, useEffect } from "react";
import {
  HelpCircle,
  Clock,
  Play,
  CheckCircle2,
  AlertCircle,
  Check,
  Award,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { AppRole, QuizItem, QuizQuestion } from "../../types/lyora";

interface QuizzesViewProps {
  currentRole: AppRole;
  quizzes: QuizItem[];
}

export default function QuizzesView({ currentRole, quizzes }: QuizzesViewProps) {
  const [activeQuiz, setActiveQuiz] = useState<QuizItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);

  // Timer countdown simulation
  useEffect(() => {
    let timer: any;
    if (isPlaying && timeLeft > 0 && !isSubmitted) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, isSubmitted]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartQuiz = (quiz: QuizItem) => {
    setActiveQuiz(quiz);
    setIsPlaying(true);
    setCurrentQIndex(0);
    setTimeLeft(quiz.durationMinutes * 60);
    setUserAnswers({});
    setIsSubmitted(false);
    setFinalScore(null);
  };

  const handleSelectAnswer = (qId: string, value: any, isMulti: boolean = false) => {
    if (isMulti) {
      const currentList: string[] = userAnswers[qId] || [];
      const updated = currentList.includes(value)
        ? currentList.filter((v) => v !== value)
        : [...currentList, value];
      setUserAnswers({ ...userAnswers, [qId]: updated });
    } else {
      setUserAnswers({ ...userAnswers, [qId]: value });
    }
  };

  const handleSubmitExam = () => {
    if (!confirm("Apakah Anda yakin ingin menyelesaikan ujian dan mengirim seluruh jawaban?")) {
      return;
    }

    setIsSubmitted(true);
    setIsPlaying(false);
    setFinalScore(90); // Calculated score simulation
  };

  return (
    <div className="space-y-6">
      {/* Quiz Playing Screen */}
      {isPlaying && activeQuiz ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden space-y-6 animate-in fade-in">
          {/* Exam Header */}
          <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                Computer-Based Test (CBT)
              </span>
              <h3 className="font-extrabold text-sm sm:text-base">{activeQuiz.title}</h3>
            </div>

            {/* Live Timer & Autosave Status */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-1.5 text-xs text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Autosave Aktif</span>
              </div>
              <div className="flex items-center space-x-2 bg-indigo-600/60 px-3.5 py-1.5 rounded-xl border border-indigo-400/30 text-white font-mono font-bold text-sm">
                <Clock className="w-4 h-4 text-indigo-300" />
                <span>{formatTimer(timeLeft)}</span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Question Display Area */}
            <div className="lg:col-span-8 space-y-6">
              {(() => {
                const question: QuizQuestion = activeQuiz.questions[currentQIndex];
                if (!question) return null;

                return (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="text-xs font-bold text-slate-500">
                        Soal Nomor {currentQIndex + 1} dari {activeQuiz.questions.length}
                      </span>
                      <span className="text-[11px] font-bold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full uppercase">
                        Tipe: {question.type.replace("_", " ")} ({question.points} Poin)
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                      {question.question}
                    </h4>

                    {/* Answer Controls Based on Question Type */}
                    {question.type === "multiple_choice" && (
                      <div className="space-y-2.5">
                        {question.options?.map((opt) => {
                          const isChecked = userAnswers[question.id] === opt.id;
                          return (
                            <div
                              key={opt.id}
                              onClick={() => handleSelectAnswer(question.id, opt.id)}
                              className={`p-4 rounded-xl border text-xs sm:text-sm font-semibold cursor-pointer transition flex items-center justify-between ${
                                isChecked
                                  ? "bg-indigo-50/70 border-indigo-600 text-indigo-900"
                                  : "border-slate-200 hover:bg-slate-50 text-slate-800"
                              }`}
                            >
                              <span>{opt.text}</span>
                              <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                  isChecked ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-300"
                                }`}
                              >
                                {isChecked && <Check className="w-3 h-3" />}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {question.type === "multiple_select" && (
                      <div className="space-y-2.5">
                        <p className="text-xs text-slate-400 italic">Pilihlah satu atau lebih pilihan yang benar:</p>
                        {question.options?.map((opt) => {
                          const selectedList: string[] = userAnswers[question.id] || [];
                          const isChecked = selectedList.includes(opt.id);
                          return (
                            <div
                              key={opt.id}
                              onClick={() => handleSelectAnswer(question.id, opt.id, true)}
                              className={`p-4 rounded-xl border text-xs sm:text-sm font-semibold cursor-pointer transition flex items-center justify-between ${
                                isChecked
                                  ? "bg-indigo-50/70 border-indigo-600 text-indigo-900"
                                  : "border-slate-200 hover:bg-slate-50 text-slate-800"
                              }`}
                            >
                              <span>{opt.text}</span>
                              <div
                                className={`w-4 h-4 rounded border flex items-center justify-center ${
                                  isChecked ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-300"
                                }`}
                              >
                                {isChecked && <Check className="w-3 h-3" />}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {question.type === "true_false" && (
                      <div className="grid grid-cols-2 gap-4">
                        {question.options?.map((opt) => {
                          const isChecked = userAnswers[question.id] === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => handleSelectAnswer(question.id, opt.id)}
                              className={`p-4 rounded-xl border text-sm font-bold text-center transition ${
                                isChecked
                                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                                  : "border-slate-200 hover:bg-slate-50 text-slate-700"
                              }`}
                            >
                              {opt.text}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {question.type === "short_answer" && (
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500">Ketikkan Jawaban Singkat:</label>
                        <input
                          type="text"
                          placeholder="Masukkan nilai atau kata kunci jawaban..."
                          value={userAnswers[question.id] || ""}
                          onChange={(e) => handleSelectAnswer(question.id, e.target.value)}
                          className="w-full px-4 py-3 text-sm font-bold border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                      </div>
                    )}

                    {question.type === "essay" && (
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500">Uraian Jawaban Lengkap:</label>
                        <textarea
                          rows={5}
                          placeholder="Tuliskan argumen atau penurunan rumus matematis..."
                          value={userAnswers[question.id] || ""}
                          onChange={(e) => handleSelectAnswer(question.id, e.target.value)}
                          className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none leading-relaxed"
                        />
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Navigation Prev / Next */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <button
                  type="button"
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex((prev) => prev - 1)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 disabled:opacity-40 rounded-xl text-xs font-bold flex items-center space-x-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>

                {currentQIndex < activeQuiz.questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentQIndex((prev) => prev + 1)}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1 shadow-sm"
                  >
                    <span>Selanjutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmitExam}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1 shadow-sm"
                  >
                    <span>Kirim & Selesaikan Ujian</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Question Navigator Palette */}
            <div className="lg:col-span-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <h5 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                Navigasi Nomor Soal
              </h5>
              <div className="grid grid-cols-5 gap-2">
                {activeQuiz.questions.map((q, idx) => {
                  const isAnswered = userAnswers[q.id] !== undefined;
                  const isCurrent = currentQIndex === idx;

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setCurrentQIndex(idx)}
                      className={`h-10 rounded-xl font-bold text-xs transition border ${
                        isCurrent
                          ? "ring-2 ring-indigo-600 bg-indigo-600 text-white border-transparent"
                          : isAnswered
                          ? "bg-emerald-100 text-emerald-800 border-emerald-300 font-extrabold"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-2 text-[11px] text-slate-500">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300" />
                  <span>Sudah Dijawab</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded bg-white border border-slate-200" />
                  <span>Belum Dijawab</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : isSubmitted ? (
        /* Result Screen */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 text-center space-y-6 max-w-lg mx-auto animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Ujian Berhasil Diselesaikan!</h3>
            <p className="text-xs text-slate-500 mt-1">Jawaban Anda telah tersimpan dan dinilai oleh sistem evaluasi otomatis.</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-2">
            <span className="text-xs text-slate-400 font-semibold uppercase">Nilai Perolehan Ujian</span>
            <div className="text-4xl font-black text-indigo-600">{finalScore} / 100</div>
            <span className="inline-block text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              Lulus (Ambang Batas: 75)
            </span>
          </div>

          <button
            onClick={() => {
              setIsSubmitted(false);
              setActiveQuiz(null);
            }}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
          >
            Kembali ke Daftar Ujian
          </button>
        </div>
      ) : (
        /* Quiz Catalog Screen */
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Bank Kuis & Jadwal Ujian</h3>
              <p className="text-[11px] text-slate-500">Evaluasi formatif dan sumatif dengan 5 format soal terstandar.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                      {quiz.totalQuestions} Butir Soal
                    </span>
                    <span className="text-xs font-bold text-slate-400 flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{quiz.durationMinutes} Menit</span>
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">{quiz.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{quiz.description}</p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl text-[11px] text-slate-600 space-y-1 border border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Passing Score:</span>
                    <span className="font-bold text-slate-800">{quiz.passingScore} Poin</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Batas Percobaan:</span>
                    <span className="font-bold text-slate-800">{quiz.maxAttempts} Kali</span>
                  </div>
                </div>

                <button
                  onClick={() => handleStartQuiz(quiz)}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-2 shadow-sm transition"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Mulai Ujian Sekarang</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
