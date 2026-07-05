import { FileText, Link2, Video } from "lucide-react"
import { MaterialList } from "@/features/materials/components/MaterialList"
import {
  getStudentMaterials,
  getStudentMaterialStats
} from "@/features/materials/services/materials.service"

export default async function StudentMaterialsPage() {
  const materials = await getStudentMaterials()
  const stats = await getStudentMaterialStats()

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.25em] text-indigo-600">
          Materyaller
        </p>
        <h1 className="mt-2 text-3xl font-black text-slate-950">
          Ders materyallerim
        </h1>
        <p className="mt-2 max-w-2xl text-sm font-medium text-slate-500">
          Sadece kayıtlı olduğun kurslara ait materyalleri burada görebilirsin.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-slate-500">Toplam</p>
            <FileText className="h-5 w-5 text-slate-400" />
          </div>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {stats.totalMaterials}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-slate-500">PDF</p>
            <FileText className="h-5 w-5 text-indigo-400" />
          </div>
          <p className="mt-2 text-3xl font-black text-indigo-600">
            {stats.pdfCount}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-slate-500">Video</p>
            <Video className="h-5 w-5 text-rose-400" />
          </div>
          <p className="mt-2 text-3xl font-black text-rose-600">
            {stats.videoCount}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-slate-500">Link</p>
            <Link2 className="h-5 w-5 text-emerald-400" />
          </div>
          <p className="mt-2 text-3xl font-black text-emerald-600">
            {stats.linkCount}
          </p>
        </div>
      </div>

      <MaterialList
        materials={materials}
        audience="student"
        emptyTitle="Henüz materyalin yok"
        emptyDescription="Öğretmenin materyal eklediğinde burada görünecek."
      />
    </div>
  )
}