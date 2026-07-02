import { CalendarDays, Mail, Phone, Trash2 } from "lucide-react";

import { deleteUserAction } from "../actions/delete-user.action";
import type { UserListItem } from "../types/users.types";
import { UserRoleBadge } from "./UserRoleBadge";

type UserCardProps = {
  user: UserListItem;
};

function getInitials(fullName: string): string {
  return fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatUserDate(value: string): string {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date(value));
}

export function UserCard({ user }: UserCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-sm font-black text-indigo-700">
            {getInitials(user.fullName)}
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-black text-slate-950">
              {user.fullName}
            </h3>

            <div className="mt-2">
              <UserRoleBadge role={user.role} />
            </div>
          </div>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
          {user.status}
        </span>
      </div>

      <div className="mt-5 space-y-2 text-sm text-slate-500">
        <p className="flex items-center gap-2">
          <Mail className="size-4" />
          <span className="min-w-0 truncate">{user.email}</span>
        </p>

        {user.phone ? (
          <p className="flex items-center gap-2">
            <Phone className="size-4" />
            <span>{user.phone}</span>
          </p>
        ) : null}

        <p className="flex items-center gap-2">
          <CalendarDays className="size-4" />
          <span>{formatUserDate(user.createdAt)}</span>
        </p>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <button
          type="button"
          className="flex-1 rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
        >
          Düzenle
        </button>

        <form action={deleteUserAction}>
          <input type="hidden" name="id" value={user.id} />

          <button
            type="submit"
            className="inline-flex size-10 items-center justify-center rounded-2xl border border-red-100 bg-red-50 text-red-600 transition hover:bg-red-100"
            aria-label="Kullanıcıyı sil"
          >
            <Trash2 className="size-4" />
          </button>
        </form>
      </div>
    </article>
  );
}