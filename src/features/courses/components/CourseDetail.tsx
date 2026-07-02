import {
  ClipboardList,
  FileText,
  GraduationCap,
  Users,
  Video
} from "lucide-react";

import {
  formatCoursePrice,
  getCourseGradeLevelLabel,
  getCourseStatusLabel
} from "../services/courses.service";
import type { CourseListItem, CourseStatus } from "../types/courses.types";

type CourseDetailProps = {
  course: CourseListItem;
};

const statusClassNames: Record<CourseStatus, string> = {
  draft: "bg-amber-50 text-amber-700 ring-amber-200",
  published: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  archived: "bg-slate-100 text-slate-600 ring-slate-200"
};

export function CourseDetail({ course }: CourseDetailProps) {
  const statItems = [
    { title: "Öğrenci", value: course.enrollmentCount, icon: Users },
    { title: "Canlı Ders", value: course.liveLessonCount, icon: Video },
    { title: "Materyal", value: course.materialCount, icon: FileText },
    { title: "Ödev", value: course.assignmentCount, icon: ClipboardList }
  ];

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="bg-gradient-to-br from-indigo-600 via-violet-600 to-slate-950 p-6 text-white md:p-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-amber-300">
              {getCourseGradeLevelLabel(course.gradeLevel)}
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
              {course.title}
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80 md:text-base">
              {course.description}
            </p>
          </div>

          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-black ring-1 ring-inset ${statusClassNames[course.status]}`}
          >
            {getCourseStatusLabel(course.status)}
          </span>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statItems.map((item) => (
            <div key={item.title} className="rounded-3xl bg-slate-50 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-slate-500">
                    {item.title}
                  </p>
                  <p className="mt-2 text-3xl font-black text-slate-950">
                    {item.value}
                  </p>
                </div>

                <div className="flex size-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <item.icon className="size-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 p-5">
            <p className="text-sm font-bold text-slate-500">Paket fiyatı</p>
            <p className="mt-2 text-2xl font-black text-slate-950">
              {formatCoursePrice(course.price)}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 p-5">
            <p className="text-sm font-bold text-slate-500">Öğretmenler</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {course.teacherNames.map((teacherName) => (
                <span
                  key={teacherName}
                  className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700"
                >
                  <GraduationCap className="size-3.5" />
                  {teacherName}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}