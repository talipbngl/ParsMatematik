import type {
  CreatePaymentInput,
  Payment,
  PaymentFilters,
  PaymentSelectOption,
  PaymentStats,
  PaymentStatus,
  PaymentStatusMeta,
  UpdatePaymentStatusInput,
} from "../types/payments.types"

const now = new Date().toISOString()

const mockPayments: Payment[] = [
  {
    id: "payment-001",
    studentId: "student-001",
    studentName: "Zeynep Kaya",
    courseId: "course-lgs-8",
    courseTitle: "8. Sınıf LGS Matematik",
    amount: 2500,
    currency: "TRY",
    status: "paid",
    paymentMethod: "bank_transfer",
    dueAt: "2026-07-01T12:00:00.000Z",
    paidAt: "2026-06-28T09:30:00.000Z",
    notes: "Haziran ayı ödemesi alındı.",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "payment-002",
    studentId: "student-002",
    studentName: "Emir Demir",
    courseId: "course-tyt",
    courseTitle: "TYT Matematik",
    amount: 3000,
    currency: "TRY",
    status: "pending",
    paymentMethod: "manual",
    dueAt: "2026-07-10T12:00:00.000Z",
    paidAt: null,
    notes: "Veli IBAN ile ödeme yapacak.",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "payment-003",
    studentId: "student-003",
    studentName: "Defne Şahin",
    courseId: "course-ayt",
    courseTitle: "AYT Matematik",
    amount: 3200,
    currency: "TRY",
    status: "overdue",
    paymentMethod: "manual",
    dueAt: "2026-06-20T12:00:00.000Z",
    paidAt: null,
    notes: "Ödeme tarihi geçti.",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "payment-004",
    studentId: "student-004",
    studentName: "Mert Arslan",
    courseId: "course-9",
    courseTitle: "9. Sınıf Matematik",
    amount: 2200,
    currency: "TRY",
    status: "failed",
    paymentMethod: "card",
    dueAt: "2026-07-05T12:00:00.000Z",
    paidAt: null,
    notes: "Kart işlemi başarısız oldu.",
    createdAt: now,
    updatedAt: now,
  },
]

export async function getPayments(
  filters?: PaymentFilters | undefined,
): Promise<Payment[]> {
  let payments = [...mockPayments]

  if (filters?.status && filters.status !== "all") {
    payments = payments.filter((payment) => payment.status === filters.status)
  }

  if (filters?.search && filters.search.trim().length > 0) {
    const search = filters.search.trim().toLocaleLowerCase("tr-TR")

    payments = payments.filter((payment) => {
      const searchableText = [
        payment.studentName,
        payment.studentId,
        payment.courseTitle,
        payment.courseId,
        payment.notes ?? "",
      ]
        .join(" ")
        .toLocaleLowerCase("tr-TR")

      return searchableText.includes(search)
    })
  }

  return payments.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}

export async function getPaymentById(paymentId: string): Promise<Payment | null> {
  const payment = mockPayments.find((item) => item.id === paymentId)

  return payment ?? null
}

export async function getPaymentsByStudentId(
  studentId: string,
): Promise<Payment[]> {
  return mockPayments.filter((payment) => payment.studentId === studentId)
}

export async function getPaymentsByCourseId(courseId: string): Promise<Payment[]> {
  return mockPayments.filter((payment) => payment.courseId === courseId)
}

export async function createPayment(
  input: CreatePaymentInput,
): Promise<Payment> {
  const createdAt = new Date().toISOString()

  const payment: Payment = {
    id: `payment-${Date.now()}`,
    studentId: input.studentId,
    studentName: input.studentName,
    courseId: input.courseId,
    courseTitle: input.courseTitle,
    amount: input.amount,
    currency: input.currency,
    status: "pending",
    paymentMethod: input.paymentMethod,
    dueAt:
      input.dueAt && input.dueAt.trim().length > 0
        ? new Date(input.dueAt).toISOString()
        : null,
    paidAt: null,
    notes: input.notes && input.notes.trim().length > 0 ? input.notes : null,
    createdAt,
    updatedAt: createdAt,
  }

  mockPayments.unshift(payment)

  return payment
}

export async function approvePayment(
  input: UpdatePaymentStatusInput,
): Promise<Payment | null> {
  return updatePaymentStatus(input.paymentId, "paid", input.notes)
}

export async function rejectPayment(
  input: UpdatePaymentStatusInput,
): Promise<Payment | null> {
  return updatePaymentStatus(input.paymentId, "failed", input.notes)
}

