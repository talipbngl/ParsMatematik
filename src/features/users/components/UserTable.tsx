import { CalendarDays, Mail, Phone, Trash2 } from "lucide-react";

import { deleteUserAction } from "../actions/delete-user.action";
import type { UserListItem } from "../types/users.types";
import { UserCard } from "./UserCard";
import { UserRoleBadge } from "./UserRoleBadge";

type UserTableProps = {
  users: UserListItem[];
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
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

export function UserTable({ users }: UserTableProps) {
  if (users.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
        <h3 className="text-lg font-black text-slate-950">
          Henüz kullanıcı yok
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          Kullanıcı eklendiğinde burada listelenecek.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 lg:hidden">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:block">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-black text-slate-950">
            Kullanıcı Listesi
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Supabase bağlantısından sonra bu liste gerçek profillerden gelecek.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-slate-50 text-xs font-black uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-6 py-4">Kullanıcı</th>
                <th className="px-6 py-4">Rol</th>
                <th className="px-6 py-4">İletişim</th>
                <th className="px-6 py-4">Durum</th>
                <th className="px-6 py-4">Kayıt</th>
                <th className="px-6 py-4 text-right">İşlem</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="transition hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-sm font-black text-indigo-700">
                        {getInitials(user.fullName)}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-black text-slate-950">
                          {user.fullName}
                        </p>
                        <p className="truncate text-sm text-slate-500">
                          {user.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <UserRoleBadge role={user.role} />
                  </td>

                  <td className="px-6 py-4">
                    <div className="space-y-1 text-sm text-slate-500">
                      <p className="flex items-center gap-2">
                        <Mail className="size-4" />
                        <span>{user.email}</span>
                      </p>

                      {user.phone ? (
                        <p className="flex items-center gap-2">
                          <Phone className="size-4" />
                          <span>{user.phone}</span>
                        </p>
                      ) : null}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                      {user.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <p className="flex items-center gap-2 text-sm text-slate-500">
                      <CalendarDays className="size-4" />
                      {formatUserDate(user.createdAt)}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                      >
                        Düzenle
                      </button>

                      <form action={deleteUserAction}>
                        <input type="hidden" name="id" value={user.id} />

                        <button
                          type="submit"
                          className="inline-flex size-10 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-600 transition hover:bg-red-100"
                          aria-label="Kullanıcıyı sil"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}