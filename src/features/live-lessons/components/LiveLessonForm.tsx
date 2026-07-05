import { getCoursesForTeacher } from "@/features/courses/services/courses.service"

import { createLiveLessonAction } from "../actions/create-live-lesson.action"

const providerOptions = [
  { value: "external", label: "Harici Link" },
  { value: "google-meet", label: "Google Meet" },
  { value: "zoom", label: "Zoom" },
  { value: "jitsi", label: "Jitsi" }
]

export async function LiveLessonForm() {
  const courses = await getCoursesForTeacher()

  return (
    <form
      action={createLiveLessonAction}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">
          Yeni Canlı Ders
        </p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">
          Canlı ders oluştur
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          İlk MVP’de canlı ders linki dış servisten alınır ve burada meeting URL
          olarak saklanır.
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="mt-6 rounded-2xl bg-amber-50 p-4 text-sm font-bold leading-6 text-amber-700">
          Henüz sana atanmış kurs yok. Canlı ders oluşturmak için adminin seni
          en az bir kursa öğretmen olarak ataması gerekiyor.
        </div>
      ) : null}

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
            disabled={courses.length === 0}
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          >
            <option value="">Kurs seç</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="provider"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Platform
          </label>
          <select
            id="provider"
            name="provider"
            defaultValue="google-meet"
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          >
            {providerOptions.map((option) => (
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
            Başlık
          </label>
          <input
            id="title"
            name="title"
            required
            placeholder="Örn: Problemler konu anlatımı"
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
            placeholder="Dersin kısa açıklamasını yaz."
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
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
            required
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
            min={15}
            max={240}
            defaultValue={90}
            required
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="meetingUrl"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Meeting URL
          </label>
          <input
            id="meetingUrl"
            name="meetingUrl"
            type="url"
            placeholder="https://meet.google.com/..."
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          />
        </div>
      </div>

      <input type="hidden" name="status" value="scheduled" />

      <div className="mt-6 flex justify-end border-t border-slate-100 pt-6">
        <button
          type="submit"
          disabled={courses.length === 0}
          className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Canlı Ders Oluştur
        </button>
      </div>
    </form>
  )
}