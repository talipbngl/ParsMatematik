import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { footerNavigation } from "@/config/navigation.config";
import { siteConfig } from "@/config/site.config";
import { ROUTES } from "@/shared/constants/routes";

const footerGroupLabels: Record<keyof typeof footerNavigation, string> = {
  platform: "Platform",
  company: "Kurumsal",
  legal: "Yasal"
};

export function Footer() {
  return (
    <footer className="border-t bg-white/75">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <Link href={ROUTES.home} className="inline-flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-glow">
                <span className="text-lg font-black">P</span>
              </div>

              <div>
                <p className="text-xl font-black tracking-tight">
                  {siteConfig.name}
                </p>
                <p className="mt-1 text-xs font-bold text-muted-foreground">
                  Online matematik platformu
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
              {siteConfig.description}
            </p>

            <div className="mt-6 grid gap-3 text-sm font-bold text-muted-foreground sm:grid-cols-3">
              <div className="flex items-center gap-2">
                <Mail className="size-4 text-primary" />
                <span>{siteConfig.contact.email}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="size-4 text-primary" />
                <span>{siteConfig.contact.phone}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-primary" />
                <span>{siteConfig.contact.location}</span>
              </div>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {(Object.keys(footerNavigation) as Array<keyof typeof footerNavigation>).map(
              (groupKey) => (
                <div key={groupKey}>
                  <h3 className="text-sm font-black uppercase tracking-[0.18em] text-foreground">
                    {footerGroupLabels[groupKey]}
                  </h3>

                  <ul className="mt-4 space-y-3">
                    {footerNavigation[groupKey].map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-sm font-bold text-muted-foreground transition hover:text-primary"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t pt-6 text-sm font-medium text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Tüm hakları
            saklıdır.
          </p>

          <p>
            Matematik özel dersleri için canlı ders, ödev ve sınav takip sistemi.
          </p>
        </div>
      </div>
    </footer>
  );
}