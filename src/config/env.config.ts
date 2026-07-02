type EnvConfig = {
  siteUrl: string
  siteName: string
  siteDescription: string
  supabaseUrl: string
  supabaseAnonKey: string
  supabaseServiceRoleKey?: string
  authRedirectUrl: string
  maxUploadSizeMb: number
  meetingProvider: "external" | "meet" | "jitsi"
  jitsiDomain: string
  paymentMode: "manual" | "iyzico" | "paytr"
  bankName?: string
  bankIban?: string
  bankAccountOwner?: string
  allowDashboardMock: boolean
  nodeEnv: "development" | "production" | "test"
  isDevelopment: boolean
  isProduction: boolean
}

function getStringEnv(key: string, fallback = ""): string {
  return process.env[key] ?? fallback
}

function getNumberEnv(key: string, fallback: number): number {
  const value = process.env[key]

  if (!value) {
    return fallback
  }

  const parsedValue = Number(value)

  if (Number.isNaN(parsedValue)) {
    return fallback
  }

  return parsedValue
}

function getBooleanEnv(key: string, fallback: boolean): boolean {
  const value = process.env[key]

  if (!value) {
    return fallback
  }

  return value === "true"
}

function getMeetingProvider(value: string): EnvConfig["meetingProvider"] {
  if (value === "meet" || value === "jitsi" || value === "external") {
    return value
  }

  return "external"
}

function getPaymentMode(value: string): EnvConfig["paymentMode"] {
  if (value === "iyzico" || value === "paytr" || value === "manual") {
    return value
  }

  return "manual"
}

function getNodeEnv(value: string): EnvConfig["nodeEnv"] {
  if (value === "production" || value === "test" || value === "development") {
    return value
  }

  return "development"
}

const nodeEnv = getNodeEnv(getStringEnv("NODE_ENV", "development"))

export const envConfig: EnvConfig = {
  siteUrl: getStringEnv("NEXT_PUBLIC_SITE_URL", "http://localhost:3000"),
  siteName: getStringEnv("NEXT_PUBLIC_SITE_NAME", "Parsmatematik"),
  siteDescription: getStringEnv(
    "NEXT_PUBLIC_SITE_DESCRIPTION",
    "Matematik özel ders, canlı ders, ödev ve sınav takip platformu.",
  ),
  supabaseUrl: getStringEnv("NEXT_PUBLIC_SUPABASE_URL"),
  supabaseAnonKey: getStringEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  supabaseServiceRoleKey: getStringEnv("SUPABASE_SERVICE_ROLE_KEY"),
  authRedirectUrl: getStringEnv(
    "NEXT_PUBLIC_AUTH_REDIRECT_URL",
    "http://localhost:3000/dashboard",
  ),
  maxUploadSizeMb: getNumberEnv("NEXT_PUBLIC_MAX_UPLOAD_SIZE_MB", 10),
  meetingProvider: getMeetingProvider(
    getStringEnv("NEXT_PUBLIC_MEETING_PROVIDER", "external"),
  ),
  jitsiDomain: getStringEnv("NEXT_PUBLIC_JITSI_DOMAIN", "meet.jit.si"),
  paymentMode: getPaymentMode(getStringEnv("NEXT_PUBLIC_PAYMENT_MODE", "manual")),
  bankName: getStringEnv("NEXT_PUBLIC_BANK_NAME"),
  bankIban: getStringEnv("NEXT_PUBLIC_BANK_IBAN"),
  bankAccountOwner: getStringEnv("NEXT_PUBLIC_BANK_ACCOUNT_OWNER"),
  allowDashboardMock: getBooleanEnv("ALLOW_DASHBOARD_MOCK", true),
  nodeEnv,
  isDevelopment: nodeEnv === "development",
  isProduction: nodeEnv === "production",
}