import type { UserRole } from "@/shared/types/role.types";

export type UserAccountStatus = "active" | "inactive" | "pending" | "suspended";

export type UserListItem = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  status: UserAccountStatus;
  phone?: string | null | undefined;
  avatarUrl?: string | null | undefined;
  createdAt: string;
};

export type UserProfileDetail = UserListItem & {
  school?: string | null | undefined;
  gradeLevel?: string | null | undefined;
  targetExam?: string | null | undefined;
  bio?: string | null | undefined;
};

export type CreateUserInput = {
  fullName: string;
  email: string;
  role: UserRole;
  phone?: string | undefined;
};

export type UpdateUserInput = {
  id: string;
  fullName?: string | undefined;
  email?: string | undefined;
  role?: UserRole | undefined;
  phone?: string | undefined;
  status?: UserAccountStatus | undefined;
};

export type UserStats = {
  totalUsers: number;
  adminCount: number;
  teacherCount: number;
  studentCount: number;
  parentCount: number;
  pendingCount: number;
};

export type UserRoleOption = {
  label: string;
  value: UserRole;
  description: string;
};