import { redirect } from "next/navigation"

import { getCurrentAuthProfile } from "@/features/auth/services/auth.service"
import { getRoleDashboardPath } from "@/shared/types/role.types"
import type { UserRole } from "@/shared/types/role.types"

export async function requireDashboardRole(
  allowedRoles: UserRole[],
) {
  const profile = await getCurrentAuthProfile()

  if (!profile) {
    redirect("/auth/login")
  }

  if (!allowedRoles.includes(profile.role)) {
    redirect(getRoleDashboardPath(profile.role))
  }

  return profile
}