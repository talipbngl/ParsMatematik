import { createClient } from "@/lib/supabase/server"
import type {
  AssignmentListItem,
  AssignmentStats,
  AssignmentStatus,
  AssignmentSubmission,
  AssignmentSubmissionStatus
} from "../types/assignments.types"

type AssignmentRow = {
  id: string
  course_id: string
  teacher_id: string | null
  title: string
  description: string
  due_at: string | null
  max_score: number | string | null
  status: string
  created_by: string | null
  created_at: string
  updated_at: string
}

type AssignmentSubmissionRow = {
  id: string
  assignment_id: string
  student_id: string
  answer_text: string | null
  file_path: string | null
  submitted_at: string | null
  score: number | string | null
  feedback: string | null
  status: string
  graded_at?: string | null
  graded_by?: string | null
  created_at: string
  updated_at: string
}

type CourseRow = {
  id: string
  title: string
}

type ProfileRow = {
  id: string
  full_name: string | null
}

type CourseIdRow = {
  course_id: string
}

type SubmissionCountRow = {
  assignment_id: string
  status: string
}

const assignmentStatuses: AssignmentStatus[] = [
  "draft",
  "published",
  "closed"
]

const submissionStatuses: AssignmentSubmissionStatus[] = [
  "not_submitted",
  "submitted",
  "graded",
  "late"
]

function normalizeAssignmentStatus(
  status: string | null | undefined
): AssignmentStatus {
  if (status && assignmentStatuses.includes(status as AssignmentStatus)) {
    return status as AssignmentStatus
  }

  return "draft"
}

function normalizeSubmissionStatus(
  status: string | null | undefined
): AssignmentSubmissionStatus {
  if (
    status &&
    submissionStatuses.includes(status as AssignmentSubmissionStatus)
  ) {
    return status as AssignmentSubmissionStatus
  }

  return "not_submitted"
}

function toNullableNumber(value: number | string | null | undefined) {
  if (value === null || value === undefined || value === "") {
    return null
  }

  const numericValue = Number(value)

  if (Number.isNaN(numericValue)) {
    return null
  }

  return numericValue
}

