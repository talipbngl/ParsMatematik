import { ManualPaymentForm } from "@/features/payments/components/ManualPaymentForm"
import { PaymentTable } from "@/features/payments/components/PaymentTable"
import {
  formatPaymentAmount,
  getPayments,
  getPaymentStats,
} from "@/features/payments/services/payments.service"
import {
  PAYMENT_STATUSES,
  type PaymentStatus,
} from "@/features/payments/types/payments.types"

interface AdminPaymentsPageProps {
  searchParams?:
    | Promise<{
        status?: string
        q?: string
      }>
    | {
        status?: string
        q?: string
      }
}

function normalizeStatus(status?: string): PaymentStatus | "all" {
  if (!status || status === "all") {
    return "all"
  }

  const matchedStatus = PAYMENT_STATUSES.find((item) => item === status)

  return matchedStatus ?? "all"
}

function buildStatusHref(status: PaymentStatus | "all"): string {
  if (status === "all") {
    return "/dashboard/admin/payments"
  }

  return `/dashboard/admin/payments?status=${status}`
}

export default async function AdminPaymentsPage({
  searchParams,
}: AdminPaymentsPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams)
  const selectedStatus = normalizeStatus(resolvedSearchParams?.status)
  const search = resolvedSearchParams?.q ?? ""

  const allPayments = await getPayments()
  const payments = await getPayments({
    status: selectedStatus,
    search,
  })
  const stats = await getPaymentStats(allPayments)

  const statCards = [
    {
      title: "Toplam Ödeme",
      value: String(stats.totalPayments),
      description: formatPaymentAmount(stats.totalAmount),
    },
    {
      title: "Ödenen",
      value: String(stats.paidPayments),
      description: formatPaymentAmount(stats.paidAmount),
    },
    {
      title: "Bekleyen",
      value: String(stats.pendingPayments),
      description: formatPaymentAmount(stats.pendingAmount),
    },
    {
      title: "Geciken",
      value: String(stats.overduePayments),
      description: formatPaymentAmount(stats.overdueAmount),
    },
  ]

  const statusFilters: Array<{
    label: string
    value: PaymentStatus | "all"
  }> = [
    { label: "Tümü", value: "all" },
    { label: "Bekleyen", value: "pending" },
    { label: "Ödendi", value: "paid" },
    { label: "Geciken", value: "overdue" },
    { label: "Başarısız", value: "failed" },
    { label: "İade", value: "refunded" },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-indigo-600">Admin Paneli</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
            Ödeme Takibi
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Öğrencilerin ödeme durumlarını takip et, manuel ödeme kaydı oluştur
            ve bekleyen ödemeleri onayla.
          </p>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <article
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-medium text-slate-500">{card.title}</p>
            <p className="mt-2 text-2xl font-bold text-slate-950">
              {card.value}
            </p>
            <p className="mt-1 text-sm text-slate-600">{card.description}</p>
          </article>
        ))}
      </section>

      <ManualPaymentForm />

      <section className="space-y-4">
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">
              Ödeme Listesi
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {payments.length} kayıt listeleniyor.
            </p>
          </div>

          <form className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
            <input
              type="hidden"
              name="status"
              value={selectedStatus}
            />
            <input
              name="q"
              type="search"
              defaultValue={search}
              placeholder="Öğrenci, kurs veya not ara"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 lg:w-72"
            />
            <button
              type="submit"
              className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Ara
            </button>
          </form>
        </div>

        <div className="flex flex-wrap gap-2">
          {statusFilters.map((filter) => {
            const isActive = selectedStatus === filter.value

            return (
              <a
                key={filter.value}
                href={buildStatusHref(filter.value)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-slate-50"
                }`}
              >
                {filter.label}
              </a>
            )
          })}
        </div>

        <PaymentTable payments={payments} />
      </section>
    </div>
  )
}