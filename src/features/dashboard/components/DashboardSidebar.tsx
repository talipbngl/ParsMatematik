"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  BookOpen,
  CalendarDays,
  ChartNoAxesCombined,
  ClipboardList,
  CreditCard,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Users,
  Video
} from "lucide-react";
import type { ComponentType } from "react";

import { cn } from "@/shared/utils/cn";

import type {
  DashboardNavGroup,
  DashboardNavIcon,
  DashboardUser
} from "../types/dashboard.types";

type IconComponent = ComponentType<{
  className?: string | undefined;
}>;

const icons: Record<DashboardNavIcon, IconComponent> = {
  dashboard: LayoutDashboard,
  users: Users,
  book: BookOpen,
  calendar: CalendarDays,
  file: FileText,
  clipboard: ClipboardList,
  chart: ChartNoAxesCombined,
  "credit-card": CreditCard,
  settings: Settings,
  "graduation-cap": GraduationCap,
  video: Video,
  bell: Bell
};

type DashboardSidebarProps = {
  user: DashboardUser;
  navGroups: DashboardNavGroup[];
  homePath: string;
};

export function DashboardSidebar({
  user,
  navGroups,
  homePath
}: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-slate-200 bg-white/90 px-4 py-5 shadow-sm backdrop-blur lg:block">
      <div className="mb-8">
        <Link href={homePath} className="block">
          <div className="rounded-2xl bg-slate-950 px-4 py-4 text-white">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-amber-300">
              Parsmatematik
            </p>
            <h2 className="mt-2 text-lg font-bold">Dashboard</h2>
          </div>
        </Link>
      </div>

      <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
            {user.fullName
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              {user.fullName}
            </p>
            <p className="truncate text-xs text-slate-500">{user.email}</p>
          </div>
        </div>
      </div>

      <nav className="space-y-6">
        {navGroups.map((group) => (
          <div key={group.title}>
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
              {group.title}
            </p>

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = icons[item.icon];
                const isActive =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                      isActive
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-4",
                        isActive ? "text-white" : "text-slate-400"
                      )}
                    />

                    <span className="flex-1">{item.title}</span>

                    {item.badge ? (
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-xs",
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-slate-200 text-slate-600"
                        )}
                      >
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}