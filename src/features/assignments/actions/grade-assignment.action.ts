"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { gradeAssignmentSchema } from "../schemas/assignments.schema"

type SubmissionForGrade = {
  id: string
  assignment_id: string
}

function getFormString(formData: FormData, key: string): string {
  const value = formData.get(key)

  if (typeof value !== "string") {
    return ""
  }

  return value.trim()
}

export async function gradeAssignmentAction(formData: FormData): Promise<void> {
  const rawValues = {
    submissionId: getFormString(formData, "submissionId"),
    score: getFormString(formData, "score"),
    feedback: getFormString(formData, "feedback")
  }

  const result = gradeAssignmentSchema.safeParse(rawValues)

  if (!result.success) {
    console.error("[gradeAssignmentAction.validation]", result.error.flatten())
    return
  }

  const input = result.data
  const supabase = await createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    console.error("[gradeAssignmentAction.auth]", "Oturum bulunamadı.")
    return
  }

  const { data: submissionData, error: submissionError } = await supabase
    .from("assignment_submissions")
    .select("id, assignment_id")
    .eq("id", input.submissionId)
    .maybeSingle()

  if (submissionError) {
    console.error("[gradeAssignmentAction.submission]", submissionError.message)
    return
  }

  if (!submissionData) {
    console.error("[gradeAssignmentAction.submission]", "Teslim bulunamadı.")
    return
  }

  const submission = submissionData as unknown as SubmissionForGrade

  const { error } = await supabase
    .from("assignment_submissions")
    .update({
      score: input.score,
      feedback: input.feedback || "",
      status: "graded",
      graded_at: new Date().toISOString(),
      graded_by: user.id
    } as never)
    .eq("id", input.submissionId)

  if (error) {
    console.error("[gradeAssignmentAction.update]", error.message)
    return
  }

  revalidatePath("/dashboard/teacher/assignments")
  revalidatePath("/dashboard/student/assignments")
  revalidatePath(`/dashboard/teacher/assignments/${submission.assignment_id}`)
}