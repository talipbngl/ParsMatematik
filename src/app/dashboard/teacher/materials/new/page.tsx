import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { MaterialUploadForm } from "@/features/materials/components/MaterialUploadForm"

export default function NewTeacherMaterialPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/dashboard/teacher/materials"
          className="inline-flex items-center gap-2 text-sm font-black text-slate-500 transition hover:text-slate-950"
        >
          <ArrowLeft className="h-4 w-4" />
          Materyallere dön
        </Link>

        <h1 className="mt-4 text-3xl font-black text-slate-950">
          Yeni materyal
        </h1>
        <p className="mt-2 max-w-2xl text-sm font-medium text-slate-500">
          Seçtiğin kursa öğrencilerin görebileceği yeni bir materyal ekle.
          İlk MVP’de dosya yükleme yerine dosya yolu veya harici bağlantı
          kullanıyoruz.
        </p>
      </div>

      <MaterialUploadForm />
    </div>
  )
}