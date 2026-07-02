"use client";

import { useCallback, useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import type { AuthProfile, AuthSessionStatus } from "@/features/auth/types/auth.types";
import { isUserRole } from "@/shared/types/role.types";

function mapProfileRow(row: {
  id: string;
  email: string;
  full_name: string;
  role: string;
  avatar_url: string | null;
  phone: string | null;
  bio: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}): AuthProfile | null {
  if (!isUserRole(row.role)) {
    return null;
  }

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

export function useAuth() {
  const [profile, setProfile] = useState<AuthProfile | null>(null);
  const [status, setStatus] = useState<AuthSessionStatus>("loading");
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    try {
      setStatus("loading");
      setError(null);

      const supabase = createClient();

      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setProfile(null);
        setStatus("unauthenticated");
        return;
      }

      const { data, error: profileError } = await supabase
        .from("profiles")
        .select(
          "id, email, full_name, role, avatar_url, phone, bio, is_active, created_at, updated_at"
        )
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) {
        setError(profileError.message);
        setProfile(null);
        setStatus("unauthenticated");
        return;
      }

      if (!data) {
        setProfile(null);
        setStatus("authenticated");
        return;
      }

      setProfile(mapProfileRow(data));
      setStatus("authenticated");
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Oturum bilgisi alınamadı."
      );
      setProfile(null);
      setStatus("unauthenticated");
    }
  }, []);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  return {
    profile,
    status,
    error,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    isUnauthenticated: status === "unauthenticated",
    reload: loadProfile
  };
}