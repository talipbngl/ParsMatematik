import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  ClipboardList,
  FileText,
  PlayCircle,
  UserRound
} from "lucide-react";

const stats = [
  {
    title: "Aktif Ders",
    value: "3",
    description: "Kayıtlı olduğun dersler",
    icon: BookOpen
  },
  {
    title: "Yaklaşan Canlı Ders",
    value: "2",
    description: "Bu hafta planlanan dersler",
    icon: CalendarDays
  },
  {
    title: "Bekleyen Ödev",
    value: "4",
    description: "Teslim etmen gereken ödevler",
    icon: ClipboardList
  },
  {
    title: "Sınav",
    value: "2",
    description: "Çözmen gereken sınavlar",
    icon: FileText
  }
];

const quickActions = [
  {
    title: "Derslerime Git",
    description: "Kayıtlı olduğun kursları görüntüle.",
    href: "/dashboard/student/courses",
    icon: BookOpen
  },
  {
    title: "Canlı Derslere Git",
    description: "Yaklaşan canlı derslerini görüntüle.",
    href: "/dashboard/student/live-lessons",
    icon: PlayCircle
  },
  {
    title: "Ödevlerini Kontrol Et",
    description: "Teslim tarihlerini ve geri bildirimleri gör.",
    href: "/dashboard/student/assignments",
    icon: ClipboardList
  },
  {
    title: "Profilini Aç",
    description: "Öğrenci profil bilgilerini kontrol et.",
    href: "/dashboard/student/profile",
    icon: UserRound
  }
];

export function StudentDashboardHome() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-slate-950 p-6 text-white shadow-lg md:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-amber-300">
          Öğrenci Paneli
        </p>

        <div className="mt-4 max-w-3xl">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            Derslerini, canlı derslerini ve ödevlerini buradan takip et.
          </h2>

          <p className="mt-4 text-sm leading-7 text-white/80 md:text-base">
            Parsmatematik öğrenci paneli; derslere katılman, ödevlerini takip
            etmen, sınavlarını çözmen ve profilini yönetmen için hazırlanıyor.
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
          <h3 className="text-xl font-black text-slate-950">Hızlı işlemler</h3>
          <p className="mt-1 text-sm text-slate-500">
            Öğrencinin en sık kullanacağı alanlar.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
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