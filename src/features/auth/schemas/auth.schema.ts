import { z } from "zod";

import { USER_ROLES } from "@/shared/types/role.types";

const passwordSchema = z
  .string()
  .min(8, "Şifre en az 8 karakter olmalı.")
  .max(72, "Şifre en fazla 72 karakter olabilir.")
  .regex(/[A-ZÇĞİÖŞÜ]/, "Şifre en az bir büyük harf içermeli.")
  .regex(/[a-zçğıöşü]/, "Şifre en az bir küçük harf içermeli.")
  .regex(/[0-9]/, "Şifre en az bir rakam içermeli.");

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "E-posta adresi zorunludur.")
    .email("Geçerli bir e-posta adresi gir."),
  password: z.string().min(1, "Şifre zorunludur.")
});

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Ad soyad en az 2 karakter olmalı.")
      .max(80, "Ad soyad en fazla 80 karakter olabilir."),
    email: z
      .string()
      .trim()
      .min(1, "E-posta adresi zorunludur.")
      .email("Geçerli bir e-posta adresi gir."),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Şifre tekrarı zorunludur."),
    role: z.enum(USER_ROLES).default("student")
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Şifreler eşleşmiyor."
  })
  .refine((values) => values.role !== "admin", {
    path: ["role"],
    message: "Admin hesabı kayıt ekranından oluşturulamaz."
  });

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "E-posta adresi zorunludur.")
    .email("Geçerli bir e-posta adresi gir.")
});

export type LoginSchemaValues = z.infer<typeof loginSchema>;

export type RegisterSchemaValues = z.infer<typeof registerSchema>;

export type ForgotPasswordSchemaValues = z.infer<typeof forgotPasswordSchema>;

export function getPasswordStrength(password: string): {
  score: number;
  label: string;
  description: string;
} {
  let score = 0;

  if (password.length >= 8) {
    score += 1;
  }

  if (/[A-ZÇĞİÖŞÜ]/.test(password)) {
    score += 1;
  }

  if (/[a-zçğıöşü]/.test(password)) {
    score += 1;
  }

  if (/[0-9]/.test(password)) {
    score += 1;
  }

  if (/[^A-Za-zÇĞİÖŞÜçğıöşü0-9]/.test(password)) {
    score += 1;
  }

  if (score <= 2) {
    return {
      score,
      label: "Zayıf",
      description: "Daha güçlü bir şifre için büyük harf, rakam ve sembol ekle."
    };
  }

  if (score <= 4) {
    return {
      score,
      label: "Orta",
      description: "Şifre kullanılabilir ama biraz daha güçlendirilebilir."
    };
  }

  return {
    score,
    label: "Güçlü",
    description: "Şifren güçlü görünüyor."
  };
}