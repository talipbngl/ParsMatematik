"use server";

import { revalidatePath } from "next/cache";

import { signInWithEmail } from "@/features/auth/services/auth.service";
import { loginSchema } from "@/features/auth/schemas/auth.schema";
import { handleError } from "@/lib/errors/error-handler";
import type { ActionResult } from "@/shared/types/common.types";
import type { AuthActionData } from "@/features/auth/types/auth.types";

export async function loginAction(
  _previousState: ActionResult<AuthActionData> | null,
  formData: FormData
): Promise<ActionResult<AuthActionData>> {
  try {
    const parsedValues = loginSchema.parse({
      email: formData.get("email"),
      password: formData.get("password")
    });

    const data = await signInWithEmail(parsedValues);

    revalidatePath("/", "layout");

    return {
      success: true,
      message: "Giriş başarılı. Panele yönlendiriliyorsun.",
      data
    };
  } catch (error) {
    return handleError(error, {
      fallbackMessage: "Giriş işlemi tamamlanamadı."
    }) as ActionResult<AuthActionData>;
  }
}