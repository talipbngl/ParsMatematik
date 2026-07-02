"use server";

import { revalidatePath } from "next/cache";

import { submitExamSchema } from "../schemas/exams.schema";
import type { ExamAnswerInput } from "../types/exams.types";

function getFormString(formData: FormData, key: string): string {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function getAnswers(formData: FormData): ExamAnswerInput[] {
  const answers: ExamAnswerInput[] = [];

  for (const [key, value] of formData.entries()) {
    if (!key.startsWith("answer:")) {
      continue;
    }

    if (typeof value !== "string") {
      continue;
    }

    const questionId = key.replace("answer:", "").trim();
    const answer = value.trim();

    if (!questionId || !answer) {
      continue;
    }

    answers.push({
      questionId,
      answer
    });
  }

  return answers;
}

export async function submitExamAction(formData: FormData): Promise<void> {
  const rawValues = {
    examId: getFormString(formData, "examId"),
    answers: getAnswers(formData)
  };

  const result = submitExamSchema.safeParse(rawValues);

  if (!result.success) {
    return;
  }

  // TODO: Supabase insert exam_submissions + exam_answers burada yapılacak.

  revalidatePath("/dashboard/student/exams");
  revalidatePath("/dashboard/teacher/exams");
}