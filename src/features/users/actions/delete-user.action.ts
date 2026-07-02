"use server";

import { revalidatePath } from "next/cache";

function getUserId(formData: FormData): string {
  const value = formData.get("id");

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

export async function deleteUserAction(formData: FormData): Promise<void> {
  const userId = getUserId(formData);

  if (!userId) {
    return;
  }

  // TODO:
  // Supabase bağlantısı tamamlanınca burada gerçek kullanıcı silme işlemi yapılacak.
  // Şimdilik sadece ilgili sayfalar revalidate ediliyor.

  revalidatePath("/dashboard/admin");
  revalidatePath("/dashboard/admin/users");
}