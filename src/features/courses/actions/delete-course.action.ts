"use server";

import { revalidatePath } from "next/cache";

function getCourseId(formData: FormData): string {
  const value = formData.get("id");

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

export async function deleteCourseAction(formData: FormData): Promise<void> {
  const courseId = getCourseId(formData);

  if (!courseId) {
    return;
  }

  // TODO: Supabase delete/archive burada yapılacak.
  // İlk MVP'de hard delete yerine status='archived' daha mantıklı olacak.

  revalidatePath("/dashboard/teacher/courses");
  revalidatePath("/dashboard/admin/courses");
  revalidatePath("/dashboard/student/courses");
  revalidatePath("/courses");
}