import type { Metadata } from "next";
import Link from "next/link";
import { KeyRound, MailCheck, ShieldCheck } from "lucide-react";

import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Şifremi Unuttum",
  description: "Parsmatematik hesabın için şifre sıfırlama bağlantısı iste."
};

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 pars-grid-bg opacity-60" />

      <div className="mx-auto grid min-h-screen w-full max-w-6xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <section className="hidden flex-col justify-between rounded-[2rem] bg-slate-950 p-10 text-white shadow-2xl lg:flex">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-white text-slate-950">
              <span className="text-lg font-black">P</span>
            </div>

            <div>
              <p className="text-xl font-black tracking-tight">
                {siteConfig.name}
              </p>
              <p className="mt-1 text-xs font-bold text-white/50">
                Hesap güvenliği
              </p>
            </div>
          </Link>

          <div>
            <div className="flex size-16 items-center justify-center rounded-3xl bg-white/10 text-sky-200">
              <KeyRound className="size-8" />
            </div>

            <h2 className="mt-7 max-w-xl text-5xl font-black leading-tight tracking-tight">
              Şifreni güvenli şekilde yenile.
            </h2>

            <p className="mt-5 max-w-lg text-base leading-8 text-white/60">
              E-posta adresine gönderilen bağlantı ile yeni şifre
              belirleyebilirsin.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.06] p-4">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-white/10 text-sky-200">
                <MailCheck className="size-5" />
              </div>

              <div>
                <p className="font-black">E-posta doğrulaması</p>
                <p className="mt-1 text-sm text-white/50">
                  Bağlantı sadece ilgili hesaba gider.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.06] p-4">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-white/10 text-sky-200">
                <ShieldCheck className="size-5" />
              </div>

              <div>
                <p className="font-black">Güvenli yönlendirme</p>
                <p className="mt-1 text-sm text-white/50">
                  Supabase auth sistemiyle çalışır.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center">
          <div className="w-full max-w-xl">
            <div className="mb-8 flex justify-center lg:hidden">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-glow">
                  <span className="font-black">P</span>
                </div>
                <span className="text-lg font-black">{siteConfig.name}</span>
              </Link>
            </div>

            <ForgotPasswordForm />
          </div>
        </section>
      </div>
    </main>
  );
}