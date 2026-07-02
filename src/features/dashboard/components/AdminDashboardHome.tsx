import Link from "next/link";
import {
  BookOpen,
  CreditCard,
  Settings,
  ShieldCheck,
  Users
} from "lucide-react";

import { getUserStats } from "@/features/users/services/users.service";

const quickActions = [
  {
    title: "Kullanıcıları Yönet",
    description: "Öğrenci, öğretmen ve admin hesaplarını düzenle.",
    href: "/dashboard/admin/users",
    icon: Users
  },
  {
    title: "Kursları Yönet",
    description: "Kursları görüntüle ve yönet.",
    href: "/dashboard/admin/courses",
    icon: BookOpen
  },
  {
    title: "Ödemeler",
    description: "Manuel ödeme takibini yönet.",
    href: "/dashboard/admin/payments",
    icon: CreditCard
  },
  {
    title: "Ayarlar",
    description: "Sistem ve site ayarlarını düzenle.",
    href: "/dashboard/admin/settings",
    icon: Settings
  }
];

export async function AdminDashboardHome() {
  const userStats = await getUserStats();

  const stats = [
    {
      title: "Toplam Kullanıcı",
      value: String(userStats.totalUsers),
      description: "Admin, öğretmen ve öğrenciler",
      icon: Users
    },
    {
      title: "Öğretmen",
      value: String(userStats.teacherCount),
      description: "Aktif öğretmen hesapları",
      icon: ShieldCheck
    },
    {
      title: "Öğrenci",
      value: String(userStats.studentCount),
      description: "Kayıtlı öğrenci hesapları",
      icon: Users
    },
    {
      title: "Bekleyen",
      value: String(userStats.pendingCount),
      description: "Onay bekleyen hesaplar",
      icon: CreditCard
    }
  ];

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-br from-slate-950 via-violet-700 to-indigo-600 p-6 text-white shadow-lg md:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-amber-300">
          Admin Paneli
        </p>

        <div className="mt-4 max-w-3xl">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            Parsmatematik sistemini buradan yönet.
          </h2>

          <p className="mt-4 text-sm leading-7 text-white/80 md:text-base">
            Admin paneli; kullanıcı, kurs, ödeme ve sistem ayarlarını yönetmek
            için merkezi alan olacak.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-slate-500">
                  {item.title}
                </p>
                <p className="mt-2 text-3xl font-black text-slate-950">
                  {item.value}
                </p>
              </div>

              <div className="flex size-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <item.icon className="size-6" />
              </div>
            </div>

            <p className="mt-3 text-sm text-slate-500">{item.description}</p>
          </div>
        ))}
      </section>

      <section>
        <div className="mb-4">
          <h3 className="text-xl font-black text-slate-950">
            Yönetim işlemleri
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Admin rolü için mevcut dosya yapındaki gerçek sayfalar.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex size-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                <item.icon className="size-6" />
              </div>

              <h4 className="mt-5 text-lg font-black text-slate-950">
                {item.title}
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}