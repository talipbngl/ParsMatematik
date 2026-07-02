import { CourseList } from "@/features/courses/components/CourseList";
import { getCoursesForStudent } from "@/features/courses/services/courses.service";

export default async function StudentCoursesPage() {
  const courses = await getCoursesForStudent();

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">
          Öğrenci Kursları
        </p>

        <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
          Derslerim
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Öğrenci burada kayıtlı olduğu kursları, materyalleri, canlı dersleri
          ve ödevleri takip edecek. Şu an mock veriyle çalışıyor.
        </p>
      </section>

      <CourseList
        courses={courses}
        audience="student"
        emptyTitle="Henüz kayıtlı ders yok"
        emptyDescription="Bir kursa kaydolduğunda burada listelenecek."
      />
    </div>
  );
}