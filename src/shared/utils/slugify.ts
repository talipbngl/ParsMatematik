const TURKISH_CHARACTER_MAP: Record<string, string> = {
  ç: "c",
  Ç: "c",
  ğ: "g",
  Ğ: "g",
  ı: "i",
  I: "i",
  İ: "i",
  ö: "o",
  Ö: "o",
  ş: "s",
  Ş: "s",
  ü: "u",
  Ü: "u"
};

export function slugify(value: string): string {
  return value
    .split("")
    .map((character) => TURKISH_CHARACTER_MAP[character] ?? character)
    .join("")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function createUniqueSlug(value: string, suffix?: string | number): string {
  const baseSlug = slugify(value);

  if (!suffix) {
    return baseSlug;
  }

  return `${baseSlug}-${slugify(String(suffix))}`;
}

export function createCourseSlug(title: string, gradeLevel?: string): string {
  if (!gradeLevel) {
    return slugify(title);
  }

  return slugify(`${title} ${gradeLevel}`);
}

export function createUserSlug(fullName: string, userId?: string): string {
  const baseSlug = slugify(fullName);

  if (!userId) {
    return baseSlug;
  }

  return `${baseSlug}-${userId.slice(0, 8)}`;
}

export function unslugify(value: string): string {
  return value
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toLocaleUpperCase("tr-TR") + word.slice(1))
    .join(" ");
}