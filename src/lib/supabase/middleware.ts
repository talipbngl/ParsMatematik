import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { envConfig } from "@/config/env.config";
import type { Database } from "@/shared/types/database.types";

export async function updateSession(request: NextRequest) {
  if (!envConfig.supabaseUrl || !envConfig.supabaseAnonKey) {
    return NextResponse.next({
      request
    });
  }

  let supabaseResponse = NextResponse.next({
    request
  });

  const supabase = createServerClient<Database>(
    envConfig.supabaseUrl,
    envConfig.supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          supabaseResponse = NextResponse.next({
            request
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        }
      }
    }
  );

  /*
    auth.getUser() çağrısı token refresh işlemini tetikleyebilir.
    Bu yüzden bu satırı gereksiz yere kaldırma.
  */
  await supabase.auth.getUser();

  return supabaseResponse;
}