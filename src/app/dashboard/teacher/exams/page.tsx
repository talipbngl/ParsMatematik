import Link from "next/link";
import { CheckCircle2, PlusCircle } from "lucide-react";

import { gradeExamAction } from "@/features/exams/actions/grade-exam.action";
import { ExamList } from "@/features/exams/components/ExamList";
import {
  getExamStats,
  getRecentExamSubmissions,
  getTeacherExams
} from "@/features/exams/services/exams.service";

export default async function TeacherExamsPage() {
  const exams = await getTeacherExams();
  const submissions = await getRecentExamSubmissions();
  const stats = await getExamStats();

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">
            Sınavlar
          </p>

          <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
            Sınav yönetimi
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Öğretmen burada kurslara bağlı sınav oluşturacak, yayınlayacak ve
            öğrencilerin sonuçlarını takip edecek.
          </p>
        </div>

        <Link
          href="/dashboard/teacher/exams/new"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700"
        >
          <PlusCircle className="size-4" />
          Yeni Sınav
        </Link>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Toplam</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {stats.totalExams}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Yayında</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {stats.publishedExams}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Taslak</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {stats.draftExams}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Teslim</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {stats.totalSubmissions}
          </p>
        </div>
      </section>

      <ExamList
        exams={exams}
        audience="teacher"
        emptyTitle="Henüz sınav yok"
        emptyDescription="Yeni sınav oluşturduğunda burada görünecek."
      />

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-black text-slate-950">
            Son sınav teslimleri
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Öğretmen burada öğrencilerin sınav sonuçlarını inceleyip puan
            güncelleyebilir.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {submissions.map((submission) => (
            <article key={submission.id} className="p-6">
              <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
                <div>
                  <h3 className="font-black text-slate-950">
                    {submission.studentName}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Sınav ID: {submission.examId}
                  </p>

                  <p className="mt-3 text-sm font-bold text-slate-700">
                    Mevcut puan: {submission.score ?? "-"} /{" "}
                    {submission.maxScore}
                  </p>

                  {submission.feedback ? (
                    <p className="mt-3 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                      {submission.feedback}
                    </p>
                  ) : null}
                </div>

                <form
                  action={gradeExamAction}
                  className="rounded-3xl border border-slate-200 p-4"
                >
                  <input
                    type="hidden"
                    name="submissionId"
                    value={submission.id}
                  />

                  <label
                    htmlFor={`score-${submission.id}`}
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Puan
                  </label>

                  <input
                    id={`score-${submission.id}`}
                    name="score"
                    type="number"
                    min={0}
                    defaultValue={submission.score ?? ""}
                    placeholder="100"
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                  />

                  <label
                    htmlFor={`feedback-${submission.id}`}
                    className="mb-2 mt-4 block text-sm font-bold text-slate-700"
                  >
                    Geri bildirim
                  </label>

                  <textarea
                    id={`feedback-${submission.id}`}
                    name="feedback"
                    rows={3}
                    defaultValue={submission.feedback ?? ""}
                    placeholder="Öğrenciye kısa yorum yaz."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                  />

                  <button
                    type="submit"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2.5 text-sm font-black text-white transition hover:bg-indigo-700"
                  >
                    <CheckCircle2 className="size-4" />
                    Değerlendir
                  </button>
                </form>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}