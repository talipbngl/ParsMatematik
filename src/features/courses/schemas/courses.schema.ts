import { z } from "zod";

export const courseStatusSchema = z.enum(["draft", "published", "archived"]);

export const courseGradeLevelSchema = z.enum([
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "tyt",
  "ayt",
  "lgs",
  "other"
]);

const optionalPriceSchema = z.preprocess((value) => {
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
}, z.number().nonnegative("Fiyat negatif olamaz.").optional());

export const createCourseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Kurs adı en az 3 karakter olmalı.")
    .max(120, "Kurs adı en fazla 120 karakter olabilir."),

  description: z
    .string()
    .trim()
    .max(500, "Açıklama en fazla 500 karakter olabilir.")
    .optional()
    .or(z.literal("")),

  gradeLevel: courseGradeLevelSchema,

  price: optionalPriceSchema,

  status: courseStatusSchema.optional()
});

export const updateCourseSchema = z.object({
  id: z.string().min(1, "Kurs id değeri gerekli."),

  title: z
    .string()
    .trim()
    .min(3, "Kurs adı en az 3 karakter olmalı.")
    .max(120, "Kurs adı en fazla 120 karakter olabilir.")
    .optional(),

  description: z
    .string()
    .trim()
    .max(500, "Açıklama en fazla 500 karakter olabilir.")
    .optional()
    .or(z.literal("")),

  gradeLevel: courseGradeLevelSchema.optional(),

  price: optionalPriceSchema,

  status: courseStatusSchema.optional()
});

export const courseFiltersSchema = z.object({
  search: z.string().trim().optional(),
  gradeLevel: courseGradeLevelSchema.optional(),
  status: courseStatusSchema.optional()
});

export type CreateCourseSchemaInput = z.infer<typeof createCourseSchema>;
export type UpdateCourseSchemaInput = z.infer<typeof updateCourseSchema>;
export type CourseFiltersSchemaInput = z.infer<typeof courseFiltersSchema>;