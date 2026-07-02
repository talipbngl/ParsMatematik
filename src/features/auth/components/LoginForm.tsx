"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Lock, Mail } from "lucide-react";

import { loginAction } from "@/features/auth/actions/login.action";
import type { AuthActionData } from "@/features/auth/types/auth.types";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { ErrorMessage } from "@/shared/components/feedback/ErrorMessage";
import { SuccessMessage } from "@/shared/components/feedback/SuccessMessage";
import type { ActionResult } from "@/shared/types/common.types";

const initialState: ActionResult<AuthActionData> | null = null;

export function LoginForm() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState<
    ActionResult<AuthActionData> | null,
    FormData
  >(loginAction, initialState);

  useEffect(() => {
    if (state?.success && state.data?.redirectTo) {
      router.push(state.data.redirectTo);
    }
  }, [state, router]);

  return (
    <div className="rounded-[2rem] border bg-white p-6 shadow-soft sm:p-8">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.22em] text-primary">
          Hoş geldin
        </p>

        <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
          Parsmatematik hesabına giriş yap.
        </h1>

        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Canlı derslerini, ödevlerini, sınavlarını ve öğrenci panelini buradan
          takip edeceksin.
        </p>
      </div>

      {state && !state.success ? (
        <ErrorMessage
          className="mt-6"
          title="Giriş yapılamadı"
          message={state.message}
        />
      ) : null}

      {state?.success ? (
        <SuccessMessage
          className="mt-6"
          title="Giriş başarılı"
          message={state.message}
        />
      ) : null}

      <form action={formAction} className="mt-7 space-y-5">
        <Input
          label="E-posta"
          name="email"
          type="email"
          placeholder="ornek@mail.com"
          autoComplete="email"
          leftIcon={<Mail className="size-4" />}
          error={state?.success === false ? state.fieldErrors?.email?.[0] : undefined}
        />

        <Input
          label="Şifre"
          name="password"
          type="password"
          placeholder="Şifreni gir"
          autoComplete="current-password"
          leftIcon={<Lock className="size-4" />}
          error={
            state?.success === false ? state.fieldErrors?.password?.[0] : undefined
          }
        />

        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2 font-bold text-muted-foreground">
            <input
              type="checkbox"
              className="size-4 rounded border-border accent-primary"
            />
            Beni hatırla
          </label>

          <Link
            href="/auth/forgot-password"
            className="font-black text-primary hover:underline"
          >
            Şifremi unuttum
          </Link>
        </div>

        <Button
          type="submit"
          size="lg"
          fullWidth
          isLoading={isPending}
          rightIcon={<ArrowRight className="size-4" />}
        >
          Giriş Yap
        </Button>
      </form>

      <p className="mt-6 text-center text-sm font-semibold text-muted-foreground">
        Hesabın yok mu?{" "}
        <Link href="/auth/register" className="font-black text-primary">
          Kayıt ol
        </Link>
      </p>
    </div>
  );
}