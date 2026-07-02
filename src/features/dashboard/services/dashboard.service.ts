import { getCurrentAuthProfile } from "@/features/auth/services/auth.service";
import type { UserRole } from "@/shared/types/role.types";

import type {
  DashboardNavGroup,
  DashboardUser
} from "../types/dashboard.types";

type AuthProfileShape = {
  id?: string | undefined;
  userId?: string | undefined;
  email?: string | null | undefined;
  fullName?: string | null | undefined;
  full_name?: string | null | undefined;
  role?: UserRole | null | undefined;
  avatarUrl?: string | null | undefined;
  avatar_url?: string | null | undefined;
};

const fallbackDashboardUser: DashboardUser = {
  id: "dev-user",
  fullName: "Parsmatematik Admin",
  email: "admin@parsmatematik.com",
  role: "admin",
  avatarUrl: null
};

function normalizeDashboardUser(profile: AuthProfileShape): DashboardUser {
  return {
    id: profile.id ?? profile.userId ?? "unknown-user",
    fullName: profile.fullName ?? profile.full_name ?? "Parsmatematik Kullanıcı",
    email: profile.email ?? "kullanici@parsmatematik.com",
    role: profile.role ?? "student",
    avatarUrl: profile.avatarUrl ?? profile.avatar_url ?? null
  };
}

export async function getCurrentDashboardUser(): Promise<DashboardUser> {
  try {
    const profile = (await getCurrentAuthProfile()) as AuthProfileShape | null;

    if (!profile) {
      return fallbackDashboardUser;
    }

    return normalizeDashboardUser(profile);
  } catch {
    return fallbackDashboardUser;
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
];

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
];

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
];

const parentNavGroups: DashboardNavGroup[] = [
  {
    title: "Veli",
    items: [
      {
        title: "Veli Paneli",
        href: "/dashboard/parent",
        icon: "dashboard"
      }
    ]
  }
];

export function getDashboardNavGroups(role: UserRole): DashboardNavGroup[] {
  if (role === "admin") {
    return adminNavGroups;
  }

  if (role === "teacher") {
    return teacherNavGroups;
  }

  if (role === "parent") {
    return parentNavGroups;
  }

  return studentNavGroups;
}

export function getDashboardRoleLabel(role: UserRole): string {
  const labels: Record<UserRole, string> = {
    admin: "Admin",
    teacher: "Öğretmen",
    student: "Öğrenci",
    parent: "Veli"
  };

  return labels[role];
}

export function getDashboardHomePath(role: UserRole): string {
  const paths: Record<UserRole, string> = {
    admin: "/dashboard/admin",
    teacher: "/dashboard/teacher",
    student: "/dashboard/student",
    parent: "/dashboard/parent"
  };

  return paths[role];
}