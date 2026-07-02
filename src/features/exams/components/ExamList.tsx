import type { ExamListItem } from "../types/exams.types";
import { ExamCard } from "./ExamCard";

type ExamListProps = {
  exams: ExamListItem[];
  audience?: "teacher" | "student" | undefined;
  emptyTitle?: string | undefined;
  emptyDescription?: string | undefined;
};

export function ExamList({
  exams,
  audience = "student",
  emptyTitle = "Henüz sınav yok",
  emptyDescription = "Sınav eklendiğinde burada listelenecek."
}: ExamListProps) {
  if (exams.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
        <h3 className="text-lg font-black text-slate-950">{emptyTitle}</h3>
        <p className="mt-2 text-sm text-slate-500">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {exams.map((exam) => (
        <ExamCard key={exam.id} exam={exam} audience={audience} />
      ))}
    </div>
  );
}