export async function updatePaymentStatus(
  paymentId: string,
  status: PaymentStatus,
  notes?: string,
): Promise<Payment | null> {
  const paymentIndex = mockPayments.findIndex(
    (payment) => payment.id === paymentId,
  )

  if (paymentIndex === -1) {
    return null
  }

  const currentPayment = mockPayments[paymentIndex]

  if (!currentPayment) {
    return null
  }

  const updatedAt = new Date().toISOString()

  const updatedPayment: Payment = {
    id: currentPayment.id,
    studentId: currentPayment.studentId,
    studentName: currentPayment.studentName,
    courseId: currentPayment.courseId,
    courseTitle: currentPayment.courseTitle,
    amount: currentPayment.amount,
    currency: currentPayment.currency,
    status,
    paymentMethod: currentPayment.paymentMethod,
    dueAt: currentPayment.dueAt,
    paidAt: status === "paid" ? updatedAt : currentPayment.paidAt,
    notes:
      notes && notes.trim().length > 0
        ? notes
        : currentPayment.notes,
    createdAt: currentPayment.createdAt,
    updatedAt,
  }

  mockPayments[paymentIndex] = updatedPayment

  return updatedPayment
}

export async function getPaymentStats(
  payments: Payment[] = mockPayments,
): Promise<PaymentStats> {
  const totalAmount = payments.reduce(
    (total, payment) => total + payment.amount,
    0,
  )

  const paidAmount = payments
    .filter((payment) => payment.status === "paid")
    .reduce((total, payment) => total + payment.amount, 0)

  const pendingAmount = payments
    .filter((payment) => payment.status === "pending")
    .reduce((total, payment) => total + payment.amount, 0)

  const overdueAmount = payments
    .filter((payment) => payment.status === "overdue")
    .reduce((total, payment) => total + payment.amount, 0)

  return {
    totalPayments: payments.length,
    paidPayments: payments.filter((payment) => payment.status === "paid")
      .length,
    pendingPayments: payments.filter(
      (payment) => payment.status === "pending",
    ).length,
    overduePayments: payments.filter(
      (payment) => payment.status === "overdue",
    ).length,
    failedPayments: payments.filter(
      (payment) => payment.status === "failed",
    ).length,
    refundedPayments: payments.filter(
      (payment) => payment.status === "refunded",
    ).length,
    totalAmount,
    paidAmount,
    pendingAmount,
    overdueAmount,
  }
}

export function getPaymentStatusMeta(status: PaymentStatus): PaymentStatusMeta {
  const meta: Record<PaymentStatus, PaymentStatusMeta> = {
    pending: {
      label: "Bekliyor",
      className: "bg-yellow-50 text-yellow-700 ring-yellow-600/20",
    },
    paid: {
      label: "Ödendi",
      className: "bg-green-50 text-green-700 ring-green-600/20",
    },
    failed: {
      label: "Başarısız",
      className: "bg-red-50 text-red-700 ring-red-600/20",
    },
    refunded: {
      label: "İade Edildi",
      className: "bg-slate-50 text-slate-700 ring-slate-600/20",
    },
    overdue: {
      label: "Gecikti",
      className: "bg-orange-50 text-orange-700 ring-orange-600/20",
    },
  }

  return meta[status]
}

export function getPaymentStatusLabel(status: PaymentStatus): string {
  return getPaymentStatusMeta(status).label
}

export function getPaymentStatusClassName(status: PaymentStatus): string {
  return getPaymentStatusMeta(status).className
}

export function getPaymentMethodLabel(method: string): string {
  const labels: Record<string, string> = {
    manual: "Manuel",
    bank_transfer: "Havale / EFT",
    cash: "Nakit",
    card: "Kart",
    iyzico: "iyzico",
    paytr: "PayTR",
  }

  return labels[method] ?? method
}

export function getMockPaymentStudentOptions(): PaymentSelectOption[] {
  return [
    { id: "student-001", label: "Zeynep Kaya" },
    { id: "student-002", label: "Emir Demir" },
    { id: "student-003", label: "Defne Şahin" },
    { id: "student-004", label: "Mert Arslan" },
  ]
}

export function getMockPaymentCourseOptions(): PaymentSelectOption[] {
  return [
    { id: "course-lgs-8", label: "8. Sınıf LGS Matematik" },
    { id: "course-tyt", label: "TYT Matematik" },
    { id: "course-ayt", label: "AYT Matematik" },
    { id: "course-9", label: "9. Sınıf Matematik" },
  ]
}

export function formatPaymentAmount(
  amount: number,
  currency: string = "TRY",
): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPaymentDate(date: string | null): string {
  if (!date) {
    return "-"
  }

  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date))
}