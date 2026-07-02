"use server";

import { revalidatePath } from "next/cache";

import { deleteMaterialSchema } from "../schemas/materials.schema";

function getFormString(formData: FormData, key: string): string {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

export async function deleteMaterialAction(formData: FormData): Promise<void> {
  const rawValues = {
    id: getFormString(formData, "id")
  };

  const result = deleteMaterialSchema.safeParse(rawValues);

  if (!result.success) {
    return;
  }

  // TODO: Supabase delete veya archive burada yapılacak.

  revalidatePath("/dashboard/teacher/courses");
  revalidatePath("/dashboard/student/courses");
  revalidatePath("/courses");
}