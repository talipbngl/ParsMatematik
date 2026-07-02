import Link from "next/link";
import { notFound } from "next/navigation";

import { CourseDetail } from "@/features/courses/components/CourseDetail";
import { getCourseById } from "@/features/courses/services/courses.service";
import { MaterialList } from "@/features/materials/components/MaterialList";
import { MaterialViewer } from "@/features/materials/components/MaterialViewer";
import { getMaterialsByCourseId } from "@/features/materials/services/materials.service";

type PublicCourseDetailPageProps = {
  params: Promise<{
    courseId: string;
  }>;
};

export default async function PublicCourseDetailPage({
  params
}: PublicCourseDetailPageProps) {
  const { courseId } = await params;

  const course = await getCourseById(courseId);

  if (!course) {
    notFound();
  }

  const materials = await getMaterialsByCourseId(course.id);
  const featuredMaterial = materials[0] ?? null;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="flex flex-col justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">
              Kurs Detayı
            </p>

            <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
              {course.title}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Kurs bilgileri ve örnek materyaller bu sayfada gösteriliyor.
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-5 py-3 text-sm font-black text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
          >
            Kurslara dön
          </Link>
        </section>

        <CourseDetail course={course} />

        <MaterialViewer material={featuredMaterial} />

        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-black text-slate-950">
              Kurs materyalleri
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Bu kursa bağlı PDF, video, link ve dokümanlar.
            </p>
          </div>

          <MaterialList
            materials={materials}
            audience="public"
            emptyTitle="Bu kursa henüz materyal eklenmemiş"
            emptyDescription="Öğretmen materyal eklediğinde burada görünecek."
          />
        </section>
      </div>
    </main>
  );
}