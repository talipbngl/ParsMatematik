import type { Metadata } from "next"
import { redirect } from "next/navigation"

import {
  getCurrentDashboardUser,
  getDashboardHomePath
} from "@/features/dashboard/services/dashboard.service"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Parsmatematik panel yönlendirme sayfası."
}

export default async function DashboardPage() {
  const user = await getCurrentDashboardUser()

  redirect(getDashboardHomePath(user.role))
}