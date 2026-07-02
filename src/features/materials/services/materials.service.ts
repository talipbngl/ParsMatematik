import type {
  MaterialListItem,
  MaterialStats,
  MaterialType,
  MaterialVisibility
} from "../types/materials.types";

const mockMaterials: MaterialListItem[] = [
  {
    id: "material-lgs-1",
    courseId: "course-lgs-8",
    courseTitle: "8. Sınıf LGS Matematik",
    title: "Çarpanlar ve Katlar Konu Özeti",
    description: "LGS hazırlık için PDF konu özeti ve örnek soru notları.",
    type: "pdf",
    visibility: "course",
    fileUrl: "/mock/lgs-carpanlar-katlar.pdf",
    externalUrl: null,
    filePath: "/materials/lgs-carpanlar-katlar.pdf",
    mimeType: "application/pdf",
    sizeBytes: 1_250_000,
    order: 1,
    createdAt: "2026-07-02T09:00:00.000Z",
    updatedAt: "2026-07-02T09:00:00.000Z"
  },
  {
    id: "material-lgs-2",
    courseId: "course-lgs-8",
    courseTitle: "8. Sınıf LGS Matematik",
    title: "Yeni Nesil Soru Çözümü",
    description: "Çarpanlar ve katlar konusu için video çözüm bağlantısı.",
    type: "video",
    visibility: "course",
    fileUrl: null,
    externalUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    filePath: null,
    mimeType: null,
    sizeBytes: null,
    order: 2,
    createdAt: "2026-07-02T10:00:00.000Z",
    updatedAt: "2026-07-02T10:00:00.000Z"
  },
  {
    id: "material-tyt-1",
    courseId: "course-tyt",
    courseTitle: "TYT Matematik Kampı",
    title: "Problemler Çalışma Kağıdı",
    description: "Yaş, işçi, yüzde ve kar-zarar problemleri için çalışma.",
    type: "document",
    visibility: "course",
    fileUrl: "/mock/tyt-problemler-calisma.docx",
    externalUrl: null,
    filePath: "/materials/tyt-problemler-calisma.docx",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    sizeBytes: 840_000,
    order: 1,
    createdAt: "2026-07-02T11:00:00.000Z",
    updatedAt: "2026-07-02T11:00:00.000Z"
  },
  {
    id: "material-9-1",
    courseId: "course-9",
    courseTitle: "9. Sınıf Matematik",
    title: "Kümeler Ek Kaynak",
    description: "Kümeler konusu için harici kaynak bağlantısı.",
    type: "link",
    visibility: "public",
    fileUrl: null,
    externalUrl: "https://example.com/kumeler-kaynak",
    filePath: null,
    mimeType: null,
    sizeBytes: null,
    order: 1,
    createdAt: "2026-07-01T09:00:00.000Z",
    updatedAt: "2026-07-01T09:00:00.000Z"
  }
];

export async function getMaterials(): Promise<MaterialListItem[]> {
  return mockMaterials;
}

export async function getMaterialsByCourseId(
  courseId: string
): Promise<MaterialListItem[]> {
  return mockMaterials
    .filter((material) => material.courseId === courseId)
    .sort((a, b) => a.order - b.order);
}

export async function getMaterialById(
  id: string
): Promise<MaterialListItem | null> {
  return mockMaterials.find((material) => material.id === id) ?? null;
}

export async function getPublicMaterials(): Promise<MaterialListItem[]> {
  return mockMaterials.filter((material) => material.visibility === "public");
}

export async function getMaterialStats(): Promise<MaterialStats> {
  return {
    totalMaterials: mockMaterials.length,
    pdfCount: mockMaterials.filter((material) => material.type === "pdf")
      .length,
    videoCount: mockMaterials.filter((material) => material.type === "video")
      .length,
    linkCount: mockMaterials.filter((material) => material.type === "link")
      .length,
    imageCount: mockMaterials.filter((material) => material.type === "image")
      .length,
    documentCount: mockMaterials.filter(
      (material) => material.type === "document"
    ).length
  };
}

export function getMaterialTypeLabel(type: MaterialType): string {
  const labels: Record<MaterialType, string> = {
    pdf: "PDF",
    video: "Video",
    link: "Link",
    image: "Görsel",
    document: "Doküman"
  };

  return labels[type];
}

export function getMaterialVisibilityLabel(
  visibility: MaterialVisibility
): string {
  const labels: Record<MaterialVisibility, string> = {
    private: "Özel",
    course: "Kursa Özel",
    public: "Herkese Açık"
  };

  return labels[visibility];
}

export function formatMaterialSize(
  sizeBytes: number | null | undefined
): string {
  if (!sizeBytes) {
    return "Boyut yok";
  }

  const megabytes = sizeBytes / 1024 / 1024;

  if (megabytes >= 1) {
    return `${megabytes.toFixed(1)} MB`;
  }

  const kilobytes = sizeBytes / 1024;

  return `${kilobytes.toFixed(0)} KB`;
}

export function getMaterialUrl(material: MaterialListItem): string | null {
  return material.externalUrl ?? material.fileUrl ?? null;
}