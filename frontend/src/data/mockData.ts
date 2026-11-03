import {
  UserProfile,
  WorkspaceItem,
  ClassItem,
  MaterialItem,
  AssignmentItem,
  QuizItem,
  DiscussionThread,
  LiveMeeting,
  CalendarEvent,
  AuditLogEntry,
} from '../types/lyora';

export const mockUsers: Record<string, UserProfile> = {
  teacher: {
    id: 'usr-teach-01',
    name: 'Budi Santoso, S.Pd.',
    email: 'tutor@solvianova.com',
    phone: '+6281298765432',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'teacher',
    workspaceName: 'Privat Cerdas Solvia',
  },
  student: {
    id: 'usr-stud-01',
    name: 'Dimas Pratama',
    email: 'murid@solvianova.com',
    phone: '+6281311223344',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    role: 'student',
    workspaceName: 'Privat Cerdas Solvia',
  },
  parent: {
    id: 'usr-par-01',
    name: 'Hendra Pratama',
    email: 'orangtua@solvianova.com',
    phone: '+6281122334455',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'parent',
    workspaceName: 'Portal Wali Murid',
  },
  super_admin: {
    id: 'usr-admin-01',
    name: 'Solvia Nova Admin',
    email: 'admin@solvianova.com',
    phone: '+6281234567890',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    role: 'super_admin',
    workspaceName: 'Platform Central Console',
  },
};

export const mockWorkspaces: WorkspaceItem[] = [
  {
    id: 'ws-01',
    name: 'Privat Cerdas Solvia',
    type: 'independent_tutor',
    role: 'Guru Utama & Pemilik Workspace',
    classesCount: 3,
    studentsCount: 28,
    storageQuota: '10 GB',
    storageUsed: '1.2 GB',
  },
  {
    id: 'ws-02',
    name: 'Bimbel Prestasi Unggul',
    type: 'institution',
    role: 'Guru Mitra Pengampu Fisika',
    classesCount: 12,
    studentsCount: 145,
    storageQuota: '100 GB',
    storageUsed: '24.8 GB',
  },
];

export const mockClasses: ClassItem[] = [
  {
    id: 'cls-01',
    name: 'Kalkulus & Aljabar SMA 10',
    subject: 'Matematika Terapan',
    educationLevel: 'SMA Kelas 10',
    type: 'group',
    status: 'active',
    enrollmentPolicy: 'instant_join',
    invitationCode: 'LYORA-MAT10',
    primaryTeacher: 'Budi Santoso, S.Pd.',
    enrolledStudentsCount: 18,
    maxCapacity: 25,
    color: 'from-indigo-600 to-blue-500',
    description: 'Pembelajaran mendalam konsep limit, fungsi aljabar, turunan dasar, dan aplikasinya dalam pemecahan masalah sains.',
    schedule: 'Senin & Kamis, 16:00 - 17:30 WIB',
  },
  {
    id: 'cls-02',
    name: 'Fisika Mekanika & Termodinamika',
    subject: 'Fisika Lanjutan',
    educationLevel: 'SMA Kelas 11',
    type: 'group',
    status: 'active',
    enrollmentPolicy: 'approval_required',
    invitationCode: 'LYORA-FIS11',
    primaryTeacher: 'Budi Santoso, S.Pd.',
    coTeachers: ['Dr. Hendri Kusuma'],
    enrolledStudentsCount: 22,
    maxCapacity: 30,
    color: 'from-teal-600 to-emerald-500',
    description: 'Hukum Newton, usaha & energi, momentum impuls, dan pengantar termodinamika terapan untuk persiapan olimpiade.',
    schedule: 'Selasa & Jumat, 18:30 - 20:00 WIB',
  },
  {
    id: 'cls-03',
    name: 'Privat Persiapan UTBK SNBT Matematika',
    subject: 'Penalaran Matematika',
    educationLevel: 'SMA Kelas 12 / Alumni',
    type: 'private',
    status: 'active',
    enrollmentPolicy: 'approval_required',
    invitationCode: 'LYORA-SNBT26',
    primaryTeacher: 'Budi Santoso, S.Pd.',
    enrolledStudentsCount: 3,
    maxCapacity: 5,
    color: 'from-violet-600 to-purple-500',
    description: 'Intensif bedah soal penalaran kuantitatif, trik cepat, dan simulasi mingguan berbasis Computer-Based Test.',
    schedule: 'Sabtu, 09:00 - 11:30 WIB',
  },
  {
    id: 'cls-04',
    name: 'Dasar Pemrograman Web & Logika Komputasi',
    subject: 'Informatika',
    educationLevel: 'SMP / SMA',
    type: 'group',
    status: 'completed',
    enrollmentPolicy: 'instant_join',
    invitationCode: 'LYORA-CODE25',
    primaryTeacher: 'Budi Santoso, S.Pd.',
    enrolledStudentsCount: 15,
    maxCapacity: 20,
    color: 'from-amber-600 to-orange-500',
    description: 'Sesi semester lalu (Read-Only). Murid dapat membaca kembali rangkuman dan catatan proyek.',
    schedule: 'Semester Genap 2025 (Selesai)',
  },
  {
    id: 'cls-05',
    name: 'Olimpiade Sains Nasional — Aljabar Murni',
    subject: 'Matematika Kompetisi',
    educationLevel: 'SMA',
    type: 'group',
    status: 'draft',
    enrollmentPolicy: 'approval_required',
    invitationCode: 'LYORA-OSN26',
    primaryTeacher: 'Budi Santoso, S.Pd.',
    enrolledStudentsCount: 0,
    maxCapacity: 10,
    color: 'from-rose-600 to-pink-500',
    description: 'Draft silabus persiapan seleksi OSN tingkat kota dan provinsi. Belum dipublikasikan ke murid.',
    schedule: 'Akan Datang',
  },
];

