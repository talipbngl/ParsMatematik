import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import type { UserRole } from "@/shared/types/role.types"
import { getRoleDashboardPath } from "@/shared/types/role.types"

export async function getCurrentProfile() {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect("/auth/login")
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, is_active")
    .eq("id", user.id)
    .single()

  if (profileError || !profile) {
    redirect("/auth/login")
  }

  if (!profile.is_active) {
    redirect("/auth/login")
  }

  return profile
}

export async function requireRole(allowedRoles: UserRole[]) {
  const profile = await getCurrentProfile()
  const role = profile.role as UserRole

  if (!allowedRoles.includes(role)) {
    redirect(getRoleDashboardPath(role))
  }

  return profile
}