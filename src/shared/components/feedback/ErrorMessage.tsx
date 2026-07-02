import type { ReactNode } from "react";
import { AlertTriangle, RefreshCw, XCircle } from "lucide-react";

import { Button } from "@/shared/components/ui/Button";
import { cn } from "@/shared/utils/cn";

export type ErrorMessageProps = {
  title?: string;
  message?: string;
  details?: string;
  icon?: ReactNode;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
};

export function ErrorMessage({
  title = "Bir hata oluştu",
  message = "İşlem sırasında beklenmeyen bir sorun yaşandı.",
  details,
  icon,
  onRetry,
  retryLabel = "Tekrar dene",
  className
}: ErrorMessageProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-danger/20 bg-danger/5 p-5 text-danger shadow-soft",
        className
      )}
      role="alert"
    >
      <div className="flex gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-danger text-danger-foreground">
          {icon ?? <AlertTriangle className="size-5" />}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-base font-black">{title}</h3>

          <p className="mt-1 text-sm font-semibold leading-6 text-danger/85">
            {message}
          </p>

          {details ? (
            <pre className="mt-4 max-h-48 overflow-auto rounded-2xl border border-danger/15 bg-white/70 p-4 text-left text-xs leading-6 text-danger/80">
              {details}
            </pre>
          ) : null}

          {onRetry ? (
            <div className="mt-4">
              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={onRetry}
                leftIcon={<RefreshCw className="size-4" />}
              >
                {retryLabel}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export type InlineErrorMessageProps = {
  message?: string;
  className?: string;
};

export function InlineErrorMessage({
  message,
  className
}: InlineErrorMessageProps) {
  if (!message) {
    return null;
  }

  return (
    <p
      className={cn(
        "flex items-center gap-2 text-xs font-bold leading-5 text-danger",
        className
      )}
      role="alert"
    >
      <XCircle className="size-4 shrink-0" />
      {message}
    </p>
  );
}

export type ErrorListProps = {
  title?: string;
  errors: string[];
  className?: string;
};

export function ErrorList({
  title = "Lütfen aşağıdaki alanları kontrol et:",
  errors,
  className
}: ErrorListProps) {
  if (errors.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "rounded-3xl border border-danger/20 bg-danger/5 p-5 text-danger",
        className
      )}
      role="alert"
    >
      <div className="flex gap-3">
        <AlertTriangle className="mt-0.5 size-5 shrink-0" />

        <div>
          <p className="text-sm font-black">{title}</p>

          <ul className="mt-3 list-inside list-disc space-y-1 text-sm font-semibold leading-6 text-danger/85">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}