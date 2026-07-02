export type NavigationItem = {
  title: string;
  href: string;
  description?: string;
  isExternal?: boolean;
};

export const mainNavigation: NavigationItem[] = [
  {
    title: "Ana Sayfa",
    href: "/",
    description: "Parsmatematik ana sayfası"
  },
  {
    title: "Kurslar",
    href: "/courses",
    description: "LGS, TYT, AYT ve okul destek matematik kursları"
  },
  {
    title: "Öğretmenler",
    href: "/teachers",
    description: "Parsmatematik öğretmen kadrosu"
  },
  {
    title: "Fiyatlar",
    href: "/pricing",
    description: "Ders paketleri ve ödeme seçenekleri"
  },
  {
    title: "Hakkımızda",
    href: "/about",
    description: "Parsmatematik hikayesi"
  },
  {
    title: "İletişim",
    href: "/contact",
    description: "Bizimle iletişime geç"
  }
];

export const authNavigation: NavigationItem[] = [
  {
    title: "Giriş Yap",
    href: "/auth/login"
  },
  {
    title: "Kayıt Ol",
    href: "/auth/register"
  }
];

export const footerNavigation = {
  platform: [
    {
      title: "Canlı Ders",
      href: "/courses"
    },
    {
      title: "Ödev Takibi",
      href: "/courses"
    },
    {
      title: "Online Sınav",
      href: "/courses"
    },
    {
      title: "Öğrenci Paneli",
      href: "/auth/login"
    }
  ],

  company: [
    {
      title: "Hakkımızda",
      href: "/about"
    },
    {
      title: "Öğretmenler",
      href: "/teachers"
    },
    {
      title: "İletişim",
      href: "/contact"
    }
  ],

  legal: [
    {
      title: "Gizlilik Politikası",
      href: "/privacy"
    },
    {
      title: "Kullanım Şartları",
      href: "/terms"
    }
  ]
} satisfies Record<string, NavigationItem[]>;