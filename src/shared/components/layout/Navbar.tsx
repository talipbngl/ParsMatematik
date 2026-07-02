"use client";

import { useState } from "react";
import { ArrowRight, LogIn, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { mainNavigation } from "@/config/navigation.config";
import { siteConfig } from "@/config/site.config";
import { ROUTES } from "@/shared/constants/routes";
import { cn } from "@/shared/utils/cn";

export type NavbarProps = {
  variant?: "transparent" | "solid";
};

export function Navbar({ variant = "transparent" }: NavbarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-xl",
        variant === "transparent" && "border-transparent bg-white/60",
        variant === "solid" && "border-border bg-white/90 shadow-soft"
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={ROUTES.home}
          className="group flex items-center gap-3"
          onClick={closeMobileMenu}
        >
          <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-glow transition-transform group-hover:scale-105">
            <span className="text-lg font-black">P</span>
          </div>

          <div>
            <p className="text-lg font-black leading-none tracking-tight">
              {siteConfig.name}
            </p>
            <p className="mt-1 text-xs font-bold text-muted-foreground">
              Online matematik platformu
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {mainNavigation.map((item) => {
            const isActive =
              item.href === ROUTES.home
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-black text-muted-foreground transition hover:text-foreground",
                  isActive && "text-primary"
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={ROUTES.auth.login}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-black text-foreground transition hover:bg-muted"
          >
            <LogIn className="size-4" />
            Giriş Yap
          </Link>

          <Link
            href={ROUTES.auth.register}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-black text-primary-foreground shadow-glow transition hover:scale-[1.02]"
          >
            Kayıt Ol
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
          className="flex size-11 items-center justify-center rounded-full border bg-white text-foreground shadow-soft lg:hidden"
          onClick={() => setIsMobileMenuOpen((currentValue) => !currentValue)}
        >
          {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {isMobileMenuOpen ? (
        <div className="border-t bg-white/95 px-4 py-5 shadow-soft lg:hidden">
          <nav className="grid gap-2">
            {mainNavigation.map((item) => {
              const isActive =
                item.href === ROUTES.home
                  ? pathname === item.href
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm font-black text-muted-foreground transition hover:bg-muted hover:text-foreground",
                    isActive && "bg-primary-soft text-primary"
                  )}
                >
                  <span>{item.title}</span>

                  {item.description ? (
                    <span className="mt-1 block text-xs font-medium leading-5 text-muted-foreground">
                      {item.description}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="mt-5 grid gap-3 border-t pt-5">
            <Link
              href={ROUTES.auth.login}
              onClick={closeMobileMenu}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border bg-white text-sm font-black shadow-soft"
            >
              <LogIn className="size-4" />
              Giriş Yap
            </Link>

            <Link
              href={ROUTES.auth.register}
              onClick={closeMobileMenu}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary text-sm font-black text-primary-foreground shadow-glow"
            >
              Kayıt Ol
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}