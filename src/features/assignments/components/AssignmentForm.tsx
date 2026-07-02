import { getCoursesForTeacher } from "@/features/courses/services/courses.service";

import { createAssignmentAction } from "../actions/create-assignment.action";

const statusOptions = [
  { value: "draft", label: "Taslak" },
  { value: "published", label: "Yayında" },
  { value: "closed", label: "Kapandı" }
];

export async function AssignmentForm() {
  const courses = await getCoursesForTeacher();

  return (
    <form
      action={createAssignmentAction}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">
          Yeni Ödev
        </p>

        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
          Ödev oluştur
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Öğretmen burada kursa bağlı ödev oluşturacak. Gerçek kayıt Supabase
          bağlantısından sonra yapılacak.
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
            defaultValue="published"
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
            Başlık
          </label>

          <input
            id="title"
            name="title"
            type="text"
            required
            minLength={3}
            placeholder="Örn: Problemler ödevi"
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
            placeholder="Ödev açıklamasını, yapılacak soruları veya teslim talimatını yaz."
            className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
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
  );
}