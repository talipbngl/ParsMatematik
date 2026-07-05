"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { submitAssignmentSchema } from "../schemas/assignments.schema"

type AssignmentForSubmit = {
  id: string
  course_id: string
  due_at: string | null
  status: string
}

function getFormString(formData: FormData, key: string): string {
  const value = formData.get(key)

  if (typeof value !== "string") {
    return ""
  }

  return value.trim()
}

function getSubmissionStatus(dueAt: string | null): "submitted" | "late" {
  if (!dueAt) {
    return "submitted"
  }

  const dueTime = new Date(dueAt).getTime()

  if (Number.isNaN(dueTime)) {
    return "submitted"
  }

  return Date.now() > dueTime ? "late" : "submitted"
}

export async function submitAssignmentAction(formData: FormData): Promise<void> {
  const rawValues = {
    assignmentId: getFormString(formData, "assignmentId"),
    answerText: getFormString(formData, "answerText"),
    filePath: getFormString(formData, "filePath")
  }

  const result = submitAssignmentSchema.safeParse(rawValues)

  if (!result.success) {
    console.error("[submitAssignmentAction.validation]", result.error.flatten())
    return
  }

  const input = result.data
  const supabase = await createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    console.error("[submitAssignmentAction.auth]", "Oturum bulunamadı.")
    return
  }

  const { data: assignmentData, error: assignmentError } = await supabase
    .from("assignments")
    .select("id, course_id, due_at, status")
    .eq("id", input.assignmentId)
    .maybeSingle()

  if (assignmentError) {
    console.error("[submitAssignmentAction.assignment]", assignmentError.message)
    return
  }

  if (!assignmentData) {
    console.error("[submitAssignmentAction.assignment]", "Ödev bulunamadı.")
    return
  }

  const assignment = assignmentData as unknown as AssignmentForSubmit

  if (assignment.status !== "published") {
    console.error(
      "[submitAssignmentAction.assignment]",
      "Bu ödev teslim almıyor."
    )
    return
  }

  const status = getSubmissionStatus(assignment.due_at)

  const { error } = await supabase.from("assignment_submissions").upsert(
    {
      assignment_id: input.assignmentId,
      student_id: user.id,
      answer_text: input.answerText || "",
      file_path: input.filePath || null,
      submitted_at: new Date().toISOString(),
      status,
      score: null,
      feedback: null,
      graded_at: null,
      graded_by: null
    } as never,
    {
      onConflict: "assignment_id,student_id"
    }
  )

  if (error) {
    console.error("[submitAssignmentAction.upsert]", error.message)
    return
  }

  revalidatePath("/dashboard/student/assignments")
  revalidatePath("/dashboard/teacher/assignments")
  revalidatePath(`/courses/${assignment.course_id}`)
}