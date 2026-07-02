import { ZodError } from "zod";

import { AppError, isAppError } from "@/lib/errors/AppError";
import type { ActionResult } from "@/shared/types/common.types";

export type ErrorHandlerOptions = {
  fallbackMessage?: string;
  logError?: boolean;
};

function getZodFieldErrors(error: ZodError): Record<string, string[]> {
  const flattenedError = error.flatten();

  return flattenedError.fieldErrors;
}

export function normalizeError(error: unknown): AppError {
  if (isAppError(error)) {
    return error;
  }

  if (error instanceof ZodError) {
    return AppError.validation(
      "Lütfen formdaki alanları kontrol et.",
      getZodFieldErrors(error)
    );
  }

  if (error instanceof Error) {
    return new AppError(error.message || "Beklenmeyen bir hata oluştu.", {
      code: "UNKNOWN_ERROR",
      statusCode: 500,
      cause: error
    });
  }

  if (typeof error === "string") {
    return new AppError(error, {
      code: "UNKNOWN_ERROR",
      statusCode: 500
    });
  }

  return new AppError("Beklenmeyen bir hata oluştu.", {
    code: "UNKNOWN_ERROR",
    statusCode: 500,
    details: error
  });
}

export function handleError(
  error: unknown,
  options: ErrorHandlerOptions = {}
): ActionResult {
  const { fallbackMessage = "İşlem tamamlanamadı.", logError = true } = options;

  const normalizedError = normalizeError(error);

  if (logError) {
    console.error("[Parsmatematik Error]", {
      name: normalizedError.name,
      code: normalizedError.code,
      message: normalizedError.message,
      statusCode: normalizedError.statusCode,
      details: normalizedError.details,
      fieldErrors: normalizedError.fieldErrors,
      cause: normalizedError.cause
    });
  }

  return {
    success: false,
    message: normalizedError.message || fallbackMessage,
    ...(normalizedError.fieldErrors
      ? { fieldErrors: normalizedError.fieldErrors }
      : {})
  };
}

export function createSuccessResult<TData>(
  message: string,
  data: TData
): ActionResult<TData> {
  return {
    success: true,
    message,
    data
  };
}

export function createEmptySuccessResult(message: string): ActionResult<null> {
  return {
    success: true,
    message,
    data: null
  };
}

export async function withErrorHandling<TData>(
  callback: () => Promise<TData>,
  options: ErrorHandlerOptions = {}
): Promise<ActionResult<TData>> {
  try {
    const data = await callback();

    return {
      success: true,
      message: "İşlem başarılı.",
      data
    };
  } catch (error) {
    return handleError(error, options) as ActionResult<TData>;
  }
}