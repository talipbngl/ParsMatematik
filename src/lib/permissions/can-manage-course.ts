import { AppError } from "@/lib/errors/AppError";
import { can } from "@/shared/constants/permissions";
import type { EntityStatus } from "@/shared/types/common.types";
import type { UserRole } from "@/shared/types/role.types";

export type CoursePermissionContext = {
  currentUserId: string;
  currentUserRole: UserRole;
  courseTeacherId?: string | null;
  courseStatus?: EntityStatus;
};

export function canViewCourse(context: CoursePermissionContext): boolean {
  if (can(context.currentUserRole, "course:view")) {
    return true;
  }

  return false;
}

export function canCreateCourse(role: UserRole): boolean {
  return can(role, "course:create");
}

export function canUpdateCourse(context: CoursePermissionContext): boolean {
  if (can(context.currentUserRole, "course:update")) {
    if (context.currentUserRole === "admin") {
      return true;
    }

    if (context.currentUserRole === "teacher") {
      return context.courseTeacherId === context.currentUserId;
    }
  }

  return false;
}

export function canDeleteCourse(context: CoursePermissionContext): boolean {
  if (context.currentUserRole === "admin" && can(context.currentUserRole, "course:delete")) {
    return true;
  }

  return false;
}

export function canArchiveCourse(context: CoursePermissionContext): boolean {
  if (context.currentUserRole === "admin") {
    return true;
  }

  if (context.currentUserRole === "teacher") {
    return context.courseTeacherId === context.currentUserId;
  }

  return false;
}

export function canPublishCourse(context: CoursePermissionContext): boolean {
  if (context.currentUserRole === "admin") {
    return true;
  }

  if (context.currentUserRole === "teacher") {
    return context.courseTeacherId === context.currentUserId;
  }

  return false;
}

export function canManageCourseMaterials(
  context: CoursePermissionContext
): boolean {
  if (context.currentUserRole === "admin") {
    return true;
  }

  if (context.currentUserRole === "teacher") {
    return context.courseTeacherId === context.currentUserId;
  }

  return false;
}

export function assertCanCreateCourse(role: UserRole): void {
  if (!canCreateCourse(role)) {
    throw AppError.forbidden("Kurs oluşturma yetkin yok.");
  }
}

export function assertCanUpdateCourse(context: CoursePermissionContext): void {
  if (!canUpdateCourse(context)) {
    throw AppError.forbidden("Bu kursu güncelleme yetkin yok.");
  }
}

export function assertCanDeleteCourse(context: CoursePermissionContext): void {
  if (!canDeleteCourse(context)) {
    throw AppError.forbidden("Bu kursu silme yetkin yok.");
  }
}

export function assertCanManageCourseMaterials(
  context: CoursePermissionContext
): void {
  if (!canManageCourseMaterials(context)) {
    throw AppError.forbidden("Bu kursun materyallerini yönetme yetkin yok.");
  }
}