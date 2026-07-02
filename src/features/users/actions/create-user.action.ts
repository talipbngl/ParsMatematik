"use server";

import { revalidatePath } from "next/cache";

import { createUserSchema } from "../schemas/users.schema";

export type CreateUserActionState = {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string[]> | undefined;
};

function getFormString(formData: FormData, key: string): string {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

export async function createUserAction(
  _previousState: CreateUserActionState | null,
  formData: FormData
): Promise<CreateUserActionState> {
  const rawValues = {
    fullName: getFormString(formData, "fullName"),
    email: getFormString(formData, "email"),
    role: getFormString(formData, "role"),
    phone: getFormString(formData, "phone")
  };

  const result = createUserSchema.safeParse(rawValues);

  if (!result.success) {
    return {
      success: false,
      message: "Kullanıcı bilgilerini kontrol et.",
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
      "Kullanıcı oluşturma isteği alındı. Gerçek kayıt Supabase bağlantısından sonra eklenecek."
  };
}