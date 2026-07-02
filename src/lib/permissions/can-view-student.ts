import { AppError } from "@/lib/errors/AppError";
import type { UserRole } from "@/shared/types/role.types";

export type StudentViewContext = {
  currentUserId: string;
  currentUserRole: UserRole;
  studentId: string;
  teacherStudentIds?: string[];
  parentStudentIds?: string[];
};

export function canViewStudent(context: StudentViewContext): boolean {
  if (context.currentUserRole === "admin") {
    return true;
  }

  if (context.currentUserRole === "student") {
    return context.currentUserId === context.studentId;
  }

  if (context.currentUserRole === "teacher") {
    return context.teacherStudentIds?.includes(context.studentId) ?? false;
  }

  if (context.currentUserRole === "parent") {
    return context.parentStudentIds?.includes(context.studentId) ?? false;
  }

  return false;
}

export function canViewStudentProgress(context: StudentViewContext): boolean {
  return canViewStudent(context);
}

export function canViewStudentAssignments(
  context: StudentViewContext
): boolean {
  return canViewStudent(context);
}

export function canViewStudentExamResults(
  context: StudentViewContext
): boolean {
  return canViewStudent(context);
}

export function canViewStudentPayments(context: StudentViewContext): boolean {
  if (context.currentUserRole === "admin") {
    return true;
  }

  if (context.currentUserRole === "parent") {
    return context.parentStudentIds?.includes(context.studentId) ?? false;
  }

  return false;
}

export function assertCanViewStudent(context: StudentViewContext): void {
  if (!canViewStudent(context)) {
    throw AppError.forbidden("Bu öğrencinin bilgilerini görüntüleme yetkin yok.");
  }
}

export function assertCanViewStudentPayments(
  context: StudentViewContext
): void {
  if (!canViewStudentPayments(context)) {
    throw AppError.forbidden(
      "Bu öğrencinin ödeme bilgilerini görüntüleme yetkin yok."
    );
  }
}