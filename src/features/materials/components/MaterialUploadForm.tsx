import { getCoursesForTeacher } from "@/features/courses/services/courses.service"
import { uploadMaterialAction } from "../actions/upload-material.action"

const materialTypeOptions = [
  { value: "pdf", label: "PDF" },
  { value: "video", label: "Video" },
  { value: "link", label: "Link" },
  { value: "image", label: "Görsel" },
  { value: "document", label: "Doküman" }
]

const visibilityOptions = [
  { value: "private", label: "Özel" },
  { value: "course", label: "Kursa Özel" },
  { value: "public", label: "Herkese Açık" }
]

export async function MaterialUploadForm() {
  const courses = await getCoursesForTeacher()

  if (courses.length === 0) {
    return (
      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
        <p className="text-sm font-black text-amber-900">
          Materyal eklemek için önce sana atanmış en az bir kurs olmalı.
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
      action={uploadMaterialAction}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <p className="text-sm font-black uppercase tracking-[0.25em] text-indigo-600">
          Materyal Yükle
        </p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">
          Kurs materyali ekle
        </h2>
        <p className="mt-2 text-sm font-medium text-slate-500">
          PDF, görsel, Word, PowerPoint veya video dosyası yükleyebilirsin. İstersen
          dosya yerine harici bağlantı da ekleyebilirsin.
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
            htmlFor="type"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Tür
          </label>
          <select
            id="type"
            name="type"
            defaultValue="pdf"
            required
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          >
            {materialTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="visibility"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Görünürlük
          </label>
          <select
            id="visibility"
            name="visibility"
            defaultValue="course"
            required
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          >
            {visibilityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
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
            placeholder="Örn: Fonksiyonlar konu özeti"
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
            placeholder="Materyalin içeriğini kısa anlat."
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="file"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Dosya yükle
          </label>
          <input
            id="file"
            name="file"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.webp,.mp4,.doc,.docx,.ppt,.pptx,application/pdf,image/jpeg,image/png,image/webp,video/mp4,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
            className="block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 file:mr-4 file:rounded-xl file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-black file:text-indigo-700 hover:file:bg-indigo-100"
          />
          <p className="mt-2 text-xs font-medium text-slate-500">
            Maksimum 50 MB. PDF, görsel, MP4, Word ve PowerPoint dosyaları
            desteklenir.
          </p>
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="externalUrl"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Harici bağlantı
          </label>
          <input
            id="externalUrl"
            name="externalUrl"
            type="url"
            placeholder="Dosya yüklemek yerine YouTube, Google Drive veya kaynak linki ekleyebilirsin."
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <input id="filePath" name="filePath" type="hidden" />
      </div>

      <div className="mt-6 flex justify-end border-t border-slate-100 pt-6">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-indigo-700"
        >
          Materyal Ekle
        </button>
      </div>
    </form>
  )
}