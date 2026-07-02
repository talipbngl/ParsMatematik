import Link from "next/link";
import {
  CalendarDays,
  Clock,
  ExternalLink,
  GraduationCap,
  Trash2,
  Users,
  Video
} from "lucide-react";

import { deleteLiveLessonAction } from "../actions/delete-live-lesson.action";
import {
  formatLiveLessonDate,
  getLiveLessonStatusLabel
} from "../services/live-lessons.service";
import { getProviderLabel } from "../services/meeting-provider.service";
import type {
  LiveLessonListItem,
  LiveLessonStatus
} from "../types/live-lessons.types";

type LiveLessonCardProps = {
  lesson: LiveLessonListItem;
  audience?: "teacher" | "student" | undefined;
};

const statusClassNames: Record<LiveLessonStatus, string> = {
  scheduled: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  live: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  completed: "bg-slate-100 text-slate-600 ring-slate-200",
  cancelled: "bg-red-50 text-red-700 ring-red-200"
};

export function LiveLessonCard({
  lesson,
  audience = "student"
}: LiveLessonCardProps) {
  const canJoin = Boolean(lesson.meetingUrl) && lesson.status !== "cancelled";

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <Video className="size-6" />
        </div>

        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-black ring-1 ring-inset ${statusClassNames[lesson.status]}`}
        >
          {getLiveLessonStatusLabel(lesson.status)}
        </span>
      </div>

      <div className="mt-5">
        <h3 className="text-lg font-black text-slate-950">{lesson.title}</h3>

        {lesson.description ? (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
            {lesson.description}
          </p>
        ) : null}
      </div>

      <div className="mt-5 space-y-2 text-sm text-slate-500">
        <p className="flex items-center gap-2">
          <GraduationCap className="size-4" />
          {lesson.courseTitle}
        </p>

        <p className="flex items-center gap-2">
          <CalendarDays className="size-4" />
          {formatLiveLessonDate(lesson.startsAt)}
        </p>

        <p className="flex items-center gap-2">
          <Clock className="size-4" />
          {lesson.durationMinutes} dakika
        </p>

        <p className="flex items-center gap-2">
          <Users className="size-4" />
          {lesson.attendeeCount} öğrenci
        </p>

        <p className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
          {getProviderLabel(lesson.provider)}
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-2 border-t border-slate-100 pt-5 sm:flex-row">
        {canJoin ? (
          <Link
            href={lesson.meetingUrl ?? "#"}
            target="_blank"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2.5 text-sm font-black text-white transition hover:bg-indigo-700"
          >
            <ExternalLink className="size-4" />
            Derse Katıl
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="inline-flex flex-1 items-center justify-center rounded-2xl bg-slate-100 px-4 py-2.5 text-sm font-black text-slate-400"
          >
            Link Yok
          </button>
        )}

        {audience === "teacher" ? (
          <form action={deleteLiveLessonAction}>
            <input type="hidden" name="id" value={lesson.id} />

            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 text-sm font-black text-red-600 transition hover:bg-red-100"
            >
              <Trash2 className="size-4" />
              İptal
            </button>
          </form>
        ) : null}
      </div>
    </article>
  );
}