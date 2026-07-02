import type { HTMLAttributes, ReactNode } from "react"

import { cn } from "@/shared/utils/cn"

export type ContentCardProps = HTMLAttributes<HTMLDivElement> & {
  title?: string | undefined
  description?: string | undefined
  actions?: ReactNode | undefined
  footer?: ReactNode | undefined
  variant?: "default" | "soft" | "outline" | "dark" | undefined
  padded?: boolean | undefined
}

const variantClassNames: Record<NonNullable<ContentCardProps["variant"]>, string> = {
  default: "border-slate-200 bg-white text-slate-950 shadow-sm",
  soft: "border-indigo-100 bg-indigo-50/70 text-slate-950 shadow-sm",
  outline: "border-dashed border-slate-300 bg-white text-slate-950",
  dark: "border-slate-800 bg-slate-950 text-white shadow-lg",
}

export function ContentCard({
  title,
  description,
  actions,
  footer,
  variant = "default",
  padded = true,
  className,
  children,
  ...props
}: ContentCardProps) {
  const isDark = variant === "dark"

  return (
    <article
      className={cn(
        "overflow-hidden rounded-3xl border",
        variantClassNames[variant],
        padded ? "p-5 md:p-6" : "",
        className,
      )}
      {...props}
    >
      {title || description || actions ? (
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {title ? (
              <h3 className={cn("text-lg font-black", isDark ? "text-white" : "text-slate-950")}>
                {title}
              </h3>
            ) : null}

            {description ? (
              <p className={cn("mt-1 text-sm leading-6", isDark ? "text-white/70" : "text-slate-500")}>
                {description}
              </p>
            ) : null}
          </div>

          {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
        </div>
      ) : null}

      {children}

      {footer ? (
        <div className={cn("mt-5 border-t pt-4", isDark ? "border-white/10" : "border-slate-100")}>
          {footer}
        </div>
      ) : null}
    </article>
  )
}