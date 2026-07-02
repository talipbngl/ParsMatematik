export const PAYMENT_STATUSES = [
  "pending",
  "paid",
  "failed",
  "refunded",
  "overdue",
] as const

export const PAYMENT_METHODS = [
  "manual",
  "bank_transfer",
  "cash",
  "card",
  "iyzico",
  "paytr",
] as const

export const PAYMENT_CURRENCIES = ["TRY", "USD", "EUR"] as const

export type PaymentStatus = (typeof PAYMENT_STATUSES)[number]
export type PaymentMethod = (typeof PAYMENT_METHODS)[number]
export type PaymentCurrency = (typeof PAYMENT_CURRENCIES)[number]

export interface Payment {
  id: string
  studentId: string
  studentName: string
  courseId: string
  courseTitle: string
  amount: number
  currency: PaymentCurrency
  status: PaymentStatus
  paymentMethod: PaymentMethod
  dueAt: string | null
  paidAt: string | null
  notes: string | null
  createdAt: string
  updatedAt: string
}

export interface CreatePaymentInput {
  studentId: string
  studentName: string
  courseId: string
  courseTitle: string
  amount: number
  currency: PaymentCurrency
  paymentMethod: PaymentMethod
  dueAt?: string | undefined
  notes?: string | undefined
}

export interface UpdatePaymentStatusInput {
  paymentId: string
  notes?: string | undefined
}

export interface PaymentStats {
  totalPayments: number
  paidPayments: number
  pendingPayments: number
  overduePayments: number
  failedPayments: number
  refundedPayments: number
  totalAmount: number
  paidAmount: number
  pendingAmount: number
  overdueAmount: number
}

export interface PaymentFilters {
  status?: PaymentStatus | "all" | undefined
  search?: string | undefined
}

export interface PaymentSelectOption {
  id: string
  label: string
}

export interface PaymentSummaryCard {
  title: string
  value: string
  description: string
}

export interface PaymentStatusMeta {
  label: string
  className: string
}