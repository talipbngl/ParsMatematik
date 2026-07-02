import type { ReactNode } from "react"
import Link from "next/link"
import { AlertTriangle } from "lucide-react"

import { cn } from "@/shared/utils/cn"

export type ErrorStateProps = {
  title?: string | undefined
  description?: string | undefined
  actionLabel?: string | undefined
  actionHref?: string | undefined
  action?: ReactNode | undefined
  className?: string | undefined
}

export function ErrorState({
  title = "Bir şeyler ters gitti",
  description = "İçerik yüklenirken beklenmeyen bir hata oluştu.",
  actionLabel,
  actionHref,
  action,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-3xl border border-rose-200 bg-rose-50 p-8 text-center",
        className,
      )}
    >
      <div className="flex size-14 items-center justify-center rounded-2xl bg-white text-rose-600 shadow-sm">
        <AlertTriangle className="size-7" />
      </div>

      <h3 className="mt-5 text-lg font-black text-rose-950">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-rose-700">
        {description}
      </p>

      {action ? <div className="mt-5">{action}</div> : null}

      {actionLabel && actionHref ? (
        <Link
          href={actionHref}
          className="mt-5 rounded-full bg-rose-600 px-5 py-2.5 text-sm font-black text-white transition hover:bg-rose-700"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  )
}