import { UserPlus } from "lucide-react";

import { UserTable } from "@/features/users/components/UserTable";
import {
  getUsers,
  getUserStats
} from "@/features/users/services/users.service";

export default async function AdminUsersPage() {
  const users = await getUsers();
  const stats = await getUserStats();

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">
            Kullanıcı Yönetimi
          </p>

          <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
            Kullanıcılar
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Bu sayfa adminin öğrenci, öğretmen, veli ve admin hesaplarını
            yönetmesi için hazırlanıyor. Şu an mock veriyle çalışıyor.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700"
        >
          <UserPlus className="size-4" />
          Kullanıcı Ekle
        </button>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Toplam</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {stats.totalUsers}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Admin</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {stats.adminCount}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Öğretmen</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {stats.teacherCount}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Öğrenci</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {stats.studentCount}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Bekleyen</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {stats.pendingCount}
          </p>
        </div>
      </section>

      <UserTable users={users} />
    </div>
  );
}