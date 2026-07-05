import { getCoursesForTeacher } from "@/features/courses/services/courses.service"
import { createAssignmentAction } from "../actions/create-assignment.action"

const statusOptions = [
  { value: "draft", label: "Taslak" },
  { value: "published", label: "Yayında" },
  { value: "closed", label: "Kapandı" }
]

export async function AssignmentForm() {
  const courses = await getCoursesForTeacher()

  if (courses.length === 0) {
    return (
      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
        <p className="text-sm font-black text-amber-900">
          Ödev oluşturmak için önce sana atanmış en az bir kurs olmalı.
        </p>
        <p className="mt-2 text-sm font-medium text-amber-800">
          Admin panelinden kurs-öğretmen ataması yapıldıktan sonra burada kurs
          seçimi görünecek.
        </p>
      </div>
    )
  }

  return (
    <form
      action={createAssignmentAction}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <p className="text-sm font-black uppercase tracking-[0.25em] text-indigo-600">
          Yeni Ödev
        </p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">
          Ödev oluştur
        </h2>
        <p className="mt-2 text-sm font-medium text-slate-500">
          Seçtiğin kursa bağlı ödev oluştur. Yayında durumundaki ödevleri
          öğrenciler görebilir ve teslim edebilir.
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
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
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
            defaultValue="published"
            required
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
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
            Başlık
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="Örn: Fonksiyonlar çalışma ödevi"
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
            rows={5}
            required
            placeholder="Öğrencinin ne yapması gerektiğini açıkça yaz."
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label
            htmlFor="dueAt"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Teslim tarihi
          </label>
          <input
            id="dueAt"
            name="dueAt"
            type="datetime-local"
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label
            htmlFor="maxScore"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Maksimum puan
          </label>
          <input
            id="maxScore"
            name="maxScore"
            type="number"
            min={0}
            defaultValue={100}
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end border-t border-slate-100 pt-6">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-indigo-700"
        >
          Ödev Oluştur
        </button>
      </div>
    </form>
  )
}