export const mockMaterials: MaterialItem[] = [
  {
    id: 'mat-01',
    classId: 'cls-01',
    topicTitle: 'Bab 1: Konsep Dasar Fungsi & Pemetaan',
    title: 'Modul 01: Relasi, Fungsi Injektif, Surjektif & Bijektif',
    contentType: 'document',
    fileFormat: 'PDF (3.2 MB)',
    status: 'published',
    allowDownload: true,
    publishedAt: '28 Okt 2026',
    completedByStudent: true,
    textContent: `## Relasi dan Fungsi Matematika
Fungsi f dari himpunan A ke himpunan B adalah relasi khusus yang memasangkan setiap anggota himpunan A tepat satu anggota himpunan B.

### Jenis-Jenis Fungsi:
1. **Fungsi Satu-satu (Injektif):** Jika f(a) = f(b) mengakibatkan a = b.
2. **Fungsi Pada (Surjektif):** Setiap elemen di kodomain B memiliki prapeta di domain A.
3. **Fungsi Bijektif:** Memenuhi sifat injektif dan surjektif sekaligus, sehingga memiliki invers f⁻¹(x).

### Contoh Soal:
Tentukan apakah f(x) = 3x - 5 merupakan fungsi bijektif dari R ke R!
*Solusi:*
Karena f'(x) = 3 ≠ 0, fungsi monoton naik murni (injektif). Limit x menuju ±∞ bernilai ±∞ (surjektif). Maka terbukti f(x) adalah bijektif.`,
  },
  {
    id: 'mat-02',
    classId: 'cls-01',
    topicTitle: 'Bab 1: Konsep Dasar Fungsi & Pemetaan',
    title: 'Video Pembahasan: Membedah Domain dan Asimtot Fungsi Rasional',
    contentType: 'video',
    fileFormat: 'MP4 1080p (45 MB)',
    status: 'published',
    allowDownload: false,
    publishedAt: '30 Okt 2026',
    completedByStudent: true,
    textContent: 'Rekaman video penjelasan grafis mengenai asimtot tegak dan datar pada fungsi rasional f(x) = (ax + b) / (cx + d).',
  },
  {
    id: 'mat-03',
    classId: 'cls-01',
    topicTitle: 'Bab 2: Limit dan Kekontinuan Fungsi',
    title: 'Modul 02: Teorema Limit Trigonometri & L’Hôpital',
    contentType: 'document',
    fileFormat: 'PDF (2.8 MB)',
    status: 'published',
    allowDownload: true,
    publishedAt: '01 Nov 2026',
    completedByStudent: false,
    textContent: `## Limit Fungsi Aljabar dan Trigonometri
Definisi intuitif: limit f(x) ketika x mendekati c adalah nilai L yang dituju oleh f(x).

### Rumus Kunci Trigonometri:
- lim(x→0) [sin(x) / x] = 1
- lim(x→0) [tan(x) / x] = 1
- lim(x→0) [(1 - cos(x)) / x²] = 1/2`,
  },
  {
    id: 'mat-04',
    classId: 'cls-01',
    topicTitle: 'Bab 2: Limit dan Kekontinuan Fungsi',
    title: 'Tautan Interaktif: Visualisasi Geogebra Kurva Limit Tak Hingga',
    contentType: 'external_link',
    externalUrl: 'https://www.geogebra.org/calculator',
    status: 'published',
    allowDownload: false,
    publishedAt: '02 Nov 2026',
    completedByStudent: false,
    textContent: 'Aplikasi Geogebra interaktif untuk memutar dan mengamati kurva limit fungsi multivariabel.',
  },
];

