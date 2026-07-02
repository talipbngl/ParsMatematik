import { LiveLessonList } from "@/features/live-lessons/components/LiveLessonList";
import {
  getLiveLessonStats,
  getStudentLiveLessons
} from "@/features/live-lessons/services/live-lessons.service";

export default async function StudentLiveLessonsPage() {
  const lessons = await getStudentLiveLessons();
  const stats = await getLiveLessonStats();

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">
          Canlı Dersler
        </p>

        <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
          Yaklaşan canlı derslerim
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Öğrenci burada kayıtlı olduğu kurslara ait canlı dersleri görecek.
          İlk MVP’de derse katılım meeting URL üzerinden yapılacak.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Toplam</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {stats.totalLessons}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Planlanan</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {stats.scheduledLessons}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Canlı</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {stats.liveLessons}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Tamamlanan</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {stats.completedLessons}
          </p>
        </div>
      </section>

      <LiveLessonList
        lessons={lessons}
        audience="student"
        emptyTitle="Henüz canlı ders yok"
        emptyDescription="Kayıtlı olduğun kurslara canlı ders eklendiğinde burada görünecek."
      />
    </div>
  );
}