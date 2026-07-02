import { approvePaymentAction } from "../actions/approve-payment.action"
import { rejectPaymentAction } from "../actions/reject-payment.action"
import {
  formatPaymentAmount,
  formatPaymentDate,
  getPaymentMethodLabel,
} from "../services/payments.service"
import type { Payment } from "../types/payments.types"
import { PaymentStatusBadge } from "./PaymentStatusBadge"

interface PaymentTableProps {
  payments: Payment[]
}

export function PaymentTable({ payments }: PaymentTableProps) {
  if (payments.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
        <h3 className="text-base font-semibold text-slate-950">
          Ödeme kaydı bulunamadı
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Filtreyi değiştir veya yeni manuel ödeme kaydı oluştur.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:hidden">
        {payments.map((payment) => {
          const canTakeAction =
            payment.status === "pending" || payment.status === "overdue"

          return (
            <article
              key={payment.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-slate-950">
                    {payment.studentName}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {payment.courseTitle}
                  </p>
                </div>

                <PaymentStatusBadge status={payment.status} />
              </div>

              <div className="mt-4 grid gap-2 text-sm text-slate-600">
                <p>
                  <span className="font-medium text-slate-800">Tutar:</span>{" "}
                  {formatPaymentAmount(payment.amount, payment.currency)}
                </p>
                <p>
                  <span className="font-medium text-slate-800">Yöntem:</span>{" "}
                  {getPaymentMethodLabel(payment.paymentMethod)}
                </p>
                <p>
                  <span className="font-medium text-slate-800">Son tarih:</span>{" "}
                  {formatPaymentDate(payment.dueAt)}
                </p>
              </div>

              {payment.notes ? (
                <p className="mt-3 rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
                  {payment.notes}
                </p>
              ) : null}

              {canTakeAction ? (
                <div className="mt-4 flex gap-2">
                  <form action={approvePaymentAction}>
                    <input type="hidden" name="paymentId" value={payment.id} />
                    <button
                      type="submit"
                      className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-green-700"
                    >
                      Onayla
                    </button>
                  </form>

                  <form action={rejectPaymentAction}>
                    <input type="hidden" name="paymentId" value={payment.id} />
                    <button
                      type="submit"
                      className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-50"
                    >
                      Başarısız
                    </button>
                  </form>
                </div>
              ) : null}
            </article>
          )
        })}
      </div>

      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Öğrenci
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Kurs
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Tutar
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Durum
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Yöntem
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Son Tarih
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  İşlem
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 bg-white">
              {payments.map((payment) => {
                const canTakeAction =
                  payment.status === "pending" || payment.status === "overdue"

                return (
                  <tr key={payment.id}>
                    <td className="whitespace-nowrap px-4 py-4">
                      <div>
                        <p className="text-sm font-medium text-slate-950">
                          {payment.studentName}
                        </p>
                        <p className="text-xs text-slate-500">
                          {payment.studentId}
                        </p>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <p className="max-w-xs text-sm text-slate-700">
                        {payment.courseTitle}
                      </p>
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-950">
                      {formatPaymentAmount(payment.amount, payment.currency)}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4">
                      <PaymentStatusBadge status={payment.status} />
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                      {getPaymentMethodLabel(payment.paymentMethod)}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                      {formatPaymentDate(payment.dueAt)}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-right">
                      {canTakeAction ? (
                        <div className="flex justify-end gap-2">
                          <form action={approvePaymentAction}>
                            <input
                              type="hidden"
                              name="paymentId"
                              value={payment.id}
                            />
                            <button
                              type="submit"
                              className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-green-700"
                            >
                              Onayla
                            </button>
                          </form>

                          <form action={rejectPaymentAction}>
                            <input
                              type="hidden"
                              name="paymentId"
                              value={payment.id}
                            />
                            <button
                              type="submit"
                              className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-50"
                            >
                              Reddet
                            </button>
                          </form>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">
                          İşlem yok
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}