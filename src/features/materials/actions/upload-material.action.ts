"use server";

import { revalidatePath } from "next/cache";

import { uploadMaterialSchema } from "../schemas/materials.schema";

function getFormString(formData: FormData, key: string): string {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

export async function uploadMaterialAction(formData: FormData): Promise<void> {
  const courseId = getFormString(formData, "courseId");

  const rawValues = {
    courseId,
    title: getFormString(formData, "title"),
    description: getFormString(formData, "description"),
    type: getFormString(formData, "type"),
    visibility: getFormString(formData, "visibility"),
    filePath: getFormString(formData, "filePath"),
    externalUrl: getFormString(formData, "externalUrl")
  };

  const result = uploadMaterialSchema.safeParse(rawValues);

  if (!result.success) {
    return;
  }

  // TODO: Supabase Storage upload + materials insert burada yapılacak.

  revalidatePath("/dashboard/teacher/courses");
  revalidatePath("/dashboard/student/courses");
  revalidatePath("/courses");
  revalidatePath(`/courses/${courseId}`);
}