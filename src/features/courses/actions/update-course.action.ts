"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { updateCourseSchema } from "../schemas/courses.schema";

function getFormString(formData: FormData, key: string): string {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

export async function updateCourseAction(formData: FormData): Promise<void> {
  const courseId = getFormString(formData, "id");

  const rawValues = {
    id: courseId,
    title: getFormString(formData, "title"),
    description: getFormString(formData, "description"),
    gradeLevel: getFormString(formData, "gradeLevel"),
    price: getFormString(formData, "price"),
    status: getFormString(formData, "status")
  };

  const result = updateCourseSchema.safeParse(rawValues);

  if (!result.success) {
    return;
  }

  // TODO: Supabase update burada yapılacak.

  revalidatePath("/dashboard/teacher/courses");
  revalidatePath("/dashboard/admin/courses");
  revalidatePath("/dashboard/student/courses");
  revalidatePath("/courses");
  revalidatePath(`/courses/${courseId}`);

  redirect(`/courses/${courseId}`);
}