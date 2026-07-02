import type { Metadata } from "next"
import {
  GraduationCap,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react"

import { PageHeader } from "@/shared/components/layout/PageHeader"
import {
  DashboardActionCard,
  type DashboardActionCardProps,
} from "@/shared/components/ui/DashboardActionCard"
import { ROUTES } from "@/shared/constants/routes"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Parsmatematik panel yönlendirme sayfası.",
}

const dashboardCards = [
  {
    title: "Öğrenci Paneli",
    description: "Derslerini, canlı derslerini, ödevlerini ve sınavlarını takip et.",
    href: ROUTES.dashboard.student.index,
    icon: GraduationCap,
    badge: "Öğrenci",
    tone: "indigo",
  },
  {
    title: "Öğretmen Paneli",
    description: "Kurs oluştur, canlı ders planla, ödev ve sınav süreçlerini yönet.",
    href: ROUTES.dashboard.teacher.index,
    icon: Users,
    badge: "Öğretmen",
    tone: "emerald",
  },
  {
    title: "Admin Paneli",
    description: "Kullanıcıları, kursları, ödemeleri ve platform ayarlarını yönet.",
    href: ROUTES.dashboard.admin.index,
    icon: ShieldCheck,
    badge: "Admin",
    tone: "rose",
  },
] satisfies Array<{
  title: string
  description: string
  href: string
  icon: LucideIcon
  badge: string
  tone: DashboardActionCardProps["tone"]
}>

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Parsmatematik Panel"
        title="Hangi panele gideceğini seç."
        description="Auth yönlendirmesini birazdan otomatik hale getireceğiz. Şimdilik geliştirme aşamasında paneller arasında hızlı geçiş için bu ekranı kullanıyoruz."
        variant="gradient"
      />

      <section className="grid gap-4 md:grid-cols-3">
        {dashboardCards.map((card) => (
          <DashboardActionCard
            key={card.href}
            title={card.title}
            description={card.description}
            href={card.href}
            icon={card.icon}
            badge={card.badge}
            tone={card.tone}
          />
        ))}
      </section>
    </div>
  )
}