async function getCourseTitleMap(
  courseIds: string[]
): Promise<Record<string, string>> {
  if (courseIds.length === 0) {
    return {}
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from("courses")
    .select("id, title")
    .in("id", courseIds)

  if (error) {
    console.error("[assignments.getCourseTitleMap]", error.message)
    return {}
  }

  return ((data as CourseRow[] | null) ?? []).reduce<Record<string, string>>(
    (acc, course) => {
      acc[course.id] = course.title
      return acc
    },
    {}
  )
}

async function getProfileNameMap(
  profileIds: string[]
): Promise<Record<string, string>> {
  if (profileIds.length === 0) {
    return {}
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name")
    .in("id", profileIds)

  if (error) {
    console.error("[assignments.getProfileNameMap]", error.message)
    return {}
  }

  return ((data as ProfileRow[] | null) ?? []).reduce<Record<string, string>>(
    (acc, profile) => {
      acc[profile.id] = profile.full_name ?? "İsimsiz kullanıcı"
      return acc
    },
    {}
  )
}

async function getSubmissionCountMap(assignmentIds: string[]) {
  if (assignmentIds.length === 0) {
    return {
      submissionCountByAssignmentId: {},
      gradedCountByAssignmentId: {}
    }
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from("assignment_submissions")
    .select("*")
    .in("assignment_id", assignmentIds)

  if (error) {
    console.error("[assignments.getSubmissionCountMap]", error.message)

    return {
      submissionCountByAssignmentId: {},
      gradedCountByAssignmentId: {}
    }
  }

  const rows = (data as unknown as SubmissionCountRow[] | null) ?? []

  const submissionCountByAssignmentId = rows.reduce<Record<string, number>>(
    (acc, row) => {
      if (row.status !== "not_submitted") {
        acc[row.assignment_id] = (acc[row.assignment_id] ?? 0) + 1
      }

      return acc
    },
    {}
  )

  const gradedCountByAssignmentId = rows.reduce<Record<string, number>>(
    (acc, row) => {
      if (row.status === "graded") {
        acc[row.assignment_id] = (acc[row.assignment_id] ?? 0) + 1
      }

      return acc
    },
    {}
  )

  return {
    submissionCountByAssignmentId,
    gradedCountByAssignmentId
  }
}

async function mapAssignmentRows(
  rows: AssignmentRow[]
): Promise<AssignmentListItem[]> {
  if (rows.length === 0) {
    return []
  }

  const courseIds = Array.from(new Set(rows.map((row) => row.course_id)))
  const teacherIds = Array.from(
    new Set(
      rows
        .map((row) => row.teacher_id)
        .filter((teacherId): teacherId is string => Boolean(teacherId))
    )
  )
  const assignmentIds = rows.map((row) => row.id)

  const [courseTitleById, teacherNameById, submissionCounts] =
    await Promise.all([
      getCourseTitleMap(courseIds),
      getProfileNameMap(teacherIds),
      getSubmissionCountMap(assignmentIds)
    ])

  return rows.map((row) => ({
    id: row.id,
    courseId: row.course_id,
    courseTitle: courseTitleById[row.course_id] ?? "Bilinmeyen kurs",
    teacherId: row.teacher_id ?? "",
    teacherName: row.teacher_id
      ? teacherNameById[row.teacher_id] ?? "İsimsiz öğretmen"
      : "İsimsiz öğretmen",
    title: row.title,
    description: row.description,
    dueAt: row.due_at,
    maxScore: toNullableNumber(row.max_score),
    status: normalizeAssignmentStatus(row.status),
    submissionCount:
      submissionCounts.submissionCountByAssignmentId[row.id] ?? 0,
    gradedCount: submissionCounts.gradedCountByAssignmentId[row.id] ?? 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }))
}

async function mapSubmissionRows(
  rows: AssignmentSubmissionRow[]
): Promise<AssignmentSubmission[]> {
  if (rows.length === 0) {
    return []
  }

  const studentIds = Array.from(new Set(rows.map((row) => row.student_id)))
  const studentNameById = await getProfileNameMap(studentIds)

  return rows.map((row) => ({
    id: row.id,
    assignmentId: row.assignment_id,
    studentId: row.student_id,
    studentName: studentNameById[row.student_id] ?? "İsimsiz öğrenci",
    answerText: row.answer_text,
    filePath: row.file_path,
    submittedAt: row.submitted_at,
    score: toNullableNumber(row.score),
    feedback: row.feedback,
    status: normalizeSubmissionStatus(row.status)
  }))
}

async function getAssignmentsByCourseIds(
  courseIds: string[],
  options?: {
    onlyVisibleToStudents?: boolean
  }
): Promise<AssignmentListItem[]> {
  if (courseIds.length === 0) {
    return []
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from("assignments")
    .select("*")
    .in("course_id", courseIds)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[assignments.getAssignmentsByCourseIds]", error.message)
    return []
  }

  let rows = (data as unknown as AssignmentRow[] | null) ?? []

  if (options?.onlyVisibleToStudents) {
    rows = rows.filter(
      (assignment) =>
        assignment.status === "published" || assignment.status === "closed"
    )
  }

  return mapAssignmentRows(rows)
}

export async function getAssignments(): Promise<AssignmentListItem[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("assignments")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[assignments.getAssignments]", error.message)
    return []
  }

  return mapAssignmentRows((data as unknown as AssignmentRow[] | null) ?? [])
}

export async function getTeacherAssignments(): Promise<AssignmentListItem[]> {
  const supabase = await createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    return []
  }

  const { data, error } = await supabase
    .from("course_teachers")
    .select("course_id")
    .eq("teacher_id", user.id)

  if (error) {
    console.error("[assignments.getTeacherAssignments]", error.message)
    return []
  }

  const courseIds = ((data as CourseIdRow[] | null) ?? []).map(
    (row) => row.course_id
  )

  return getAssignmentsByCourseIds(courseIds)
}

export async function getStudentAssignments(): Promise<AssignmentListItem[]> {
  const supabase = await createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    return []
  }

  const { data, error } = await supabase
    .from("course_enrollments")
    .select("course_id")
    .eq("student_id", user.id)
    .or("status.eq.active,status.eq.completed")

  if (error) {
    console.error("[assignments.getStudentAssignments]", error.message)
    return []
  }

  const courseIds = ((data as CourseIdRow[] | null) ?? []).map(
    (row) => row.course_id
  )

  return getAssignmentsByCourseIds(courseIds, {
    onlyVisibleToStudents: true
  })
}

