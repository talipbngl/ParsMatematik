import {
  CalendarDays,
  ClipboardCheck,
  Clock,
  FileText,
  GraduationCap,
  Users
} from "lucide-react";

import {
  formatExamDate,
  formatExamDuration,
  getExamStatusLabel
} from "../services/exams.service";
import type { ExamListItem, ExamStatus } from "../types/exams.types";

type ExamCardProps = {
  exam: ExamListItem;
  audience?: "teacher" | "student" | undefined;
};

const statusClassNames: Record<ExamStatus, string> = {
  draft: "bg-amber-50 text-amber-700 ring-amber-200",
  published: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  closed: "bg-slate-100 text-slate-600 ring-slate-200"
};

export function ExamCard({ exam, audience = "student" }: ExamCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <FileText className="size-6" />
        </div>

        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-black ring-1 ring-inset ${statusClassNames[exam.status]}`}
        >
          {getExamStatusLabel(exam.status)}
        </span>
      </div>

      <div className="mt-5">
        <h3 className="text-lg font-black text-slate-950">{exam.title}</h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
          {exam.description}
        </p>
      </div>

      <div className="mt-5 space-y-2 text-sm text-slate-500">
        <p className="flex items-center gap-2">
          <GraduationCap className="size-4" />
          {exam.courseTitle}
        </p>

        <p className="flex items-center gap-2">
          <CalendarDays className="size-4" />
          Başlangıç: {formatExamDate(exam.startsAt)}
        </p>

        <p className="flex items-center gap-2">
          <Clock className="size-4" />
          {formatExamDuration(exam.durationMinutes)}
        </p>

        <p className="flex items-center gap-2">
          <ClipboardCheck className="size-4" />
          {exam.questionCount} soru
        </p>

        <p className="flex items-center gap-2">
          <Users className="size-4" />
          {exam.submissionCount} teslim
        </p>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-5">
        {audience === "teacher" ? (
          <p className="text-sm font-bold text-slate-600">
            Ortalama skor: {exam.averageScore ?? "Henüz yok"}
          </p>
        ) : exam.status === "published" ? (
          <a
            href="#sinav-coz"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-indigo-600 px-4 py-2.5 text-sm font-black text-white transition hover:bg-indigo-700"
          >
            Sınavı Çöz
          </a>
        ) : (
          <p className="text-sm font-bold text-slate-600">Sınav kapalı</p>
        )}
      </div>
    </article>
  );
}