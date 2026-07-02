"use server";

import { revalidatePath } from "next/cache";

function getLiveLessonId(formData: FormData): string {
  const value = formData.get("id");

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

export async function deleteLiveLessonAction(formData: FormData): Promise<void> {
  const liveLessonId = getLiveLessonId(formData);

  if (!liveLessonId) {
    return;
  }

  // TODO: Supabase tarafında hard delete yerine status='cancelled' yapılacak.

  revalidatePath("/dashboard/teacher/live-lessons");
  revalidatePath("/dashboard/student/live-lessons");
}