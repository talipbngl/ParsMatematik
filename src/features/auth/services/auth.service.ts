import { createClient } from "@/lib/supabase/server";
import { mapSupabaseAuthError } from "@/lib/errors/auth-errors";
import { AppError } from "@/lib/errors/AppError";
import type {
  AuthActionData,
  AuthProfile,
  LoginFormValues,
  RegisterFormValues
} from "@/features/auth/types/auth.types";
import { getRoleDashboardPath, isUserRole } from "@/shared/types/role.types";
import type { UserRole } from "@/shared/types/role.types";

function mapProfileRowToAuthProfile(row: {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url: string | null;
  phone: string | null;
  bio: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}): AuthProfile {
  return {
    id: row.id,
    email: row.email,
    fullName: row.full_name,
    role: row.role,
    avatarUrl: row.avatar_url,
    phone: row.phone,
    bio: row.bio,
    isActive: row.is_active,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export async function signInWithEmail(
  values: LoginFormValues
): Promise<AuthActionData> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password
  });

  if (error) {
    throw mapSupabaseAuthError(error.message);
  }

  if (!data.user) {
    throw AppError.auth("Kullanıcı bilgisi alınamadı.");
  }

  const profile = await getProfileById(data.user.id);

 return {
  userId: data.user.id,
  email: data.user.email ?? values.email,
  redirectTo: profile ? getRoleDashboardPath(profile.role) : "/dashboard",
  ...(profile ? { role: profile.role } : {})
};
}
export async function signUpWithEmail(
  values: RegisterFormValues
): Promise<AuthActionData> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      data: {
        full_name: values.fullName,
        role: values.role
      }
    }
  });

  if (error) {
    throw mapSupabaseAuthError(error.message);
  }

  if (!data.user) {
    throw AppError.auth("Kayıt oluşturulamadı.");
  }

  /*
    Supabase tarafında email confirmation kapalıysa session hemen gelebilir.
    Açık ise kullanıcı e-posta doğrulaması yapana kadar session null olabilir.
    Profile kaydını burada best-effort oluşturuyoruz.
  */
  await upsertProfile({
    id: data.user.id,
    email: data.user.email ?? values.email,
    fullName: values.fullName,
    role: values.role
  });

  return {
    userId: data.user.id,
    email: data.user.email ?? values.email,
    role: values.role,
    redirectTo: getRoleDashboardPath(values.role)
  };
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw mapSupabaseAuthError(error.message);
  }
}

export async function getProfileById(userId: string): Promise<AuthProfile | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select(
      "id, email, full_name, role, avatar_url, phone, bio, is_active, created_at, updated_at"
    )
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw AppError.database(error.message);
  }

  if (!data) {
    return null;
  }

  if (!isUserRole(data.role)) {
    throw AppError.forbidden("Kullanıcı rol bilgisi geçersiz.");
  }

  return mapProfileRowToAuthProfile({
    ...data,
    role: data.role
  });
}

export async function getCurrentAuthProfile(): Promise<AuthProfile | null> {
  const supabase = await createClient();

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return getProfileById(user.id);
}

export async function upsertProfile(values: {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
}): Promise<AuthProfile> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .upsert(
      {
        id: values.id,
        email: values.email,
        full_name: values.fullName,
        role: values.role,
        is_active: true,
        updated_at: new Date().toISOString()
      },
      {
        onConflict: "id"
      }
    )
    .select(
      "id, email, full_name, role, avatar_url, phone, bio, is_active, created_at, updated_at"
    )
    .single();

  if (error) {
    throw AppError.database(error.message);
  }

  if (!isUserRole(data.role)) {
    throw AppError.forbidden("Kullanıcı rol bilgisi geçersiz.");
  }

  return mapProfileRowToAuthProfile({
    ...data,
    role: data.role
  });
}