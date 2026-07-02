"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Send } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { envConfig } from "@/config/env.config";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { ErrorMessage } from "@/shared/components/feedback/ErrorMessage";
import { SuccessMessage } from "@/shared/components/feedback/SuccessMessage";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setStatus("loading");
      setMessage(null);

      const supabase = createClient();

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${envConfig.siteUrl}/auth/login`
      });

      if (error) {
        throw error;
      }

      setStatus("success");
      setMessage(
        "Şifre sıfırlama bağlantısı e-posta adresine gönderildi. Gelen kutunu kontrol et."
      );
    } catch (caughtError) {
      setStatus("error");
      setMessage(
        caughtError instanceof Error
          ? caughtError.message
          : "Şifre sıfırlama bağlantısı gönderilemedi."
      );
    }
  }

  return (
    <div className="rounded-[2rem] border bg-white p-6 shadow-soft sm:p-8">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.22em] text-primary">
          Şifre sıfırlama
        </p>

        <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
          Şifreni mi unuttun?
        </h1>

        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          E-posta adresini yaz. Supabase auth ayarları tamamlandığında sana şifre
          sıfırlama bağlantısı gönderilecek.
        </p>
      </div>

      {status === "error" && message ? (
        <ErrorMessage
          className="mt-6"
          title="Bağlantı gönderilemedi"
          message={message}
        />
      ) : null}

      {status === "success" && message ? (
        <SuccessMessage
          className="mt-6"
          title="E-posta gönderildi"
          message={message}
        />
      ) : null}

      <form onSubmit={handleSubmit} className="mt-7 space-y-5">
        <Input
          label="E-posta"
          name="email"
          type="email"
          placeholder="ornek@mail.com"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          leftIcon={<Mail className="size-4" />}
        />

        <Button
          type="submit"
          size="lg"
          fullWidth
          isLoading={status === "loading"}
          rightIcon={<Send className="size-4" />}
        >
          Sıfırlama bağlantısı gönder
        </Button>
      </form>

      <Link
        href="/auth/login"
        className="mt-6 inline-flex items-center gap-2 text-sm font-black text-primary"
      >
        <ArrowLeft className="size-4" />
        Giriş ekranına dön
      </Link>
    </div>
  );
}