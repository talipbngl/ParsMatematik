"use server";

import { revalidatePath } from "next/cache";

import { updateUserSchema } from "../schemas/users.schema";

export type UpdateUserActionState = {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string[]> | undefined;
};

function getOptionalFormString(
  formData: FormData,
  key: string
): string | undefined {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return undefined;
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return undefined;
  }

  return trimmedValue;
}

function getRequiredFormString(formData: FormData, key: string): string {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

export async function updateUserAction(
  _previousState: UpdateUserActionState | null,
  formData: FormData
): Promise<UpdateUserActionState> {
  const rawValues = {
    id: getRequiredFormString(formData, "id"),
    fullName: getOptionalFormString(formData, "fullName"),
    email: getOptionalFormString(formData, "email"),
    role: getOptionalFormString(formData, "role"),
    phone: getOptionalFormString(formData, "phone"),
    status: getOptionalFormString(formData, "status")
  };

  const result = updateUserSchema.safeParse(rawValues);

  if (!result.success) {
    return {
      success: false,
      message: "Kullanıcı güncelleme bilgilerini kontrol et.",
      fieldErrors: result.error.flatten().fieldErrors as Record<
        string,
        string[]
      >
    };
  }

  revalidatePath("/dashboard/admin");
  revalidatePath("/dashboard/admin/users");

  return {
    success: true,
    message:
      "Kullanıcı güncelleme isteği alındı. Gerçek güncelleme Supabase bağlantısından sonra yapılacak."
  };
}