export type AppRole = 'super_admin' | 'teacher' | 'student' | 'parent';

export type ClassStatus = 'draft' | 'active' | 'completed' | 'archived';
export type EnrollmentPolicy = 'instant_join' | 'approval_required';
export type EnrollmentStatus = 'pending' | 'active' | 'rejected' | 'left' | 'removed' | 'completed';

export type QuestionType = 'multiple_choice' | 'multiple_select' | 'true_false' | 'short_answer' | 'essay';

export type AssignmentStatus = 'draft' | 'published' | 'in_progress' | 'submitted' | 'late' | 'missing' | 'graded' | 'returned_for_revision' | 'resubmitted';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: AppRole;
  workspaceName: string;
}

export interface WorkspaceItem {
  id: string;
  name: string;
  type: 'independent_tutor' | 'institution';
  role: string;
  classesCount: number;
  studentsCount: number;
  storageQuota: string;
  storageUsed: string;
}

export interface ClassItem {
  id: string;
  name: string;
  subject: string;
  educationLevel: string;
  type: 'private' | 'group';
  status: ClassStatus;
  enrollmentPolicy: EnrollmentPolicy;
  invitationCode: string;
  primaryTeacher: string;
  coTeachers?: string[];
  enrolledStudentsCount: number;
  maxCapacity: number;
  color: string;
  description: string;
  schedule: string;
}

export interface MaterialItem {
  id: string;
  classId: string;
  topicTitle: string;
  title: string;
  contentType: 'text' | 'document' | 'video' | 'external_link';
  fileFormat?: string;
  fileSize?: string;
  textContent?: string;
  externalUrl?: string;
  status: 'published' | 'draft' | 'scheduled';
  allowDownload: boolean;
  publishedAt: string;
  completedByStudent?: boolean;
}

export interface AssignmentItem {
  id: string;
  classId: string;
  title: string;
  instructions: string;
  maxScore: number;
  deadline: string;
  status: AssignmentStatus;
  allowLate: boolean;
  submissionCount: number;
  totalStudents: number;
  mySubmission?: {
    submittedAt?: string;
    text?: string;
    fileName?: string;
    version: number;
    score?: number;
    feedback?: string;
    status: AssignmentStatus;
  };
}

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  points: number;
  options?: { id: string; text: string; isCorrect?: boolean }[];
  explanation?: string;
}

export interface QuizItem {
  id: string;
  classId: string;
  title: string;
  description: string;
  durationMinutes: number;
  maxAttempts: number;
  passingScore: number;
  totalQuestions: number;
  status: 'published' | 'draft' | 'archived';
  questions: QuizQuestion[];
  userAttempt?: {
    startedAt: string;
    completedAt?: string;
    score?: number;
    passed?: boolean;
    answers: Record<string, any>;
  };
}

export interface DiscussionThread {
  id: string;
  classId: string;
  title: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  content: string;
  isPinned: boolean;
  isLocked: boolean;
  createdAt: string;
  replies: {
    id: string;
    authorName: string;
    authorRole: string;
    content: string;
    createdAt: string;
  }[];
}

export interface LiveMeeting {
  id: string;
  classId: string;
  className: string;
  title: string;
  roomName: string;
  scheduledTime: string;
  status: 'scheduled' | 'in_progress' | 'completed';
  maxParticipants: 10;
  hostName: string;
  participants: {
    name: string;
    role: string;
    joinedAt: string;
    attendance: 'present' | 'late' | 'absent';
  }[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  type: 'class' | 'meeting' | 'assignment' | 'exam';
  time: string;
  date: string;
  className: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  target: string;
  ip: string;
  details: string;
}
