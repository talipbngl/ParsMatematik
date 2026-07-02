const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  const normalizedEmail = normalizeEmail(email);

  if (normalizedEmail.length < 5) {
    return false;
  }

  if (normalizedEmail.length > 254) {
    return false;
  }

  return EMAIL_REGEX.test(normalizedEmail);
}

export function validateEmail(email: string): string | null {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return "E-posta adresi zorunludur.";
  }

  if (!isValidEmail(normalizedEmail)) {
    return "Geçerli bir e-posta adresi gir.";
  }

  return null;
}

export function assertValidEmail(email: string): string {
  const normalizedEmail = normalizeEmail(email);
  const error = validateEmail(normalizedEmail);

  if (error) {
    throw new Error(error);
  }

  return normalizedEmail;
}

export function maskEmail(email: string): string {
  const normalizedEmail = normalizeEmail(email);
  const [name, domain] = normalizedEmail.split("@");

  if (!name || !domain) {
    return normalizedEmail;
  }

  if (name.length <= 2) {
    return `${name[0] ?? "*"}***@${domain}`;
  }

  return `${name.slice(0, 2)}***@${domain}`;
}

export function getEmailDomain(email: string): string {
  const normalizedEmail = normalizeEmail(email);
  const [, domain] = normalizedEmail.split("@");

  return domain ?? "";
}

export function isSameEmail(firstEmail: string, secondEmail: string): boolean {
  return normalizeEmail(firstEmail) === normalizeEmail(secondEmail);
}