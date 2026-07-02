import { ExternalLink, FileText, ImageIcon, Video } from "lucide-react";

import {
  getMaterialTypeLabel,
  getMaterialUrl
} from "../services/materials.service";
import type { MaterialListItem } from "../types/materials.types";

type MaterialViewerProps = {
  material: MaterialListItem | null;
};

export function MaterialViewer({ material }: MaterialViewerProps) {
  if (!material) {
    return (
      <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
        <h2 className="text-xl font-black text-slate-950">
          Önizlenecek materyal yok
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Bu kursa materyal eklendiğinde burada ilk materyal önizlenecek.
        </p>
      </section>
    );
  }

  const materialUrl = getMaterialUrl(material);

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-6">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">
          Materyal Önizleme
        </p>

        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
          {material.title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          {getMaterialTypeLabel(material.type)}
          {material.description ? ` · ${material.description}` : ""}
        </p>
      </div>

      <div className="p-6">
        {material.type === "image" && materialUrl ? (
          <img
            src={materialUrl}
            alt={material.title}
            className="max-h-[520px] w-full rounded-3xl object-cover"
          />
        ) : null}

        {material.type === "video" && materialUrl ? (
          <div className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white">
            <Video className="size-10" />
            <h3 className="mt-4 text-xl font-black">Video materyali</h3>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Video bağlantısı harici servis üzerinden açılır.
            </p>

            <a
              href={materialUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-black text-slate-950"
            >
              <ExternalLink className="size-4" />
              Videoyu Aç
            </a>
          </div>
        ) : null}

        {["pdf", "document", "link"].includes(material.type) ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            {material.type === "link" ? (
              <ExternalLink className="mx-auto size-12 text-indigo-600" />
            ) : (
              <FileText className="mx-auto size-12 text-indigo-600" />
            )}

            <h3 className="mt-4 text-xl font-black text-slate-950">
              {getMaterialTypeLabel(material.type)} materyali
            </h3>

            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Bu materyal doğrudan tarayıcıda açılacak şekilde hazırlanmıştır.
            </p>

            {materialUrl ? (
              <a
                href={materialUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-black text-white transition hover:bg-indigo-700"
              >
                <ExternalLink className="size-4" />
                Materyali Aç
              </a>
            ) : null}
          </div>
        ) : null}

        {material.type === "image" && !materialUrl ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <ImageIcon className="mx-auto size-12 text-indigo-600" />
            <h3 className="mt-4 text-xl font-black text-slate-950">
              Görsel bağlantısı yok
            </h3>
          </div>
        ) : null}
      </div>
    </section>
  );
}