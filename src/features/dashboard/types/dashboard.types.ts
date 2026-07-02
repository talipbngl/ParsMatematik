import type { UserRole } from "@/shared/types/role.types";

export type DashboardNavIcon =
  | "dashboard"
  | "users"
  | "book"
  | "calendar"
  | "file"
  | "clipboard"
  | "chart"
  | "credit-card"
  | "settings"
  | "graduation-cap"
  | "video"
  | "bell";

export type DashboardNavItem = {
  title: string;
  href: string;
  icon: DashboardNavIcon;
  description?: string | undefined;
  badge?: string | undefined;
};

export type DashboardNavGroup = {
  title: string;
  items: DashboardNavItem[];
};

export type DashboardUser = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  avatarUrl?: string | null | undefined;
};

export type DashboardSummaryCard = {
  title: string;
  value: string;
  description?: string | undefined;
  icon: DashboardNavIcon;
};

export type DashboardShellProps = {
  children: React.ReactNode;
};