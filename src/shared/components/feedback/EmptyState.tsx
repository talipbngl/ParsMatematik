import type { ReactNode } from "react";
import { Inbox } from "lucide-react";
import Link from "next/link";

import { Button } from "@/shared/components/ui/Button";
import { cn } from "@/shared/utils/cn";

export type EmptyStateProps = {
  title?: string;
  description?: string;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
  className?: string;
};

export function EmptyState({
  title = "Henüz içerik yok",
  description = "Bu bölümde gösterilecek bir kayıt bulunmuyor.",
  icon,
  actionLabel,
  onAction,
  actionHref,
  className
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-72 flex-col items-center justify-center rounded-[2rem] border bg-white p-8 text-center shadow-soft",
        className
      )}
    >
      <div className="flex size-16 items-center justify-center rounded-3xl bg-primary-soft text-primary">
        {icon ?? <Inbox className="size-8" />}
      </div>

      <h3 className="mt-6 text-2xl font-black tracking-tight text-foreground">
        {title}
      </h3>

      <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
        {description}
      </p>

      {actionLabel && actionHref ? (
        <Link
          href={actionHref}
          className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-primary px-5 text-sm font-black text-primary-foreground shadow-glow transition hover:scale-[1.02]"
        >
          {actionLabel}
        </Link>
      ) : null}

      {actionLabel && onAction && !actionHref ? (
        <div className="mt-6">
          <Button onClick={onAction}>{actionLabel}</Button>
        </div>
      ) : null}
    </div>
  );
}