export async function getAssignmentById(
  id: string
): Promise<AssignmentListItem | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("assignments")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (error) {
    console.error("[assignments.getAssignmentById]", error.message)
    return null
  }

  if (!data) {
    return null
  }

  const [assignment] = await mapAssignmentRows([
    data as unknown as AssignmentRow
  ])

  return assignment ?? null
}

export async function getAssignmentSubmissions(
  assignmentId: string
): Promise<AssignmentSubmission[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("assignment_submissions")
    .select("*")
    .eq("assignment_id", assignmentId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[assignments.getAssignmentSubmissions]", error.message)
    return []
  }

  return mapSubmissionRows(
    (data as unknown as AssignmentSubmissionRow[] | null) ?? []
  )
}

export async function getRecentAssignmentSubmissions(): Promise<
  AssignmentSubmission[]
> {
  const assignments = await getTeacherAssignments()
  const assignmentIds = assignments.map((assignment) => assignment.id)

  if (assignmentIds.length === 0) {
    return []
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from("assignment_submissions")
    .select("*")
    .in("assignment_id", assignmentIds)
    .order("created_at", { ascending: false })
    .limit(10)

  if (error) {
    console.error("[assignments.getRecentAssignmentSubmissions]", error.message)
    return []
  }

  return mapSubmissionRows(
    (data as unknown as AssignmentSubmissionRow[] | null) ?? []
  )
}

export async function getAssignmentStats(): Promise<AssignmentStats> {
  const assignments = await getAssignments()
  const recentSubmissions = await getRecentAssignmentSubmissions()

  const fallbackTotalSubmissions = assignments.reduce(
    (total, assignment) => total + assignment.submissionCount,
    0
  )

  const fallbackGradedSubmissions = assignments.reduce(
    (total, assignment) => total + assignment.gradedCount,
    0
  )

  return {
    totalAssignments: assignments.length,
    draftAssignments: assignments.filter(
      (assignment) => assignment.status === "draft"
    ).length,
    publishedAssignments: assignments.filter(
      (assignment) => assignment.status === "published"
    ).length,
    closedAssignments: assignments.filter(
      (assignment) => assignment.status === "closed"
    ).length,
    totalSubmissions:
      recentSubmissions.length > 0
        ? recentSubmissions.length
        : fallbackTotalSubmissions,
    gradedSubmissions:
      recentSubmissions.length > 0
        ? recentSubmissions.filter((submission) => submission.status === "graded")
            .length
        : fallbackGradedSubmissions
  }
}

export async function getTeacherAssignmentStats(): Promise<AssignmentStats> {
  const assignments = await getTeacherAssignments()

  return {
    totalAssignments: assignments.length,
    draftAssignments: assignments.filter(
      (assignment) => assignment.status === "draft"
    ).length,
    publishedAssignments: assignments.filter(
      (assignment) => assignment.status === "published"
    ).length,
    closedAssignments: assignments.filter(
      (assignment) => assignment.status === "closed"
    ).length,
    totalSubmissions: assignments.reduce(
      (total, assignment) => total + assignment.submissionCount,
      0
    ),
    gradedSubmissions: assignments.reduce(
      (total, assignment) => total + assignment.gradedCount,
      0
    )
  }
}

export async function getStudentAssignmentStats(): Promise<AssignmentStats> {
  const assignments = await getStudentAssignments()

  return {
    totalAssignments: assignments.length,
    draftAssignments: assignments.filter(
      (assignment) => assignment.status === "draft"
    ).length,
    publishedAssignments: assignments.filter(
      (assignment) => assignment.status === "published"
    ).length,
    closedAssignments: assignments.filter(
      (assignment) => assignment.status === "closed"
    ).length,
    totalSubmissions: assignments.reduce(
      (total, assignment) => total + assignment.submissionCount,
      0
    ),
    gradedSubmissions: assignments.reduce(
      (total, assignment) => total + assignment.gradedCount,
      0
    )
  }
}

export function getAssignmentStatusLabel(status: AssignmentStatus): string {
  const labels: Record<AssignmentStatus, string> = {
    draft: "Taslak",
    published: "Yayında",
    closed: "Kapandı"
  }

  return labels[status]
}

export function formatAssignmentDate(value: string | null | undefined): string {
  if (!value) {
    return "Teslim tarihi yok"
  }

  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value))
}