import { Loader2 } from "lucide-react";

import { cn } from "@/shared/utils/cn";

export type LoadingSpinnerProps = {
  size?: "sm" | "md" | "lg" | "xl";
  label?: string;
  className?: string;
};

const spinnerSizeClasses: Record<
  NonNullable<LoadingSpinnerProps["size"]>,
  string
> = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
  xl: "size-12"
};

export function LoadingSpinner({
  size = "md",
  label,
  className
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center gap-3 text-muted-foreground",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <Loader2 className={cn("animate-spin", spinnerSizeClasses[size])} />

      {label ? <span className="text-sm font-bold">{label}</span> : null}
    </div>
  );
}

export type FullPageLoadingProps = {
  title?: string;
  description?: string;
};

export function FullPageLoading({
  title = "Yükleniyor",
  description = "Parsmatematik hazırlanıyor..."
}: FullPageLoadingProps) {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="rounded-[2rem] border bg-white p-8 text-center shadow-soft">
        <div className="mx-auto flex size-16 items-center justify-center rounded-3xl bg-primary-soft text-primary">
          <LoadingSpinner size="lg" />
        </div>

        <h1 className="mt-6 text-2xl font-black tracking-tight">{title}</h1>
        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
    </main>
  );
}

export type LoadingOverlayProps = {
  isVisible: boolean;
  label?: string;
};

export function LoadingOverlay({
  isVisible,
  label = "İşlem yapılıyor..."
}: LoadingOverlayProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center rounded-[inherit] bg-white/70 backdrop-blur-sm">
      <div className="rounded-2xl border bg-white px-5 py-4 shadow-soft">
        <LoadingSpinner label={label} />
      </div>
    </div>
  );
}