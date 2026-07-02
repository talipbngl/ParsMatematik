type CurrencyCode = "TRY" | "USD" | "EUR";

type FormatPriceOptions = {
  currency?: CurrencyCode;
  locale?: string;
  showFreeText?: boolean;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

const DEFAULT_LOCALE = "tr-TR";
const DEFAULT_CURRENCY: CurrencyCode = "TRY";

export function formatPrice(
  value: number | null | undefined,
  options: FormatPriceOptions = {}
): string {
  const {
    currency = DEFAULT_CURRENCY,
    locale = DEFAULT_LOCALE,
    showFreeText = true,
    minimumFractionDigits = 0,
    maximumFractionDigits = 2
  } = options;

  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-";
  }

  if (value === 0 && showFreeText) {
    return "Ücretsiz";
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits
  }).format(value);
}

export function formatCompactPrice(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-";
  }

  if (value === 0) {
    return "Ücretsiz";
  }

  return new Intl.NumberFormat(DEFAULT_LOCALE, {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1
  }).format(value);
}

export function formatPaymentAmount(value: number | null | undefined): string {
  return formatPrice(value, {
    currency: "TRY",
    locale: "tr-TR",
    showFreeText: false,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

export function parsePriceInput(value: string): number {
  const normalizedValue = value
    .trim()
    .replace(/\s/g, "")
    .replace("₺", "")
    .replace(/\./g, "")
    .replace(",", ".");

  const parsedValue = Number(normalizedValue);

  if (Number.isNaN(parsedValue)) {
    return 0;
  }

  return parsedValue;
}

export function calculateDiscountPercentage(
  originalPrice: number,
  discountedPrice: number
): number {
  if (originalPrice <= 0 || discountedPrice < 0) {
    return 0;
  }

  if (discountedPrice >= originalPrice) {
    return 0;
  }

  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
}