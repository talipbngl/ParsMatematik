import { AssignmentCard } from "@/features/assignments/components/AssignmentCard";
import { AssignmentSubmissionForm } from "@/features/assignments/components/AssignmentSubmissionForm";
import {
  getAssignmentStats,
  getStudentAssignments
} from "@/features/assignments/services/assignments.service";

export default async function StudentAssignmentsPage() {
  const assignments = await getStudentAssignments();
  const stats = await getAssignmentStats();

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">
          Ödevlerim
        </p>

        <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
          Ödev takip ve teslim
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Öğrenci burada kendisine atanmış ödevleri görür ve teslim yapar.
          Şimdilik mock veriyle çalışıyor.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Toplam Ödev</p>
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
          <p className="text-sm font-bold text-slate-500">Kapalı</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {stats.closedAssignments}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Teslimler</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {stats.totalSubmissions}
          </p>
        </div>
      </section>

      <section className="space-y-6">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]"
          >
            <AssignmentCard assignment={assignment} audience="student" />

            {assignment.status === "published" ? (
              <AssignmentSubmissionForm assignmentId={assignment.id} />
            ) : (
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-black text-slate-950">
                  Teslim kapalı
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Bu ödev şu anda teslim almıyor. Öğretmen tekrar açarsa teslim
                  formu burada görünecek.
                </p>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}