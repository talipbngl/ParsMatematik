import Link from "next/link";
import { BookPlus } from "lucide-react";

import { CourseList } from "@/features/courses/components/CourseList";
import { getCoursesForTeacher } from "@/features/courses/services/courses.service";

export default async function TeacherCoursesPage() {
  const courses = await getCoursesForTeacher();

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">
            Öğretmen Kursları
          </p>

          <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
            Kurslarım
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Bu sayfada öğretmen kendisine atanmış kursları görecek ve yeni kurs
            taslağı oluşturabilecek. Şu an mock veriyle çalışıyor.
          </p>
        </div>

        <Link
          href="/dashboard/teacher/courses/new"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700"
        >
          <BookPlus className="size-4" />
          Yeni Kurs
        </Link>
      </section>

      <CourseList
        courses={courses}
        audience="teacher"
        emptyTitle="Henüz atanmış kurs yok"
        emptyDescription="Admin seni bir kursa atadığında burada görünecek."
      />
    </div>
  );
}