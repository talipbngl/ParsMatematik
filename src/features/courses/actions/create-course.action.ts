"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createCourseSchema } from "../schemas/courses.schema";

function getFormString(formData: FormData, key: string): string {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

export async function createCourseAction(formData: FormData): Promise<void> {
  const rawValues = {
    title: getFormString(formData, "title"),
    description: getFormString(formData, "description"),
    gradeLevel: getFormString(formData, "gradeLevel"),
    price: getFormString(formData, "price"),
    status: getFormString(formData, "status")
  };

  const result = createCourseSchema.safeParse(rawValues);

  if (!result.success) {
    return;
  }

  // TODO: Supabase insert burada yapılacak.

  revalidatePath("/dashboard/teacher/courses");
  revalidatePath("/dashboard/admin/courses");
  revalidatePath("/dashboard/student/courses");
  revalidatePath("/courses");

  redirect("/dashboard/teacher/courses");
}