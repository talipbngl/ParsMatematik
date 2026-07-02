import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "glass" | "dark" | "soft" | "outline";
  hover?: boolean;
};

export function Card({
  className,
  variant = "default",
  hover = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border",
        variant === "default" && "bg-white shadow-soft",
        variant === "glass" && "pars-glass",
        variant === "dark" && "border-white/10 bg-slate-950 text-white shadow-2xl",
        variant === "soft" && "bg-primary-soft text-foreground",
        variant === "outline" && "bg-transparent",
        hover && "pars-card-hover",
        className
      )}
      {...props}
    />
  );
}

export type CardHeaderProps = HTMLAttributes<HTMLDivElement>;

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return <div className={cn("p-6 pb-3", className)} {...props} />;
}

export type CardTitleProps = HTMLAttributes<HTMLHeadingElement>;

export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn("text-xl font-black tracking-tight text-foreground", className)}
      {...props}
    />
  );
}

export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export function CardDescription({
  className,
  ...props
}: CardDescriptionProps) {
  return (
    <p
      className={cn("mt-2 text-sm leading-6 text-muted-foreground", className)}
      {...props}
    />
  );
}

export type CardContentProps = HTMLAttributes<HTMLDivElement>;

export function CardContent({ className, ...props }: CardContentProps) {
  return <div className={cn("p-6 pt-3", className)} {...props} />;
}

export type CardFooterProps = HTMLAttributes<HTMLDivElement>;

export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      className={cn("flex items-center gap-3 border-t p-6", className)}
      {...props}
    />
  );
}

export type FeatureCardProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
};

export function FeatureCard({
  title,
  description,
  icon,
  action,
  className
}: FeatureCardProps) {
  return (
    <Card hover className={cn("p-6", className)}>
      {icon ? (
        <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
          {icon}
        </div>
      ) : null}

      <h3 className="text-xl font-black tracking-tight">{title}</h3>
      <p className="mt-3 leading-7 text-muted-foreground">{description}</p>

      {action ? <div className="mt-6">{action}</div> : null}
    </Card>
  );
}

export type StatCardProps = {
  title: string;
  value: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
};

export function StatCard({
  title,
  value,
  description,
  icon,
  className
}: StatCardProps) {
  return (
    <Card className={cn("p-5", className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-black tracking-tight">{value}</p>

          {description ? (
            <p className="mt-2 text-xs font-medium leading-5 text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>

        {icon ? (
          <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
            {icon}
          </div>
        ) : null}
      </div>
    </Card>
  );
}