"use server"

import { revalidatePath } from "next/cache"

import { createPaymentSchema } from "../schemas/payments.schema"
import { createPayment } from "../services/payments.service"

function splitSelectValue(value: string): { id: string; label: string } {
  const parts = value.split("|")
  const id = parts[0] ?? ""
  const label = parts.slice(1).join("|")

  return {
    id,
    label,
  }
}

export async function createPaymentAction(formData: FormData): Promise<void> {
  const selectedStudent = splitSelectValue(String(formData.get("student") ?? ""))
  const selectedCourse = splitSelectValue(String(formData.get("course") ?? ""))

  const rawData = {
    studentId: selectedStudent.id,
    studentName: selectedStudent.label,
    courseId: selectedCourse.id,
    courseTitle: selectedCourse.label,
    amount: formData.get("amount"),
    currency: String(formData.get("currency") ?? "TRY"),
    paymentMethod: String(formData.get("paymentMethod") ?? "manual"),
    dueAt: String(formData.get("dueAt") ?? ""),
    notes: String(formData.get("notes") ?? ""),
  }

  const parsed = createPaymentSchema.safeParse(rawData)

  if (!parsed.success) {
    console.error("createPaymentAction validation error:", parsed.error.flatten())
    return
  }

  await createPayment(parsed.data)

  revalidatePath("/dashboard/admin/payments")
}