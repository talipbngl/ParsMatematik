import { ShieldCheck, UserCheck, Users } from "lucide-react"

import { CreateUserDialog } from "@/features/users/components/CreateUserDialog"
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
        description="Admin öğrenci, öğretmen, veli ve admin hesaplarını buradan yönetebilir."
        variant="card"
        actions={<CreateUserDialog />}
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
          description={`${users.length} kullanıcı listeleniyor. Bu liste Supabase profiles tablosundan geliyor.`}
        />

        <UserTable users={users} />
      </section>
    </div>
  )
}