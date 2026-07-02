import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-black transition-all duration-200 pars-focus-ring disabled:pointer-events-none disabled:opacity-55",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-glow hover:scale-[1.02] hover:bg-primary/95",
        secondary:
          "bg-secondary text-secondary-foreground shadow-soft hover:scale-[1.02] hover:bg-secondary/95",
        accent:
          "bg-accent text-accent-foreground shadow-soft hover:scale-[1.02] hover:bg-accent/95",
        outline:
          "border bg-white/70 text-foreground shadow-soft backdrop-blur hover:bg-white",
        ghost: "text-foreground hover:bg-muted",
        soft: "bg-primary-soft text-primary hover:bg-primary-soft/80",
        danger:
          "bg-danger text-danger-foreground shadow-soft hover:scale-[1.02] hover:bg-danger/95",
        dark: "bg-slate-950 text-white shadow-soft hover:scale-[1.02] hover:bg-slate-900"
      },
      size: {
        xs: "h-8 px-3 text-xs",
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-5 text-sm",
        lg: "h-14 px-7 text-base",
        icon: "size-11 p-0"
      },
      fullWidth: {
        true: "w-full",
        false: ""
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false
    }
  }
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
  };

export function Button({
  className,
  variant,
  size,
  fullWidth,
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="size-4 animate-spin" /> : leftIcon}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
}

export { buttonVariants };