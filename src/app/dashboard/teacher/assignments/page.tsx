import Link from "next/link"
import { ClipboardList, CheckCircle2, PlusCircle, Send } from "lucide-react"
import { AssignmentList } from "@/features/assignments/components/AssignmentList"
import { AssignmentSubmissionTable } from "@/features/assignments/components/AssignmentSubmissionTable"
import {
  getRecentAssignmentSubmissions,
  getTeacherAssignments,
  getTeacherAssignmentStats
} from "@/features/assignments/services/assignments.service"

export default async function TeacherAssignmentsPage() {
  const assignments = await getTeacherAssignments()
  const submissions = await getRecentAssignmentSubmissions()
  const stats = await getTeacherAssignmentStats()

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.25em] text-indigo-600">
            Ödevler
          </p>
          <h1 className="mt-2 text-3xl font-black text-slate-950">
            Ödev yönetimi
          </h1>
          <p className="mt-2 max-w-2xl text-sm font-medium text-slate-500">
            Sana atanmış kurslar için ödev oluştur, teslimleri takip et ve
            değerlendirme yap.
          </p>
        </div>

        <Link
          href="/dashboard/teacher/assignments/new"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-indigo-700"
        >
          <PlusCircle className="h-5 w-5" />
          Yeni Ödev
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-slate-500">Toplam</p>
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
            <p className="text-sm font-bold text-slate-500">Teslim</p>
            <Send className="h-5 w-5 text-indigo-400" />
          </div>
          <p className="mt-2 text-3xl font-black text-indigo-600">
            {stats.totalSubmissions}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-slate-500">Değerlendirilen</p>
            <CheckCircle2 className="h-5 w-5 text-rose-400" />
          </div>
          <p className="mt-2 text-3xl font-black text-rose-600">
            {stats.gradedSubmissions}
          </p>
        </div>
      </div>

      <AssignmentList
        assignments={assignments}
        audience="teacher"
        emptyTitle="Henüz ödev oluşturulmadı"
        emptyDescription="Yeni Ödev butonuyla ilk ödevini oluşturabilirsin."
      />

      <AssignmentSubmissionTable submissions={submissions} />
    </div>
  )
}