import type { LiveLessonListItem } from "../types/live-lessons.types";
import { LiveLessonCard } from "./LiveLessonCard";

type LiveLessonListProps = {
  lessons: LiveLessonListItem[];
  audience?: "teacher" | "student" | undefined;
  emptyTitle?: string | undefined;
  emptyDescription?: string | undefined;
};

export function LiveLessonList({
  lessons,
  audience = "student",
  emptyTitle = "Henüz canlı ders yok",
  emptyDescription = "Canlı ders eklendiğinde burada listelenecek."
}: LiveLessonListProps) {
  if (lessons.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
        <h3 className="text-lg font-black text-slate-950">{emptyTitle}</h3>
        <p className="mt-2 text-sm text-slate-500">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {lessons.map((lesson) => (
        <LiveLessonCard
          key={lesson.id}
          lesson={lesson}
          audience={audience}
        />
      ))}
    </div>
  );
}