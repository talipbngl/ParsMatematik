"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { requireRole } from "@/lib/auth/require-role"
import { createClient } from "@/lib/supabase/server"

import { createCourseSchema } from "../schemas/courses.schema"

function getFormString(formData: FormData, key: string): string {
  const value = formData.get(key)

  if (typeof value !== "string") {
    return ""
  }

  return value.trim()
}

function createSlug(value: string): string {
  const normalized = value
    .toLowerCase()
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ı", "i")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")

  return normalized || "kurs"
}

async function createUniqueSlug(title: string): Promise<string> {
  const supabase = await createClient()
  const baseSlug = createSlug(title)

  for (let index = 0; index < 50; index += 1) {
    const candidate = index === 0 ? baseSlug : `${baseSlug}-${index + 1}`

    const { data, error } = await supabase
      .from("courses")
      .select("id")
      .eq("slug", candidate)
      .maybeSingle()

    if (error) {
      throw new Error(error.message)
    }

    if (!data) {
      return candidate
    }
  }

  return `${baseSlug}-${Date.now()}`
}

export async function createCourseAction(formData: FormData): Promise<void> {
  const profile = await requireRole(["admin"])
  const supabase = await createClient()

  const rawValues = {
    title: getFormString(formData, "title"),
    description: getFormString(formData, "description"),
    gradeLevel: getFormString(formData, "gradeLevel"),
    price: getFormString(formData, "price"),
    status: getFormString(formData, "status")
  }

  const result = createCourseSchema.safeParse(rawValues)

  if (!result.success) {
    return
  }

  const values = result.data
  const slug = await createUniqueSlug(values.title)

  const coursePayload = {
  title: values.title,
  slug,
  description: values.description || "",
  grade_level: values.gradeLevel,
  price: values.price ?? undefined,
  status: values.status ?? "draft",
  created_by: profile.id
} as never

const { error } = await supabase.from("courses").insert(coursePayload)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/dashboard/admin/courses")
  revalidatePath("/dashboard/teacher/courses")
  revalidatePath("/dashboard/student/courses")
  revalidatePath("/courses")

  redirect("/dashboard/admin/courses")
}