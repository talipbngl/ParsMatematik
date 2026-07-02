"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createAssignmentSchema } from "../schemas/assignments.schema";

function getFormString(formData: FormData, key: string): string {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

export async function createAssignmentAction(formData: FormData): Promise<void> {
  const rawValues = {
    courseId: getFormString(formData, "courseId"),
    title: getFormString(formData, "title"),
    description: getFormString(formData, "description"),
    dueAt: getFormString(formData, "dueAt"),
    maxScore: getFormString(formData, "maxScore"),
    status: getFormString(formData, "status")
  };

  const result = createAssignmentSchema.safeParse(rawValues);

  if (!result.success) {
    return;
  }

  // TODO: Supabase insert burada yapılacak.

  revalidatePath("/dashboard/teacher/assignments");
  revalidatePath("/dashboard/student/assignments");

  redirect("/dashboard/teacher/assignments");
}