import type { ComponentType, ReactNode } from "react"
import Link from "next/link"

import { cn } from "@/shared/utils/cn"

export type DashboardActionCardProps = {
  title: string
  description: string
  href?: string | undefined
  icon?: ComponentType<{ className?: string }> | undefined
  iconNode?: ReactNode | undefined
  badge?: string | undefined
  external?: boolean | undefined
  tone?: "indigo" | "emerald" | "amber" | "rose" | "slate" | undefined
  className?: string | undefined
}

const toneClassNames = {
  indigo: "bg-indigo-50 text-indigo-600",
  emerald: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  rose: "bg-rose-50 text-rose-600",
  slate: "bg-slate-100 text-slate-700",
} satisfies Record<NonNullable<DashboardActionCardProps["tone"]>, string>

function CardContent({
  title,
  description,
  icon: Icon,
  iconNode,
  badge,
  tone = "indigo",
}: Omit<DashboardActionCardProps, "href" | "external" | "className">) {
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        {Icon || iconNode ? (
          <div className={cn("flex size-12 items-center justify-center rounded-2xl", toneClassNames[tone])}>
            {Icon ? <Icon className="size-6" /> : iconNode}
          </div>
        ) : null}

        {badge ? (
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-black text-slate-600">
            {badge}
          </span>
        ) : null}
      </div>

      <h3 className="mt-5 text-lg font-black text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </>
  )
}

export function DashboardActionCard({
  href,
  external = false,
  className,
  ...props
}: DashboardActionCardProps) {
  const cardClassName = cn(
    "block rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
    !href ? "cursor-default opacity-80" : "",
    className,
  )

  if (!href) {
    return (
      <article className={cardClassName}>
        <CardContent {...props} />
      </article>
    )
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cardClassName}>
        <CardContent {...props} />
      </a>
    )
  }

  return (
    <Link href={href} className={cardClassName}>
      <CardContent {...props} />
    </Link>
  )
}