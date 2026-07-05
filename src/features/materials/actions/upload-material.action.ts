"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { uploadMaterialSchema } from "../schemas/materials.schema"

const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024

const allowedMimeTypes = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation"
])

function getFormString(formData: FormData, key: string): string {
  const value = formData.get(key)

  if (typeof value !== "string") {
    return ""
  }

  return value.trim()
}

function getUploadedFile(formData: FormData): File | null {
  const value = formData.get("file")

  if (!(value instanceof File)) {
    return null
  }

  if (value.size === 0) {
    return null
  }

  return value
}

function sanitizeFileName(fileName: string): string {
  return fileName
    .trim()
    .toLowerCase()
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

function getStoragePath(params: {
  courseId: string
  userId: string
  fileName: string
}): string {
  const safeFileName = sanitizeFileName(params.fileName) || "materyal"
  const uniqueId = crypto.randomUUID()

  return `${params.courseId}/${params.userId}/${uniqueId}-${safeFileName}`
}

export async function uploadMaterialAction(formData: FormData): Promise<void> {
  const courseId = getFormString(formData, "courseId")
  const uploadedFile = getUploadedFile(formData)

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

  let filePath = input.filePath?.trim() || null
  let externalUrl = input.externalUrl?.trim() || null
  let mimeType: string | null = null
  let sizeBytes: number | null = null
  let fileUrl: string | null = externalUrl

  if (uploadedFile) {
    if (uploadedFile.size > MAX_FILE_SIZE_BYTES) {
      console.error("[uploadMaterialAction.file]", "Dosya 50 MB sınırını aşıyor.")
      return
    }

    if (!allowedMimeTypes.has(uploadedFile.type)) {
      console.error(
        "[uploadMaterialAction.file]",
        `Desteklenmeyen dosya türü: ${uploadedFile.type}`
      )
      return
    }

    const storagePath = getStoragePath({
      courseId: input.courseId,
      userId: user.id,
      fileName: uploadedFile.name
    })

    const { error: uploadError } = await supabase.storage
      .from("materials")
      .upload(storagePath, uploadedFile, {
        contentType: uploadedFile.type,
        upsert: false
      })

    if (uploadError) {
      console.error("[uploadMaterialAction.storage]", uploadError.message)
      return
    }

    filePath = storagePath
    externalUrl = null
    fileUrl = storagePath
    mimeType = uploadedFile.type
    sizeBytes = uploadedFile.size
  }

  if (!filePath && !externalUrl) {
    console.error(
      "[uploadMaterialAction.input]",
      "Dosya yüklemeli veya harici bağlantı girmelisin."
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
    file_url: fileUrl ?? filePath ?? externalUrl,
    file_path: filePath ?? externalUrl,
    external_url: externalUrl,
    mime_type: mimeType,
    size_bytes: sizeBytes,
    sort_order: 0,
    is_published: true,
    created_by: user.id
  } as never)

  if (error) {
    if (filePath && uploadedFile) {
      await supabase.storage.from("materials").remove([filePath])
    }

    console.error("[uploadMaterialAction.insert]", error.message)
    return
  }

  revalidatePath("/dashboard/teacher/materials")
  revalidatePath("/dashboard/student/materials")
  revalidatePath("/dashboard/admin/materials")
  revalidatePath("/dashboard/teacher/courses")
  revalidatePath("/dashboard/student/courses")
  revalidatePath("/courses")
  revalidatePath(`/courses/${courseId}`)

  redirect("/dashboard/teacher/materials")
}