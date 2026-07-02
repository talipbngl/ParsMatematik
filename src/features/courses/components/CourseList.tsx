import type { CourseAudience, CourseListItem } from "../types/courses.types";
import { CourseCard } from "./CourseCard";

type CourseListProps = {
  courses: CourseListItem[];
  audience?: CourseAudience | undefined;
  emptyTitle?: string | undefined;
  emptyDescription?: string | undefined;
};

export function CourseList({
  courses,
  audience = "public",
  emptyTitle = "Henüz kurs yok",
  emptyDescription = "Kurslar eklendiğinde burada listelenecek."
}: CourseListProps) {
  if (courses.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
        <h3 className="text-lg font-black text-slate-950">{emptyTitle}</h3>
        <p className="mt-2 text-sm text-slate-500">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} audience={audience} />
      ))}
    </div>
  );
}