import { CourseForm } from "@/features/courses/components/CourseForm"

export default function NewAdminCoursePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <CourseForm mode="create" returnPath="/dashboard/admin/courses" />
    </div>
  )
}