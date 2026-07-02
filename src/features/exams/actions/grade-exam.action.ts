"use server";

import { revalidatePath } from "next/cache";

import { gradeExamSchema } from "../schemas/exams.schema";

function getFormString(formData: FormData, key: string): string {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

export async function gradeExamAction(formData: FormData): Promise<void> {
  const rawValues = {
    submissionId: getFormString(formData, "submissionId"),
    score: getFormString(formData, "score"),
    feedback: getFormString(formData, "feedback")
  };

  const result = gradeExamSchema.safeParse(rawValues);

  if (!result.success) {
    return;
  }

  // TODO: Supabase update exam_submissions burada yapılacak.

  revalidatePath("/dashboard/teacher/exams");
  revalidatePath("/dashboard/student/exams");
}