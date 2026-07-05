"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { deleteMaterialSchema } from "../schemas/materials.schema"

type MaterialDeleteRow = {
  id: string
  course_id: string
  file_path?: string | null
  file_url?: string | null
  external_url?: string | null
}

function getFormString(formData: FormData, key: string): string {
  const value = formData.get(key)

  if (typeof value !== "string") {
    return ""
  }

  return value.trim()
}

function isExternalUrl(value: string | null | undefined): boolean {
  return Boolean(value?.startsWith("http://") || value?.startsWith("https://"))
}

function getStoragePathToDelete(material: MaterialDeleteRow): string | null {
  if (material.file_path && !isExternalUrl(material.file_path)) {
    return material.file_path
  }

  if (material.file_url && !isExternalUrl(material.file_url)) {
    return material.file_url
  }

  return null
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

  const { data: materialData, error: materialError } = await supabase
    .from("materials")
    .select("*")
    .eq("id", result.data.id)
    .maybeSingle()

  if (materialError) {
    console.error("[deleteMaterialAction.material]", materialError.message)
    return
  }

  if (!materialData) {
    console.error("[deleteMaterialAction.material]", "Materyal bulunamadı.")
    return
  }

  const material = materialData as unknown as MaterialDeleteRow

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

  const storagePath = getStoragePathToDelete(material)

  const { error: deleteError } = await supabase
    .from("materials")
    .delete()
    .eq("id", material.id)

  if (deleteError) {
    console.error("[deleteMaterialAction.delete]", deleteError.message)
    return
  }

  if (storagePath) {
    const { error: storageError } = await supabase.storage
      .from("materials")
      .remove([storagePath])

    if (storageError) {
      console.error("[deleteMaterialAction.storage]", storageError.message)
    }
  }

  revalidatePath("/dashboard/teacher/materials")
  revalidatePath("/dashboard/student/materials")
  revalidatePath("/dashboard/admin/materials")
  revalidatePath("/dashboard/teacher/courses")
  revalidatePath("/dashboard/student/courses")
  revalidatePath("/courses")
  revalidatePath(`/courses/${material.course_id}`)
}