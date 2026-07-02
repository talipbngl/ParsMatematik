import { createClient } from "@/lib/supabase/client";
import { AppError } from "@/lib/errors/AppError";
import {
  createStorageFilePath,
  validateDocumentFile
} from "@/lib/validators/file.validator";

export type UploadMaterialFileOptions = {
  file: File;
  ownerId: string;
  courseId: string;
};

export type UploadFileResult = {
  path: string;
  publicUrl: string;
};

export const STORAGE_BUCKETS = {
  materials: "materials",
  assignments: "assignments",
  avatars: "avatars",
  courseCovers: "course-covers"
} as const;

export type StorageBucket = (typeof STORAGE_BUCKETS)[keyof typeof STORAGE_BUCKETS];

export async function uploadMaterialFile({
  file,
  ownerId,
  courseId
}: UploadMaterialFileOptions): Promise<UploadFileResult> {
  const validation = validateDocumentFile(file);

  if (!validation.isValid) {
    throw AppError.validation("Dosya yüklenemedi.", {
      file: validation.errors
    });
  }

  const supabase = createClient();

  const path = createStorageFilePath({
    bucketFolder: `courses/${courseId}`,
    ownerId,
    fileName: file.name
  });

  const { error } = await supabase.storage
    .from(STORAGE_BUCKETS.materials)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false
    });

  if (error) {
    throw AppError.storage(error.message);
  }

  const { data } = supabase.storage.from(STORAGE_BUCKETS.materials).getPublicUrl(path);

  return {
    path,
    publicUrl: data.publicUrl
  };
}

export async function deleteStorageFile(
  bucket: StorageBucket,
  path: string
): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase.storage.from(bucket).remove([path]);

  if (error) {
    throw AppError.storage(error.message);
  }
}

export function getPublicStorageUrl(bucket: StorageBucket, path: string): string {
  const supabase = createClient();

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);

  return data.publicUrl;
}