import type { ReactNode } from "react"

import { requireRole } from "@/lib/auth/require-role"

type AdminDashboardLayoutProps = {
  children: ReactNode
}

export default async function AdminDashboardLayout({
  children
}: AdminDashboardLayoutProps) {
  await requireRole(["admin"])

  return children
}