import { CheckCircle2, ExternalLink, FileText } from "lucide-react"
import { gradeAssignmentAction } from "../actions/grade-assignment.action"
import { formatAssignmentDate } from "../services/assignments.service"
import type { AssignmentSubmission } from "../types/assignments.types"

type AssignmentSubmissionTableProps = {
  submissions: AssignmentSubmission[]
}

function isExternalUrl(value: string | null | undefined): boolean {
  return Boolean(value?.startsWith("http://") || value?.startsWith("https://"))
}

export function AssignmentSubmissionTable({
  submissions
}: AssignmentSubmissionTableProps) {
  if (submissions.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
          <FileText className="h-6 w-6 text-slate-500" />
        </div>
        <h3 className="mt-4 text-lg font-black text-slate-950">
          Henüz teslim yok
        </h3>
        <p className="mt-2 text-sm font-medium text-slate-500">
          Öğrenciler ödev teslim ettiğinde burada görünecek.
        </p>
      </div>
    )
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-black text-slate-950">
          Son ödev teslimleri
        </h2>
        <p className="mt-2 text-sm font-medium text-slate-500">
          Öğrenci teslimlerini puanlayıp geri bildirim verebilirsin.
        </p>
      </div>

      <div className="grid gap-4">
        {submissions.map((submission) => (
          <article
            key={submission.id}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-black text-indigo-700">
                    {submission.status}
                  </span>

                  {submission.score !== null &&
                  submission.score !== undefined ? (
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                      {submission.score} puan
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-3 text-lg font-black text-slate-950">
                  {submission.studentName}
                </h3>

                <p className="mt-1 text-sm font-bold text-slate-500">
                  Teslim tarihi: {formatAssignmentDate(submission.submittedAt)}
                </p>

                {submission.answerText ? (
                  <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm font-medium leading-6 text-slate-700">
                    {submission.answerText}
                  </p>
                ) : null}

                {submission.filePath ? (
                  <div className="mt-4">
                    {isExternalUrl(submission.filePath) ? (
                      <a
                        href={submission.filePath}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-50"
                      >
                        Teslim dosyasını aç
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : (
                      <p className="rounded-2xl bg-slate-50 p-3 text-sm font-bold text-slate-600">
                        Dosya yolu: {submission.filePath}
                      </p>
                    )}
                  </div>
                ) : null}

                {submission.feedback ? (
                  <p className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm font-medium leading-6 text-emerald-800">
                    Geri bildirim: {submission.feedback}
                  </p>
                ) : null}
              </div>

              <form
                action={gradeAssignmentAction}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <input
                  type="hidden"
                  name="submissionId"
                  value={submission.id}
                />

                <div>
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
                    required
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>

                <div className="mt-4">
                  <label
                    htmlFor={`feedback-${submission.id}`}
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Geri bildirim
                  </label>
                  <textarea
                    id={`feedback-${submission.id}`}
                    name="feedback"
                    rows={4}
                    defaultValue={submission.feedback ?? ""}
                    placeholder="Öğrenciye kısa geri bildirim yaz."
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>

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
  )
}