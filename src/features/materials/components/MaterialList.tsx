import type { MaterialListItem } from "../types/materials.types";
import { MaterialCard } from "./MaterialCard";

type MaterialListProps = {
  materials: MaterialListItem[];
  audience?: "teacher" | "student" | "public" | undefined;
  emptyTitle?: string | undefined;
  emptyDescription?: string | undefined;
};

export function MaterialList({
  materials,
  audience = "student",
  emptyTitle = "Henüz materyal yok",
  emptyDescription = "Materyal eklendiğinde burada listelenecek."
}: MaterialListProps) {
  if (materials.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
        <h3 className="text-lg font-black text-slate-950">{emptyTitle}</h3>
        <p className="mt-2 text-sm text-slate-500">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {materials.map((material) => (
        <MaterialCard
          key={material.id}
          material={material}
          audience={audience}
        />
      ))}
    </div>
  );
}