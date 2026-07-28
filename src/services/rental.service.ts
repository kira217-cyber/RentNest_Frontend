import { apiClient } from "@/lib/api-client";
import type { ApiSuccessResponse } from "@/types/api";
import type {
  CreateRentalPayload,
  RentalRequest,
  UpdateRentalStatusPayload,
} from "@/types/rental";

export const RentalService = {
  async create(payload: CreateRentalPayload) {
    const { data } = await apiClient.post<ApiSuccessResponse<RentalRequest>>(
      "/rentals",
      payload,
    );
    return data;
  },

  async getMyRentals() {
    const { data } = await apiClient.get<ApiSuccessResponse<RentalRequest[]>>("/rentals");
    return data;
  },

  async getOne(id: string) {
    const { data } = await apiClient.get<ApiSuccessResponse<RentalRequest>>(`/rentals/${id}`);
    return data;
  },

  async getLandlordRequests() {
    const { data } = await apiClient.get<ApiSuccessResponse<RentalRequest[]>>(
      "/rentals/landlord/requests",
    );
    return data;
  },

  async updateStatus(id: string, payload: UpdateRentalStatusPayload) {
    const { data } = await apiClient.patch<ApiSuccessResponse<RentalRequest>>(
      `/rentals/landlord/requests/${id}`,
      payload,
    );
    return data;
  },
};
