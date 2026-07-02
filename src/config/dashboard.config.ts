import {
  BarChart3,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  CreditCard,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Users,
  Video
} from "lucide-react";

import type { UserRole } from "@/shared/types/role.types";

export type DashboardNavigationItem = {
  title: string;
  href: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  description?: string;
};

export const dashboardNavigation: Record<UserRole, DashboardNavigationItem[]> = {
  student: [
    {
      title: "Panel",
      href: "/dashboard/student",
      icon: LayoutDashboard,
      description: "Genel öğrenci özeti"
    },
    {
      title: "Kurslarım",
      href: "/dashboard/student/courses",
      icon: BookOpen,
      description: "Kayıtlı olduğun kurslar"
    },
    {
      title: "Canlı Dersler",
      href: "/dashboard/student/live-lessons",
      icon: Video,
      description: "Yaklaşan canlı dersler"
    },
    {
      title: "Ödevler",
      href: "/dashboard/student/assignments",
      icon: ClipboardCheck,
      description: "Aktif ve teslim edilen ödevler"
    },
    {
      title: "Sınavlar",
      href: "/dashboard/student/exams",
      icon: FileText,
      description: "Online deneme ve quizler"
    }
  ],

  teacher: [
    {
      title: "Panel",
      href: "/dashboard/teacher",
      icon: LayoutDashboard,
      description: "Öğretmen özeti"
    },
    {
      title: "Kurslar",
      href: "/dashboard/teacher/courses",
      icon: BookOpen,
      description: "Kurs oluştur ve yönet"
    },
    {
      title: "Canlı Dersler",
      href: "/dashboard/teacher/live-lessons",
      icon: Video,
      description: "Canlı ders planla"
    },
    {
      title: "Ödevler",
      href: "/dashboard/teacher/assignments",
      icon: ClipboardCheck,
      description: "Ödev ver ve kontrol et"
    },
    {
      title: "Sınavlar",
      href: "/dashboard/teacher/exams",
      icon: FileText,
      description: "Sınav ve quiz oluştur"
    },
    {
      title: "Öğrenciler",
      href: "/dashboard/teacher/students",
      icon: GraduationCap,
      description: "Öğrenci ilerlemesini takip et"
    }
  ],

  parent: [
    {
      title: "Panel",
      href: "/dashboard/parent",
      icon: LayoutDashboard,
      description: "Veli takip paneli"
    },
    {
      title: "İlerleme",
      href: "/dashboard/parent/progress",
      icon: BarChart3,
      description: "Öğrenci performans özeti"
    },
    {
      title: "Ders Takvimi",
      href: "/dashboard/parent/calendar",
      icon: CalendarDays,
      description: "Yaklaşan dersler"
    }
  ],

  admin: [
    {
      title: "Panel",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
      description: "Platform genel özeti"
    },
    {
      title: "Kullanıcılar",
      href: "/dashboard/admin/users",
      icon: Users,
      description: "Öğrenci, öğretmen ve admin yönetimi"
    },
    {
      title: "Kurslar",
      href: "/dashboard/admin/courses",
      icon: BookOpen,
      description: "Tüm kursları yönet"
    },
    {
      title: "Ödemeler",
      href: "/dashboard/admin/payments",
      icon: CreditCard,
      description: "Manuel ödeme onayları"
    },
    {
      title: "Raporlar",
      href: "/dashboard/admin/reports",
      icon: BarChart3,
      description: "Platform performans raporları"
    },
    {
      title: "Ayarlar",
      href: "/dashboard/admin/settings",
      icon: Settings,
      description: "Platform ayarları"
    }
  ]
};