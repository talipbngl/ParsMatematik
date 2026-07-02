import type { HTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-black transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        accent: "border-transparent bg-accent text-accent-foreground",
        success: "border-transparent bg-success text-success-foreground",
        warning: "border-transparent bg-warning text-warning-foreground",
        danger: "border-transparent bg-danger text-danger-foreground",
        muted: "border-transparent bg-muted text-muted-foreground",
        outline: "border-border bg-white/70 text-foreground",
        soft: "border-transparent bg-primary-soft text-primary",
        dark: "border-transparent bg-slate-950 text-white"
      },
      size: {
        sm: "px-2.5 py-0.5 text-[11px]",
        md: "px-3 py-1 text-xs",
        lg: "px-4 py-1.5 text-sm"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

export type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants> & {
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
  };

export function Badge({
  className,
  variant,
  size,
  leftIcon,
  rightIcon,
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {leftIcon}
      {children}
      {rightIcon}
    </span>
  );
}

export type StatusBadgeProps = {
  status:
    | "active"
    | "draft"
    | "archived"
    | "scheduled"
    | "live"
    | "completed"
    | "cancelled"
    | "pending"
    | "approved"
    | "rejected";
  className?: string;
};

const statusConfig: Record<
  StatusBadgeProps["status"],
  {
    label: string;
    variant: NonNullable<BadgeProps["variant"]>;
  }
> = {
  active: {
    label: "Aktif",
    variant: "success"
  },
  draft: {
    label: "Taslak",
    variant: "muted"
  },
  archived: {
    label: "Arşiv",
    variant: "outline"
  },
  scheduled: {
    label: "Planlandı",
    variant: "soft"
  },
  live: {
    label: "Canlı",
    variant: "danger"
  },
  completed: {
    label: "Tamamlandı",
    variant: "success"
  },
  cancelled: {
    label: "İptal",
    variant: "muted"
  },
  pending: {
    label: "Bekliyor",
    variant: "warning"
  },
  approved: {
    label: "Onaylandı",
    variant: "success"
  },
  rejected: {
    label: "Reddedildi",
    variant: "danger"
  }
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={className}>
      <span className="size-1.5 rounded-full bg-current" />
      {config.label}
    </Badge>
  );
}

export type CountBadgeProps = {
  count: number;
  max?: number;
  className?: string;
};

export function CountBadge({ count, max = 99, className }: CountBadgeProps) {
  const label = count > max ? `${max}+` : String(count);

  if (count <= 0) {
    return null;
  }

  return (
    <Badge
      variant="danger"
      size="sm"
      className={cn("min-w-6 justify-center px-2", className)}
    >
      {label}
    </Badge>
  );
}

export { badgeVariants };