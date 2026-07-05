import Link from "next/link"

import { CourseMembersManager } from "@/features/courses/components/CourseMembersManager"
import { getCourseManagementData } from "@/features/courses/services/course-management.service"
import { PageHeader } from "@/shared/components/layout/PageHeader"

type ManageCoursePageProps = {
  params: Promise<{
    courseId: string
  }>
}

export default async function ManageCoursePage({
  params
}: ManageCoursePageProps) {
  const { courseId } = await params
  const data = await getCourseManagementData(courseId)

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Kurs Atamaları"
        title={data.course.title}
        description="Bu kursta görev alacak öğretmenleri ve kursa kayıtlı öğrencileri yönet."
        variant="card"
        actions={
          <Link
            href="/dashboard/admin/courses"
            className="inline-flex items-center rounded-full border border-slate-200 px-5 py-2.5 text-sm font-black text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
          >
            Kurslara Dön
          </Link>
        }
      />

      <CourseMembersManager data={data} />
    </div>
  )
}