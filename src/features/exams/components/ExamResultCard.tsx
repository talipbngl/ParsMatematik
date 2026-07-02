import { CheckCircle2, Clock, Trophy } from "lucide-react";

import { formatExamDate } from "../services/exams.service";
import type { ExamListItem, ExamSubmission } from "../types/exams.types";

type ExamResultCardProps = {
  exam: ExamListItem;
  submission: ExamSubmission | null;
};

export function ExamResultCard({ exam, submission }: ExamResultCardProps) {
  if (!submission) {
    return (
      <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
        <h2 className="text-xl font-black text-slate-950">
          Henüz sonuç yok
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          {exam.title} sınavını çözdüğünde sonucun burada görünecek.
        </p>
      </section>
    );
  }

  const scoreRatio =
    submission.maxScore > 0 && typeof submission.score === "number"
      ? Math.round((submission.score / submission.maxScore) * 100)
      : null;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">
            Sınav Sonucu
          </p>

          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
            {exam.title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Son teslim: {formatExamDate(submission.submittedAt)}
          </p>
        </div>

        <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700 ring-1 ring-emerald-200">
          {submission.status}
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl bg-slate-50 p-5">
          <div className="flex items-center gap-3">
            <Trophy className="size-5 text-indigo-600" />
            <p className="text-sm font-bold text-slate-500">Puan</p>
          </div>

          <p className="mt-2 text-3xl font-black text-slate-950">
            {submission.score ?? "-"} / {submission.maxScore}
          </p>
        </div>

        <div className="rounded-3xl bg-slate-50 p-5">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="size-5 text-emerald-600" />
            <p className="text-sm font-bold text-slate-500">Başarı</p>
          </div>

          <p className="mt-2 text-3xl font-black text-slate-950">
            {scoreRatio === null ? "-" : `%${scoreRatio}`}
          </p>
        </div>

        <div className="rounded-3xl bg-slate-50 p-5">
          <div className="flex items-center gap-3">
            <Clock className="size-5 text-amber-600" />
            <p className="text-sm font-bold text-slate-500">Durum</p>
          </div>

          <p className="mt-2 text-3xl font-black text-slate-950">
            {submission.status}
          </p>
        </div>
      </div>

      {submission.feedback ? (
        <div className="mt-6 rounded-3xl border border-indigo-100 bg-indigo-50 p-5">
          <p className="text-sm font-black text-indigo-700">
            Öğretmen geri bildirimi
          </p>

          <p className="mt-2 text-sm leading-6 text-indigo-900">
            {submission.feedback}
          </p>
        </div>
      ) : null}
    </section>
  );
}