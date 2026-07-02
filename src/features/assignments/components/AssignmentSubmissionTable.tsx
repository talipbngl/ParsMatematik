import { CheckCircle2, FileText } from "lucide-react";

import { gradeAssignmentAction } from "../actions/grade-assignment.action";
import { formatAssignmentDate } from "../services/assignments.service";
import type { AssignmentSubmission } from "../types/assignments.types";

type AssignmentSubmissionTableProps = {
  submissions: AssignmentSubmission[];
};

export function AssignmentSubmissionTable({
  submissions
}: AssignmentSubmissionTableProps) {
  if (submissions.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
        <h3 className="text-lg font-black text-slate-950">
          Henüz teslim yok
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          Öğrenciler ödev teslim ettiğinde burada görünecek.
        </p>
      </div>
    );
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-4">
        <h2 className="text-lg font-black text-slate-950">
          Son ödev teslimleri
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Mock teslim verileri gösteriliyor. Gerçek teslimler Supabase’den
          gelecek.
        </p>
      </div>

      <div className="divide-y divide-slate-100">
        {submissions.map((submission) => (
          <article key={submission.id} className="p-6">
            <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-black text-slate-950">
                    {submission.studentName}
                  </h3>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
                    {submission.status}
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-500">
                  Teslim tarihi: {formatAssignmentDate(submission.submittedAt)}
                </p>

                {submission.answerText ? (
                  <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                    {submission.answerText}
                  </p>
                ) : null}

                {submission.filePath ? (
                  <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                    <FileText className="size-4" />
                    {submission.filePath}
                  </p>
                ) : null}
              </div>

              <form
                action={gradeAssignmentAction}
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
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
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
  );
}