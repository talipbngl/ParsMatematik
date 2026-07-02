import { z } from "zod";

const userRoleSchema = z.enum(["admin", "teacher", "student", "parent"]);

const userAccountStatusSchema = z.enum([
  "active",
  "inactive",
  "pending",
  "suspended"
]);

export const createUserSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Ad soyad en az 2 karakter olmalı.")
    .max(100, "Ad soyad en fazla 100 karakter olabilir."),
  email: z
    .string()
    .trim()
    .email("Geçerli bir e-posta adresi gir."),
  role: userRoleSchema,
  phone: z
    .string()
    .trim()
    .max(20, "Telefon en fazla 20 karakter olabilir.")
    .optional()
    .or(z.literal(""))
});

export const updateUserSchema = z.object({
  id: z.string().uuid("Geçerli bir kullanıcı id değeri gerekli."),
  fullName: z
    .string()
    .trim()
    .min(2, "Ad soyad en az 2 karakter olmalı.")
    .max(100, "Ad soyad en fazla 100 karakter olabilir.")
    .optional(),
  email: z
    .string()
    .trim()
    .email("Geçerli bir e-posta adresi gir.")
    .optional(),
  role: userRoleSchema.optional(),
  phone: z
    .string()
    .trim()
    .max(20, "Telefon en fazla 20 karakter olabilir.")
    .optional()
    .or(z.literal("")),
  status: userAccountStatusSchema.optional()
});

export const userFiltersSchema = z.object({
  search: z.string().trim().optional(),
  role: userRoleSchema.optional(),
  status: userAccountStatusSchema.optional()
});

export type CreateUserSchemaInput = z.infer<typeof createUserSchema>;
export type UpdateUserSchemaInput = z.infer<typeof updateUserSchema>;
export type UserFiltersSchemaInput = z.infer<typeof userFiltersSchema>;