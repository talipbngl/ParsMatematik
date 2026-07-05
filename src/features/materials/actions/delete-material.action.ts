"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { deleteMaterialSchema } from "../schemas/materials.schema"

function getFormString(formData: FormData, key: string): string {
  const value = formData.get(key)

  if (typeof value !== "string") {
    return ""
  }

  return value.trim()
}

export async function deleteMaterialAction(formData: FormData): Promise<void> {
  const rawValues = {
    id: getFormString(formData, "id")
  }

  const result = deleteMaterialSchema.safeParse(rawValues)

  if (!result.success) {
    console.error("[deleteMaterialAction.validation]", result.error.flatten())
    return
  }

  const supabase = await createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    console.error("[deleteMaterialAction.auth]", "Oturum bulunamadı.")
    return
  }

  const { data: material, error: materialError } = await supabase
    .from("materials")
    .select("id, course_id")
    .eq("id", result.data.id)
    .maybeSingle()

  if (materialError) {
    console.error("[deleteMaterialAction.material]", materialError.message)
    return
  }

  if (!material) {
    console.error("[deleteMaterialAction.material]", "Materyal bulunamadı.")
    return
  }

  const { data: teacherCourse, error: teacherCourseError } = await supabase
    .from("course_teachers")
    .select("course_id")
    .eq("course_id", material.course_id)
    .eq("teacher_id", user.id)
    .maybeSingle()

  if (teacherCourseError) {
    console.error(
      "[deleteMaterialAction.teacherCourse]",
      teacherCourseError.message
    )
    return
  }

  if (!teacherCourse) {
    console.error(
      "[deleteMaterialAction.teacherCourse]",
      "Bu materyali silme yetkin yok."
    )
    return
  }

  const { error } = await supabase
    .from("materials")
    .delete()
    .eq("id", result.data.id)

  if (error) {
    console.error("[deleteMaterialAction.delete]", error.message)
    return
  }

  revalidatePath("/dashboard/teacher/materials")
  revalidatePath("/dashboard/student/materials")
  revalidatePath("/dashboard/teacher/courses")
  revalidatePath("/dashboard/student/courses")
  revalidatePath("/courses")
  revalidatePath(`/courses/${material.course_id}`)
}