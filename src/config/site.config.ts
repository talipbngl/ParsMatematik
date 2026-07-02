export const siteConfig = {
  name: "Parsmatematik",
  shortName: "Pars",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Parsmatematik; matematik özel dersleri için canlı ders, ödev, sınav, materyal ve öğrenci takip sistemi sunan modern eğitim platformudur.",

  slogan: "Matematik artık daha takip edilebilir, daha canlı, daha kişisel.",

  contact: {
    email: "iletisim@parsmatematik.com",
    phone: "+90 555 000 00 00",
    whatsapp: "+90 555 000 00 00",
    location: "Türkiye"
  },

  socialLinks: {
    instagram: "https://instagram.com/parsmatematik",
    youtube: "https://youtube.com/@parsmatematik",
    linkedin: "https://linkedin.com/company/parsmatematik"
  },

  brand: {
    primaryColor: "#4f46e5",
    secondaryColor: "#0ea5e9",
    accentColor: "#f59e0b"
  }
} as const;

export type SiteConfig = typeof siteConfig;