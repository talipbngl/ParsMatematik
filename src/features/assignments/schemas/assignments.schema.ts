import { z } from "zod";

export const assignmentStatusSchema = z.enum([
  "draft",
  "published",
  "closed"
]);

const optionalScoreSchema = z.preprocess((value) => {
  if (value === "" || value === null || value === undefined) {
    return undefined;
  }

  if (typeof value === "string") {
    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) {
      return value;
    }

    return numericValue;
  }

  return value;
}, z.number().nonnegative("Puan negatif olamaz.").optional());

export const createAssignmentSchema = z.object({
  courseId: z.string().min(1, "Kurs seçimi gerekli."),

  title: z
    .string()
    .trim()
    .min(3, "Ödev başlığı en az 3 karakter olmalı.")
    .max(120, "Ödev başlığı en fazla 120 karakter olabilir."),

  description: z
    .string()
    .trim()
    .min(5, "Ödev açıklaması en az 5 karakter olmalı.")
    .max(1000, "Ödev açıklaması en fazla 1000 karakter olabilir."),

  dueAt: z.string().optional().or(z.literal("")),

  maxScore: optionalScoreSchema,

  status: assignmentStatusSchema.optional()
});

export const submitAssignmentSchema = z.object({
  assignmentId: z.string().min(1, "Ödev id değeri gerekli."),

  answerText: z
    .string()
    .trim()
    .max(3000, "Cevap metni en fazla 3000 karakter olabilir.")
    .optional()
    .or(z.literal("")),

  filePath: z.string().trim().optional().or(z.literal(""))
});

export const gradeAssignmentSchema = z.object({
  submissionId: z.string().min(1, "Teslim id değeri gerekli."),

  score: z.preprocess((value) => {
    if (typeof value === "string") {
      return Number(value);
    }

    return value;
  }, z.number().nonnegative("Puan negatif olamaz.")),

  feedback: z
    .string()
    .trim()
    .max(1000, "Geri bildirim en fazla 1000 karakter olabilir.")
    .optional()
    .or(z.literal(""))
});

export type CreateAssignmentSchemaInput = z.infer<
  typeof createAssignmentSchema
>;

export type SubmitAssignmentSchemaInput = z.infer<
  typeof submitAssignmentSchema
>;

export type GradeAssignmentSchemaInput = z.infer<
  typeof gradeAssignmentSchema
>;