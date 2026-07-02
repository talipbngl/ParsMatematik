import {
  CalendarDays,
  ClipboardList,
  GraduationCap,
  Star,
  Users
} from "lucide-react";

import {
  formatAssignmentDate,
  getAssignmentStatusLabel
} from "../services/assignments.service";
import type {
  AssignmentListItem,
  AssignmentStatus
} from "../types/assignments.types";

type AssignmentCardProps = {
  assignment: AssignmentListItem;
  audience?: "teacher" | "student" | undefined;
};

const statusClassNames: Record<AssignmentStatus, string> = {
  draft: "bg-amber-50 text-amber-700 ring-amber-200",
  published: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  closed: "bg-slate-100 text-slate-600 ring-slate-200"
};

export function AssignmentCard({
  assignment,
  audience = "student"
}: AssignmentCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <ClipboardList className="size-6" />
        </div>

        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-black ring-1 ring-inset ${statusClassNames[assignment.status]}`}
        >
          {getAssignmentStatusLabel(assignment.status)}
        </span>
      </div>

      <div className="mt-5">
        <h3 className="text-lg font-black text-slate-950">
          {assignment.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
          {assignment.description}
        </p>
      </div>

      <div className="mt-5 space-y-2 text-sm text-slate-500">
        <p className="flex items-center gap-2">
          <GraduationCap className="size-4" />
          {assignment.courseTitle}
        </p>

        <p className="flex items-center gap-2">
          <CalendarDays className="size-4" />
          {formatAssignmentDate(assignment.dueAt)}
        </p>

        <p className="flex items-center gap-2">
          <Users className="size-4" />
          {assignment.submissionCount} teslim
        </p>

        <p className="flex items-center gap-2">
          <Star className="size-4" />
          Maksimum puan: {assignment.maxScore ?? "Belirtilmedi"}
        </p>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-5">
        {audience === "teacher" ? (
          <p className="text-sm font-bold text-slate-600">
            {assignment.gradedCount} / {assignment.submissionCount} teslim
            değerlendirildi.
          </p>
        ) : (
          <p className="text-sm font-bold text-slate-600">
            Durum:{" "}
            {assignment.status === "published" ? "Teslim açık" : "Teslim kapalı"}
          </p>
        )}
      </div>
    </article>
  );
}