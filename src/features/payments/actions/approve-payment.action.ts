"use server"

import { revalidatePath } from "next/cache"

import { updatePaymentStatusSchema } from "../schemas/payments.schema"
import { approvePayment } from "../services/payments.service"

export async function approvePaymentAction(formData: FormData): Promise<void> {
  const rawData = {
    paymentId: String(formData.get("paymentId") ?? ""),
    notes: String(formData.get("notes") ?? ""),
  }

  const parsed = updatePaymentStatusSchema.safeParse(rawData)

  if (!parsed.success) {
    console.error(
      "approvePaymentAction validation error:",
      parsed.error.flatten(),
    )
    return
  }

  await approvePayment(parsed.data)

  revalidatePath("/dashboard/admin/payments")
}