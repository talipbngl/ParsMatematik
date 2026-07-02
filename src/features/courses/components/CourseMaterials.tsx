import { FileText, LinkIcon, PlayCircle } from "lucide-react";

type CourseMaterialsProps = {
  courseId: string;
};

const mockMaterials = [
  {
    id: "material-1",
    title: "Hafta 1 konu özeti",
    type: "PDF",
    description: "Ders sonrası tekrar için kısa konu özeti.",
    icon: FileText
  },
  {
    id: "material-2",
    title: "Yeni nesil soru çözümü",
    type: "Video",
    description: "Problem çözme stratejileri için örnek çözüm videosu.",
    icon: PlayCircle
  },
  {
    id: "material-3",
    title: "Ek çalışma bağlantısı",
    type: "Link",
    description: "Ev çalışması için ek kaynak bağlantısı.",
    icon: LinkIcon
  }
];

export function CourseMaterials({ courseId }: CourseMaterialsProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">
          Materyaller
        </p>

        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
          Kurs materyalleri
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Şimdilik örnek materyaller gösteriliyor. Gerçek materyaller ileride
          materials modülü ve Supabase Storage üzerinden gelecek.
        </p>

        <p className="mt-2 text-xs font-bold text-slate-400">
          courseId: {courseId}
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {mockMaterials.map((material) => (
          <article
            key={material.id}
            className="rounded-3xl border border-slate-200 p-5 transition hover:-translate-y-0.5 hover:shadow-sm"
          >
            <div className="flex size-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <material.icon className="size-6" />
            </div>

            <span className="mt-5 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase text-slate-600">
              {material.type}
            </span>

            <h3 className="mt-3 text-lg font-black text-slate-950">
              {material.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {material.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}