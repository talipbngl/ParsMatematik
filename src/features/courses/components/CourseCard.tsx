import Link from "next/link";
import {
  BookOpen,
  ClipboardList,
  FileText,
  GraduationCap,
  Users,
  Video
} from "lucide-react";

import type {
  CourseAudience,
  CourseListItem,
  CourseStatus
} from "../types/courses.types";
import {
  formatCoursePrice,
  getCourseGradeLevelLabel,
  getCourseStatusLabel
} from "../services/courses.service";

type CourseCardProps = {
  course: CourseListItem;
  audience?: CourseAudience | undefined;
};

const statusClassNames: Record<CourseStatus, string> = {
  draft: "bg-amber-50 text-amber-700 ring-amber-200",
  published: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  archived: "bg-slate-100 text-slate-600 ring-slate-200"
};

function getCourseHref(course: CourseListItem): string {
  return `/courses/${course.id}`;
}

export function CourseCard({ course, audience = "public" }: CourseCardProps) {
  const href = getCourseHref(course);

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative min-h-36 bg-gradient-to-br from-indigo-600 via-violet-600 to-slate-950 p-5 text-white">
        <div className="flex items-start justify-between gap-4">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-black ring-1 ring-white/20">
            {getCourseGradeLevelLabel(course.gradeLevel)}
          </span>

          <span
            className={`rounded-full px-3 py-1 text-xs font-black ring-1 ring-inset ${statusClassNames[course.status]}`}
          >
            {getCourseStatusLabel(course.status)}
          </span>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-black tracking-tight">{course.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/75">
            {course.description}
          </p>
        </div>
      </div>

      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2">
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

        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="flex items-center gap-2 font-bold text-slate-500">
              <Users className="size-4" />
              Öğrenci
            </p>
            <p className="mt-1 text-lg font-black text-slate-950">
              {course.enrollmentCount}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="flex items-center gap-2 font-bold text-slate-500">
              <Video className="size-4" />
              Canlı Ders
            </p>
            <p className="mt-1 text-lg font-black text-slate-950">
              {course.liveLessonCount}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="flex items-center gap-2 font-bold text-slate-500">
              <FileText className="size-4" />
              Materyal
            </p>
            <p className="mt-1 text-lg font-black text-slate-950">
              {course.materialCount}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="flex items-center gap-2 font-bold text-slate-500">
              <ClipboardList className="size-4" />
              Ödev
            </p>
            <p className="mt-1 text-lg font-black text-slate-950">
              {course.assignmentCount}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
          <div>
            <p className="text-xs font-bold text-slate-400">Paket Fiyatı</p>
            <p className="text-base font-black text-slate-950">
              {formatCoursePrice(course.price)}
            </p>
          </div>

          <Link
            href={href}
            className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2.5 text-sm font-black text-white transition hover:bg-indigo-700"
          >
            <BookOpen className="size-4" />
            {audience === "student" ? "Derse Git" : "Detay"}
          </Link>
        </div>
      </div>
    </article>
  );
}