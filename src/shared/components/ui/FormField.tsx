import type { ReactNode } from "react"

import { cn } from "@/shared/utils/cn"

export type FormFieldProps = {
  id?: string | undefined
  label?: string | undefined
  description?: string | undefined
  error?: string | undefined
  required?: boolean | undefined
  children: ReactNode
  className?: string | undefined
}

export function FormField({
  id,
  label,
  description,
  error,
  required = false,
  children,
  className,
}: FormFieldProps) {
  const descriptionId = id ? `${id}-description` : undefined
  const errorId = id ? `${id}-error` : undefined

  return (
    <div className={cn("space-y-2", className)}>
      {label ? (
        <label htmlFor={id} className="block text-sm font-black text-slate-800">
          {label}
          {required ? <span className="ml-1 text-rose-600">*</span> : null}
        </label>
      ) : null}

      {children}

      {description && !error ? (
        <p id={descriptionId} className="text-xs font-medium leading-5 text-slate-500">
          {description}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} className="text-xs font-bold leading-5 text-rose-600">
          {error}
        </p>
      ) : null}
    </div>
  )
}