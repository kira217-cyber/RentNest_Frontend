"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { UNAUTHORIZED_EVENT } from "@/lib/api-client";
import { getTokenCookie, removeTokenCookie } from "@/lib/cookies";
import { queryKeys } from "@/lib/query-keys";
import { AuthService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth-store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);
  const setStatus = useAuthStore((state) => state.setStatus);
  const hasToken = typeof window !== "undefined" && Boolean(getTokenCookie());

  const { data, isError } = useQuery({
    queryKey: queryKeys.auth,
    queryFn: async () => (await AuthService.getMe()).data,
    enabled: hasToken,
    retry: false,
  });

  useEffect(() => {
    if (!hasToken) {
      setStatus("unauthenticated");
      return;
    }

    if (data) {
      setUser(data);
    } else if (isError) {
      removeTokenCookie();
      setUser(null);
    }
  }, [hasToken, data, isError, setUser, setStatus]);

  useEffect(() => {
    function handleUnauthorized() {
      setUser(null);
      queryClient.clear();
      toast.error("Your session has expired. Please log in again.");
    }

    window.addEventListener(UNAUTHORIZED_EVENT, handleUnauthorized);
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, handleUnauthorized);
  }, [queryClient, setUser]);

  return <>{children}</>;
}
