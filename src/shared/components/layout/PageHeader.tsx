import type { ReactNode } from "react";
import Link from "next/link";

import type { BreadcrumbItem } from "@/shared/types/common.types";
import { cn } from "@/shared/utils/cn";

export type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  actions,
  align = "left",
  className
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border bg-white p-6 shadow-soft sm:p-8",
        align === "center" && "text-center",
        className
      )}
    >
      <div className="absolute right-0 top-0 size-48 -translate-y-1/2 translate-x-1/3 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 size-40 translate-y-1/2 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav
            aria-label="Sayfa konumu"
            className={cn(
              "mb-5 flex flex-wrap items-center gap-2 text-xs font-black text-muted-foreground",
              align === "center" && "justify-center"
            )}
          >
            {breadcrumbs.map((breadcrumb, index) => {
              const isLast = index === breadcrumbs.length - 1;

              return (
                <span key={`${breadcrumb.label}-${index}`} className="flex items-center gap-2">
                  {breadcrumb.href && !isLast ? (
                    <Link
                      href={breadcrumb.href}
                      className="transition hover:text-primary"
                    >
                      {breadcrumb.label}
                    </Link>
                  ) : (
                    <span className={cn(isLast && "text-foreground")}>
                      {breadcrumb.label}
                    </span>
                  )}

                  {!isLast ? <span>/</span> : null}
                </span>
              );
            })}
          </nav>
        ) : null}

        {eyebrow ? (
          <p className="text-sm font-black uppercase tracking-[0.22em] text-primary">
            {eyebrow}
          </p>
        ) : null}

        <div
          className={cn(
            "mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between",
            align === "center" && "lg:items-center"
          )}
        >
          <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
            <h1 className="pars-heading text-4xl font-black tracking-tight text-foreground sm:text-5xl">
              {title}
            </h1>

            {description ? (
              <p className="mt-4 text-base leading-8 text-muted-foreground sm:text-lg">
                {description}
              </p>
            ) : null}
          </div>

          {actions ? (
            <div
              className={cn(
                "flex shrink-0 flex-wrap gap-3",
                align === "center" && "justify-center"
              )}
            >
              {actions}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}