import { BookOpen, ClipboardList, FileText, Mail, Phone, Target, UserRound } from "lucide-react"

import { PageHeader } from "@/shared/components/layout/PageHeader"
import { SectionHeader } from "@/shared/components/layout/SectionHeader"
import { ContentCard } from "@/shared/components/ui/ContentCard"
import { DashboardStatCard } from "@/shared/components/ui/DashboardStatCard"
import { StatusPill } from "@/shared/components/ui/StatusPill"

const profileInfo = [
  { label: "Ad Soyad", value: "Demo Öğrenci", icon: UserRound },
  { label: "E-posta", value: "demo@parsmatematik.com", icon: Mail },
  { label: "Telefon", value: "Sonra eklenecek", icon: Phone },
  { label: "Hedef", value: "LGS Matematik", icon: Target },
]

export default function StudentProfilePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Öğrenci Paneli"
        title="Profilim"
        description="Öğrenci bilgileri, kurs durumu ve gelişim özeti bu ekranda gösterilecek. Şimdilik mock placeholder olarak hazırlandı."
        variant="card"
      />

      <section className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <ContentCard>
          <div className="flex flex-col items-center text-center">
            <div className="flex size-24 items-center justify-center rounded-3xl bg-indigo-100 text-3xl font-black text-indigo-700">
              DÖ
            </div>

            <h2 className="mt-5 text-xl font-black text-slate-950">
              Demo Öğrenci
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Parsmatematik öğrenci hesabı
            </p>

            <div className="mt-4">
              <StatusPill label="Aktif Hesap" tone="emerald" />
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-black text-slate-950">
              Supabase bağlantısı sonrası
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Bu bilgiler gerçek auth profilinden okunacak ve öğrenci kendi
              bilgilerini düzenleyebilecek.
            </p>
          </div>
        </ContentCard>

        <ContentCard title="Profil Bilgileri">
          <dl className="grid gap-4 sm:grid-cols-2">
            {profileInfo.map((item) => {
              const Icon = item.icon

              return (
                <div key={item.label} className="rounded-2xl bg-slate-50 p-4">
                  <dt className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-slate-500">
                    <Icon className="size-4" />
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-sm font-black text-slate-900">
                    {item.value}
                  </dd>
                </div>
              )
            })}
          </dl>
        </ContentCard>
      </section>

      <section className="space-y-4">
        <SectionHeader
          title="Gelişim Özeti"
          description="Bu alan ileride canlı ders, ödev ve sınav verilerinden otomatik beslenecek."
        />

        <div className="grid gap-4 md:grid-cols-3">
          <DashboardStatCard
            title="Aktif Kurs"
            value="3"
            description="Kayıtlı olduğu mock kurslar"
            icon={BookOpen}
            tone="indigo"
          />
          <DashboardStatCard
            title="Bekleyen Ödev"
            value="4"
            description="Teslim edilmesi gereken ödevler"
            icon={ClipboardList}
            tone="amber"
          />
          <DashboardStatCard
            title="Sınav"
            value="2"
            description="Çözülmesi gereken sınavlar"
            icon={FileText}
            tone="rose"
          />
        </div>
      </section>
    </div>
  )
}