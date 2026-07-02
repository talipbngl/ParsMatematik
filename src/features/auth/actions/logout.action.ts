"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { signOut } from "@/features/auth/services/auth.service";

export async function logoutAction(): Promise<void> {
  await signOut();

  revalidatePath("/", "layout");
  redirect("/auth/login");
}