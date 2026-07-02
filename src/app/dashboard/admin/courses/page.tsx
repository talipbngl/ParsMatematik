import { Archive, BookOpen, BookPlus, CheckCircle2, FilePenLine, Users } from "lucide-react"

import { CourseList } from "@/features/courses/components/CourseList"
import { getCourseStats, getCourses } from "@/features/courses/services/courses.service"
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
        title="Tüm Kurslar"
        description="Admin burada tüm kursları görüp düzenleyecek. Şimdilik mock veriyle çalışıyor."
        variant="card"
        actions={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-black text-white transition hover:bg-indigo-700"
          >
            <BookPlus className="size-4" />
            Kurs Ekle
          </button>
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
          description={`${courses.length} kurs listeleniyor. Gerçek Supabase bağlantısı gelince admin tüm kursları buradan yönetecek.`}
        />

        <CourseList courses={courses} audience="admin" />
      </section>
    </div>
  )
}