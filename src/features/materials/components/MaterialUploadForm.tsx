import { getCoursesForTeacher } from "@/features/courses/services/courses.service";

import { uploadMaterialAction } from "../actions/upload-material.action";

const materialTypeOptions = [
  { value: "pdf", label: "PDF" },
  { value: "video", label: "Video" },
  { value: "link", label: "Link" },
  { value: "image", label: "Görsel" },
  { value: "document", label: "Doküman" }
];

const visibilityOptions = [
  { value: "private", label: "Özel" },
  { value: "course", label: "Kursa Özel" },
  { value: "public", label: "Herkese Açık" }
];

export async function MaterialUploadForm() {
  const courses = await getCoursesForTeacher();

  return (
    <form
      action={uploadMaterialAction}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">
          Materyal Yükle
        </p>

        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
          Kurs materyali ekle
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          İlk MVP’de gerçek dosya upload yerine dosya yolu veya harici bağlantı
          giriyoruz. Supabase Storage bağlanınca gerçek dosya yükleme aktif
          olacak.
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
            htmlFor="type"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Tür
          </label>

          <select
            id="type"
            name="type"
            defaultValue="pdf"
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
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
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
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
            minLength={3}
            placeholder="Örn: Problemler PDF"
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
            placeholder="Materyalin kısa açıklamasını yaz."
            className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label
            htmlFor="filePath"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Dosya yolu
          </label>

          <input
            id="filePath"
            name="filePath"
            type="text"
            placeholder="/materials/dosya.pdf"
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <div>
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
            placeholder="https://..."
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          />
        </div>
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
  );
}