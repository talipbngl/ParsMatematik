import type { HTMLAttributes } from "react";

import { cn } from "@/shared/utils/cn";

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "md" | "lg" | "xl" | "full";
};

const containerSizeClasses: Record<NonNullable<ContainerProps["size"]>, string> =
  {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    full: "max-w-none"
  };

export function Container({
  size = "lg",
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        containerSizeClasses[size],
        className
      )}
      {...props}
    />
  );
}

export type SectionProps = HTMLAttributes<HTMLElement> & {
  spacing?: "sm" | "md" | "lg" | "xl";
};

const sectionSpacingClasses: Record<NonNullable<SectionProps["spacing"]>, string> =
  {
    sm: "py-10",
    md: "py-16",
    lg: "py-24",
    xl: "py-32"
  };

export function Section({
  spacing = "lg",
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(sectionSpacingClasses[spacing], className)}
      {...props}
    />
  );
}