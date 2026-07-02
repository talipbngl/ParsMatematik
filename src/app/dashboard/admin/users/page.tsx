import { UserPlus, ShieldCheck, UserCheck, Users } from "lucide-react"

import { UserTable } from "@/features/users/components/UserTable"
import { getUsers, getUserStats } from "@/features/users/services/users.service"
import { PageHeader } from "@/shared/components/layout/PageHeader"
import { SectionHeader } from "@/shared/components/layout/SectionHeader"
import { DashboardStatCard } from "@/shared/components/ui/DashboardStatCard"

export default async function AdminUsersPage() {
  const users = await getUsers()
  const stats = await getUserStats()

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Kullanıcı Yönetimi"
        title="Kullanıcılar"
        description="Adminin öğrenci, öğretmen, veli ve admin hesaplarını yönetmesi için hazırlanıyor. Şu an mock veriyle çalışıyor."
        variant="card"
        actions={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-black text-white transition hover:bg-indigo-700"
          >
            <UserPlus className="size-4" />
            Kullanıcı Ekle
          </button>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          title="Toplam"
          value={String(stats.totalUsers)}
          description="Tüm kullanıcı hesapları"
          icon={Users}
          tone="indigo"
        />
        <DashboardStatCard
          title="Admin"
          value={String(stats.adminCount)}
          description="Sistem yöneticileri"
          icon={ShieldCheck}
          tone="rose"
        />
        <DashboardStatCard
          title="Öğretmen"
          value={String(stats.teacherCount)}
          description="Ders yönetimi yapan hesaplar"
          icon={Users}
          tone="emerald"
        />
        <DashboardStatCard
          title="Öğrenci"
          value={String(stats.studentCount)}
          description="Kayıtlı öğrenci hesapları"
          icon={UserCheck}
          tone="amber"
        />
      </section>

      <section className="space-y-4">
        <SectionHeader
          title="Kullanıcı Listesi"
          description={`${users.length} kullanıcı listeleniyor. Supabase bağlantısından sonra bu liste gerçek profillerden gelecek.`}
        />

        <UserTable users={users} />
      </section>
    </div>
  )
}