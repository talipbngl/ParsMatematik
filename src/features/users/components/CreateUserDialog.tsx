"use client";

import { useActionState, useState } from "react";
import { UserPlus, X } from "lucide-react";

import {
  createUserAction,
  type CreateUserActionState
} from "../actions/create-user.action";

const initialState: CreateUserActionState = {
  success: false,
  message: ""
};

export function CreateUserDialog() {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(
    createUserAction,
    initialState
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700"
      >
        <UserPlus className="size-4" />
        Kullanıcı Ekle
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">
                  Yeni Kullanıcı
                </p>
                <h2 className="mt-2 text-2xl font-black text-slate-950">
                  Kullanıcı Ekle
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Öğretmen, öğrenci veya veli hesabı oluşturabilirsin.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex size-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-950"
                aria-label="Kapat"
              >
                <X className="size-4" />
              </button>
            </div>

            <form action={formAction} className="mt-6 space-y-4">
              <div>
                <label className="text-sm font-bold text-slate-700">
                  Ad Soyad
                </label>
                <input
                  name="fullName"
                  required
                  placeholder="Örn: Ayşe Yılmaz"
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700">
                  E-posta
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="ornek@mail.com"
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700">
                  Geçici Şifre
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  placeholder="En az 6 karakter"
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700">Rol</label>
                <select
                  name="role"
                  required
                  defaultValue="student"
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                >
                  <option value="student">Öğrenci</option>
                  <option value="teacher">Öğretmen</option>
                  <option value="parent">Veli</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700">
                  Telefon
                </label>
                <input
                  name="phone"
                  placeholder="+90 5xx xxx xx xx"
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              {state.message ? (
                <div
                  className={
                    state.success
                      ? "rounded-2xl bg-green-50 px-4 py-3 text-sm font-bold text-green-700"
                      : "rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700"
                  }
                >
                  {state.message}
                </div>
              ) : null}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                >
                  Vazgeç
                </button>

                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isPending ? "Oluşturuluyor..." : "Kullanıcı Oluştur"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}