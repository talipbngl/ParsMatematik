import { createClient } from "@/lib/supabase/server"
import type {
  MaterialListItem,
  MaterialStats,
  MaterialType,
  MaterialVisibility
} from "../types/materials.types"

type MaterialDbRow = {
  id: string
  course_id: string
  teacher_id?: string | null
  uploader_id?: string | null
  title: string
  description?: string | null
  type?: string | null
  file_type?: string | null
  visibility?: string | null
  file_url?: string | null
  file_path?: string | null
  external_url?: string | null
  mime_type?: string | null
  size_bytes?: number | null
  sort_order?: number | null
  is_published?: boolean | null
  created_at: string
  updated_at: string
}

type CourseRow = {
  id: string
  title: string
}

type CourseIdRow = {
  course_id: string
}

const materialTypes: MaterialType[] = [
  "pdf",
  "video",
  "link",
  "image",
  "document"
]

const materialVisibilities: MaterialVisibility[] = [
  "private",
  "course",
  "public"
]

function normalizeMaterialType(value: string | null | undefined): MaterialType {
  if (value && materialTypes.includes(value as MaterialType)) {
    return value as MaterialType
  }

  if (value === "video_link") {
    return "video"
  }

  if (value === "external_link") {
    return "link"
  }

  return "link"
}

function normalizeMaterialVisibility(
  value: string | null | undefined
): MaterialVisibility {
  if (value && materialVisibilities.includes(value as MaterialVisibility)) {
    return value as MaterialVisibility
  }

  return "course"
}

function isExternalUrl(value: string | null | undefined): boolean {
  return Boolean(value?.startsWith("http://") || value?.startsWith("https://"))
}

function isPublished(material: MaterialDbRow): boolean {
  return material.is_published !== false
}

async function getSignedMaterialUrl(
  filePath: string | null | undefined
): Promise<string | null> {
  if (!filePath || isExternalUrl(filePath)) {
    return filePath ?? null
  }

  const supabase = await createClient()

  const { data, error } = await supabase.storage
    .from("materials")
    .createSignedUrl(filePath, 60 * 60)

  if (error) {
    console.error("[materials.getSignedMaterialUrl]", error.message)
    return null
  }

  return data.signedUrl
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
    console.error("[materials.getCourseTitleMap]", error.message)
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

async function mapMaterialRows(
  rows: MaterialDbRow[]
): Promise<MaterialListItem[]> {
  if (rows.length === 0) {
    return []
  }

  const courseIds = Array.from(new Set(rows.map((row) => row.course_id)))
  const courseTitleById = await getCourseTitleMap(courseIds)

  return Promise.all(
    rows.map(async (row) => {
      const externalUrl =
        row.external_url ??
        (isExternalUrl(row.file_path) ? row.file_path : null) ??
        (isExternalUrl(row.file_url) ? row.file_url : null)

      const filePath =
        row.file_path && !isExternalUrl(row.file_path) ? row.file_path : null

      const signedFileUrl = filePath
        ? await getSignedMaterialUrl(filePath)
        : null

      const fileUrl = externalUrl ?? signedFileUrl ?? row.file_url ?? null

      return {
        id: row.id,
        courseId: row.course_id,
        courseTitle: courseTitleById[row.course_id] ?? "Bilinmeyen kurs",
        title: row.title,
        description: row.description ?? "",
        type: normalizeMaterialType(row.type ?? row.file_type),
        visibility: normalizeMaterialVisibility(row.visibility),
        fileUrl,
        externalUrl,
        filePath,
        mimeType: row.mime_type ?? null,
        sizeBytes: row.size_bytes ?? null,
        order: row.sort_order ?? 0,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      }
    })
  )
}

async function getMaterialsByCourseIds(
  courseIds: string[],
  options?: {
    onlyPublished?: boolean
    includePrivate?: boolean
  }
): Promise<MaterialListItem[]> {
  if (courseIds.length === 0) {
    return []
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from("materials")
    .select("*")
    .in("course_id", courseIds)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[materials.getMaterialsByCourseIds]", error.message)
    return []
  }

  let rows = (data as unknown as MaterialDbRow[] | null) ?? []

  if (options?.onlyPublished) {
    rows = rows.filter(isPublished)
  }

  if (!options?.includePrivate) {
    rows = rows.filter((row) => row.visibility !== "private")
  }

  return mapMaterialRows(rows)
}

export async function getMaterials(): Promise<MaterialListItem[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("materials")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[materials.getMaterials]", error.message)
    return []
  }

  return mapMaterialRows((data as unknown as MaterialDbRow[] | null) ?? [])
}

