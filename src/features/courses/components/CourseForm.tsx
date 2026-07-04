import type { CourseListItem } from "../types/courses.types"
import { createCourseAction } from "../actions/create-course.action"
import { updateCourseAction } from "../actions/update-course.action"

type CourseFormProps = {
  mode: "create" | "edit"
  course?: CourseListItem | undefined
  returnPath?: string | undefined
}

const gradeOptions = [
  { value: "5", label: "5. Sınıf" },
  { value: "6", label: "6. Sınıf" },
  { value: "7", label: "7. Sınıf" },
  { value: "8", label: "8. Sınıf" },
  { value: "9", label: "9. Sınıf" },
  { value: "10", label: "10. Sınıf" },
  { value: "11", label: "11. Sınıf" },
  { value: "12", label: "12. Sınıf" },
  { value: "lgs", label: "LGS" },
  { value: "tyt", label: "TYT" },
  { value: "ayt", label: "AYT" },
  { value: "other", label: "Diğer" }
]

const statusOptions = [
  { value: "draft", label: "Taslak" },
  { value: "published", label: "Yayında" },
  { value: "archived", label: "Arşiv" }
]

export function CourseForm({
  mode,
  course,
  returnPath = "/dashboard/admin/courses"
}: CourseFormProps) {
  const isEditMode = mode === "edit"
  const formAction = isEditMode ? updateCourseAction : createCourseAction

  return (
    <form
      action={formAction}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      {isEditMode ? <input type="hidden" name="id" value={course?.id} /> : null}

      <div>
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">
          {isEditMode ? "Kurs Düzenle" : "Yeni Kurs"}
        </p>
        <h1 className="mt-2 text-2xl font-black text-slate-950">
          {isEditMode ? "Kurs bilgilerini güncelle" : "Yeni kurs oluştur"}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Kurs adı, seviye, fiyat ve yayın durumunu belirle. Kurs oluşturulduktan
          sonra öğretmen ve öğrenci atamalarını ayrı adımda yapacağız.
        </p>
      </div>

      <div className="mt-6 grid gap-5">
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Kurs adı
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={course?.title ?? ""}
            placeholder="Örn: TYT Matematik Kampı"
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Açıklama
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={course?.description ?? ""}
            placeholder="Kursun kısa açıklamasını yaz."
            rows={4}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div>
            <label
              htmlFor="gradeLevel"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              Seviye
            </label>
            <select
              id="gradeLevel"
              name="gradeLevel"
              required
              defaultValue={course?.gradeLevel ?? "lgs"}
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
            >
              {gradeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
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
              defaultValue={course?.status ?? "draft"}
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="price"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              Fiyat
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min={0}
              step={1}
              defaultValue={course?.price ?? ""}
              placeholder="Örn: 3500"
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
        <a
          href={returnPath}
          className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-5 py-3 text-sm font-black text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
        >
          Vazgeç
        </a>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-indigo-700"
        >
          {isEditMode ? "Kursu Güncelle" : "Kurs Oluştur"}
        </button>
      </div>
    </form>
  )
}