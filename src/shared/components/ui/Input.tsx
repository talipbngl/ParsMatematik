import type { InputHTMLAttributes, ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string | undefined;
  description?: string | undefined;
  error?: string | undefined;
  leftIcon?: ReactNode | undefined;
  rightIcon?: ReactNode | undefined;
  inputSize?: "sm" | "md" | "lg" | undefined;
  wrapperClassName?: string | undefined;
};

const inputSizeClasses: Record<NonNullable<InputProps["inputSize"]>, string> = {
  sm: "h-10 text-sm",
  md: "h-12 text-sm",
  lg: "h-14 text-base"
};

export function Input({
  id,
  label,
  description,
  error,
  leftIcon,
  rightIcon,
  inputSize = "md",
  className,
  wrapperClassName,
  disabled,
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div className={cn("space-y-2", wrapperClassName)}>
      {label ? (
        <label
          htmlFor={inputId}
          className="block text-sm font-black text-foreground"
        >
          {label}
        </label>
      ) : null}

      <div className="relative">
        {leftIcon ? (
          <div className="pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 text-muted-foreground">
            {leftIcon}
          </div>
        ) : null}

        <input
          id={inputId}
          disabled={disabled}
          className={cn(
            "w-full rounded-2xl border bg-white/75 px-4 text-foreground shadow-soft outline-none backdrop-blur transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-60",
            inputSizeClasses[inputSize],
            leftIcon && "pl-11",
            rightIcon && "pr-11",
            error && "border-danger focus:border-danger focus:ring-danger/15",
            className
          )}
          {...props}
        />

        {rightIcon ? (
          <div className="absolute right-4 top-1/2 flex -translate-y-1/2 text-muted-foreground">
            {rightIcon}
          </div>
        ) : null}
      </div>

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