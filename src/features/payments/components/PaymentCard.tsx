import { approvePaymentAction } from "../actions/approve-payment.action"
import { rejectPaymentAction } from "../actions/reject-payment.action"
import {
  formatPaymentAmount,
  formatPaymentDate,
} from "../services/payments.service"
import type { Payment } from "../types/payments.types"
import { PaymentStatusBadge } from "./PaymentStatusBadge"

interface PaymentCardProps {
  payment: Payment
}

export function PaymentCard({ payment }: PaymentCardProps) {
  const canApprove = payment.status === "pending" || payment.status === "overdue"
  const canReject = payment.status === "pending" || payment.status === "overdue"

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-slate-950">
              {payment.studentName}
            </h3>
            <PaymentStatusBadge status={payment.status} />
          </div>

          <p className="mt-1 text-sm text-slate-600">{payment.courseTitle}</p>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-lg font-bold text-slate-950">
            {formatPaymentAmount(payment.amount, payment.currency)}
          </p>
          <p className="text-xs text-slate-500">
            Son tarih: {formatPaymentDate(payment.dueAt)}
          </p>
        </div>
      </div>

      {payment.notes ? (
        <p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
          {payment.notes}
        </p>
      ) : null}

      <div className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
        <p>
          <span className="font-medium text-slate-800">Ödeme yöntemi:</span>{" "}
          {payment.paymentMethod}
        </p>
        <p>
          <span className="font-medium text-slate-800">Ödeme tarihi:</span>{" "}
          {formatPaymentDate(payment.paidAt)}
        </p>
      </div>

      {canApprove || canReject ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {canApprove ? (
            <form action={approvePaymentAction}>
              <input type="hidden" name="paymentId" value={payment.id} />
              <button
                type="submit"
                className="rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
              >
                Ödendi İşaretle
              </button>
            </form>
          ) : null}

          {canReject ? (
            <form action={rejectPaymentAction}>
              <input type="hidden" name="paymentId" value={payment.id} />
              <button
                type="submit"
                className="rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50"
              >
                Başarısız İşaretle
              </button>
            </form>
          ) : null}
        </div>
      ) : null}
    </article>
  )
}