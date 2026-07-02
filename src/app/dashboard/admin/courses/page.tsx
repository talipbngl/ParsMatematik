import { BookPlus } from "lucide-react";

import { CourseList } from "@/features/courses/components/CourseList";
import {
  getCourseStats,
  getCourses
} from "@/features/courses/services/courses.service";

export default async function AdminCoursesPage() {
  const courses = await getCourses();
  const stats = await getCourseStats();

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">
            Kurs Yönetimi
          </p>

          <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
            Tüm Kurslar
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Admin burada tüm kursları görüp düzenleyecek. Şimdilik mock veriyle
            çalışıyor.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700"
        >
          <BookPlus className="size-4" />
          Kurs Ekle
        </button>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Toplam Kurs</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {stats.totalCourses}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Yayında</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {stats.publishedCourses}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Taslak</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {stats.draftCourses}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Arşiv</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {stats.archivedCourses}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Kayıtlı Öğrenci</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {stats.totalEnrollments}
          </p>
        </div>
      </section>

      <CourseList courses={courses} audience="admin" />
    </div>
  );
}