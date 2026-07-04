import { createClient } from "@supabase/supabase-js";

import { envConfig } from "@/config/env.config";

export function createAdminClient() {
  if (!envConfig.supabaseUrl || !envConfig.supabaseServiceRoleKey) {
    throw new Error(
      "Supabase admin client oluşturulamadı. SUPABASE_SERVICE_ROLE_KEY .env.local içinde olmalı."
    );
  }

  return createClient(
    envConfig.supabaseUrl,
    envConfig.supabaseServiceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );
}