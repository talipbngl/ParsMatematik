import type { ReactNode } from "react"

import { cn } from "@/shared/utils/cn"

export type SectionHeaderProps = {
  eyebrow?: string | undefined
  title: string
  description?: string | undefined
  actions?: ReactNode | undefined
  align?: "left" | "center" | undefined
  className?: string | undefined
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  actions,
  align = "left",
  className,
}: SectionHeaderProps) {
  const isCentered = align === "center"

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        actions && !isCentered ? "sm:flex-row sm:items-end sm:justify-between" : "",
        isCentered ? "items-center text-center" : "",
        className,
      )}
    >
      <div className={cn(isCentered ? "max-w-2xl" : "max-w-3xl")}>
        {eyebrow ? (
          <p className="text-xs font-black uppercase tracking-[0.22em] text-indigo-600">
            {eyebrow}
          </p>
        ) : null}

        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
          {title}
        </h2>

        {description ? (
          <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
            {description}
          </p>
        ) : null}
      </div>

      {actions ? (
        <div className={cn("flex flex-wrap gap-3", isCentered ? "justify-center" : "")}>
          {actions}
        </div>
      ) : null}
    </div>
  )
}