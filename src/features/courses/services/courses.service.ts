import { createClient } from "@/lib/supabase/server"
import type { UserRole } from "@/shared/types/role.types"

import type {
  CourseGradeLevel,
  CourseListItem,
  CourseStats,
  CourseStatus
} from "../types/courses.types"

type CourseRow = {
  id: string
  title: string
  slug: string
  description: string | null
  grade_level: string
  status: string
  price: number | null
  cover_image_url: string | null
  created_at: string
  updated_at: string
}

type CourseTeacherRow = {
  course_id: string
  teacher_id: string
}

type ProfileRow = {
  id: string
  full_name: string
}

type CountableCourseRow = {
  course_id: string
}

function countByCourseId(rows: CountableCourseRow[]): Record<string, number> {
  return rows.reduce<Record<string, number>>((acc, row) => {
    acc[row.course_id] = (acc[row.course_id] ?? 0) + 1
    return acc
  }, {})
}

function mapCourseRowToListItem(
  course: CourseRow,
  teacherIdsByCourse: Record<string, string[]>,
  teacherNamesByCourse: Record<string, string[]>,
  enrollmentCounts: Record<string, number>,
  liveLessonCounts: Record<string, number>,
  materialCounts: Record<string, number>,
  assignmentCounts: Record<string, number>
): CourseListItem {
  return {
    id: course.id,
    title: course.title,
    slug: course.slug,
    description: course.description ?? "",
    gradeLevel: course.grade_level as CourseGradeLevel,
    status: course.status as CourseStatus,
    price: course.price,
    coverImageUrl: course.cover_image_url,
    teacherIds: teacherIdsByCourse[course.id] ?? [],
    teacherNames: teacherNamesByCourse[course.id] ?? [],
    enrollmentCount: enrollmentCounts[course.id] ?? 0,
    liveLessonCount: liveLessonCounts[course.id] ?? 0,
    materialCount: materialCounts[course.id] ?? 0,
    assignmentCount: assignmentCounts[course.id] ?? 0,
    createdAt: course.created_at,
    updatedAt: course.updated_at
  }
}

async function buildCourseList(courses: CourseRow[]): Promise<CourseListItem[]> {
  if (courses.length === 0) {
    return []
  }

  const supabase = await createClient()
  const courseIds = courses.map((course) => course.id)

  const [
    courseTeachersResult,
    enrollmentsResult,
    liveLessonsResult,
    materialsResult,
    assignmentsResult
  ] = await Promise.all([
    supabase
      .from("course_teachers")
      .select("course_id, teacher_id")
      .in("course_id", courseIds),
    supabase
      .from("course_enrollments")
      .select("course_id")
      .in("course_id", courseIds),
    supabase.from("live_lessons").select("course_id").in("course_id", courseIds),
    supabase.from("materials").select("course_id").in("course_id", courseIds),
    supabase.from("assignments").select("course_id").in("course_id", courseIds)
  ])

  const courseTeachers =
    (courseTeachersResult.data as CourseTeacherRow[] | null) ?? []

  const teacherIds = Array.from(
    new Set(courseTeachers.map((row) => row.teacher_id))
  )

  let profiles: ProfileRow[] = []

  if (teacherIds.length > 0) {
    const { data } = await supabase
      .from("profiles")
      .select("id, full_name")
      .in("id", teacherIds)

    profiles = (data as ProfileRow[] | null) ?? []
  }

  const profileNameById = profiles.reduce<Record<string, string>>(
    (acc, profile) => {
      acc[profile.id] = profile.full_name
      return acc
    },
    {}
  )

  const teacherIdsByCourse = courseTeachers.reduce<Record<string, string[]>>(
    (acc, row) => {
      acc[row.course_id] = [...(acc[row.course_id] ?? []), row.teacher_id]
      return acc
    },
    {}
  )

  const teacherNamesByCourse = courseTeachers.reduce<Record<string, string[]>>(
    (acc, row) => {
      const teacherName = profileNameById[row.teacher_id]

      if (!teacherName) {
        return acc
      }

      acc[row.course_id] = [...(acc[row.course_id] ?? []), teacherName]
      return acc
    },
    {}
  )

  const enrollmentCounts = countByCourseId(
    ((enrollmentsResult.data as CountableCourseRow[] | null) ?? []).filter(
      Boolean
    )
  )

  const liveLessonCounts = countByCourseId(
    ((liveLessonsResult.data as CountableCourseRow[] | null) ?? []).filter(
      Boolean
    )
  )

  const materialCounts = countByCourseId(
    ((materialsResult.data as CountableCourseRow[] | null) ?? []).filter(Boolean)
  )

  const assignmentCounts = countByCourseId(
    ((assignmentsResult.data as CountableCourseRow[] | null) ?? []).filter(
      Boolean
    )
  )

  return courses.map((course) =>
    mapCourseRowToListItem(
      course,
      teacherIdsByCourse,
      teacherNamesByCourse,
      enrollmentCounts,
      liveLessonCounts,
      materialCounts,
      assignmentCounts
    )
  )
}

export async function getCourses(): Promise<CourseListItem[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("courses")
    .select(
      "id, title, slug, description, grade_level, status, price, cover_image_url, created_at, updated_at"
    )
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[getCourses]", error.message)
    return []
  }

  return buildCourseList((data as CourseRow[] | null) ?? [])
}

