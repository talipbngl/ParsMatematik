import { cn } from "@/shared/utils/cn"

export type StatusPillTone =
  | "slate"
  | "indigo"
  | "emerald"
  | "amber"
  | "rose"
  | "orange"

export type StatusPillProps = {
  label: string
  tone?: StatusPillTone | undefined
  withDot?: boolean | undefined
  className?: string | undefined
}

const toneClassNames: Record<StatusPillTone, string> = {
  slate: "bg-slate-50 text-slate-700 ring-slate-600/20",
  indigo: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  amber: "bg-amber-50 text-amber-700 ring-amber-600/20",
  rose: "bg-rose-50 text-rose-700 ring-rose-600/20",
  orange: "bg-orange-50 text-orange-700 ring-orange-600/20",
}

const dotClassNames: Record<StatusPillTone, string> = {
  slate: "bg-slate-500",
  indigo: "bg-indigo-500",
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
  orange: "bg-orange-500",
}

export function StatusPill({
  label,
  tone = "slate",
  withDot = true,
  className,
}: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-black ring-1 ring-inset",
        toneClassNames[tone],
        className,
      )}
    >
      {withDot ? <span className={cn("size-1.5 rounded-full", dotClassNames[tone])} /> : null}
      {label}
    </span>
  )
}