import { z } from "zod";

export const materialTypeSchema = z.enum([
  "pdf",
  "video",
  "link",
  "image",
  "document"
]);

export const materialVisibilitySchema = z.enum([
  "private",
  "course",
  "public"
]);

export const uploadMaterialSchema = z.object({
  courseId: z.string().min(1, "Kurs seçimi gerekli."),

  title: z
    .string()
    .trim()
    .min(3, "Materyal adı en az 3 karakter olmalı.")
    .max(120, "Materyal adı en fazla 120 karakter olabilir."),

  description: z
    .string()
    .trim()
    .max(500, "Açıklama en fazla 500 karakter olabilir.")
    .optional()
    .or(z.literal("")),

  type: materialTypeSchema,

  visibility: materialVisibilitySchema.optional(),

  filePath: z.string().trim().optional().or(z.literal("")),

  externalUrl: z
    .string()
    .trim()
    .url("Geçerli bir bağlantı gir.")
    .optional()
    .or(z.literal(""))
});

export const deleteMaterialSchema = z.object({
  id: z.string().min(1, "Materyal id değeri gerekli.")
});

export type UploadMaterialSchemaInput = z.infer<typeof uploadMaterialSchema>;
export type DeleteMaterialSchemaInput = z.infer<typeof deleteMaterialSchema>;