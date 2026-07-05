import Link from "next/link"
import {
  Archive,
  BookOpen,
  BookPlus,
  CheckCircle2,
  FilePenLine,
  Users
} from "lucide-react"

import { CourseList } from "@/features/courses/components/CourseList"
import {
  getCourseStats,
  getCourses
} from "@/features/courses/services/courses.service"
import { PageHeader } from "@/shared/components/layout/PageHeader"
import { SectionHeader } from "@/shared/components/layout/SectionHeader"
import { DashboardStatCard } from "@/shared/components/ui/DashboardStatCard"

export default async function AdminCoursesPage() {
  const courses = await getCourses()
  const stats = await getCourseStats()

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Kurs Yönetimi"
        title="Kurslar"
        description="Admin kursları buradan oluşturur, yayın durumunu takip eder ve ileride öğretmen/öğrenci atamalarını yönetir."
        variant="card"
        actions={
          <Link
            href="/dashboard/admin/courses/new"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-black text-white transition hover:bg-indigo-700"
          >
            <BookPlus className="size-4" />
            Kurs Ekle
          </Link>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <DashboardStatCard
          title="Toplam Kurs"
          value={String(stats.totalCourses)}
          description="Sistemdeki tüm kurslar"
          icon={BookOpen}
          tone="indigo"
        />

        <DashboardStatCard
          title="Yayında"
          value={String(stats.publishedCourses)}
          description="Öğrenciye açık kurslar"
          icon={CheckCircle2}
          tone="emerald"
        />

        <DashboardStatCard
          title="Taslak"
          value={String(stats.draftCourses)}
          description="Hazırlık aşamasında"
          icon={FilePenLine}
          tone="amber"
        />

        <DashboardStatCard
          title="Arşiv"
          value={String(stats.archivedCourses)}
          description="Pasif kurslar"
          icon={Archive}
          tone="slate"
        />

        <DashboardStatCard
          title="Kayıtlı Öğrenci"
          value={String(stats.totalEnrollments)}
          description="Toplam kayıt sayısı"
          icon={Users}
          tone="rose"
        />
      </section>

      <section className="space-y-4">
        <SectionHeader
          title="Kurs Listesi"
          description={`${courses.length} kurs listeleniyor. Bu liste Supabase courses tablosundan geliyor.`}
        />

        <CourseList
          courses={courses}
          audience="admin"
          emptyTitle="Henüz kurs oluşturulmadı"
          emptyDescription="İlk kursunu oluşturmak için Kurs Ekle butonunu kullan."
        />
        {courses.length > 0 ? (
  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
    {courses.map((course) => (
      <Link
        key={course.id}
        href={`/dashboard/admin/courses/${course.id}/manage`}
        className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-black text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
      >
        {course.title} — Atamaları Yönet
      </Link>
    ))}
  </div>
) : null}
      </section>
    </div>
  )
}