import { getCoursesForTeacher } from "@/features/courses/services/courses.service";

import { createExamAction } from "../actions/create-exam.action";
import { QuestionForm } from "./QuestionForm";

const statusOptions = [
  { value: "draft", label: "Taslak" },
  { value: "published", label: "Yayında" },
  { value: "closed", label: "Kapandı" }
];

export async function ExamForm() {
  const courses = await getCoursesForTeacher();

  return (
    <form
      action={createExamAction}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">
          Yeni Sınav
        </p>

        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
          Sınav oluştur
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          İlk MVP’de sınav bilgisi ve örnek soru formu hazırlanıyor. Gerçek soru
          kayıtları Supabase bağlantısından sonra aktif olacak.
        </p>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div>
          <label
            htmlFor="courseId"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Kurs
          </label>

          <select
            id="courseId"
            name="courseId"
            required
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          >
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="status"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Durum
          </label>

          <select
            id="status"
            name="status"
            defaultValue="draft"
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Sınav başlığı
          </label>

          <input
            id="title"
            name="title"
            type="text"
            required
            minLength={3}
            placeholder="Örn: LGS Çarpanlar ve Katlar Denemesi"
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Açıklama
          </label>

          <textarea
            id="description"
            name="description"
            rows={4}
            required
            placeholder="Sınav içeriğini ve öğrenciye açıklamayı yaz."
            className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label
            htmlFor="startsAt"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Başlangıç
          </label>

          <input
            id="startsAt"
            name="startsAt"
            type="datetime-local"
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label
            htmlFor="endsAt"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Bitiş
          </label>

          <input
            id="endsAt"
            name="endsAt"
            type="datetime-local"
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label
            htmlFor="durationMinutes"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Süre dakika
          </label>

          <input
            id="durationMinutes"
            name="durationMinutes"
            type="number"
            min={5}
            max={240}
            defaultValue={40}
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          />
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div>
          <h3 className="text-xl font-black text-slate-950">Sorular</h3>
          <p className="mt-1 text-sm text-slate-500">
            Şimdilik örnek soru alanı. Çoklu soru yönetimi sonraki aşamada
            client form state ile geliştirilecek.
          </p>
        </div>

        <QuestionForm index={0} />
      </div>

      <div className="mt-6 flex justify-end border-t border-slate-100 pt-6">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-indigo-700"
        >
          Sınav Oluştur
        </button>
      </div>
    </form>
  );
}