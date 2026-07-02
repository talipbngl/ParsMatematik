import { AppError } from "@/lib/errors/AppError";
import { roleHasPermission, type UserRole } from "@/shared/types/role.types";
import { ROLE_DASHBOARD_PATHS } from "@/shared/types/role.types";

export type DashboardAccessResult = {
  canAccess: boolean;
  redirectTo: string;
  reason?: string;
};

export function canAccessDashboard(role: UserRole): boolean {
  return roleHasPermission(role, "dashboard:access");
}

export function getDashboardPathForRole(role: UserRole): string {
  return ROLE_DASHBOARD_PATHS[role];
}

export function getDashboardAccessResult(role: UserRole): DashboardAccessResult {
  if (!canAccessDashboard(role)) {
    return {
      canAccess: false,
      redirectTo: "/auth/login",
      reason: "Bu rolün panele erişim yetkisi yok."
    };
  }

  return {
    canAccess: true,
    redirectTo: getDashboardPathForRole(role)
  };
}

export function assertCanAccessDashboard(role: UserRole): void {
  if (!canAccessDashboard(role)) {
    throw AppError.forbidden("Panele erişim yetkin yok.");
  }
}

export function canAccessDashboardRoute(
  role: UserRole,
  pathname: string
): boolean {
  if (!canAccessDashboard(role)) {
    return false;
  }

  if (role === "admin") {
    return pathname.startsWith("/dashboard/admin");
  }

  if (role === "teacher") {
    return pathname.startsWith("/dashboard/teacher");
  }

  if (role === "student") {
    return pathname.startsWith("/dashboard/student");
  }

  if (role === "parent") {
    return pathname.startsWith("/dashboard/parent");
  }

  return false;
}

export function getSafeDashboardRedirect(role: UserRole, pathname: string) {
  if (canAccessDashboardRoute(role, pathname)) {
    return pathname;
  }

  return getDashboardPathForRole(role);
}