import type { Session, User } from "@supabase/supabase-js";

import type { UserRole } from "@/shared/types/role.types";

export type AuthMode = "login" | "register" | "forgot-password";

export type LoginFormValues = {
  email: string;
  password: string;
};

export type RegisterFormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
};

export type ForgotPasswordFormValues = {
  email: string;
};

export type AuthProfile = {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl: string | null;
  phone: string | null;
  bio: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AuthUser = {
  user: User;
  session: Session | null;
  profile: AuthProfile | null;
};

export type AuthActionData = {
  redirectTo?: string;
  userId?: string;
  email?: string;
  role?: UserRole;
};

export type AuthErrorState = {
  message: string;
  fieldErrors?: Partial<Record<keyof RegisterFormValues | keyof LoginFormValues, string[]>>;
};

export type AuthProvider = "email";

export type RegisterRoleOption = {
  label: string;
  value: UserRole;
  description: string;
};

export type AuthRedirectReason =
  | "login-required"
  | "role-mismatch"
  | "session-expired"
  | "already-authenticated";

export type AuthSessionStatus =
  | "authenticated"
  | "unauthenticated"
  | "loading";