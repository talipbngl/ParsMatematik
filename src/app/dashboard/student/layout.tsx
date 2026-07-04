import type { ReactNode } from "react"

import { requireRole } from "@/lib/auth/require-role"

type StudentDashboardLayoutProps = {
  children: ReactNode
}

export default async function StudentDashboardLayout({
  children
}: StudentDashboardLayoutProps) {
  await requireRole(["student"])

  return children
}