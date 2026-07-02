import { z } from "zod"

import {
  PAYMENT_CURRENCIES,
  PAYMENT_METHODS,
  PAYMENT_STATUSES,
} from "../types/payments.types"

export const paymentStatusSchema = z.enum(PAYMENT_STATUSES)
export const paymentMethodSchema = z.enum(PAYMENT_METHODS)
export const paymentCurrencySchema = z.enum(PAYMENT_CURRENCIES)

export const createPaymentSchema = z.object({
  studentId: z.string().min(1, "Öğrenci seçilmelidir."),
  studentName: z.string().min(2, "Öğrenci adı en az 2 karakter olmalıdır."),
  courseId: z.string().min(1, "Kurs seçilmelidir."),
  courseTitle: z.string().min(2, "Kurs adı en az 2 karakter olmalıdır."),
  amount: z.coerce.number().positive("Tutar 0'dan büyük olmalıdır."),
  currency: paymentCurrencySchema.default("TRY"),
  paymentMethod: paymentMethodSchema.default("manual"),
  dueAt: z.string().optional(),
  notes: z.string().max(500, "Not en fazla 500 karakter olabilir.").optional(),
})

export const updatePaymentStatusSchema = z.object({
  paymentId: z.string().min(1, "Ödeme ID zorunludur."),
  notes: z.string().max(500, "Not en fazla 500 karakter olabilir.").optional(),
})

export const paymentFilterSchema = z.object({
  status: z.union([paymentStatusSchema, z.literal("all")]).optional(),
  search: z.string().optional(),
})

export type CreatePaymentFormValues = z.infer<typeof createPaymentSchema>
export type UpdatePaymentStatusFormValues = z.infer<
  typeof updatePaymentStatusSchema
>
export type PaymentFilterValues = z.infer<typeof paymentFilterSchema>