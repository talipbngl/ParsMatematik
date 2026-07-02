"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createExamSchema } from "../schemas/exams.schema";

function getFormString(formData: FormData, key: string): string {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

export async function createExamAction(formData: FormData): Promise<void> {
  const rawValues = {
    courseId: getFormString(formData, "courseId"),
    title: getFormString(formData, "title"),
    description: getFormString(formData, "description"),
    startsAt: getFormString(formData, "startsAt"),
    endsAt: getFormString(formData, "endsAt"),
    durationMinutes: getFormString(formData, "durationMinutes"),
    status: getFormString(formData, "status")
  };

  const result = createExamSchema.safeParse(rawValues);

  if (!result.success) {
    return;
  }

  // TODO: Supabase insert exams + questions burada yapılacak.

  revalidatePath("/dashboard/teacher/exams");
  revalidatePath("/dashboard/student/exams");

  redirect("/dashboard/teacher/exams");
}