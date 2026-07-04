"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const createUserSchema = z.object({
  fullName: z.string().min(2, "Ad soyad en az 2 karakter olmalı."),
  email: z.string().email("Geçerli bir e-posta adresi yazmalısın."),
  password: z.string().min(6, "Şifre en az 6 karakter olmalı."),
  role: z.enum(["teacher", "student", "parent"]),
  phone: z.string().optional()
});

export type CreateUserActionState = {
  success: boolean;
  message: string;
};

export async function createUserAction(
  _previousState: CreateUserActionState,
  formData: FormData
): Promise<CreateUserActionState> {
  try {
    const values = createUserSchema.parse({
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
      phone: formData.get("phone") || undefined
    });

    const supabase = await createClient();

    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        success: false,
        message: "Bu işlem için giriş yapmalısın."
      };
    }

    const { data: currentProfile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || currentProfile?.role !== "admin") {
      return {
        success: false,
        message: "Bu işlem sadece admin kullanıcılar tarafından yapılabilir."
      };
    }

    const adminSupabase = createAdminClient();

    const { data, error } = await adminSupabase.auth.admin.createUser({
      email: values.email,
      password: values.password,
      email_confirm: true,
      user_metadata: {
        full_name: values.fullName,
        role: values.role
      }
    });

    if (error || !data.user) {
      return {
        success: false,
        message: error?.message ?? "Kullanıcı oluşturulamadı."
      };
    }

    if (values.phone) {
      await adminSupabase
        .from("profiles")
        .update({
          phone: values.phone
        })
        .eq("id", data.user.id);
    }

    revalidatePath("/dashboard/admin/users");

    return {
      success: true,
      message: "Kullanıcı başarıyla oluşturuldu."
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.issues[0]?.message ?? "Form bilgileri hatalı."
      };
    }

    return {
      success: false,
      message: "Kullanıcı oluşturulurken beklenmeyen bir hata oluştu."
    };
  }
}