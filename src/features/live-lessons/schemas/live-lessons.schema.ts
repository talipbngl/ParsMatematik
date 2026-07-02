import { z } from "zod";

export const liveLessonStatusSchema = z.enum([
  "scheduled",
  "live",
  "completed",
  "cancelled"
]);

export const liveLessonProviderSchema = z.enum([
  "external",
  "google-meet",
  "zoom",
  "jitsi"
]);

const durationSchema = z.preprocess((value) => {
  if (typeof value === "string") {
    return Number(value);
  }

  return value;
}, z.number().int().min(15, "Süre en az 15 dakika olmalı.").max(240, "Süre en fazla 240 dakika olabilir."));

export const createLiveLessonSchema = z.object({
  courseId: z.string().min(1, "Kurs seçimi gerekli."),
  title: z
    .string()
    .trim()
    .min(3, "Canlı ders başlığı en az 3 karakter olmalı.")
    .max(120, "Canlı ders başlığı en fazla 120 karakter olabilir."),
  description: z
    .string()
    .trim()
    .max(500, "Açıklama en fazla 500 karakter olabilir.")
    .optional()
    .or(z.literal("")),
  startsAt: z.string().min(1, "Başlangıç tarihi ve saati gerekli."),
  durationMinutes: durationSchema,
  meetingUrl: z
    .string()
    .trim()
    .url("Geçerli bir toplantı linki gir.")
    .optional()
    .or(z.literal("")),
  provider: liveLessonProviderSchema.optional(),
  status: liveLessonStatusSchema.optional()
});

export const updateLiveLessonSchema = z.object({
  id: z.string().min(1, "Canlı ders id değeri gerekli."),
  courseId: z.string().min(1, "Kurs seçimi gerekli.").optional(),
  title: z
    .string()
    .trim()
    .min(3, "Canlı ders başlığı en az 3 karakter olmalı.")
    .max(120, "Canlı ders başlığı en fazla 120 karakter olabilir.")
    .optional(),
  description: z
    .string()
    .trim()
    .max(500, "Açıklama en fazla 500 karakter olabilir.")
    .optional()
    .or(z.literal("")),
  startsAt: z.string().min(1, "Başlangıç tarihi ve saati gerekli.").optional(),
  durationMinutes: durationSchema.optional(),
  meetingUrl: z
    .string()
    .trim()
    .url("Geçerli bir toplantı linki gir.")
    .optional()
    .or(z.literal("")),
  provider: liveLessonProviderSchema.optional(),
  status: liveLessonStatusSchema.optional()
});

export type CreateLiveLessonSchemaInput = z.infer<
  typeof createLiveLessonSchema
>;

export type UpdateLiveLessonSchemaInput = z.infer<
  typeof updateLiveLessonSchema
>;