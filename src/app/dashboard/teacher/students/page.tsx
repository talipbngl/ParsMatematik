import { Mail, Phone, Search, UserRound, Users } from "lucide-react"

import { getUsersByRole } from "@/features/users/services/users.service"
import { PageHeader } from "@/shared/components/layout/PageHeader"
import { SectionHeader } from "@/shared/components/layout/SectionHeader"
import { ContentCard } from "@/shared/components/ui/ContentCard"
import { DashboardStatCard } from "@/shared/components/ui/DashboardStatCard"
import { StatusPill } from "@/shared/components/ui/StatusPill"

function getInitials(fullName: string): string {
  return fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

export default async function TeacherStudentsPage() {
  const students = await getUsersByRole("student")
  const activeStudents = students.filter((student) => student.status === "active")
  const pendingStudents = students.filter((student) => student.status === "pending")

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Öğretmen Paneli"
        title="Öğrenciler"
        description="Öğretmenin kurslarına kayıtlı öğrencileri takip edeceği alan. Şimdilik mock kullanıcı verisiyle hazırlanıyor."
        variant="card"
      />

      <section className="grid gap-4 md:grid-cols-3">
        <DashboardStatCard
          title="Toplam Öğrenci"
          value={String(students.length)}
          description="Mock öğrenci hesabı"
          icon={Users}
          tone="indigo"
        />
        <DashboardStatCard
          title="Aktif"
          value={String(activeStudents.length)}
          description="Aktif görünen öğrenciler"
          icon={UserRound}
          tone="emerald"
        />
        <DashboardStatCard
          title="Bekleyen"
          value={String(pendingStudents.length)}
          description="Onay bekleyen öğrenciler"
          icon={Search}
          tone="amber"
        />
      </section>

      <section className="space-y-4">
        <SectionHeader
          title="Öğrenci Listesi"
          description="Gerçek Supabase bağlantısından sonra bu liste öğretmenin kendi kurslarındaki öğrencilerden beslenecek."
        />

        <div className="grid gap-4 xl:grid-cols-2">
          {students.map((student) => (
            <ContentCard key={student.id}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-base font-black text-indigo-700">
                    {getInitials(student.fullName)}
                  </div>

                  <div>
                    <h2 className="text-lg font-black text-slate-950">
                      {student.fullName}
                    </h2>
                    <p className="mt-1 text-xs font-medium text-slate-500">
                      {student.id}
                    </p>

                    <div className="mt-3 space-y-1 text-sm text-slate-600">
                      <p className="flex items-center gap-2">
                        <Mail className="size-4 text-slate-400" />
                        {student.email}
                      </p>

                      {student.phone ? (
                        <p className="flex items-center gap-2">
                          <Phone className="size-4 text-slate-400" />
                          {student.phone}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>

                <StatusPill
                  label={student.status === "active" ? "Aktif" : "Bekliyor"}
                  tone={student.status === "active" ? "emerald" : "amber"}
                />
              </div>
            </ContentCard>
          ))}
        </div>
      </section>
    </div>
  )
}