export async function getPublishedCourses(): Promise<CourseListItem[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("courses")
    .select(
      "id, title, slug, description, grade_level, status, price, cover_image_url, created_at, updated_at"
    )
    .filter("status", "eq", "published")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[getPublishedCourses]", error.message)
    return []
  }

  return buildCourseList((data as CourseRow[] | null) ?? [])
}

export async function getCourseById(
  courseId: string
): Promise<CourseListItem | null> {
  const supabase = await createClient()

  const isUuid =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      courseId
    )

  const query = supabase
    .from("courses")
    .select(
      "id, title, slug, description, grade_level, status, price, cover_image_url, created_at, updated_at"
    )

  const { data, error } = isUuid
    ? await query.eq("id", courseId).maybeSingle()
    : await query.eq("slug", courseId).maybeSingle()

  if (error || !data) {
    return null
  }

  const courses = await buildCourseList([data as CourseRow])
  return courses[0] ?? null
}

export async function getCourseBySlug(
  slug: string
): Promise<CourseListItem | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("courses")
    .select(
      "id, title, slug, description, grade_level, status, price, cover_image_url, created_at, updated_at"
    )
    .eq("slug", slug)
    .maybeSingle()

  if (error || !data) {
    return null
  }

  const courses = await buildCourseList([data as CourseRow])
  return courses[0] ?? null
}

export async function getCoursesByStatus(
  status: CourseStatus
): Promise<CourseListItem[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("courses")
    .select(
      "id, title, slug, description, grade_level, status, price, cover_image_url, created_at, updated_at"
    )
    .filter("status", "eq", status)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[getCoursesByStatus]", error.message)
    return []
  }

  return buildCourseList((data as CourseRow[] | null) ?? [])
}

export async function getCoursesByGradeLevel(
  gradeLevel: CourseGradeLevel
): Promise<CourseListItem[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("courses")
    .select(
      "id, title, slug, description, grade_level, status, price, cover_image_url, created_at, updated_at"
    )
    .eq("grade_level", gradeLevel)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[getCoursesByGradeLevel]", error.message)
    return []
  }

  return buildCourseList((data as CourseRow[] | null) ?? [])
}

export async function getCoursesForTeacher(
  teacherId?: string
): Promise<CourseListItem[]> {
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

  const { data: courseTeachersData, error } = await supabase
  .from("course_teachers")
  .select("course_id")
  .eq("teacher_id", resolvedTeacherId)

const courseTeachers =
  (courseTeachersData as Array<{ course_id: string }> | null) ?? []

if (error || courseTeachers.length === 0) {
  return []
}

const courseIds = courseTeachers.map((row) => row.course_id)

  const { data, error: coursesError } = await supabase
    .from("courses")
    .select(
      "id, title, slug, description, grade_level, status, price, cover_image_url, created_at, updated_at"
    )
    .in("id", courseIds)
    .order("created_at", { ascending: false })

  if (coursesError) {
    console.error("[getCoursesForTeacher]", coursesError.message)
    return []
  }

  return buildCourseList((data as CourseRow[] | null) ?? [])
}

export async function getCoursesForStudent(): Promise<CourseListItem[]> {
  const supabase = await createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    return []
  }

  const { data: enrollments, error } = await supabase
    .from("course_enrollments")
    .select("course_id")
    .eq("student_id", user.id)
    .or("status.eq.active,status.eq.completed")

  if (error || !enrollments || enrollments.length === 0) {
    return []
  }

  const courseIds = enrollments.map((row) => row.course_id)

  const { data, error: coursesError } = await supabase
    .from("courses")
    .select(
      "id, title, slug, description, grade_level, status, price, cover_image_url, created_at, updated_at"
    )
    .in("id", courseIds)
    .order("created_at", { ascending: false })

  if (coursesError) {
    console.error("[getCoursesForStudent]", coursesError.message)
    return []
  }

  return buildCourseList((data as CourseRow[] | null) ?? [])
}

export async function getCourseStats(): Promise<CourseStats> {
  const courses = await getCourses()

  return {
    totalCourses: courses.length,
    publishedCourses: courses.filter((course) => course.status === "published")
      .length,
    draftCourses: courses.filter((course) => course.status === "draft").length,
    archivedCourses: courses.filter((course) => course.status === "archived")
      .length,
    totalEnrollments: courses.reduce(
      (total, course) => total + course.enrollmentCount,
      0
    )
  }
}

export function getCourseStatusLabel(status: CourseStatus): string {
  const labels: Record<CourseStatus, string> = {
    draft: "Taslak",
    published: "Yayında",
    archived: "Arşiv"
  }

  return labels[status]
}

export function getCourseGradeLevelLabel(
  gradeLevel: CourseGradeLevel
): string {
  const labels: Record<CourseGradeLevel, string> = {
    "5": "5. Sınıf",
    "6": "6. Sınıf",
    "7": "7. Sınıf",
    "8": "8. Sınıf",
    "9": "9. Sınıf",
    "10": "10. Sınıf",
    "11": "11. Sınıf",
    "12": "12. Sınıf",
    tyt: "TYT",
    ayt: "AYT",
    lgs: "LGS",
    other: "Diğer"
  }

  return labels[gradeLevel]
}

export function formatCoursePrice(price: number | null | undefined): string {
  if (price === null || price === undefined) {
    return "Fiyat belirtilmedi"
  }

  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0
  }).format(price)
}

export function getCourseAudienceLabel(role: UserRole): string {
  const labels: Record<UserRole, string> = {
    admin: "Admin",
    teacher: "Öğretmen",
    student: "Öğrenci",
    parent: "Veli"
  }

  return labels[role]
}