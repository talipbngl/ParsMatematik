import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, CheckCircle2, Sparkles, Video } from "lucide-react";

import { LoginForm } from "@/features/auth/components/LoginForm";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Giriş Yap",
  description: "Parsmatematik hesabına giriş yap."
};

export default function LoginPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 pars-grid-bg opacity-60" />

      <div className="mx-auto grid min-h-screen w-full max-w-7xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
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
                Online matematik platformu
              </p>
            </div>
          </Link>

          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-black text-sky-200">
              <Sparkles className="size-4" />
              Ders, ödev ve sınav tek panelde
            </div>

            <h2 className="mt-7 max-w-xl text-5xl font-black leading-tight tracking-tight">
              Matematik çalışmanı düzenli bir sisteme bağla.
            </h2>

            <p className="mt-5 max-w-lg text-base leading-8 text-white/60">
              Canlı derslere katıl, ödevlerini takip et, sınav sonuçlarını gör ve
              gelişimini adım adım izle.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              {
                icon: Video,
                title: "Canlı ders",
                text: "Ders bağlantılarına panelden ulaş."
              },
              {
                icon: BookOpen,
                title: "Materyaller",
                text: "PDF ve çalışma kağıtlarını düzenli gör."
              },
              {
                icon: CheckCircle2,
                title: "Takip sistemi",
                text: "Ödev ve sınav durumunu kaçırma."
              }
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.06] p-4"
              >
                <div className="flex size-11 items-center justify-center rounded-2xl bg-white/10 text-sky-200">
                  <item.icon className="size-5" />
                </div>

                <div>
                  <p className="font-black">{item.title}</p>
                  <p className="mt-1 text-sm text-white/50">{item.text}</p>
                </div>
              </div>
            ))}
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

            <LoginForm />
          </div>
        </section>
      </div>
    </main>
  );
}