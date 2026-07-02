import Link from "next/link";
import { PlusCircle } from "lucide-react";

import { AssignmentList } from "@/features/assignments/components/AssignmentList";
import { AssignmentSubmissionTable } from "@/features/assignments/components/AssignmentSubmissionTable";
import {
  getAssignmentStats,
  getRecentAssignmentSubmissions,
  getTeacherAssignments
} from "@/features/assignments/services/assignments.service";

export default async function TeacherAssignmentsPage() {
  const assignments = await getTeacherAssignments();
  const submissions = await getRecentAssignmentSubmissions();
  const stats = await getAssignmentStats();

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">
            Ödevler
          </p>

          <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
            Ödev yönetimi
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Öğretmen burada kurslara bağlı ödev oluşturacak, teslimleri görecek
            ve değerlendirme yapacak.
          </p>
        </div>

        <Link
          href="/dashboard/teacher/assignments/new"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700"
        >
          <PlusCircle className="size-4" />
          Yeni Ödev
        </Link>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Toplam</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {stats.totalAssignments}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Yayında</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {stats.publishedAssignments}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Teslim</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {stats.totalSubmissions}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Değerlendirilen</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {stats.gradedSubmissions}
          </p>
        </div>
      </section>

      <AssignmentList
        assignments={assignments}
        audience="teacher"
        emptyTitle="Henüz ödev yok"
        emptyDescription="Yeni ödev oluşturduğunda burada görünecek."
      />

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-black text-slate-950">
            Teslim değerlendirme
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Öğretmen burada öğrencilerin teslimlerini puanlayıp geri bildirim
            yazacak.
          </p>
        </div>

        <AssignmentSubmissionTable submissions={submissions} />
      </section>
    </div>
  );
}