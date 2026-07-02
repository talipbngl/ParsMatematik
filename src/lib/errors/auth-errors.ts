import { AppError } from "@/lib/errors/AppError";
import type { UserRole } from "@/shared/types/role.types";
import { ROLE_LABELS } from "@/shared/types/role.types";

export const AUTH_ERROR_MESSAGES = {
  invalidCredentials: "E-posta veya şifre hatalı.",
  emailNotConfirmed:
    "E-posta adresin henüz doğrulanmamış. Lütfen gelen kutunu kontrol et.",
  userNotFound: "Bu bilgilerle eşleşen bir kullanıcı bulunamadı.",
  sessionExpired: "Oturum süren dolmuş. Lütfen tekrar giriş yap.",
  unauthorized: "Bu sayfayı görüntülemek için giriş yapmalısın.",
  forbidden: "Bu işlem için yetkin yok.",
  missingRole: "Kullanıcı rol bilgisi bulunamadı.",
  invalidRole: "Geçersiz kullanıcı rolü.",
  alreadyLoggedIn: "Zaten giriş yapmış durumdasın."
} as const;

export type AuthErrorKey = keyof typeof AUTH_ERROR_MESSAGES;

export function getAuthErrorMessage(key: AuthErrorKey): string {
  return AUTH_ERROR_MESSAGES[key];
}

export function createInvalidCredentialsError(): AppError {
  return AppError.auth(AUTH_ERROR_MESSAGES.invalidCredentials);
}

export function createEmailNotConfirmedError(): AppError {
  return AppError.auth(AUTH_ERROR_MESSAGES.emailNotConfirmed);
}

export function createUnauthorizedError(): AppError {
  return AppError.unauthorized(AUTH_ERROR_MESSAGES.unauthorized);
}

export function createForbiddenError(): AppError {
  return AppError.forbidden(AUTH_ERROR_MESSAGES.forbidden);
}

export function createMissingRoleError(): AppError {
  return AppError.forbidden(AUTH_ERROR_MESSAGES.missingRole);
}

export function createInvalidRoleError(role: string): AppError {
  return AppError.forbidden(`"${role}" geçerli bir kullanıcı rolü değil.`);
}

export function createRoleRequiredError(requiredRole: UserRole): AppError {
  return AppError.forbidden(
    `Bu işlem için ${ROLE_LABELS[requiredRole]} rolüne sahip olmalısın.`
  );
}

export function createAnyRoleRequiredError(requiredRoles: UserRole[]): AppError {
  const roleLabels = requiredRoles.map((role) => ROLE_LABELS[role]).join(", ");

  return AppError.forbidden(
    `Bu işlem için şu rollerden biri gerekli: ${roleLabels}.`
  );
}

export function mapSupabaseAuthError(message?: string): AppError {
  const normalizedMessage = message?.toLowerCase() ?? "";

  if (
    normalizedMessage.includes("invalid login credentials") ||
    normalizedMessage.includes("invalid credentials")
  ) {
    return createInvalidCredentialsError();
  }

  if (
    normalizedMessage.includes("email not confirmed") ||
    normalizedMessage.includes("not confirmed")
  ) {
    return createEmailNotConfirmedError();
  }

  if (
    normalizedMessage.includes("jwt expired") ||
    normalizedMessage.includes("session")
  ) {
    return AppError.unauthorized(AUTH_ERROR_MESSAGES.sessionExpired);
  }

  return AppError.auth(message || "Giriş işlemi sırasında hata oluştu.");
}