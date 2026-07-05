import { FileText, Link2, Video } from "lucide-react"
import { MaterialList } from "@/features/materials/components/MaterialList"
import {
  getMaterials,
  getMaterialStats
} from "@/features/materials/services/materials.service"

export default async function AdminMaterialsPage() {
  const materials = await getMaterials()
  const stats = await getMaterialStats()

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.25em] text-indigo-600">
          Admin
        </p>
        <h1 className="mt-2 text-3xl font-black text-slate-950">
          Tüm materyaller
        </h1>
        <p className="mt-2 max-w-2xl text-sm font-medium text-slate-500">
          Platformdaki tüm kurs materyallerini burada görüntüleyebilirsin.
          Silme ve düzenleme yetkilerini sonraki pakette daha detaylı
          ayıracağız.
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
        audience="public"
        emptyTitle="Henüz materyal yok"
        emptyDescription="Öğretmenler materyal eklediğinde burada listelenecek."
      />
    </div>
  )
}