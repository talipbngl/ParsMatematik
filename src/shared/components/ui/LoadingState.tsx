import { Loader2 } from "lucide-react"

import { cn } from "@/shared/utils/cn"

export type LoadingStateProps = {
  title?: string | undefined
  description?: string | undefined
  fullPage?: boolean | undefined
  className?: string | undefined
}

export function LoadingState({
  title = "Yükleniyor",
  description = "İçerik hazırlanıyor, lütfen bekle.",
  fullPage = false,
  className,
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm",
        fullPage ? "min-h-[420px]" : "min-h-60",
        className,
      )}
    >
      <div className="flex size-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
        <Loader2 className="size-7 animate-spin" />
      </div>

      <h3 className="mt-5 text-lg font-black text-slate-950">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  )
}