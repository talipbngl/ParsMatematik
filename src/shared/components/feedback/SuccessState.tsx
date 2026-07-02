import type { ReactNode } from "react"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

import { cn } from "@/shared/utils/cn"

export type SuccessStateProps = {
  title?: string | undefined
  description?: string | undefined
  actionLabel?: string | undefined
  actionHref?: string | undefined
  action?: ReactNode | undefined
  className?: string | undefined
}

export function SuccessState({
  title = "İşlem başarılı",
  description = "İşlem başarıyla tamamlandı.",
  actionLabel,
  actionHref,
  action,
  className,
}: SuccessStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center",
        className,
      )}
    >
      <div className="flex size-14 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
        <CheckCircle2 className="size-7" />
      </div>

      <h3 className="mt-5 text-lg font-black text-emerald-950">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-emerald-700">
        {description}
      </p>

      {action ? <div className="mt-5">{action}</div> : null}

      {actionLabel && actionHref ? (
        <Link
          href={actionHref}
          className="mt-5 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-black text-white transition hover:bg-emerald-700"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  )
}