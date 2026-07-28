"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { removeTokenCookie, setTokenCookie } from "@/lib/cookies";
import { getApiErrorMessage } from "@/lib/error";
import { queryKeys } from "@/lib/query-keys";
import { AuthService, type LoginPayload, type RegisterPayload } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth-store";

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const status = useAuthStore((state) => state.status);
  const setUser = useAuthStore((state) => state.setUser);
  const clear = useAuthStore((state) => state.clear);

  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => AuthService.login(payload),
    onSuccess: (response) => {
      setTokenCookie(response.data.accessToken);
      setUser(response.data.user);
      queryClient.setQueryData(queryKeys.auth, response.data.user);
      toast.success("Logged in successfully.");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterPayload) => AuthService.register(payload),
    onSuccess: (response) => {
      setTokenCookie(response.data.accessToken);
      setUser(response.data.user);
      queryClient.setQueryData(queryKeys.auth, response.data.user);
      toast.success("Account created successfully.");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });

  function logout() {
    removeTokenCookie();
    clear();
    queryClient.clear();
    toast.success("Logged out successfully.");
    router.push("/");
  }

  return {
    user,
    status,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout,
    isLoginPending: loginMutation.isPending,
    isRegisterPending: registerMutation.isPending,
  };
}
