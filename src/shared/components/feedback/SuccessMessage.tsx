import type { ReactNode } from "react";
import { CheckCircle2, PartyPopper } from "lucide-react";

import { Button } from "@/shared/components/ui/Button";
import { cn } from "@/shared/utils/cn";

export type SuccessMessageProps = {
  title?: string;
  message?: string;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

export function SuccessMessage({
  title = "İşlem başarılı",
  message = "İşlem başarıyla tamamlandı.",
  icon,
  actionLabel,
  onAction,
  className
}: SuccessMessageProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-success/20 bg-success/5 p-5 text-success shadow-soft",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-success text-success-foreground">
          {icon ?? <CheckCircle2 className="size-5" />}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-base font-black">{title}</h3>

          <p className="mt-1 text-sm font-semibold leading-6 text-success/85">
            {message}
          </p>

          {actionLabel && onAction ? (
            <div className="mt-4">
              <Button
                type="button"
                variant="soft"
                size="sm"
                onClick={onAction}
                leftIcon={<PartyPopper className="size-4" />}
              >
                {actionLabel}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export type InlineSuccessMessageProps = {
  message?: string;
  className?: string;
};

export function InlineSuccessMessage({
  message,
  className
}: InlineSuccessMessageProps) {
  if (!message) {
    return null;
  }

  return (
    <p
      className={cn(
        "flex items-center gap-2 text-xs font-bold leading-5 text-success",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <CheckCircle2 className="size-4 shrink-0" />
      {message}
    </p>
  );
}