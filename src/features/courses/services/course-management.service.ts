import { notFound } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

import { getCourseById } from "./courses.service"

export type CourseManageUser = {
  id: string
  fullName: string
  email: string
}

export type CourseEnrollmentManageItem = {
  id: string
  studentId: string
  studentName: string
  studentEmail: string
  status: string
  enrolledAt: string
}

export type CourseManagementData = {
  course: NonNullable<Awaited<ReturnType<typeof getCourseById>>>
  teachers: CourseManageUser[]
  students: CourseManageUser[]
  assignedTeacherIds: string[]
  enrollments: CourseEnrollmentManageItem[]
}

type ProfileRow = {
  id: string
  full_name: string
  email: string | null
}

type CourseTeacherRow = {
  teacher_id: string
}

type EnrollmentRow = {
  id: string
  student_id: string
  status: string
  enrolled_at: string
}

function mapProfile(profile: ProfileRow): CourseManageUser {
  return {
    id: profile.id,
    fullName: profile.full_name,
    email: profile.email ?? ""
  }
}

export async function getCourseManagementData(
  courseId: string
): Promise<CourseManagementData> {
  const course = await getCourseById(courseId)

  if (!course) {
    notFound()
  }

  const supabase = await createClient()

  const [teachersResult, studentsResult, assignedTeachersResult, enrollmentsResult] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("id, full_name, email")
        .filter("role", "eq", "teacher")
        .eq("is_active", true)
        .order("full_name", { ascending: true }),

      supabase
        .from("profiles")
        .select("id, full_name, email")
        .filter("role", "eq", "student")
        .eq("is_active", true)
        .order("full_name", { ascending: true }),

      supabase
        .from("course_teachers")
        .select("teacher_id")
        .eq("course_id", course.id),

      supabase
        .from("course_enrollments")
        .select("id, student_id, status, enrolled_at")
        .eq("course_id", course.id)
        .order("enrolled_at", { ascending: false })
    ])

  const teachers = ((teachersResult.data as ProfileRow[] | null) ?? []).map(
    mapProfile
  )

  const students = ((studentsResult.data as ProfileRow[] | null) ?? []).map(
    mapProfile
  )

  const assignedTeacherIds = (
    (assignedTeachersResult.data as CourseTeacherRow[] | null) ?? []
  ).map((row) => row.teacher_id)

  const enrollments =
    (enrollmentsResult.data as EnrollmentRow[] | null) ?? []

  const studentById = students.reduce<Record<string, CourseManageUser>>(
    (acc, student) => {
      acc[student.id] = student
      return acc
    },
    {}
  )

  return {
    course,
    teachers,
    students,
    assignedTeacherIds,
    enrollments: enrollments.map((enrollment) => {
      const student = studentById[enrollment.student_id]

      return {
        id: enrollment.id,
        studentId: enrollment.student_id,
        studentName: student?.fullName ?? "Bilinmeyen öğrenci",
        studentEmail: student?.email ?? "",
        status: enrollment.status,
        enrolledAt: enrollment.enrolled_at
      }
    })
  }
}