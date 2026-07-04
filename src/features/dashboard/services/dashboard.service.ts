import { redirect } from "next/navigation"

import { getCurrentAuthProfile } from "@/features/auth/services/auth.service"
import type { UserRole } from "@/shared/types/role.types"

import type {
  DashboardNavGroup,
  DashboardUser
} from "../types/dashboard.types"

export async function getCurrentDashboardUser(): Promise<DashboardUser> {
  try {
    const profile = await getCurrentAuthProfile()

    if (!profile) {
      redirect("/auth/login")
    }

    if (!profile.isActive) {
      redirect("/auth/login")
    }

    return {
      id: profile.id,
      fullName: profile.fullName,
      email: profile.email,
      role: profile.role,
      avatarUrl: profile.avatarUrl
    }
  } catch {
    redirect("/auth/login")
  }
}

const adminNavGroups: DashboardNavGroup[] = [
  {
    title: "Admin",
    items: [
      {
        title: "Admin Paneli",
        href: "/dashboard/admin",
        icon: "dashboard"
      },
      {
        title: "Kullanıcılar",
        href: "/dashboard/admin/users",
        icon: "users"
      },
      {
        title: "Kurslar",
        href: "/dashboard/admin/courses",
        icon: "book"
      },
      {
        title: "Ödemeler",
        href: "/dashboard/admin/payments",
        icon: "credit-card"
      },
      {
        title: "Ayarlar",
        href: "/dashboard/admin/settings",
        icon: "settings"
      }
    ]
  }
]

const teacherNavGroups: DashboardNavGroup[] = [
  {
    title: "Öğretmen",
    items: [
      {
        title: "Öğretmen Paneli",
        href: "/dashboard/teacher",
        icon: "dashboard"
      },
      {
        title: "Kurslarım",
        href: "/dashboard/teacher/courses",
        icon: "book"
      },
      {
        title: "Canlı Dersler",
        href: "/dashboard/teacher/live-lessons",
        icon: "video"
      },
      {
        title: "Ödevler",
        href: "/dashboard/teacher/assignments",
        icon: "clipboard"
      },
      {
        title: "Sınavlar",
        href: "/dashboard/teacher/exams",
        icon: "file"
      },
      {
        title: "Öğrenciler",
        href: "/dashboard/teacher/students",
        icon: "graduation-cap"
      }
    ]
  }
]

const studentNavGroups: DashboardNavGroup[] = [
  {
    title: "Öğrenci",
    items: [
      {
        title: "Öğrenci Paneli",
        href: "/dashboard/student",
        icon: "dashboard"
      },
      {
        title: "Derslerim",
        href: "/dashboard/student/courses",
        icon: "book"
      },
      {
        title: "Canlı Dersler",
        href: "/dashboard/student/live-lessons",
        icon: "video"
      },
      {
        title: "Ödevler",
        href: "/dashboard/student/assignments",
        icon: "clipboard"
      },
      {
        title: "Sınavlar",
        href: "/dashboard/student/exams",
        icon: "file"
      },
      {
        title: "Profil",
        href: "/dashboard/student/profile",
        icon: "settings"
      }
    ]
  }
]

const parentNavGroups: DashboardNavGroup[] = [
  {
    title: "Veli",
    items: [
      {
        title: "Veli Paneli",
        href: "/dashboard/parent",
        icon: "dashboard",
        badge: "Sonra"
      }
    ]
  }
]

export function getDashboardNavGroups(role: UserRole): DashboardNavGroup[] {
  if (role === "admin") {
    return adminNavGroups
  }

  if (role === "teacher") {
    return teacherNavGroups
  }

  if (role === "parent") {
    return parentNavGroups
  }

  return studentNavGroups
}

export function getDashboardRoleLabel(role: UserRole): string {
  const labels: Record<UserRole, string> = {
    admin: "Admin",
    teacher: "Öğretmen",
    student: "Öğrenci",
    parent: "Veli"
  }

  return labels[role]
}

export function getDashboardHomePath(role: UserRole): string {
  const paths: Record<UserRole, string> = {
    admin: "/dashboard/admin",
    teacher: "/dashboard/teacher",
    student: "/dashboard/student",
    parent: "/dashboard/parent"
  }

  return paths[role]
}