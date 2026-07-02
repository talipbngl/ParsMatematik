import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { envConfig } from "@/config/env.config";
import type { Database } from "@/shared/types/database.types";

export async function createClient() {
  if (!envConfig.supabaseUrl || !envConfig.supabaseAnonKey) {
    throw new Error(
      "Supabase server client oluşturulamadı. NEXT_PUBLIC_SUPABASE_URL ve NEXT_PUBLIC_SUPABASE_ANON_KEY değerlerini .env.local içine eklemelisin."
    );
  }

  const cookieStore = await cookies();

  return createServerClient<Database>(
    envConfig.supabaseUrl,
    envConfig.supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },

        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            /*
              Server Component içinde cookie set edilemez.
              Bu durum normal olabilir. Session refresh işi proxy içinde yapılacak.
            */
          }
        }
      }
    }
  );
}

export async function getCurrentUser() {
  const supabase = await createClient();

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error) {
    return null;
  }

  return user;
}

export async function getCurrentSession() {
  const supabase = await createClient();

  const {
    data: { session },
    error
  } = await supabase.auth.getSession();

  if (error) {
    return null;
  }

  return session;
}