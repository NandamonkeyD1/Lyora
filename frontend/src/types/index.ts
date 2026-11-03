export type RoleType = 'super_admin' | 'teacher' | 'student' | 'parent';

export interface User {
  id: string;
  name: string;
  email: string;
  phone_number?: string;
  avatar_url?: string;
  is_super_admin: boolean;
  workspaces?: {
    workspace_id: string;
    name: string;
    slug: string;
    type: string;
    role: string;
    is_owner: boolean;
    permissions: string[];
  }[];
  children?: {
    student_id: string;
    name: string;
    email: string;
    relationship: string;
  }[];
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  type: 'independent_tutor' | 'institution';
  description?: string;
  storage_quota_bytes: number;
  storage_used_bytes: number;
  members_count?: number;
  classes_count?: number;
}

export interface LmsClass {
  id: string;
  workspace_id: string;
  name: string;
  education_level: string;
  type: 'private' | 'group';
  description?: string;
  enrollment_policy: 'instant_join' | 'approval_required';
  status: 'draft' | 'active' | 'completed' | 'archived';
  primary_teacher?: {
    id: string;
    name: string;
    email: string;
    phone_number?: string;
  };
  subject?: {
    name: string;
    color_hex: string;
  };
  members_count?: number;
  materials_count?: number;
  assignments_count?: number;
}

export interface Material {
  id: string;
  title: string;
  content_type: 'text' | 'document' | 'video' | 'external_link';
  text_content?: string;
  external_url?: string;
  topic?: {
    title: string;
  };
  author?: {
    name: string;
  };
}

export interface Assignment {
  id: string;
  title: string;
  instructions: string;
  max_score: number;
  deadline?: string;
  my_submission?: {
    id: string;
    status: string;
    score?: number;
    teacher_feedback?: string;
  };
}
