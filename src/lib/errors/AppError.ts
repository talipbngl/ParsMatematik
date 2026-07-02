export type AppErrorCode =
  | "UNKNOWN_ERROR"
  | "VALIDATION_ERROR"
  | "AUTH_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "RATE_LIMITED"
  | "DATABASE_ERROR"
  | "STORAGE_ERROR"
  | "PAYMENT_ERROR"
  | "LIVE_LESSON_ERROR";

export type AppErrorOptions = {
  code?: AppErrorCode;
  statusCode?: number;
  details?: unknown;
  fieldErrors?: Record<string, string[]> | undefined;
  cause?: unknown;
};

export class AppError extends Error {
  readonly code: AppErrorCode;
  readonly statusCode: number;
  readonly details: unknown | undefined;
  readonly fieldErrors: Record<string, string[]> | undefined;
  readonly cause: unknown | undefined;
  readonly isOperational: boolean;

  constructor(message: string, options: AppErrorOptions = {}) {
    super(message);

    this.name = "AppError";
    this.code = options.code ?? "UNKNOWN_ERROR";
    this.statusCode = options.statusCode ?? 500;
    this.details = options.details;
    this.fieldErrors = options.fieldErrors;
    this.cause = options.cause;
    this.isOperational = true;

    Object.setPrototypeOf(this, AppError.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }

  static validation(
    message = "Girilen bilgiler geçersiz.",
    fieldErrors?: Record<string, string[]>
  ) {
    return new AppError(message, {
      code: "VALIDATION_ERROR",
      statusCode: 400,
      ...(fieldErrors ? { fieldErrors } : {})
    });
  }

  static auth(message = "Kimlik doğrulama hatası.") {
    return new AppError(message, {
      code: "AUTH_ERROR",
      statusCode: 401
    });
  }

  static unauthorized(message = "Bu işlem için giriş yapmalısın.") {
    return new AppError(message, {
      code: "UNAUTHORIZED",
      statusCode: 401
    });
  }

  static forbidden(message = "Bu işlem için yetkin yok.") {
    return new AppError(message, {
      code: "FORBIDDEN",
      statusCode: 403
    });
  }

  static notFound(message = "Aradığın kayıt bulunamadı.") {
    return new AppError(message, {
      code: "NOT_FOUND",
      statusCode: 404
    });
  }

  static conflict(message = "Bu kayıt zaten mevcut.") {
    return new AppError(message, {
      code: "CONFLICT",
      statusCode: 409
    });
  }

  static database(message = "Veritabanı işlemi sırasında hata oluştu.") {
    return new AppError(message, {
      code: "DATABASE_ERROR",
      statusCode: 500
    });
  }

  static storage(message = "Dosya işlemi sırasında hata oluştu.") {
    return new AppError(message, {
      code: "STORAGE_ERROR",
      statusCode: 500
    });
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}