export const mockAssignments: AssignmentItem[] = [
  {
    id: 'asg-01',
    classId: 'cls-01',
    title: 'Tugas 01: Analisis Domain, Range & Invers Fungsi',
    instructions: `Tentukan domain alami, range, dan fungsi invers f⁻¹(x) dari:
1. f(x) = sqrt(4x - 12)
2. g(x) = (2x + 5) / (x - 3)
3. Buktikan apakah h(x) = x³ + 2 memiliki fungsi invers!

*Petunjuk Pengumpulan:*
Tuliskan langkah pengerjaan rapi pada kertas/tablet, lalu unggah dalam format PDF atau foto beresolusi jelas. Tuliskan nama dan kelas di sudut kanan atas lembar jawaban.`,
    maxScore: 100,
    deadline: '2026-11-05 23:59 WIB',
    status: 'graded',
    allowLate: true,
    submissionCount: 18,
    totalStudents: 18,
    mySubmission: {
      submittedAt: '2026-11-02 19:45 WIB',
      fileName: 'Tugas01_DimasPratama_Kalkulus.pdf',
      version: 1,
      score: 95,
      feedback: 'Pekerjaan sangat rapi dan logis. Pemahaman konsep domain fungsi rasional pada nomor 2 sangat tepat. Pertahankan!',
      status: 'graded',
    },
  },
  {
    id: 'asg-02',
    classId: 'cls-01',
    title: 'Tugas 02: Evaluasi Limit Tak Tentu 0/0 & Tak Hingga',
    instructions: `Kerjakan soal pemecahan masalah berikut:
1. Hitung lim(x→0) [(1 - cos 4x) / (x sin 2x)] tanpa menggunakan dalil L'Hôpital.
2. Tentukan nilai konstanta a dan b agar fungsi f(x) kontinu di seluruh bilangan real.`,
    maxScore: 100,
    deadline: '2026-11-09 23:59 WIB',
    status: 'submitted',
    allowLate: false,
    submissionCount: 14,
    totalStudents: 18,
    mySubmission: {
      submittedAt: '2026-11-03 08:30 WIB',
      fileName: 'Tugas02_DimasPratama.pdf',
      version: 1,
      status: 'submitted',
    },
  },
  {
    id: 'asg-03',
    classId: 'cls-01',
    title: 'Tugas 03: Proyek Aplikasi Turunan dalam Optimasi Luas',
    instructions: 'Sebuah kawat sepanjang 100 meter akan dipotong menjadi dua bagian untuk membentuk persegi dan lingkaran. Tentukan potongan kawat agar jumlah luas minimum!',
    maxScore: 100,
    deadline: '2026-11-15 23:59 WIB',
    status: 'published',
    allowLate: true,
    submissionCount: 2,
    totalStudents: 18,
    mySubmission: {
      version: 0,
      status: 'in_progress',
    },
  },
];

