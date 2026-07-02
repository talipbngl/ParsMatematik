import {
  format,
  formatDistanceToNow,
  isAfter,
  isBefore,
  isToday,
  isTomorrow,
  isValid,
  parseISO
} from "date-fns";
import { tr } from "date-fns/locale";

type DateInput = Date | string | number | null | undefined;

function toDate(value: DateInput): Date | null {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return isValid(value) ? value : null;
  }

  if (typeof value === "string") {
    const parsedDate = parseISO(value);

    if (isValid(parsedDate)) {
      return parsedDate;
    }

    const fallbackDate = new Date(value);
    return isValid(fallbackDate) ? fallbackDate : null;
  }

  const parsedDate = new Date(value);
  return isValid(parsedDate) ? parsedDate : null;
}

export function formatDate(value: DateInput): string {
  const date = toDate(value);

  if (!date) {
    return "-";
  }

  return format(date, "d MMMM yyyy", {
    locale: tr
  });
}

export function formatShortDate(value: DateInput): string {
  const date = toDate(value);

  if (!date) {
    return "-";
  }

  return format(date, "dd.MM.yyyy", {
    locale: tr
  });
}

export function formatDateTime(value: DateInput): string {
  const date = toDate(value);

  if (!date) {
    return "-";
  }

  return format(date, "d MMMM yyyy, HH:mm", {
    locale: tr
  });
}

export function formatTime(value: DateInput): string {
  const date = toDate(value);

  if (!date) {
    return "-";
  }

  return format(date, "HH:mm", {
    locale: tr
  });
}

export function formatLessonDate(value: DateInput): string {
  const date = toDate(value);

  if (!date) {
    return "-";
  }

  if (isToday(date)) {
    return `Bugün, ${format(date, "HH:mm", { locale: tr })}`;
  }

  if (isTomorrow(date)) {
    return `Yarın, ${format(date, "HH:mm", { locale: tr })}`;
  }

  return format(date, "d MMMM yyyy, HH:mm", {
    locale: tr
  });
}

export function formatRelativeDate(value: DateInput): string {
  const date = toDate(value);

  if (!date) {
    return "-";
  }

  return formatDistanceToNow(date, {
    addSuffix: true,
    locale: tr
  });
}

export function isPastDate(value: DateInput): boolean {
  const date = toDate(value);

  if (!date) {
    return false;
  }

  return isBefore(date, new Date());
}

export function isFutureDate(value: DateInput): boolean {
  const date = toDate(value);

  if (!date) {
    return false;
  }

  return isAfter(date, new Date());
}

export function getDateInputValue(value: DateInput): string {
  const date = toDate(value);

  if (!date) {
    return "";
  }

  return format(date, "yyyy-MM-dd");
}

export function getDateTimeInputValue(value: DateInput): string {
  const date = toDate(value);

  if (!date) {
    return "";
  }

  return format(date, "yyyy-MM-dd'T'HH:mm");
}