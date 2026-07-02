import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, ShieldCheck, Sparkles, Users } from "lucide-react";

import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Kayıt Ol",
  description: "Parsmatematik hesabı oluştur."
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 pars-grid-bg opacity-60" />

      <div className="mx-auto grid min-h-screen w-full max-w-7xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <section className="flex items-center justify-center">
          <div className="w-full max-w-2xl">
            <div className="mb-8 flex justify-center lg:hidden">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-glow">
                  <span className="font-black">P</span>
                </div>
                <span className="text-lg font-black">{siteConfig.name}</span>
              </Link>
            </div>

            <RegisterForm />
          </div>
        </section>

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
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-black text-amber-200">
              <Sparkles className="size-4" />
              MVP’den gerçek platforma
            </div>

            <h2 className="mt-7 max-w-xl text-5xl font-black leading-tight tracking-tight">
              Öğrenci, öğretmen ve veli için ayrı deneyim.
            </h2>

            <p className="mt-5 max-w-lg text-base leading-8 text-white/60">
              Parsmatematik rol bazlı tasarlanır. Böylece ileride özellik
              eklerken kodlar birbirine karışmaz.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              {
                icon: GraduationCap,
                title: "Öğrenci hesabı",
                text: "Ders, ödev ve sınav takibi."
              },
              {
                icon: Users,
                title: "Öğretmen hesabı",
                text: "Kurs ve canlı ders yönetimi."
              },
              {
                icon: ShieldCheck,
                title: "Güvenli roller",
                text: "Admin ayrı yetki sistemiyle yönetilir."
              }
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.06] p-4"
              >
                <div className="flex size-11 items-center justify-center rounded-2xl bg-white/10 text-amber-200">
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
      </div>
    </main>
  );
}