import type { ReactNode } from "react"
import Link from "next/link"

import type { BreadcrumbItem } from "@/shared/types/common.types"
import { cn } from "@/shared/utils/cn"

export type PageHeaderProps = {
  eyebrow?: string | undefined
  title: string
  description?: string | undefined
  breadcrumbs?: BreadcrumbItem[] | undefined
  actions?: ReactNode | undefined
  align?: "left" | "center" | undefined
  variant?: "plain" | "card" | "gradient" | undefined
  className?: string | undefined
}

const variantClassNames: Record<NonNullable<PageHeaderProps["variant"]>, string> = {
  plain: "",
  card: "rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8",
  gradient:
    "rounded-3xl bg-gradient-to-br from-slate-950 via-violet-700 to-indigo-600 p-6 text-white shadow-lg md:p-8",
}

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  actions,
  align = "left",
  variant = "plain",
  className,
}: PageHeaderProps) {
  const isCentered = align === "center"
  const isGradient = variant === "gradient"

  return (
    <header
      className={cn(
        variantClassNames[variant],
        isCentered ? "text-center" : "text-left",
        className,
      )}
    >
      {breadcrumbs && breadcrumbs.length > 0 ? (
        <nav
          aria-label="Sayfa yolu"
          className={cn(
            "mb-4 flex flex-wrap items-center gap-2 text-xs font-bold",
            isCentered ? "justify-center" : "justify-start",
            isGradient ? "text-white/70" : "text-slate-500",
          )}
        >
          {breadcrumbs.map((breadcrumb, index) => {
            const isLast = index === breadcrumbs.length - 1

            return (
              <span key={`${breadcrumb.label}-${index}`} className="flex items-center gap-2">
                {breadcrumb.href && !isLast ? (
                  <Link
                    href={breadcrumb.href}
                    className={cn(
                      "transition hover:underline",
                      isGradient ? "hover:text-white" : "hover:text-indigo-600",
                    )}
                  >
                    {breadcrumb.label}
                  </Link>
                ) : (
                  <span aria-current={isLast ? "page" : undefined}>
                    {breadcrumb.label}
                  </span>
                )}

                {!isLast ? <span>/</span> : null}
              </span>
            )
          })}
        </nav>
      ) : null}

      <div
        className={cn(
          "flex flex-col gap-5",
          actions && !isCentered ? "lg:flex-row lg:items-end lg:justify-between" : "",
          isCentered ? "items-center" : "",
        )}
      >
        <div className={cn(isCentered ? "mx-auto max-w-3xl" : "max-w-3xl")}>
          {eyebrow ? (
            <p
              className={cn(
                "text-sm font-black uppercase tracking-[0.22em]",
                isGradient ? "text-amber-300" : "text-indigo-600",
              )}
            >
              {eyebrow}
            </p>
          ) : null}

          <h1
            className={cn(
              "mt-2 text-3xl font-black tracking-tight md:text-4xl",
              isGradient ? "text-white" : "text-slate-950",
            )}
          >
            {title}
          </h1>

          {description ? (
            <p
              className={cn(
                "mt-4 text-sm leading-7 md:text-base",
                isGradient ? "text-white/80" : "text-slate-600",
              )}
            >
              {description}
            </p>
          ) : null}
        </div>

        {actions ? (
          <div
            className={cn(
              "flex flex-wrap gap-3",
              isCentered ? "justify-center" : "justify-start lg:justify-end",
            )}
          >
            {actions}
          </div>
        ) : null}
      </div>
    </header>
  )
}