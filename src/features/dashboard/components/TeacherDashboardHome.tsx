import Link from "next/link";
import {
  BookOpen,
  CalendarPlus,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Users
} from "lucide-react";

const stats = [
  {
    title: "Aktif Kurs",
    value: "5",
    description: "Yönettiğin kurslar",
    icon: BookOpen
  },
  {
    title: "Öğrenci",
    value: "42",
    description: "Kurslarına kayıtlı öğrenciler",
    icon: Users
  },
  {
    title: "Bu Hafta Ders",
    value: "8",
    description: "Planlanan canlı dersler",
    icon: CalendarPlus
  },
  {
    title: "Bekleyen Teslim",
    value: "13",
    description: "İncelenecek ödevler",
    icon: ClipboardCheck
  }
];

const quickActions = [
  {
    title: "Kurslarım",
    description: "Sana atanmış kursları görüntüle.",
    href: "/dashboard/teacher/courses",
    icon: BookOpen
  },
  {
    title: "Canlı Ders Oluştur",
    description: "Kursa bağlı yeni bir canlı ders planla.",
    href: "/dashboard/teacher/live-lessons/new",
    icon: CalendarPlus
  },
  {
    title: "Ödev Oluştur",
    description: "Öğrencilere yeni ödev ver.",
    href: "/dashboard/teacher/assignments/new",
    icon: ClipboardCheck
  },
  {
    title: "Sınav Oluştur",
    description: "Yeni sınav veya quiz hazırla.",
    href: "/dashboard/teacher/exams/new",
    icon: FileText
  },
  {
    title: "Öğrenciler",
    description: "Öğrenci listesini ve ilerlemeyi gör.",
    href: "/dashboard/teacher/students",
    icon: GraduationCap
  }
];

export function TeacherDashboardHome() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-700 to-sky-600 p-6 text-white shadow-lg md:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-amber-300">
          Öğretmen Paneli
        </p>

        <div className="mt-4 max-w-3xl">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            Derslerini, öğrencilerini ve içeriklerini tek panelden yönet.
          </h2>

          <p className="mt-4 text-sm leading-7 text-white/80 md:text-base">
            Öğretmen paneli; kurs, canlı ders, ödev, sınav ve öğrenci yönetimi
            için geliştiriliyor.
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
            Öğretmenin en sık kullanacağı gerçek route bağlantıları.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {quickActions.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
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