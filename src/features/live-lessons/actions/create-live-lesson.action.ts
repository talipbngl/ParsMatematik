"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { requireRole } from "@/lib/auth/require-role"
import { createClient } from "@/lib/supabase/server"

import { createLiveLessonSchema } from "../schemas/live-lessons.schema"

function getFormString(formData: FormData, key: string): string {
  const value = formData.get(key)

  if (typeof value !== "string") {
    return ""
  }

  return value.trim()
}

export async function createLiveLessonAction(
  formData: FormData
): Promise<void> {
  const profile = await requireRole(["teacher"])
  const supabase = await createClient()

  const rawValues = {
    courseId: getFormString(formData, "courseId"),
    title: getFormString(formData, "title"),
    description: getFormString(formData, "description"),
    startsAt: getFormString(formData, "startsAt"),
    durationMinutes: getFormString(formData, "durationMinutes"),
    meetingUrl: getFormString(formData, "meetingUrl"),
    provider: getFormString(formData, "provider"),
    status: getFormString(formData, "status")
  }

  const result = createLiveLessonSchema.safeParse(rawValues)

  if (!result.success) {
    return
  }

  const values = result.data

  const { data: courseTeacher, error: courseTeacherError } = await supabase
    .from("course_teachers")
    .select("id")
    .eq("course_id", values.courseId)
    .eq("teacher_id", profile.id)
    .maybeSingle()

  if (courseTeacherError || !courseTeacher) {
    throw new Error("Bu kursa canlı ders ekleme yetkin yok.")
  }

  const startsAt = new Date(values.startsAt)

  if (Number.isNaN(startsAt.getTime())) {
    throw new Error("Başlangıç tarihi geçerli değil.")
  }

  const endsAt = new Date(
    startsAt.getTime() + values.durationMinutes * 60 * 1000
  )

  const payload = {
    course_id: values.courseId,
    teacher_id: profile.id,
    title: values.title,
    description: values.description || "",
    starts_at: startsAt.toISOString(),
    ends_at: endsAt.toISOString(),
    duration_minutes: values.durationMinutes,
    meeting_url: values.meetingUrl || undefined,
    provider: values.provider ?? "external",
    status: values.status ?? "scheduled",
    created_by: profile.id
  } as never

  const { error } = await supabase.from("live_lessons").insert(payload)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/dashboard/teacher/live-lessons")
  revalidatePath("/dashboard/student/live-lessons")
  revalidatePath("/dashboard/admin/courses")

  redirect("/dashboard/teacher/live-lessons")
}