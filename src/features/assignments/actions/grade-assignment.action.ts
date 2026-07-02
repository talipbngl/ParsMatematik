"use server";

import { revalidatePath } from "next/cache";

import { gradeAssignmentSchema } from "../schemas/assignments.schema";

function getFormString(formData: FormData, key: string): string {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

export async function gradeAssignmentAction(formData: FormData): Promise<void> {
  const rawValues = {
    submissionId: getFormString(formData, "submissionId"),
    score: getFormString(formData, "score"),
    feedback: getFormString(formData, "feedback")
  };

  const result = gradeAssignmentSchema.safeParse(rawValues);

  if (!result.success) {
    return;
  }

  // TODO: Supabase update assignment_submissions burada yapılacak.

  revalidatePath("/dashboard/teacher/assignments");
  revalidatePath("/dashboard/student/assignments");
}