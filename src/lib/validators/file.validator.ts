import {
  ACCEPTED_DOCUMENT_MIME_TYPES,
  MAX_UPLOAD_SIZE_BYTES,
  MAX_UPLOAD_SIZE_MB
} from "@/shared/constants/app";

export type FileValidationOptions = {
  maxSizeBytes?: number;
  acceptedMimeTypes?: readonly string[];
  required?: boolean;
};

export type FileValidationResult = {
  isValid: boolean;
  errors: string[];
};

function getFileSizeMb(size: number): string {
  return (size / 1024 / 1024).toFixed(2);
}

export function validateFile(
  file: File | null | undefined,
  options: FileValidationOptions = {}
): FileValidationResult {
  const {
    maxSizeBytes = MAX_UPLOAD_SIZE_BYTES,
    acceptedMimeTypes = ACCEPTED_DOCUMENT_MIME_TYPES,
    required = true
  } = options;

  const errors: string[] = [];

  if (!file) {
    if (required) {
      errors.push("Dosya seçmelisin.");
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  if (file.size > maxSizeBytes) {
    errors.push(
      `Dosya boyutu en fazla ${getFileSizeMb(maxSizeBytes)} MB olabilir.`
    );
  }

  if (!acceptedMimeTypes.includes(file.type)) {
    errors.push("Bu dosya türü desteklenmiyor.");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateDocumentFile(
  file: File | null | undefined
): FileValidationResult {
  return validateFile(file, {
    maxSizeBytes: MAX_UPLOAD_SIZE_BYTES,
    acceptedMimeTypes: ACCEPTED_DOCUMENT_MIME_TYPES,
    required: true
  });
}

export function getFileExtension(fileName: string): string {
  const parts = fileName.split(".");
  const extension = parts.at(-1);

  return extension ? extension.toLowerCase() : "";
}

export function getSafeFileName(fileName: string): string {
  const extension = getFileExtension(fileName);
  const baseName = fileName
    .replace(/\.[^/.]+$/, "")
    .trim()
    .toLowerCase()
    .replace(/[çÇ]/g, "c")
    .replace(/[ğĞ]/g, "g")
    .replace(/[ıİI]/g, "i")
    .replace(/[öÖ]/g, "o")
    .replace(/[şŞ]/g, "s")
    .replace(/[üÜ]/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const safeBaseName = baseName || "dosya";

  if (!extension) {
    return safeBaseName;
  }

  return `${safeBaseName}.${extension}`;
}

export function createStorageFilePath(options: {
  bucketFolder: string;
  ownerId: string;
  fileName: string;
}): string {
  const safeFolder = options.bucketFolder
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_/]+/g, "-")
    .replace(/\/{2,}/g, "/")
    .replace(/^\/+|\/+$/g, "");

  const safeOwnerId = options.ownerId
    .trim()
    .replace(/[^a-zA-Z0-9-_]/g, "");

  const safeFileName = getSafeFileName(options.fileName);
  const timestamp = Date.now();

  return `${safeFolder}/${safeOwnerId}/${timestamp}-${safeFileName}`;
}

export function formatFileSize(size: number): string {
  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

export function isImageFile(file: File): boolean {
  return file.type.startsWith("image/");
}

export function isPdfFile(file: File): boolean {
  return file.type === "application/pdf";
}

export function getAcceptedDocumentMimeTypesText(): string {
  return `PDF, JPG, PNG veya WEBP dosyası yükleyebilirsin. Maksimum dosya boyutu: ${MAX_UPLOAD_SIZE_MB} MB.`;
}