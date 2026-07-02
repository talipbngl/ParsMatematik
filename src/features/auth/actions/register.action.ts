"use server";

import { revalidatePath } from "next/cache";

import { signUpWithEmail } from "@/features/auth/services/auth.service";
import { registerSchema } from "@/features/auth/schemas/auth.schema";
import { handleError } from "@/lib/errors/error-handler";
import type { ActionResult } from "@/shared/types/common.types";
import type { AuthActionData } from "@/features/auth/types/auth.types";

export async function registerAction(
  _previousState: ActionResult<AuthActionData> | null,
  formData: FormData
): Promise<ActionResult<AuthActionData>> {
  try {
    const parsedValues = registerSchema.parse({
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      role: formData.get("role") || "student"
    });

    const data = await signUpWithEmail(parsedValues);

    revalidatePath("/", "layout");

    return {
      success: true,
      message:
        "Kayıt başarılı. E-posta doğrulaması açıksa gelen kutunu kontrol etmelisin.",
      data
    };
  } catch (error) {
    return handleError(error, {
      fallbackMessage: "Kayıt işlemi tamamlanamadı."
    }) as ActionResult<AuthActionData>;
  }
}