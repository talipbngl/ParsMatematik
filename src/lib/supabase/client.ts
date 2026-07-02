import { createBrowserClient } from "@supabase/ssr";

import { envConfig } from "@/config/env.config";
import type { Database } from "@/shared/types/database.types";

let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null;

export function createClient() {
  if (!envConfig.supabaseUrl || !envConfig.supabaseAnonKey) {
    throw new Error(
      "Supabase client oluşturulamadı. NEXT_PUBLIC_SUPABASE_URL ve NEXT_PUBLIC_SUPABASE_ANON_KEY değerlerini .env.local içine eklemelisin."
    );
  }

  if (!browserClient) {
    browserClient = createBrowserClient<Database>(
      envConfig.supabaseUrl,
      envConfig.supabaseAnonKey
    );
  }

  return browserClient;
}

export function getBrowserClient() {
  return createClient();
}