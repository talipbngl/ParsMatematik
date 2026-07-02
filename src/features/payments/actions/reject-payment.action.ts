"use server"

import { revalidatePath } from "next/cache"

import { updatePaymentStatusSchema } from "../schemas/payments.schema"
import { rejectPayment } from "../services/payments.service"

export async function rejectPaymentAction(formData: FormData): Promise<void> {
  const rawData = {
    paymentId: String(formData.get("paymentId") ?? ""),
    notes: String(formData.get("notes") ?? ""),
  }

  const parsed = updatePaymentStatusSchema.safeParse(rawData)

  if (!parsed.success) {
    console.error("rejectPaymentAction validation error:", parsed.error.flatten())
    return
  }

  await rejectPayment(parsed.data)

  revalidatePath("/dashboard/admin/payments")
}