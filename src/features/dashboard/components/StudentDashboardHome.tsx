import {
  BookOpen,
  CalendarDays,
  ClipboardList,
  FileText,
  PlayCircle,
  UserRound,
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
    title: "Aktif Ders",
    value: "3",
    description: "Kayıtlı olduğun dersler",
    icon: BookOpen,
    tone: "indigo",
  },
  {
    title: "Yaklaşan Canlı Ders",
    value: "2",
    description: "Bu hafta planlanan dersler",
    icon: CalendarDays,
    tone: "emerald",
  },
  {
    title: "Bekleyen Ödev",
    value: "4",
    description: "Teslim etmen gereken ödevler",
    icon: ClipboardList,
    tone: "amber",
  },
  {
    title: "Sınav",
    value: "2",
    description: "Çözmen gereken sınavlar",
    icon: FileText,
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
    title: "Derslerime Git",
    description: "Kayıtlı olduğun kursları görüntüle.",
    href: "/dashboard/student/courses",
    icon: BookOpen,
    tone: "indigo",
  },
  {
    title: "Canlı Derslere Git",
    description: "Yaklaşan canlı derslerini görüntüle.",
    href: "/dashboard/student/live-lessons",
    icon: PlayCircle,
    tone: "emerald",
  },
  {
    title: "Ödevlerini Kontrol Et",
    description: "Teslim tarihlerini ve geri bildirimleri gör.",
    href: "/dashboard/student/assignments",
    icon: ClipboardList,
    tone: "amber",
  },
  {
    title: "Profilini Aç",
    description: "Öğrenci profil bilgilerini kontrol et.",
    href: "/dashboard/student/profile",
    icon: UserRound,
    tone: "rose",
  },
] satisfies Array<{
  title: string
  description: string
  href: string
  icon: LucideIcon
  tone: DashboardActionCardProps["tone"]
}>

export function StudentDashboardHome() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Öğrenci Paneli"
        title="Derslerini, canlı derslerini ve ödevlerini buradan takip et."
        description="Parsmatematik öğrenci paneli; derslere katılman, ödevlerini takip etmen, sınavlarını çözmen ve profilini yönetmen için hazırlanıyor."
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
            Öğrencinin en sık kullanacağı alanlar.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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