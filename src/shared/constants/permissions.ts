import {
  ROLE_LABELS,
  ROLE_PERMISSIONS,
  type RolePermission,
  type UserRole
} from "@/shared/types/role.types";

export type PermissionGroup =
  | "dashboard"
  | "course"
  | "lesson"
  | "assignment"
  | "exam"
  | "payment"
  | "user"
  | "report"
  | "settings";

export const PERMISSION_LABELS: Record<RolePermission, string> = {
  "dashboard:access": "Panele erişebilir",

  "course:view": "Kursları görüntüleyebilir",
  "course:create": "Kurs oluşturabilir",
  "course:update": "Kurs güncelleyebilir",
  "course:delete": "Kurs silebilir",

  "lesson:view": "Canlı dersleri görüntüleyebilir",
  "lesson:create": "Canlı ders oluşturabilir",
  "lesson:update": "Canlı ders güncelleyebilir",
  "lesson:delete": "Canlı ders silebilir",

  "assignment:view": "Ödevleri görüntüleyebilir",
  "assignment:create": "Ödev oluşturabilir",
  "assignment:submit": "Ödev teslim edebilir",
  "assignment:grade": "Ödev değerlendirebilir",

  "exam:view": "Sınavları görüntüleyebilir",
  "exam:create": "Sınav oluşturabilir",
  "exam:solve": "Sınav çözebilir",
  "exam:grade": "Sınav değerlendirebilir",

  "payment:view": "Ödemeleri görüntüleyebilir",
  "payment:approve": "Ödeme onaylayabilir",

  "user:view": "Kullanıcıları görüntüleyebilir",
  "user:create": "Kullanıcı oluşturabilir",
  "user:update": "Kullanıcı güncelleyebilir",
  "user:delete": "Kullanıcı silebilir",

  "report:view": "Raporları görüntüleyebilir",

  "settings:update": "Ayarları güncelleyebilir"
};

export const PERMISSION_GROUP_LABELS: Record<PermissionGroup, string> = {
  dashboard: "Panel",
  course: "Kurs",
  lesson: "Canlı Ders",
  assignment: "Ödev",
  exam: "Sınav",
  payment: "Ödeme",
  user: "Kullanıcı",
  report: "Rapor",
  settings: "Ayarlar"
};

export const PERMISSION_GROUPS: Record<PermissionGroup, RolePermission[]> = {
  dashboard: ["dashboard:access"],

  course: ["course:view", "course:create", "course:update", "course:delete"],

  lesson: ["lesson:view", "lesson:create", "lesson:update", "lesson:delete"],

  assignment: [
    "assignment:view",
    "assignment:create",
    "assignment:submit",
    "assignment:grade"
  ],

  exam: ["exam:view", "exam:create", "exam:solve", "exam:grade"],

  payment: ["payment:view", "payment:approve"],

  user: ["user:view", "user:create", "user:update", "user:delete"],

  report: ["report:view"],

  settings: ["settings:update"]
};

export function getPermissionLabel(permission: RolePermission): string {
  return PERMISSION_LABELS[permission];
}

export function getPermissionGroup(permission: RolePermission): PermissionGroup {
  const [group] = permission.split(":");

  if (
    group === "dashboard" ||
    group === "course" ||
    group === "lesson" ||
    group === "assignment" ||
    group === "exam" ||
    group === "payment" ||
    group === "user" ||
    group === "report" ||
    group === "settings"
  ) {
    return group;
  }

  return "dashboard";
}

export function can(role: UserRole, permission: RolePermission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}

export function canAny(
  role: UserRole,
  permissions: RolePermission[]
): boolean {
  return permissions.some((permission) => can(role, permission));
}

export function canAll(
  role: UserRole,
  permissions: RolePermission[]
): boolean {
  return permissions.every((permission) => can(role, permission));
}

export function getRolePermissions(role: UserRole): RolePermission[] {
  return ROLE_PERMISSIONS[role];
}

export function getRolePermissionSummary(role: UserRole): string {
  const roleLabel = ROLE_LABELS[role];
  const permissionCount = ROLE_PERMISSIONS[role].length;

  return `${roleLabel} rolü ${permissionCount} yetkiye sahiptir.`;
}

export function assertPermission(
  role: UserRole,
  permission: RolePermission
): void {
  if (!can(role, permission)) {
    throw new Error(
      `${ROLE_LABELS[role]} rolünün "${PERMISSION_LABELS[permission]}" yetkisi yok.`
    );
  }
}