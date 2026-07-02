import { LiveLessonForm } from "@/features/live-lessons/components/LiveLessonForm";

export default function NewTeacherLiveLessonPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">
          Yeni Canlı Ders
        </p>

        <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
          Canlı ders oluştur
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          İlk sürümde öğretmen Google Meet, Zoom veya Jitsi linkini manuel
          ekleyecek. Öğrenci ders saati geldiğinde bu linkten katılacak.
        </p>
      </section>

      <LiveLessonForm />
    </div>
  );
}