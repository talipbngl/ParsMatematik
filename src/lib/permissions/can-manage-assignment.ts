import { AppError } from "@/lib/errors/AppError";
import { can } from "@/shared/constants/permissions";
import type { UserRole } from "@/shared/types/role.types";

export type AssignmentPermissionContext = {
  currentUserId: string;
  currentUserRole: UserRole;
  assignmentTeacherId?: string | null;
  assignmentStudentId?: string | null;
  courseTeacherId?: string | null;
};

export function canViewAssignment(
  context: AssignmentPermissionContext
): boolean {
  if (context.currentUserRole === "admin") {
    return true;
  }

  if (context.currentUserRole === "teacher") {
    return (
      context.assignmentTeacherId === context.currentUserId ||
      context.courseTeacherId === context.currentUserId
    );
  }

  if (context.currentUserRole === "student") {
    return context.assignmentStudentId === context.currentUserId;
  }

  if (context.currentUserRole === "parent") {
    return false;
  }

  return false;
}

export function canCreateAssignment(role: UserRole): boolean {
  return can(role, "assignment:create");
}

export function canUpdateAssignment(
  context: AssignmentPermissionContext
): boolean {
  if (context.currentUserRole === "admin") {
    return true;
  }

  if (!can(context.currentUserRole, "assignment:create")) {
    return false;
  }

  if (context.currentUserRole === "teacher") {
    return (
      context.assignmentTeacherId === context.currentUserId ||
      context.courseTeacherId === context.currentUserId
    );
  }

  return false;
}

export function canDeleteAssignment(
  context: AssignmentPermissionContext
): boolean {
  if (context.currentUserRole === "admin") {
    return true;
  }

  if (context.currentUserRole === "teacher") {
    return (
      context.assignmentTeacherId === context.currentUserId ||
      context.courseTeacherId === context.currentUserId
    );
  }

  return false;
}

export function canSubmitAssignment(
  context: AssignmentPermissionContext
): boolean {
  if (!can(context.currentUserRole, "assignment:submit")) {
    return false;
  }

  if (context.currentUserRole !== "student") {
    return false;
  }

  return context.assignmentStudentId === context.currentUserId;
}

export function canGradeAssignment(
  context: AssignmentPermissionContext
): boolean {
  if (context.currentUserRole === "admin") {
    return true;
  }

  if (!can(context.currentUserRole, "assignment:grade")) {
    return false;
  }

  if (context.currentUserRole === "teacher") {
    return (
      context.assignmentTeacherId === context.currentUserId ||
      context.courseTeacherId === context.currentUserId
    );
  }

  return false;
}

export function assertCanCreateAssignment(role: UserRole): void {
  if (!canCreateAssignment(role)) {
    throw AppError.forbidden("Ödev oluşturma yetkin yok.");
  }
}

export function assertCanSubmitAssignment(
  context: AssignmentPermissionContext
): void {
  if (!canSubmitAssignment(context)) {
    throw AppError.forbidden("Bu ödevi teslim etme yetkin yok.");
  }
}

export function assertCanGradeAssignment(
  context: AssignmentPermissionContext
): void {
  if (!canGradeAssignment(context)) {
    throw AppError.forbidden("Bu ödevi değerlendirme yetkin yok.");
  }
}