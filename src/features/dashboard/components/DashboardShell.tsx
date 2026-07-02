import type { ReactNode } from "react";

import {
  getCurrentDashboardUser,
  getDashboardHomePath,
  getDashboardNavGroups
} from "../services/dashboard.service";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";

type DashboardShellProps = {
  children: ReactNode;
};

export async function DashboardShell({ children }: DashboardShellProps) {
  const user = await getCurrentDashboardUser();
  const navGroups = getDashboardNavGroups(user.role);
  const homePath = getDashboardHomePath(user.role);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <DashboardSidebar
          user={user}
          navGroups={navGroups}
          homePath={homePath}
        />

        <div className="flex min-h-screen flex-1 flex-col">
          <DashboardHeader user={user} />

          <main className="flex-1 px-4 py-6 md:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}