export async function getTeacherMaterials(): Promise<MaterialListItem[]> {
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
    console.error(
      "[materials.getTeacherMaterials.course_teachers]",
      error.message
    )
    return []
  }

  const courseIds = ((data as CourseIdRow[] | null) ?? []).map(
    (row) => row.course_id
  )

  return getMaterialsByCourseIds(courseIds, {
    includePrivate: true
  })
}

export async function getStudentMaterials(): Promise<MaterialListItem[]> {
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

  if (error) {
    console.error(
      "[materials.getStudentMaterials.course_enrollments]",
      error.message
    )
    return []
  }

  const courseIds = ((data as CourseIdRow[] | null) ?? []).map(
    (row) => row.course_id
  )

  return getMaterialsByCourseIds(courseIds, {
    onlyPublished: true,
    includePrivate: false
  })
}

export async function getMaterialsByCourseId(
  courseId: string
): Promise<MaterialListItem[]> {
  const materials = await getMaterialsByCourseIds([courseId], {
    onlyPublished: true,
    includePrivate: false
  })

  return materials.sort((a, b) => a.order - b.order)
}

export async function getMaterialById(
  id: string
): Promise<MaterialListItem | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("materials")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (error) {
    console.error("[materials.getMaterialById]", error.message)
    return null
  }

  if (!data) {
    return null
  }

  const [material] = await mapMaterialRows([data as unknown as MaterialDbRow])

  return material ?? null
}

export async function getPublicMaterials(): Promise<MaterialListItem[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("materials")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[materials.getPublicMaterials]", error.message)
    return []
  }

  const rows = ((data as unknown as MaterialDbRow[] | null) ?? []).filter(
    (row) => row.visibility === "public" && isPublished(row)
  )

  return mapMaterialRows(rows)
}

export async function getMaterialStats(): Promise<MaterialStats> {
  const materials = await getMaterials()

  return calculateMaterialStats(materials)
}

export async function getTeacherMaterialStats(): Promise<MaterialStats> {
  const materials = await getTeacherMaterials()

  return calculateMaterialStats(materials)
}

export async function getStudentMaterialStats(): Promise<MaterialStats> {
  const materials = await getStudentMaterials()

  return calculateMaterialStats(materials)
}

export function calculateMaterialStats(
  materials: MaterialListItem[]
): MaterialStats {
  return {
    totalMaterials: materials.length,
    pdfCount: materials.filter((material) => material.type === "pdf").length,
    videoCount: materials.filter((material) => material.type === "video")
      .length,
    linkCount: materials.filter((material) => material.type === "link").length,
    imageCount: materials.filter((material) => material.type === "image")
      .length,
    documentCount: materials.filter((material) => material.type === "document")
      .length
  }
}

export function getMaterialTypeLabel(type: MaterialType): string {
  const labels: Record<MaterialType, string> = {
    pdf: "PDF",
    video: "Video",
    link: "Link",
    image: "Görsel",
    document: "Doküman"
  }

  return labels[type]
}

export function getMaterialVisibilityLabel(
  visibility: MaterialVisibility
): string {
  const labels: Record<MaterialVisibility, string> = {
    private: "Özel",
    course: "Kursa Özel",
    public: "Herkese Açık"
  }

  return labels[visibility]
}

export function formatMaterialSize(
  sizeBytes: number | null | undefined
): string {
  if (!sizeBytes) {
    return "Boyut yok"
  }

  const megabytes = sizeBytes / 1024 / 1024

  if (megabytes >= 1) {
    return `${megabytes.toFixed(1)} MB`
  }

  const kilobytes = sizeBytes / 1024

  return `${kilobytes.toFixed(0)} KB`
}

export function getMaterialUrl(material: MaterialListItem): string | null {
  return material.externalUrl ?? material.fileUrl ?? material.filePath ?? null
}