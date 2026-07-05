"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

import { requireRole } from "@/lib/auth/require-role"
import { createClient } from "@/lib/supabase/server"

const courseMemberSchema = z.object({
  courseId: z.string().uuid(),
  userId: z.string().uuid()
})

const enrollmentSchema = z.object({
  courseId: z.string().uuid(),
  studentId: z.string().uuid()
})

const removeEnrollmentSchema = z.object({
  courseId: z.string().uuid(),
  enrollmentId: z.string().uuid()
})

function getRequiredString(formData: FormData, key: string): string {
  const value = formData.get(key)

  if (typeof value !== "string") {
    return ""
  }

  return value
}

function revalidateCourseManagement(courseId: string) {
  revalidatePath("/dashboard/admin/courses")
  revalidatePath(`/dashboard/admin/courses/${courseId}/manage`)
  revalidatePath("/dashboard/teacher/courses")
  revalidatePath("/dashboard/student/courses")
}

export async function assignTeacherToCourseAction(
  formData: FormData
): Promise<void> {
  await requireRole(["admin"])

  const values = courseMemberSchema.parse({
    courseId: getRequiredString(formData, "courseId"),
    userId: getRequiredString(formData, "teacherId")
  })

  const supabase = await createClient()

  const payload = {
    course_id: values.courseId,
    teacher_id: values.userId
  } as never

  const { error } = await supabase.from("course_teachers").insert(payload)

  if (error && !error.message.includes("duplicate")) {
    throw new Error(error.message)
  }

  revalidateCourseManagement(values.courseId)
}

export async function removeTeacherFromCourseAction(
  formData: FormData
): Promise<void> {
  await requireRole(["admin"])

  const values = courseMemberSchema.parse({
    courseId: getRequiredString(formData, "courseId"),
    userId: getRequiredString(formData, "teacherId")
  })

  const supabase = await createClient()

  const { error } = await supabase
    .from("course_teachers")
    .delete()
    .eq("course_id", values.courseId)
    .eq("teacher_id", values.userId)

  if (error) {
    throw new Error(error.message)
  }

  revalidateCourseManagement(values.courseId)
}

export async function enrollStudentToCourseAction(
  formData: FormData
): Promise<void> {
  await requireRole(["admin"])

  const values = enrollmentSchema.parse({
    courseId: getRequiredString(formData, "courseId"),
    studentId: getRequiredString(formData, "studentId")
  })

  const supabase = await createClient()

  const payload = {
    course_id: values.courseId,
    student_id: values.studentId,
    status: "active"
  } as never

  const { error } = await supabase.from("course_enrollments").insert(payload)

  if (error && !error.message.includes("duplicate")) {
    throw new Error(error.message)
  }

  revalidateCourseManagement(values.courseId)
}

export async function removeStudentEnrollmentAction(
  formData: FormData
): Promise<void> {
  await requireRole(["admin"])

  const values = removeEnrollmentSchema.parse({
    courseId: getRequiredString(formData, "courseId"),
    enrollmentId: getRequiredString(formData, "enrollmentId")
  })

  const supabase = await createClient()

  const { error } = await supabase
    .from("course_enrollments")
    .delete()
    .eq("id", values.enrollmentId)

  if (error) {
    throw new Error(error.message)
  }

  revalidateCourseManagement(values.courseId)
}