import { apiClient } from "@/lib/api-client";
import type { ApiSuccessResponse } from "@/types/api";
import type { AuthResponse, User } from "@/types/user";

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: "TENANT" | "LANDLORD";
};

export type LoginPayload = {
  email: string;
  password: string;
};

export const AuthService = {
  async register(payload: RegisterPayload) {
    const { data } = await apiClient.post<ApiSuccessResponse<AuthResponse>>(
      "/auth/register",
      payload,
    );
    return data;
  },

  async login(payload: LoginPayload) {
    const { data } = await apiClient.post<ApiSuccessResponse<AuthResponse>>(
      "/auth/login",
      payload,
    );
    return data;
  },

  async getMe() {
    const { data } = await apiClient.get<ApiSuccessResponse<User>>("/auth/me");
    return data;
  },
};
