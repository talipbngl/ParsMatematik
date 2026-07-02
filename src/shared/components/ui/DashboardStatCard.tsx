import type { ComponentType, ReactNode } from "react"

import { cn } from "@/shared/utils/cn"

export type StatTrend = {
  label: string
  value: string
  direction: "up" | "down" | "neutral"
}

export type DashboardStatCardProps = {
  title: string
  value: string
  description?: string | undefined
  icon?: ComponentType<{ className?: string }> | undefined
  iconNode?: ReactNode | undefined
  trend?: StatTrend | undefined
  tone?: "indigo" | "emerald" | "amber" | "rose" | "slate" | undefined
  className?: string | undefined
}

const toneClassNames = {
  indigo: "bg-indigo-50 text-indigo-600",
  emerald: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  rose: "bg-rose-50 text-rose-600",
  slate: "bg-slate-100 text-slate-700",
} satisfies Record<NonNullable<DashboardStatCardProps["tone"]>, string>

const trendClassNames: Record<StatTrend["direction"], string> = {
  up: "text-emerald-600",
  down: "text-rose-600",
  neutral: "text-slate-500",
}

export function DashboardStatCard({
  title,
  value,
  description,
  icon: Icon,
  iconNode,
  trend,
  tone = "indigo",
  className,
}: DashboardStatCardProps) {
  return (
    <article
      className={cn(
        "rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            {value}
          </p>
        </div>

        {Icon || iconNode ? (
          <div className={cn("flex size-12 shrink-0 items-center justify-center rounded-2xl", toneClassNames[tone])}>
            {Icon ? <Icon className="size-6" /> : iconNode}
          </div>
        ) : null}
      </div>

      {description ? <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p> : null}

      {trend ? (
        <p className={cn("mt-3 text-xs font-black", trendClassNames[trend.direction])}>
          {trend.value} · <span className="text-slate-500">{trend.label}</span>
        </p>
      ) : null}
    </article>
  )
}