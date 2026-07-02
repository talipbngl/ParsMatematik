import {
  BookOpen,
  CreditCard,
  Settings,
  ShieldCheck,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react"

import { getUserStats } from "@/features/users/services/users.service"
import { PageHeader } from "@/shared/components/layout/PageHeader"
import {
  DashboardActionCard,
  type DashboardActionCardProps,
} from "@/shared/components/ui/DashboardActionCard"
import {
  DashboardStatCard,
  type DashboardStatCardProps,
} from "@/shared/components/ui/DashboardStatCard"

const quickActions = [
  {
    title: "Kullanıcıları Yönet",
    description: "Öğrenci, öğretmen ve admin hesaplarını düzenle.",
    href: "/dashboard/admin/users",
    icon: Users,
    tone: "indigo",
  },
  {
    title: "Kursları Yönet",
    description: "Kursları görüntüle ve yönet.",
    href: "/dashboard/admin/courses",
    icon: BookOpen,
    tone: "emerald",
  },
  {
    title: "Ödemeler",
    description: "Manuel ödeme takibini yönet.",
    href: "/dashboard/admin/payments",
    icon: CreditCard,
    tone: "amber",
  },
  {
    title: "Ayarlar",
    description: "Sistem ve site ayarlarını düzenle.",
    href: "/dashboard/admin/settings",
    icon: Settings,
    tone: "rose",
  },
] satisfies Array<{
  title: string
  description: string
  href: string
  icon: LucideIcon
  tone: DashboardActionCardProps["tone"]
}>

export async function AdminDashboardHome() {
  const userStats = await getUserStats()

  const stats = [
    {
      title: "Toplam Kullanıcı",
      value: String(userStats.totalUsers),
      description: "Admin, öğretmen ve öğrenciler",
      icon: Users,
      tone: "indigo",
    },
    {
      title: "Öğretmen",
      value: String(userStats.teacherCount),
      description: "Aktif öğretmen hesapları",
      icon: ShieldCheck,
      tone: "emerald",
    },
    {
      title: "Öğrenci",
      value: String(userStats.studentCount),
      description: "Kayıtlı öğrenci hesapları",
      icon: UserCheck,
      tone: "amber",
    },
    {
      title: "Bekleyen",
      value: String(userStats.pendingCount),
      description: "Onay bekleyen hesaplar",
      icon: CreditCard,
      tone: "rose",
    },
  ] satisfies Array<{
    title: string
    value: string
    description: string
    icon: LucideIcon
    tone: DashboardStatCardProps["tone"]
  }>

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Admin Paneli"
        title="Parsmatematik sistemini buradan yönet."
        description="Kullanıcı, kurs, ödeme ve sistem ayarlarını tek merkezden takip edebilirsin."
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
          <h2 className="text-xl font-black text-slate-950">
            Yönetim işlemleri
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Admin rolü için mevcut dosya yapındaki gerçek sayfalar.
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