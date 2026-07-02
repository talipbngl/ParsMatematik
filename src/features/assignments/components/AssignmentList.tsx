import type { AssignmentListItem } from "../types/assignments.types";
import { AssignmentCard } from "./AssignmentCard";

type AssignmentListProps = {
  assignments: AssignmentListItem[];
  audience?: "teacher" | "student" | undefined;
  emptyTitle?: string | undefined;
  emptyDescription?: string | undefined;
};

export function AssignmentList({
  assignments,
  audience = "student",
  emptyTitle = "Henüz ödev yok",
  emptyDescription = "Ödev eklendiğinde burada listelenecek."
}: AssignmentListProps) {
  if (assignments.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
        <h3 className="text-lg font-black text-slate-950">{emptyTitle}</h3>
        <p className="mt-2 text-sm text-slate-500">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {assignments.map((assignment) => (
        <AssignmentCard
          key={assignment.id}
          assignment={assignment}
          audience={audience}
        />
      ))}
    </div>
  );
}