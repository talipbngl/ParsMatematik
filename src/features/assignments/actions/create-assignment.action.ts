"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { createAssignmentSchema } from "../schemas/assignments.schema"

function getFormString(formData: FormData, key: string): string {
  const value = formData.get(key)

  if (typeof value !== "string") {
    return ""
  }

  return value.trim()
}

function normalizeDateTimeLocal(value: string | undefined) {
  if (!value) {
    return null
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  return date.toISOString()
}

export async function createAssignmentAction(formData: FormData): Promise<void> {
  const rawValues = {
    courseId: getFormString(formData, "courseId"),
    title: getFormString(formData, "title"),
    description: getFormString(formData, "description"),
    dueAt: getFormString(formData, "dueAt"),
    maxScore: getFormString(formData, "maxScore"),
    status: getFormString(formData, "status")
  }

  const result = createAssignmentSchema.safeParse(rawValues)

  if (!result.success) {
    console.error("[createAssignmentAction.validation]", result.error.flatten())
    return
  }

  const input = result.data
  const supabase = await createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: teacherCourse, error: teacherCourseError } = await supabase
    .from("course_teachers")
    .select("course_id")
    .eq("course_id", input.courseId)
    .eq("teacher_id", user.id)
    .maybeSingle()

  if (teacherCourseError) {
    console.error(
      "[createAssignmentAction.teacherCourse]",
      teacherCourseError.message
    )
    return
  }

  if (!teacherCourse) {
    console.error(
      "[createAssignmentAction.teacherCourse]",
      "Bu öğretmen seçilen kursa atanmış değil."
    )
    return
  }

  const { error } = await supabase.from("assignments").insert({
    course_id: input.courseId,
    teacher_id: user.id,
    title: input.title,
    description: input.description,
    due_at: normalizeDateTimeLocal(input.dueAt),
    max_score: input.maxScore ?? null,
    status: input.status ?? "draft",
    created_by: user.id
  } as never)

  if (error) {
    console.error("[createAssignmentAction.insert]", error.message)
    return
  }

  revalidatePath("/dashboard/teacher/assignments")
  revalidatePath("/dashboard/student/assignments")
  revalidatePath("/dashboard/admin/assignments")
  revalidatePath("/dashboard/teacher/courses")
  revalidatePath("/dashboard/student/courses")

  redirect("/dashboard/teacher/assignments")
}