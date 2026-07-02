import { AppError } from "@/lib/errors/AppError";
import {
  isUserRole,
  ROLE_LABELS,
  USER_ROLES,
  type UserRole
} from "@/shared/types/role.types";

export function validateUserRole(value: unknown): UserRole | null {
  if (!isUserRole(value)) {
    return null;
  }

  return value;
}

export function assertUserRole(value: unknown): UserRole {
  const role = validateUserRole(value);

  if (!role) {
    throw AppError.forbidden("Geçerli bir kullanıcı rolü bulunamadı.");
  }

  return role;
}

export function isAdminRole(role: unknown): role is "admin" {
  return role === "admin";
}

export function isTeacherRole(role: unknown): role is "teacher" {
  return role === "teacher";
}

export function isStudentRole(role: unknown): role is "student" {
  return role === "student";
}

export function isParentRole(role: unknown): role is "parent" {
  return role === "parent";
}

export function isStaffRole(role: unknown): role is "teacher" | "admin" {
  return role === "teacher" || role === "admin";
}

export function roleMatches(role: UserRole, allowedRoles: UserRole[]): boolean {
  return allowedRoles.includes(role);
}

export function assertRole(role: UserRole, allowedRoles: UserRole[]): void {
  if (!roleMatches(role, allowedRoles)) {
    const allowedRoleLabels = allowedRoles
      .map((allowedRole) => ROLE_LABELS[allowedRole])
      .join(", ");

    throw AppError.forbidden(
      `Bu işlem için gerekli roller: ${allowedRoleLabels}.`
    );
  }
}

export function getDefaultRole(): UserRole {
  return "student";
}

export function getAvailableRoles(): UserRole[] {
  return [...USER_ROLES];
}

export function getRoleOptions() {
  return USER_ROLES.map((role) => ({
    label: ROLE_LABELS[role],
    value: role
  }));
}