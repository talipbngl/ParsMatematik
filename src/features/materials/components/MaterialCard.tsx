import {
  ExternalLink,
  FileText,
  ImageIcon,
  LinkIcon,
  Trash2,
  Video
} from "lucide-react";

import { deleteMaterialAction } from "../actions/delete-material.action";
import {
  formatMaterialSize,
  getMaterialTypeLabel,
  getMaterialUrl,
  getMaterialVisibilityLabel
} from "../services/materials.service";
import type { MaterialListItem, MaterialType } from "../types/materials.types";

type MaterialCardProps = {
  material: MaterialListItem;
  audience?: "teacher" | "student" | "public" | undefined;
};

const materialIcons: Record<MaterialType, typeof FileText> = {
  pdf: FileText,
  video: Video,
  link: LinkIcon,
  image: ImageIcon,
  document: FileText
};

export function MaterialCard({
  material,
  audience = "student"
}: MaterialCardProps) {
  const Icon = materialIcons[material.type];
  const materialUrl = getMaterialUrl(material);

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <Icon className="size-6" />
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
          {getMaterialTypeLabel(material.type)}
        </span>
      </div>

      <div className="mt-5">
        <h3 className="text-lg font-black text-slate-950">
          {material.title}
        </h3>

        {material.description ? (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
            {material.description}
          </p>
        ) : null}
      </div>

      <div className="mt-5 space-y-2 text-sm text-slate-500">
        <p>Kurs: {material.courseTitle}</p>
        <p>Görünürlük: {getMaterialVisibilityLabel(material.visibility)}</p>
        <p>Boyut: {formatMaterialSize(material.sizeBytes)}</p>
      </div>

      <div className="mt-5 flex flex-col gap-2 border-t border-slate-100 pt-5 sm:flex-row">
        {materialUrl ? (
          <a
            href={materialUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2.5 text-sm font-black text-white transition hover:bg-indigo-700"
          >
            <ExternalLink className="size-4" />
            Aç
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="inline-flex flex-1 items-center justify-center rounded-2xl bg-slate-100 px-4 py-2.5 text-sm font-black text-slate-400"
          >
            Link Yok
          </button>
        )}

        {audience === "teacher" ? (
          <form action={deleteMaterialAction}>
            <input type="hidden" name="id" value={material.id} />

            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 text-sm font-black text-red-600 transition hover:bg-red-100"
            >
              <Trash2 className="size-4" />
              Sil
            </button>
          </form>
        ) : null}
      </div>
    </article>
  );
}