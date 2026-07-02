import type { TextareaHTMLAttributes } from "react";

import { cn } from "@/shared/utils/cn";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string | undefined;
  description?: string | undefined;
  error?: string | undefined;
  wrapperClassName?: string | undefined;
};

export function Textarea({
  id,
  label,
  description,
  error,
  className,
  wrapperClassName,
  disabled,
  rows = 5,
  ...props
}: TextareaProps) {
  const textareaId = id ?? props.name;

  return (
    <div className={cn("space-y-2", wrapperClassName)}>
      {label ? (
        <label
          htmlFor={textareaId}
          className="block text-sm font-black text-foreground"
        >
          {label}
        </label>
      ) : null}

      <textarea
        id={textareaId}
        rows={rows}
        disabled={disabled}
        className={cn(
          "w-full resize-y rounded-2xl border bg-white/75 px-4 py-3 text-sm leading-7 text-foreground shadow-soft outline-none backdrop-blur transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-60",
          error && "border-danger focus:border-danger focus:ring-danger/15",
          className
        )}
        {...props}
      />

      {description && !error ? (
        <p className="text-xs font-medium leading-5 text-muted-foreground">
          {description}
        </p>
      ) : null}

      {error ? (
        <p className="text-xs font-bold leading-5 text-danger">{error}</p>
      ) : null}
    </div>
  );
}