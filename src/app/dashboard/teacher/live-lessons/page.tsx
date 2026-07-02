import Link from "next/link";
import { PlusCircle } from "lucide-react";

import { LiveLessonList } from "@/features/live-lessons/components/LiveLessonList";
import {
  getLiveLessonStats,
  getTeacherLiveLessons
} from "@/features/live-lessons/services/live-lessons.service";

export default async function TeacherLiveLessonsPage() {
  const lessons = await getTeacherLiveLessons();
  const stats = await getLiveLessonStats();

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">
            Canlı Dersler
          </p>

          <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
            Canlı ders yönetimi
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Öğretmen burada canlı derslerini planlayacak, link ekleyecek ve
            ders durumlarını takip edecek.
          </p>
        </div>

        <Link
          href="/dashboard/teacher/live-lessons/new"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700"
        >
          <PlusCircle className="size-4" />
          Yeni Canlı Ders
        </Link>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Toplam</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {stats.totalLessons}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Planlanan</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {stats.scheduledLessons}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Canlı</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {stats.liveLessons}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Tamamlanan</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {stats.completedLessons}
          </p>
        </div>
      </section>

      <LiveLessonList
        lessons={lessons}
        audience="teacher"
        emptyTitle="Henüz canlı ders oluşturulmamış"
        emptyDescription="Yeni canlı ders oluşturduğunda burada görünecek."
      />
    </div>
  );
}