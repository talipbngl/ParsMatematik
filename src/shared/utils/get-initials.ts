type GetInitialsOptions = {
  maxLength?: number;
  fallback?: string;
};

export function getInitials(
  value: string | null | undefined,
  options: GetInitialsOptions = {}
): string {
  const { maxLength = 2, fallback = "P" } = options;

  if (!value || value.trim().length === 0) {
    return fallback;
  }

  const words = value
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) {
    return fallback;
  }

  if (words.length === 1) {
    return words[0]?.slice(0, maxLength).toLocaleUpperCase("tr-TR") ?? fallback;
  }

  return words
    .slice(0, maxLength)
    .map((word) => word.charAt(0).toLocaleUpperCase("tr-TR"))
    .join("");
}

export function getAvatarColorSeed(value: string | null | undefined): number {
  if (!value) {
    return 0;
  }

  return value.split("").reduce((accumulator, character) => {
    return accumulator + character.charCodeAt(0);
  }, 0);
}

export function getAvatarColorClass(value: string | null | undefined): string {
  const colorClasses = [
    "bg-indigo-100 text-indigo-700",
    "bg-sky-100 text-sky-700",
    "bg-amber-100 text-amber-700",
    "bg-emerald-100 text-emerald-700",
    "bg-rose-100 text-rose-700",
    "bg-violet-100 text-violet-700"
  ] as const;

  const seed = getAvatarColorSeed(value);
  const index = seed % colorClasses.length;

  const colorClass = colorClasses[index];

  if (!colorClass) {
    return "bg-indigo-100 text-indigo-700";
  }

  return colorClass;
}