import type { SelectHTMLAttributes } from "react";

import type { SelectOption } from "@/shared/types/common.types";
import { cn } from "@/shared/utils/cn";

export type SelectProps<TValue extends string = string> = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "children"
> & {
  label?: string | undefined;
  description?: string | undefined;
  error?: string | undefined;
  placeholder?: string | undefined;
  options: SelectOption<TValue>[];
  wrapperClassName?: string | undefined;
};

export function Select<TValue extends string = string>({
  id,
  label,
  description,
  error,
  placeholder = "Seçiniz",
  options,
  className,
  wrapperClassName,
  disabled,
  ...props
}: SelectProps<TValue>) {
  const selectId = id ?? props.name;

  return (
    <div className={cn("space-y-2", wrapperClassName)}>
      {label ? (
        <label
          htmlFor={selectId}
          className="block text-sm font-black text-foreground"
        >
          {label}
        </label>
      ) : null}

      <select
        id={selectId}
        disabled={disabled}
        className={cn(
          "h-12 w-full rounded-2xl border bg-white/75 px-4 text-sm font-bold text-foreground shadow-soft outline-none backdrop-blur transition focus:border-primary focus:ring-4 focus:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-60",
          error && "border-danger focus:border-danger focus:ring-danger/15",
          className
        )}
        {...props}
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>

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