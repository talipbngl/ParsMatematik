import { z } from "zod"

export const liveLessonProviderSchema = z.enum([
  "external",
  "google-meet",
  "zoom",
  "jitsi"
])

export const liveLessonStatusSchema = z.enum([
  "scheduled",
  "live",
  "completed",
  "cancelled"
])

export const createLiveLessonSchema = z.object({
  courseId: z.string().uuid("Geçerli bir kurs seçmelisin."),
  title: z
    .string()
    .trim()
    .min(3, "Canlı ders başlığı en az 3 karakter olmalı.")
    .max(120, "Canlı ders başlığı en fazla 120 karakter olabilir."),
  description: z.string().trim().max(1000).optional().or(z.literal("")),
  startsAt: z.string().trim().min(1, "Başlangıç tarihi zorunlu."),
  durationMinutes: z.coerce
    .number()
    .int()
    .min(15, "Canlı ders en az 15 dakika olmalı.")
    .max(240, "Canlı ders en fazla 240 dakika olabilir."),
  meetingUrl: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine(
      (value) =>
        !value ||
        value.startsWith("http://") ||
        value.startsWith("https://"),
      "Meeting URL geçerli bir bağlantı olmalı."
    ),
  provider: liveLessonProviderSchema.default("external"),
  status: liveLessonStatusSchema.default("scheduled")
})

export const updateLiveLessonSchema = createLiveLessonSchema.extend({
  id: z.string().uuid("Geçerli bir canlı ders ID değeri gerekli.")
})

export type CreateLiveLessonInput = z.infer<typeof createLiveLessonSchema>
export type UpdateLiveLessonInput = z.infer<typeof updateLiveLessonSchema>
export type LiveLessonProvider = z.infer<typeof liveLessonProviderSchema>
export type LiveLessonStatusInput = z.infer<typeof liveLessonStatusSchema>