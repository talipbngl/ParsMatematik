import Link from "next/link";
import { Bell, LogOut, Menu, Search } from "lucide-react";

import { logoutAction } from "@/features/auth/actions/logout.action";

import { getDashboardRoleLabel } from "../services/dashboard.service";
import type { DashboardUser } from "../types/dashboard.types";

type DashboardHeaderProps = {
  user: DashboardUser;
};

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const roleLabel = getDashboardRoleLabel(user.role);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur md:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 lg:hidden"
            aria-label="Menüyü aç"
          >
            <Menu className="size-5" />
          </button>

          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">
              {roleLabel} Paneli
            </p>
            <h1 className="truncate text-lg font-bold text-slate-950 md:text-xl">
              Hoş geldin, {user.fullName}
            </h1>
          </div>
        </div>

        <div className="hidden flex-1 justify-center md:flex">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Ders, öğrenci, ödev ara..."
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className="hidden rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950 sm:inline-flex"
          >
            Genel Bakış
          </Link>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
            aria-label="Bildirimler"
          >
            <Bell className="size-5" />
          </button>

          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex size-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-red-50 hover:text-red-600"
              aria-label="Çıkış yap"
            >
              <LogOut className="size-5" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}