export const mockQuizzes: QuizItem[] = [
  {
    id: 'qz-01',
    classId: 'cls-01',
    title: 'Kuis Evaluasi 01: Pemahaman Fungsi & Limit Aljabar',
    description: 'Kuis evaluasi formatif untuk mengukur kesiapan sebelum memasuki ujian tengah semester.',
    durationMinutes: 45,
    maxAttempts: 2,
    passingScore: 75,
    totalQuestions: 5,
    status: 'published',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        question: 'Jika f(x) = 2x - 3 dan g(x) = x² + 1, maka nilai dari (g ∘ f)(2) adalah...',
        points: 20,
        options: [
          { id: 'opt1', text: '1' },
          { id: 'opt2', text: '2', isCorrect: true },
          { id: 'opt3', text: '5' },
          { id: 'opt4', text: '10' },
        ],
        explanation: 'f(2) = 2(2) - 3 = 1. Maka g(f(2)) = g(1) = 1² + 1 = 2.',
      },
      {
        id: 'q2',
        type: 'true_false',
        question: 'Fungsi kuadrat f(x) = x² selalu memiliki fungsi invers pada domain seluruh bilangan real R.',
        points: 20,
        options: [
          { id: 'tf_t', text: 'Benar' },
          { id: 'tf_f', text: 'Salah', isCorrect: true },
        ],
        explanation: 'Salah, karena f(x) = x² tidak satu-satu (misal f(-2) = f(2) = 4), kecuali domainnya dibatasi x ≥ 0.',
      },
      {
        id: 'q3',
        type: 'multiple_select',
        question: 'Pilihlah seluruh pernyataan berikut yang BENAR mengenai fungsi f(x) = 1 / (x - 2):',
        points: 20,
        options: [
          { id: 'ms1', text: 'Domain fungsi adalah {x | x ≠ 2, x ∈ R}', isCorrect: true },
          { id: 'ms2', text: 'Memiliki asimtot tegak di garis x = 2', isCorrect: true },
          { id: 'ms3', text: 'Grafik memotong sumbu Y di titik (0, 0)' },
          { id: 'ms4', text: 'Memiliki asimtot datar di garis y = 0', isCorrect: true },
        ],
        explanation: 'Fungsi rasional tersebut memiliki pembagi x - 2, sehingga asimtot tegak x = 2 dan asimtot datar y = 0.',
      },
      {
        id: 'q4',
        type: 'short_answer',
        question: 'Berapakah nilai dari lim(x→3) [(x² - 9) / (x - 3)]?',
        points: 20,
        explanation: 'Faktorkan (x - 3)(x + 3) / (x - 3) = x + 3. Substitusi x = 3 menghasilkan 6.',
      },
      {
        id: 'q5',
        type: 'essay',
        question: 'Jelaskan syarat suatu fungsi dikatakan kontinu di titik x = c, dan berikan satu contoh fungsi yang tidak kontinu di x = 0!',
        points: 20,
        explanation: 'Syarat: 1. f(c) terdefinisi, 2. lim(x→c) f(x) ada, 3. lim(x→c) f(x) = f(c). Contoh tidak kontinu: f(x) = 1/x.',
      },
    ],
    userAttempt: {
      startedAt: '2026-11-01 14:00 WIB',
      completedAt: '2026-11-01 14:32 WIB',
      score: 90,
      passed: true,
      answers: {
        q1: 'opt2',
        q2: 'tf_f',
        q3: ['ms1', 'ms2', 'ms4'],
        q4: '6',
        q5: 'Syarat kontinuitas: f(c) ada, limit ada, dan keduanya sama...',
      },
    },
  },
];

export const mockDiscussions: DiscussionThread[] = [
  {
    id: 'disc-01',
    classId: 'cls-01',
    title: 'Diskusi Modul 01: Cara mudah menentukan domain fungsi irasional bertingkat',
    authorName: 'Dimas Pratama',
    authorRole: 'Murid',
    authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100',
    content: 'Pak Budi, untuk soal fungsi f(x) = sqrt( (x - 1) / (x + 3) ), apakah syarat penyebut x ≠ -3 harus selalu diuji terlebih dahulu pada garis bilangan?',
    isPinned: true,
    isLocked: false,
    createdAt: '31 Okt 2026, 19:20 WIB',
    replies: [
      {
        id: 'rep-01',
        authorName: 'Budi Santoso, S.Pd.',
        authorRole: 'Guru',
        content: 'Tepat sekali, Dimas! Syarat pembagi tidak boleh nol (x ≠ -3) adalah syarat mutlak. Titik x = -3 diberi bulatan kosong pada garis bilangan uji.',
        createdAt: '31 Okt 2026, 20:05 WIB',
      },
      {
        id: 'rep-02',
        authorName: 'Siti Rahmawati',
        authorRole: 'Murid',
        content: 'Terima kasih penjelasannya Pak! Kemarin saya sempat lupa memasang tanda kurung terbuka pada -3.',
        createdAt: '01 Nov 2026, 07:15 WIB',
      },
    ],
  },
  {
    id: 'disc-02',
    classId: 'cls-01',
    title: 'Jadwal Sesi Live Classroom (LiveKit) untuk Pembahasan Soal HOTS Hari Kamis',
    authorName: 'Budi Santoso, S.Pd.',
    authorRole: 'Guru',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    content: 'Halo teman-teman kelas Kalkulus. Hari Kamis pukul 16.00 WIB kita akan mengadakan tatap maya melalui tombol "Meet" di LYORA. Siapkan pertanyaan tugas ya!',
    isPinned: false,
    isLocked: false,
    createdAt: '02 Nov 2026, 10:00 WIB',
    replies: [
      {
        id: 'rep-03',
        authorName: 'Dimas Pratama',
        authorRole: 'Murid',
        content: 'Siap hadir tepat waktu Pak!',
        createdAt: '02 Nov 2026, 11:12 WIB',
      },
    ],
  },
];

