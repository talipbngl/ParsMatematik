"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { updateLiveLessonSchema } from "../schemas/live-lessons.schema";

function getFormString(formData: FormData, key: string): string {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

export async function updateLiveLessonAction(formData: FormData): Promise<void> {
  const liveLessonId = getFormString(formData, "id");

  const rawValues = {
    id: liveLessonId,
    courseId: getFormString(formData, "courseId"),
    title: getFormString(formData, "title"),
    description: getFormString(formData, "description"),
    startsAt: getFormString(formData, "startsAt"),
    durationMinutes: getFormString(formData, "durationMinutes"),
    meetingUrl: getFormString(formData, "meetingUrl"),
    provider: getFormString(formData, "provider"),
    status: getFormString(formData, "status")
  };

  const result = updateLiveLessonSchema.safeParse(rawValues);

  if (!result.success) {
    return;
  }

  // TODO: Supabase update burada yapılacak.

  revalidatePath("/dashboard/teacher/live-lessons");
  revalidatePath("/dashboard/student/live-lessons");

  redirect("/dashboard/teacher/live-lessons");
}