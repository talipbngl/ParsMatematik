"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createLiveLessonSchema } from "../schemas/live-lessons.schema";

function getFormString(formData: FormData, key: string): string {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

export async function createLiveLessonAction(formData: FormData): Promise<void> {
  const rawValues = {
    courseId: getFormString(formData, "courseId"),
    title: getFormString(formData, "title"),
    description: getFormString(formData, "description"),
    startsAt: getFormString(formData, "startsAt"),
    durationMinutes: getFormString(formData, "durationMinutes"),
    meetingUrl: getFormString(formData, "meetingUrl"),
    provider: getFormString(formData, "provider"),
    status: getFormString(formData, "status")
  };

  const result = createLiveLessonSchema.safeParse(rawValues);

  if (!result.success) {
    return;
  }

  // TODO: Supabase insert burada yapılacak.

  revalidatePath("/dashboard/teacher/live-lessons");
  revalidatePath("/dashboard/student/live-lessons");

  redirect("/dashboard/teacher/live-lessons");
}