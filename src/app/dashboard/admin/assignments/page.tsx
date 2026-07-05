import { CheckCircle2, ClipboardList, Lock, Send } from "lucide-react"
import { AssignmentList } from "@/features/assignments/components/AssignmentList"
import {
  getAssignments,
  getAssignmentStats
} from "@/features/assignments/services/assignments.service"

export default async function AdminAssignmentsPage() {
  const assignments = await getAssignments()
  const stats = await getAssignmentStats()

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.25em] text-indigo-600">
          Admin
        </p>
        <h1 className="mt-2 text-3xl font-black text-slate-950">
          Tüm ödevler
        </h1>
        <p className="mt-2 max-w-2xl text-sm font-medium text-slate-500">
          Platformdaki tüm kurs ödevlerini ve temel teslim istatistiklerini
          burada görüntüleyebilirsin.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-slate-500">Toplam Ödev</p>
            <ClipboardList className="h-5 w-5 text-slate-400" />
          </div>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {stats.totalAssignments}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-slate-500">Yayında</p>
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          </div>
          <p className="mt-2 text-3xl font-black text-emerald-600">
            {stats.publishedAssignments}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-slate-500">Kapalı</p>
            <Lock className="h-5 w-5 text-rose-400" />
          </div>
          <p className="mt-2 text-3xl font-black text-rose-600">
            {stats.closedAssignments}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-slate-500">Teslim</p>
            <Send className="h-5 w-5 text-indigo-400" />
          </div>
          <p className="mt-2 text-3xl font-black text-indigo-600">
            {stats.totalSubmissions}
          </p>
        </div>
      </div>

      <AssignmentList
        assignments={assignments}
        audience="teacher"
        emptyTitle="Henüz ödev yok"
        emptyDescription="Öğretmenler ödev oluşturduğunda burada listelenecek."
      />
    </div>
  )
}