export const mockMeetings: LiveMeeting[] = [
  {
    id: 'meet-01',
    classId: 'cls-01',
    className: 'Kalkulus & Aljabar SMA 10',
    title: 'Bedah Konsep & Latihan Soal Terapan Fungsi Turunan',
    roomName: 'lyora-mat10-session1',
    scheduledTime: 'Kamis, 05 Nov 2026 • 16:00 - 17:30 WIB',
    status: 'scheduled',
    maxParticipants: 10,
    hostName: 'Budi Santoso, S.Pd.',
    participants: [
      { name: 'Budi Santoso, S.Pd.', role: 'Guru (Host)', joinedAt: '-', attendance: 'present' },
      { name: 'Dimas Pratama', role: 'Murid', joinedAt: '-', attendance: 'present' },
      { name: 'Siti Rahmawati', role: 'Murid', joinedAt: '-', attendance: 'present' },
    ],
  },
];

export const mockCalendarEvents: CalendarEvent[] = [
  { id: 'ev-01', title: 'Kelas Kalkulus & Aljabar', type: 'class', date: '2026-11-05', time: '16:00 - 17:30 WIB', className: 'Kalkulus SMA 10' },
  { id: 'ev-02', title: 'Tenggat Tugas 01: Analisis Domain', type: 'assignment', date: '2026-11-05', time: '23:59 WIB', className: 'Kalkulus SMA 10' },
  { id: 'ev-03', title: 'Sesi LiveKit Meet Pembahasan HOTS', type: 'meeting', date: '2026-11-05', time: '16:00 WIB', className: 'Kalkulus SMA 10' },
  { id: 'ev-04', title: 'Kelas Fisika Mekanika', type: 'class', date: '2026-11-06', time: '18:30 - 20:00 WIB', className: 'Fisika SMA 11' },
  { id: 'ev-05', title: 'Tenggat Tugas 02: Limit Aljabar', type: 'assignment', date: '2026-11-09', time: '23:59 WIB', className: 'Kalkulus SMA 10' },
  { id: 'ev-06', title: 'Simulasi Tryout UTBK SNBT', type: 'exam', date: '2026-11-14', time: '09:00 - 11:30 WIB', className: 'SNBT Persiapan' },
];

export const mockAuditLogs: AuditLogEntry[] = [
  { id: 'log-01', timestamp: '2026-11-03 09:56:47', user: 'admin@solvianova.com', action: 'API_TEST_SUITE', target: 'Backend Verification', ip: '127.0.0.1', details: 'All 3 automated feature tests passed with 27 assertions.' },
  { id: 'log-02', timestamp: '2026-11-03 09:27:02', user: 'tutor@solvianova.com', action: 'CLASS_CREATED', target: 'Kalkulus & Aljabar SMA 10', ip: '127.0.0.1', details: 'Created class with Instant Join code LYORA-MAT10.' },
  { id: 'log-03', timestamp: '2026-11-03 09:27:02', user: 'murid@solvianova.com', action: 'ENROLLMENT_CONFIRMED', target: 'Kalkulus & Aljabar SMA 10', ip: '127.0.0.1', details: 'Student auto-enrolled with valid code.' },
  { id: 'log-04', timestamp: '2026-11-03 09:27:01', user: 'orangtua@solvianova.com', action: 'PARENT_LINK_VERIFIED', target: 'Child: Dimas Pratama', ip: '127.0.0.1', details: 'Verified parent relationship via token LYORA-PARENT-2026.' },
  { id: 'log-05', timestamp: '2026-11-03 09:26:07', user: 'system', action: 'DATABASE_MIGRATION', target: 'MySQL 37 Tables', ip: '127.0.0.1', details: 'All 37 relational tables and UUID indexes created.' },
];
