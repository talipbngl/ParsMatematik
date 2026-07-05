"use server"

import { revalidatePath } from "next/cache"

import { requireRole } from "@/lib/auth/require-role"
import { createClient } from "@/lib/supabase/server"

function getLiveLessonId(formData: FormData): string {
  const value = formData.get("id")

  if (typeof value !== "string") {
    return ""
  }

  return value.trim()
}

export async function deleteLiveLessonAction(
  formData: FormData
): Promise<void> {
  await requireRole(["teacher", "admin"])

  const liveLessonId = getLiveLessonId(formData)

  if (!liveLessonId) {
    return
  }

  const supabase = await createClient()

  const payload = {
    status: "cancelled"
  } as never

  const { error } = await supabase
    .from("live_lessons")
    .update(payload)
    .eq("id", liveLessonId)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/dashboard/teacher/live-lessons")
  revalidatePath("/dashboard/student/live-lessons")
}