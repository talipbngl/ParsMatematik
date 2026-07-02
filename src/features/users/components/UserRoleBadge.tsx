import type { UserRole } from "@/shared/types/role.types";
import { cn } from "@/shared/utils/cn";

import { getUserRoleLabel } from "../services/users.service";

type UserRoleBadgeProps = {
  role: UserRole;
  className?: string | undefined;
};

const roleClassNames: Record<UserRole, string> = {
  admin: "bg-rose-50 text-rose-700 ring-rose-200",
  teacher: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  student: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  parent: "bg-amber-50 text-amber-700 ring-amber-200"
};

export function UserRoleBadge({ role, className }: UserRoleBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset",
        roleClassNames[role],
        className
      )}
    >
      {getUserRoleLabel(role)}
    </span>
  );
}