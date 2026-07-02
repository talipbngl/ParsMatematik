"use server";

import { revalidatePath } from "next/cache";

import { submitAssignmentSchema } from "../schemas/assignments.schema";

function getFormString(formData: FormData, key: string): string {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

export async function submitAssignmentAction(formData: FormData): Promise<void> {
  const rawValues = {
    assignmentId: getFormString(formData, "assignmentId"),
    answerText: getFormString(formData, "answerText"),
    filePath: getFormString(formData, "filePath")
  };

  const result = submitAssignmentSchema.safeParse(rawValues);

  if (!result.success) {
    return;
  }

  // TODO: Supabase insert/update assignment_submissions burada yapılacak.

  revalidatePath("/dashboard/student/assignments");
  revalidatePath("/dashboard/teacher/assignments");
}