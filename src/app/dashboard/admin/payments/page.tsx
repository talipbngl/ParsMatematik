import { AlertTriangle, CheckCircle2, Clock3, CreditCard } from "lucide-react"

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
import { PageHeader } from "@/shared/components/layout/PageHeader"
import { SectionHeader } from "@/shared/components/layout/SectionHeader"
import { DashboardStatCard } from "@/shared/components/ui/DashboardStatCard"

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
      <PageHeader
        eyebrow="Admin Paneli"
        title="Ödeme Takibi"
        description="Öğrencilerin ödeme durumlarını takip et, manuel ödeme kaydı oluştur ve bekleyen ödemeleri onayla."
        variant="card"
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          title="Toplam Ödeme"
          value={String(stats.totalPayments)}
          description={formatPaymentAmount(stats.totalAmount)}
          icon={CreditCard}
          tone="indigo"
        />
        <DashboardStatCard
          title="Ödenen"
          value={String(stats.paidPayments)}
          description={formatPaymentAmount(stats.paidAmount)}
          icon={CheckCircle2}
          tone="emerald"
        />
        <DashboardStatCard
          title="Bekleyen"
          value={String(stats.pendingPayments)}
          description={formatPaymentAmount(stats.pendingAmount)}
          icon={Clock3}
          tone="amber"
        />
        <DashboardStatCard
          title="Geciken"
          value={String(stats.overduePayments)}
          description={formatPaymentAmount(stats.overdueAmount)}
          icon={AlertTriangle}
          tone="rose"
        />
      </section>

      <ManualPaymentForm />

      <section className="space-y-4">
        <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <SectionHeader
            title="Ödeme Listesi"
            description={`${payments.length} kayıt listeleniyor.`}
          />

          <form className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
            <input type="hidden" name="status" value={selectedStatus} />

            <input
              name="q"
              type="search"
              defaultValue={search}
              placeholder="Öğrenci, kurs veya not ara"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 lg:w-72"
            />

            <button
              type="submit"
              className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-black text-white transition hover:bg-slate-800"
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
                className={`rounded-full px-3 py-1.5 text-sm font-black transition ${
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