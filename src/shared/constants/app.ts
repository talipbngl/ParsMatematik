import type { GradeLevel, SelectOption } from "@/shared/types/common.types";

export const APP_NAME = "Parsmatematik";

export const APP_SHORT_NAME = "Pars";

export const APP_DESCRIPTION =
  "Matematik özel dersleri için canlı ders, ödev, sınav, materyal ve öğrenci takip platformu.";

export const DEFAULT_LOCALE = "tr-TR";

export const DEFAULT_TIMEZONE = "Europe/Istanbul";

export const SUPPORT_EMAIL = "iletisim@parsmatematik.com";

export const SUPPORT_PHONE = "+90 555 000 00 00";

export const MAX_UPLOAD_SIZE_MB = 10;

export const MAX_UPLOAD_SIZE_BYTES = MAX_UPLOAD_SIZE_MB * 1024 * 1024;

export const ACCEPTED_DOCUMENT_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp"
] as const;

export const ACCEPTED_VIDEO_LINK_PROVIDERS = [
  "youtube.com",
  "youtu.be",
  "drive.google.com",
  "vimeo.com"
] as const;

export const GRADE_LEVEL_OPTIONS: SelectOption<GradeLevel>[] = [
  {
    label: "5. Sınıf",
    value: "5"
  },
  {
    label: "6. Sınıf",
    value: "6"
  },
  {
    label: "7. Sınıf",
    value: "7"
  },
  {
    label: "8. Sınıf",
    value: "8"
  },
  {
    label: "9. Sınıf",
    value: "9"
  },
  {
    label: "10. Sınıf",
    value: "10"
  },
  {
    label: "11. Sınıf",
    value: "11"
  },
  {
    label: "12. Sınıf",
    value: "12"
  },
  {
    label: "LGS",
    value: "lgs"
  },
  {
    label: "TYT",
    value: "tyt"
  },
  {
    label: "AYT",
    value: "ayt"
  },
  {
    label: "Mezun",
    value: "mezun"
  },
  {
    label: "Diğer",
    value: "other"
  }
];

export const SUBJECT_TAGS = [
  "Temel Kavramlar",
  "Sayılar",
  "Problemler",
  "Oran-Orantı",
  "Denklemler",
  "Fonksiyonlar",
  "Polinomlar",
  "Trigonometri",
  "Limit",
  "Türev",
  "İntegral",
  "Geometri",
  "Analitik Geometri",
  "Olasılık",
  "Veri Analizi"
] as const;

export const COURSE_LEVELS = [
  {
    label: "Başlangıç",
    value: "beginner",
    description: "Temel eksikleri kapatmak isteyen öğrenciler için."
  },
  {
    label: "Orta",
    value: "intermediate",
    description: "Konu bilen ama soru pratiği eksiği olan öğrenciler için."
  },
  {
    label: "İleri",
    value: "advanced",
    description: "Sınavda yüksek net hedefleyen öğrenciler için."
  }
] as const;

export const PLATFORM_FEATURES = [
  "Canlı ders",
  "Ödev takibi",
  "Online sınav",
  "Materyal paylaşımı",
  "Öğrenci paneli",
  "Öğretmen paneli",
  "Admin paneli",
  "Manuel ödeme onayı",
  "Performans raporları"
] as const;