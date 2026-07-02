import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GraduationCap, ShieldCheck, Users } from "lucide-react";

import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { ROUTES } from "@/shared/constants/routes";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Parsmatematik panel yönlendirme sayfası."
};

const dashboardCards = [
  {
    title: "Öğrenci Paneli",
    description:
      "Derslerini, canlı derslerini, ödevlerini ve sınavlarını takip et.",
    href: ROUTES.dashboard.student.index,
    icon: GraduationCap,
    badge: "Öğrenci"
  },
  {
    title: "Öğretmen Paneli",
    description:
      "Kurs oluştur, canlı ders planla, ödev ve sınav süreçlerini yönet.",
    href: ROUTES.dashboard.teacher.index,
    icon: Users,
    badge: "Öğretmen"
  },
  {
    title: "Admin Paneli",
    description:
      "Kullanıcıları, kursları, ödemeleri ve platform ayarlarını yönet.",
    href: ROUTES.dashboard.admin.index,
    icon: ShieldCheck,
    badge: "Admin"
  }
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border bg-white p-8 shadow-soft">
          <Badge variant="soft">Parsmatematik Panel</Badge>

          <h1 className="mt-5 text-4xl font-black tracking-tight text-foreground sm:text-5xl">
            Hangi panele gideceğini seç.
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
            Auth yönlendirmesini birazdan otomatik hale getireceğiz. Şimdilik
            geliştirme aşamasında paneller arasında hızlı geçiş için bu ekranı
            kullanıyoruz.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {dashboardCards.map((card) => (
            <Link key={card.href} href={card.href}>
              <Card hover className="h-full p-6">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                  <card.icon className="size-6" />
                </div>

                <Badge variant="outline" className="mt-5">
                  {card.badge}
                </Badge>

                <h2 className="mt-4 text-2xl font-black tracking-tight">
                  {card.title}
                </h2>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {card.description}
                </p>

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-black text-primary">
                  Panele git
                  <ArrowRight className="size-4" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}