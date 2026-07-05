"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { uploadMaterialSchema } from "../schemas/materials.schema"

function getFormString(formData: FormData, key: string): string {
  const value = formData.get(key)

  if (typeof value !== "string") {
    return ""
  }

  return value.trim()
}

export async function uploadMaterialAction(formData: FormData): Promise<void> {
  const courseId = getFormString(formData, "courseId")

  const rawValues = {
    courseId,
    title: getFormString(formData, "title"),
    description: getFormString(formData, "description"),
    type: getFormString(formData, "type"),
    visibility: getFormString(formData, "visibility"),
    filePath: getFormString(formData, "filePath"),
    externalUrl: getFormString(formData, "externalUrl")
  }

  const result = uploadMaterialSchema.safeParse(rawValues)

  if (!result.success) {
    console.error("[uploadMaterialAction.validation]", result.error.flatten())
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

  const filePath = input.filePath?.trim() || null
  const externalUrl = input.externalUrl?.trim() || null

  if (!filePath && !externalUrl) {
    console.error(
      "[uploadMaterialAction.input]",
      "Dosya yolu veya harici bağlantı gerekli."
    )
    return
  }

  const { data: teacherCourse, error: teacherCourseError } = await supabase
    .from("course_teachers")
    .select("course_id")
    .eq("course_id", input.courseId)
    .eq("teacher_id", user.id)
    .maybeSingle()

  if (teacherCourseError) {
    console.error(
      "[uploadMaterialAction.teacherCourse]",
      teacherCourseError.message
    )
    return
  }

  if (!teacherCourse) {
    console.error(
      "[uploadMaterialAction.teacherCourse]",
      "Bu öğretmen seçilen kursa atanmış değil."
    )
    return
  }

  const { error } = await supabase.from("materials").insert({
    course_id: input.courseId,
    teacher_id: user.id,
    title: input.title,
    description: input.description || "",
    type: input.type,
    visibility: input.visibility || "course",
    file_url: externalUrl ?? filePath,
    file_path: filePath,
    external_url: externalUrl,
    mime_type: null,
    size_bytes: null,
    sort_order: 0,
    is_published: true,
    created_by: user.id
  } as never)

  if (error) {
    console.error("[uploadMaterialAction.insert]", error.message)
    return
  }

  revalidatePath("/dashboard/teacher/materials")
  revalidatePath("/dashboard/student/materials")
  revalidatePath("/dashboard/teacher/courses")
  revalidatePath("/dashboard/student/courses")
  revalidatePath("/courses")
  revalidatePath(`/courses/${courseId}`)

  redirect("/dashboard/teacher/materials")
}