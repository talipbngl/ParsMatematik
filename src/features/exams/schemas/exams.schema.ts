import { z } from "zod";

export const examStatusSchema = z.enum(["draft", "published", "closed"]);

export const examQuestionTypeSchema = z.enum([
  "multiple_choice",
  "true_false",
  "short_answer"
]);

const optionalDurationSchema = z.preprocess((value) => {
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
}, z.number().int().min(5, "Süre en az 5 dakika olmalı.").max(240, "Süre en fazla 240 dakika olabilir.").optional());

export const createExamSchema = z.object({
  courseId: z.string().min(1, "Kurs seçimi gerekli."),

  title: z
    .string()
    .trim()
    .min(3, "Sınav başlığı en az 3 karakter olmalı.")
    .max(120, "Sınav başlığı en fazla 120 karakter olabilir."),

  description: z
    .string()
    .trim()
    .min(5, "Sınav açıklaması en az 5 karakter olmalı.")
    .max(1000, "Sınav açıklaması en fazla 1000 karakter olabilir."),

  startsAt: z.string().optional().or(z.literal("")),

  endsAt: z.string().optional().or(z.literal("")),

  durationMinutes: optionalDurationSchema,

  status: examStatusSchema.optional()
});

export const questionSchema = z.object({
  questionText: z
    .string()
    .trim()
    .min(3, "Soru metni en az 3 karakter olmalı.")
    .max(1000, "Soru metni en fazla 1000 karakter olabilir."),

  questionType: examQuestionTypeSchema,

  options: z.array(z.string().trim()).optional(),

  correctOptionIndex: z.preprocess((value) => {
    if (value === "" || value === null || value === undefined) {
      return undefined;
    }

    if (typeof value === "string") {
      return Number(value);
    }

    return value;
  }, z.number().int().nonnegative().optional()),

  score: z.preprocess((value) => {
    if (typeof value === "string") {
      return Number(value);
    }

    return value;
  }, z.number().positive("Soru puanı 0'dan büyük olmalı."))
});

export const examAnswerSchema = z.object({
  questionId: z.string().min(1, "Soru id değeri gerekli."),
  answer: z.string().trim().min(1, "Cevap boş olamaz.")
});

export const submitExamSchema = z.object({
  examId: z.string().min(1, "Sınav id değeri gerekli."),
  answers: z.array(examAnswerSchema).min(1, "En az bir cevap gerekli.")
});

export const gradeExamSchema = z.object({
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

export type CreateExamSchemaInput = z.infer<typeof createExamSchema>;
export type QuestionSchemaInput = z.infer<typeof questionSchema>;
export type SubmitExamSchemaInput = z.infer<typeof submitExamSchema>;
export type GradeExamSchemaInput = z.infer<typeof gradeExamSchema>;