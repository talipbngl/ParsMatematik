import type { ReactNode } from "react"

import { requireRole } from "@/lib/auth/require-role"

type TeacherDashboardLayoutProps = {
  children: ReactNode
}

export default async function TeacherDashboardLayout({
  children
}: TeacherDashboardLayoutProps) {
  await requireRole(["teacher"])

  return children
}