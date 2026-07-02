import type { PaymentStatus } from "../types/payments.types"
import {
  getPaymentStatusClassName,
  getPaymentStatusLabel,
} from "../services/payments.service"

interface PaymentStatusBadgeProps {
  status: PaymentStatus
}

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${getPaymentStatusClassName(
        status,
      )}`}
    >
      {getPaymentStatusLabel(status)}
    </span>
  )
}