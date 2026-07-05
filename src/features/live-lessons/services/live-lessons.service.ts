import { createClient } from "@/lib/supabase/server"

import type {
  LiveLessonListItem,
  LiveLessonStats,
  LiveLessonStatus
} from "../types/live-lessons.types"

type LiveLessonRow = {
  id: string
  course_id: string
  teacher_id: string | null
  title: string
  description: string | null
  starts_at: string
  ends_at: string | null
  duration_minutes?: number | null
  meeting_url: string | null
  recording_url?: string | null
  provider?: string | null
  status: string
  created_at: string
  updated_at: string
}

type CourseRow = {
  id: string
  title: string
}

type ProfileRow = {
  id: string
  full_name: string
}

type EnrollmentRow = {
  course_id: string
  status: string
}

function countEnrollmentsByCourse(
  enrollments: EnrollmentRow[]
): Record<string, number> {
  return enrollments.reduce<Record<string, number>>((acc, enrollment) => {
    if (!["active", "completed"].includes(enrollment.status)) {
      return acc
    }

    acc[enrollment.course_id] = (acc[enrollment.course_id] ?? 0) + 1
    return acc
  }, {})
}
function getDurationMinutes(lesson: LiveLessonRow): number {
  if (lesson.duration_minutes) {
    return lesson.duration_minutes
  }

  if (!lesson.ends_at) {
    return 60
  }

  const startsAt = new Date(lesson.starts_at).getTime()
  const endsAt = new Date(lesson.ends_at).getTime()

  if (Number.isNaN(startsAt) || Number.isNaN(endsAt) || endsAt <= startsAt) {
    return 60
  }

  return Math.round((endsAt - startsAt) / 1000 / 60)
}

async function buildLiveLessonList(
  lessons: LiveLessonRow[]
): Promise<LiveLessonListItem[]> {
  if (lessons.length === 0) {
    return []
  }

  const supabase = await createClient()

  const courseIds = Array.from(new Set(lessons.map((lesson) => lesson.course_id)))
  const teacherIds = Array.from(
    new Set(
      lessons
        .map((lesson) => lesson.teacher_id)
        .filter((teacherId): teacherId is string => Boolean(teacherId))
    )
  )

  const [coursesResult, teachersResult, enrollmentsResult] = await Promise.all([
    supabase.from("courses").select("id, title").in("id", courseIds),
    teacherIds.length > 0
      ? supabase.from("profiles").select("id, full_name").in("id", teacherIds)
      : Promise.resolve({ data: [], error: null }),
    supabase
      .from("course_enrollments")
      .select("course_id, status")
      .in("course_id", courseIds)
  ])

  const courses = (coursesResult.data as CourseRow[] | null) ?? []
  const teachers = (teachersResult.data as ProfileRow[] | null) ?? []
  const enrollments = (enrollmentsResult.data as EnrollmentRow[] | null) ?? []

  const courseTitleById = courses.reduce<Record<string, string>>(
    (acc, course) => {
      acc[course.id] = course.title
      return acc
    },
    {}
  )

  const teacherNameById = teachers.reduce<Record<string, string>>(
    (acc, teacher) => {
      acc[teacher.id] = teacher.full_name
      return acc
    },
    {}
  )

  const enrollmentCountByCourse = countEnrollmentsByCourse(enrollments)

  return lessons.map((lesson) => ({
    id: lesson.id,
    courseId: lesson.course_id,
    courseTitle: courseTitleById[lesson.course_id] ?? "Bilinmeyen kurs",
    teacherId: lesson.teacher_id ?? "",
    teacherName: lesson.teacher_id
      ? teacherNameById[lesson.teacher_id] ?? "Öğretmen"
      : "Öğretmen",
    title: lesson.title,
    description: lesson.description,
    startsAt: lesson.starts_at,
    endsAt: lesson.ends_at,
    durationMinutes: getDurationMinutes(lesson),
    meetingUrl: lesson.meeting_url,
    recordingUrl: lesson.recording_url ?? null,
    provider: (lesson.provider ?? "external") as LiveLessonListItem["provider"],
    status: lesson.status as LiveLessonStatus,
    attendeeCount: enrollmentCountByCourse[lesson.course_id] ?? 0,
    createdAt: lesson.created_at,
    updatedAt: lesson.updated_at
  }))
}

export async function getLiveLessons(): Promise<LiveLessonListItem[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("live_lessons")
    .select("*")
    .order("starts_at", { ascending: true })

  if (error) {
    console.error("[getLiveLessons]", error.message)
    return []
  }

  return buildLiveLessonList((data as unknown as LiveLessonRow[] | null) ?? [])
}

export async function getTeacherLiveLessons(
  teacherId?: string
): Promise<LiveLessonListItem[]> {
  const supabase = await createClient()

  let resolvedTeacherId = teacherId

  if (!resolvedTeacherId) {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    resolvedTeacherId = user?.id
  }

  if (!resolvedTeacherId) {
    return []
  }

  const { data, error } = await supabase
    .from("live_lessons")
    .select("*")
    .eq("teacher_id", resolvedTeacherId)
    .order("starts_at", { ascending: true })

  if (error) {
    console.error("[getTeacherLiveLessons]", error.message)
    return []
  }

  return buildLiveLessonList((data as unknown as LiveLessonRow[] | null) ?? [])
}

export async function getStudentLiveLessons(): Promise<LiveLessonListItem[]> {
  return getLiveLessons()
}

export async function getLiveLessonById(
  id: string
): Promise<LiveLessonListItem | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("live_lessons")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (error || !data) {
    return null
  }

  const lessons = await buildLiveLessonList([data as unknown as LiveLessonRow])
  return lessons[0] ?? null
}

async function getCurrentUserRole(): Promise<{
  id: string
  role: string
} | null> {
  const supabase = await createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("id", user.id)
    .maybeSingle()

  if (!data) {
    return null
  }

  return data as { id: string; role: string }
}

export async function getLiveLessonStats(): Promise<LiveLessonStats> {
  const currentUser = await getCurrentUserRole()

  const lessons =
    currentUser?.role === "teacher"
      ? await getTeacherLiveLessons(currentUser.id)
      : await getLiveLessons()

  return {
    totalLessons: lessons.length,
    scheduledLessons: lessons.filter((lesson) => lesson.status === "scheduled")
      .length,
    liveLessons: lessons.filter((lesson) => lesson.status === "live").length,
    completedLessons: lessons.filter((lesson) => lesson.status === "completed")
      .length,
    cancelledLessons: lessons.filter((lesson) => lesson.status === "cancelled")
      .length
  }
}

export function getLiveLessonStatusLabel(status: LiveLessonStatus): string {
  const labels: Record<LiveLessonStatus, string> = {
    scheduled: "Planlandı",
    live: "Canlı",
    completed: "Tamamlandı",
    cancelled: "İptal"
  }

  return labels[status]
}

export function formatLiveLessonDate(value: string): string {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value))
}