export type MaterialType = "pdf" | "video" | "link" | "image" | "document";

export type MaterialVisibility = "private" | "course" | "public";

export type MaterialListItem = {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  description?: string | null | undefined;
  type: MaterialType;
  visibility: MaterialVisibility;
  fileUrl?: string | null | undefined;
  externalUrl?: string | null | undefined;
  filePath?: string | null | undefined;
  mimeType?: string | null | undefined;
  sizeBytes?: number | null | undefined;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type UploadMaterialInput = {
  courseId: string;
  title: string;
  description?: string | undefined;
  type: MaterialType;
  visibility?: MaterialVisibility | undefined;
  filePath?: string | undefined;
  externalUrl?: string | undefined;
};

export type DeleteMaterialInput = {
  id: string;
};

export type MaterialStats = {
  totalMaterials: number;
  pdfCount: number;
  videoCount: number;
  linkCount: number;
  imageCount: number;
  documentCount: number;
};