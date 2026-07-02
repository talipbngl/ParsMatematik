import Link from "next/link";
import { ExternalLink, Video } from "lucide-react";

import {
  getProviderLabel,
  getSafeMeetingUrl,
  isEmbeddableProvider
} from "../services/meeting-provider.service";
import type { LiveLessonListItem } from "../types/live-lessons.types";
import { JitsiMeeting } from "./JitsiMeeting";

type LiveLessonRoomProps = {
  lesson: LiveLessonListItem;
};

export function LiveLessonRoom({ lesson }: LiveLessonRoomProps) {
  const safeMeetingUrl = getSafeMeetingUrl(lesson.meetingUrl);
  const canEmbed = isEmbeddableProvider(lesson.provider) && safeMeetingUrl;

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">
              Canlı Ders Odası
            </p>

            <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
              {lesson.title}
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Platform: {getProviderLabel(lesson.provider)} · Kurs:{" "}
              {lesson.courseTitle}
            </p>
          </div>

          {safeMeetingUrl ? (
            <Link
              href={safeMeetingUrl}
              target="_blank"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-indigo-700"
            >
              <ExternalLink className="size-4" />
              Yeni Sekmede Aç
            </Link>
          ) : null}
        </div>
      </div>

      {canEmbed ? (
        <JitsiMeeting roomUrl={safeMeetingUrl} title={lesson.title} />
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <Video className="size-7" />
          </div>

          <h2 className="mt-5 text-xl font-black text-slate-950">
            Bu ders harici link ile açılır
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Google Meet ve Zoom linkleri güvenlik nedeniyle genelde iframe içine
            gömülmez. Derse katılmak için yukarıdaki butonu kullan.
          </p>
        </div>
      )}
    </section>
  );
}