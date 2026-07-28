import { apiClient } from "@/lib/api-client";
import type { ApiSuccessResponse } from "@/types/api";
import type {
  AdminDashboardStats,
  AdminPropertyQuery,
  AdminRentalQuery,
  AdminUserQuery,
} from "@/types/admin";
import type { Property } from "@/types/property";
import type { RentalRequest } from "@/types/rental";
import type { User, UserStatus } from "@/types/user";

export const AdminService = {
  async getDashboard() {
    const { data } = await apiClient.get<ApiSuccessResponse<AdminDashboardStats>>(
      "/admin/dashboard",
    );
    return data;
  },

  async getUsers(query: AdminUserQuery = {}) {
    const { data } = await apiClient.get<ApiSuccessResponse<User[]>>("/admin/users", {
      params: query,
    });
    return data;
  },

  async updateUserStatus(id: string, status: UserStatus) {
    const { data } = await apiClient.patch<ApiSuccessResponse<User>>(
      `/admin/users/${id}/status`,
      { status },
    );
    return data;
  },

  async getProperties(query: AdminPropertyQuery = {}) {
    const { data } = await apiClient.get<ApiSuccessResponse<Property[]>>("/admin/properties", {
      params: query,
    });
    return data;
  },

  async getProperty(id: string) {
    const { data } = await apiClient.get<ApiSuccessResponse<Property>>(
      `/admin/properties/${id}`,
    );
    return data;
  },

  async getRentals(query: AdminRentalQuery = {}) {
    const { data } = await apiClient.get<ApiSuccessResponse<RentalRequest[]>>("/admin/rentals", {
      params: query,
    });
    return data;
  },

  async getRental(id: string) {
    const { data } = await apiClient.get<ApiSuccessResponse<RentalRequest>>(
      `/admin/rentals/${id}`,
    );
    return data;
  },
};
