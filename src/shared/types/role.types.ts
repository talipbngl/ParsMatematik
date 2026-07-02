export const USER_ROLES = ["student", "teacher", "parent", "admin"] as const;

export type UserRole = (typeof USER_ROLES)[number];

export type RolePermission =
  | "dashboard:access"
  | "course:view"
  | "course:create"
  | "course:update"
  | "course:delete"
  | "lesson:view"
  | "lesson:create"
  | "lesson:update"
  | "lesson:delete"
  | "assignment:view"
  | "assignment:create"
  | "assignment:submit"
  | "assignment:grade"
  | "exam:view"
  | "exam:create"
  | "exam:solve"
  | "exam:grade"
  | "payment:view"
  | "payment:approve"
  | "user:view"
  | "user:create"
  | "user:update"
  | "user:delete"
  | "report:view"
  | "settings:update";

export const ROLE_LABELS: Record<UserRole, string> = {
  student: "Öğrenci",
  teacher: "Öğretmen",
  parent: "Veli",
  admin: "Admin"
};

export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  student: "Derslerini, ödevlerini, sınavlarını ve canlı derslerini takip eder.",
  teacher: "Kurs, canlı ders, ödev, sınav ve öğrenci takibi yapar.",
  parent: "Öğrencinin ders, ödev ve sınav gelişimini takip eder.",
  admin: "Platformdaki kullanıcıları, kursları, ödemeleri ve ayarları yönetir."
};

export const ROLE_DASHBOARD_PATHS: Record<UserRole, string> = {
  student: "/dashboard/student",
  teacher: "/dashboard/teacher",
  parent: "/dashboard/parent",
  admin: "/dashboard/admin"
};

export const ROLE_PERMISSIONS: Record<UserRole, RolePermission[]> = {
  student: [
    "dashboard:access",
    "course:view",
    "lesson:view",
    "assignment:view",
    "assignment:submit",
    "exam:view",
    "exam:solve",
    "payment:view"
  ],

  teacher: [
    "dashboard:access",
    "course:view",
    "course:create",
    "course:update",
    "lesson:view",
    "lesson:create",
    "lesson:update",
    "lesson:delete",
    "assignment:view",
    "assignment:create",
    "assignment:grade",
    "exam:view",
    "exam:create",
    "exam:grade",
    "user:view",
    "report:view"
  ],

  parent: ["dashboard:access", "course:view", "lesson:view", "report:view"],

  admin: [
    "dashboard:access",
    "course:view",
    "course:create",
    "course:update",
    "course:delete",
    "lesson:view",
    "lesson:create",
    "lesson:update",
    "lesson:delete",
    "assignment:view",
    "assignment:create",
    "assignment:grade",
    "exam:view",
    "exam:create",
    "exam:grade",
    "payment:view",
    "payment:approve",
    "user:view",
    "user:create",
    "user:update",
    "user:delete",
    "report:view",
    "settings:update"
  ]
};

export function isUserRole(value: unknown): value is UserRole {
  return typeof value === "string" && USER_ROLES.includes(value as UserRole);
}

export function getRoleLabel(role: UserRole): string {
  return ROLE_LABELS[role];
}

export function getRoleDescription(role: UserRole): string {
  return ROLE_DESCRIPTIONS[role];
}

export function getRoleDashboardPath(role: UserRole): string {
  return ROLE_DASHBOARD_PATHS[role];
}

export function roleHasPermission(
  role: UserRole,
  permission: RolePermission
): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}