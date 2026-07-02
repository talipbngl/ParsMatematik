import {
  BookOpen,
  CalendarPlus,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Users,
  type LucideIcon,
} from "lucide-react"

import { PageHeader } from "@/shared/components/layout/PageHeader"
import {
  DashboardActionCard,
  type DashboardActionCardProps,
} from "@/shared/components/ui/DashboardActionCard"
import {
  DashboardStatCard,
  type DashboardStatCardProps,
} from "@/shared/components/ui/DashboardStatCard"

const stats = [
  {
    title: "Aktif Kurs",
    value: "5",
    description: "Yönettiğin kurslar",
    icon: BookOpen,
    tone: "indigo",
  },
  {
    title: "Öğrenci",
    value: "42",
    description: "Kurslarına kayıtlı öğrenciler",
    icon: Users,
    tone: "emerald",
  },
  {
    title: "Bu Hafta Ders",
    value: "8",
    description: "Planlanan canlı dersler",
    icon: CalendarPlus,
    tone: "amber",
  },
  {
    title: "Bekleyen Teslim",
    value: "13",
    description: "İncelenecek ödevler",
    icon: ClipboardCheck,
    tone: "rose",
  },
] satisfies Array<{
  title: string
  value: string
  description: string
  icon: LucideIcon
  tone: DashboardStatCardProps["tone"]
}>

const quickActions = [
  {
    title: "Kurslarım",
    description: "Sana atanmış kursları görüntüle.",
    href: "/dashboard/teacher/courses",
    icon: BookOpen,
    tone: "indigo",
  },
  {
    title: "Canlı Ders Oluştur",
    description: "Kursa bağlı yeni bir canlı ders planla.",
    href: "/dashboard/teacher/live-lessons/new",
    icon: CalendarPlus,
    tone: "emerald",
  },
  {
    title: "Ödev Oluştur",
    description: "Öğrencilere yeni ödev ver.",
    href: "/dashboard/teacher/assignments/new",
    icon: ClipboardCheck,
    tone: "amber",
  },
  {
    title: "Sınav Oluştur",
    description: "Yeni sınav veya quiz hazırla.",
    href: "/dashboard/teacher/exams/new",
    icon: FileText,
    tone: "rose",
  },
  {
    title: "Öğrenciler",
    description: "Öğrenci listesini ve ilerlemeyi gör.",
    href: "/dashboard/teacher/students",
    icon: GraduationCap,
    tone: "slate",
  },
] satisfies Array<{
  title: string
  description: string
  href: string
  icon: LucideIcon
  tone: DashboardActionCardProps["tone"]
}>

export function TeacherDashboardHome() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Öğretmen Paneli"
        title="Derslerini, öğrencilerini ve içeriklerini tek panelden yönet."
        description="Öğretmen paneli; kurs, canlı ders, ödev, sınav ve öğrenci yönetimi için geliştiriliyor."
        variant="gradient"
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <DashboardStatCard
            key={item.title}
            title={item.title}
            value={item.value}
            description={item.description}
            icon={item.icon}
            tone={item.tone}
          />
        ))}
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-black text-slate-950">Hızlı işlemler</h2>
          <p className="mt-1 text-sm text-slate-500">
            Öğretmenin en sık kullanacağı gerçek route bağlantıları.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {quickActions.map((item) => (
            <DashboardActionCard
              key={item.href}
              title={item.title}
              description={item.description}
              href={item.href}
              icon={item.icon}
              tone={item.tone}
            />
          ))}
        </div>
      </section>
    </div>
  )
}