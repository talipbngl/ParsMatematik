"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Lock, Mail, UserRound } from "lucide-react";

import { registerAction } from "@/features/auth/actions/register.action";
import type { AuthActionData } from "@/features/auth/types/auth.types";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Select } from "@/shared/components/ui/Select";
import { ErrorMessage } from "@/shared/components/feedback/ErrorMessage";
import { SuccessMessage } from "@/shared/components/feedback/SuccessMessage";
import type { ActionResult, SelectOption } from "@/shared/types/common.types";
import type { UserRole } from "@/shared/types/role.types";

const initialState: ActionResult<AuthActionData> | null = null;

const roleOptions: SelectOption<UserRole>[] = [
  {
    label: "Öğrenci",
    value: "student",
    description: "Derslere katılacak, ödev ve sınav takip edecek kullanıcı."
  },
  {
    label: "Öğretmen",
    value: "teacher",
    description: "Ders, ödev, sınav ve öğrenci takibi yapacak kullanıcı."
  },
  {
    label: "Veli",
    value: "parent",
    description: "Öğrenci gelişimini takip edecek kullanıcı."
  }
];

export function RegisterForm() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState<
    ActionResult<AuthActionData> | null,
    FormData
  >(registerAction, initialState);

  useEffect(() => {
    if (state?.success && state.data?.redirectTo) {
      router.push(state.data.redirectTo);
    }
  }, [state, router]);

  return (
    <div className="rounded-[2rem] border bg-white p-6 shadow-soft sm:p-8">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.22em] text-primary">
          Yeni hesap
        </p>

        <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
          Parsmatematik’e kayıt ol.
        </h1>

        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Öğrenci, öğretmen veya veli hesabı oluştur. Admin hesapları güvenlik
          nedeniyle kayıt ekranından oluşturulmaz.
        </p>
      </div>

      {state && !state.success ? (
        <ErrorMessage
          className="mt-6"
          title="Kayıt tamamlanamadı"
          message={state.message}
        />
      ) : null}

      {state?.success ? (
        <SuccessMessage
          className="mt-6"
          title="Kayıt başarılı"
          message={state.message}
        />
      ) : null}

      <form action={formAction} className="mt-7 space-y-5">
        <Input
          label="Ad Soyad"
          name="fullName"
          type="text"
          placeholder="Adını ve soyadını yaz"
          autoComplete="name"
          leftIcon={<UserRound className="size-4" />}
          error={
            state?.success === false ? state.fieldErrors?.fullName?.[0] : undefined
          }
        />

        <Input
          label="E-posta"
          name="email"
          type="email"
          placeholder="ornek@mail.com"
          autoComplete="email"
          leftIcon={<Mail className="size-4" />}
          error={state?.success === false ? state.fieldErrors?.email?.[0] : undefined}
        />

        <Select<UserRole>
          label="Hesap türü"
          name="role"
          options={roleOptions}
          defaultValue="student"
          error={state?.success === false ? state.fieldErrors?.role?.[0] : undefined}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label="Şifre"
            name="password"
            type="password"
            placeholder="En az 8 karakter"
            autoComplete="new-password"
            leftIcon={<Lock className="size-4" />}
            error={
              state?.success === false
                ? state.fieldErrors?.password?.[0]
                : undefined
            }
          />

          <Input
            label="Şifre tekrar"
            name="confirmPassword"
            type="password"
            placeholder="Şifreni tekrar gir"
            autoComplete="new-password"
            leftIcon={<Lock className="size-4" />}
            error={
              state?.success === false
                ? state.fieldErrors?.confirmPassword?.[0]
                : undefined
            }
          />
        </div>

        <div className="rounded-3xl border bg-muted/40 p-4 text-xs font-semibold leading-6 text-muted-foreground">
          Şifre en az 8 karakter, bir büyük harf, bir küçük harf ve bir rakam
          içermeli. Bu kuralı güçlü hesap güvenliği için koyuyoruz.
        </div>

        <Button
          type="submit"
          size="lg"
          fullWidth
          isLoading={isPending}
          rightIcon={<ArrowRight className="size-4" />}
        >
          Kayıt Ol
        </Button>
      </form>

      <p className="mt-6 text-center text-sm font-semibold text-muted-foreground">
        Zaten hesabın var mı?{" "}
        <Link href="/auth/login" className="font-black text-primary">
          Giriş yap
        </Link>
      </p>
    </div>
  );
}