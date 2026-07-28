import { apiClient } from "@/lib/api-client";
import type { ApiSuccessResponse } from "@/types/api";
import type {
  CreatePropertyPayload,
  Property,
  PropertyFilters,
  UpdatePropertyPayload,
} from "@/types/property";

export const PropertyService = {
  async getAll(filters: PropertyFilters = {}) {
    const { data } = await apiClient.get<ApiSuccessResponse<Property[]>>("/properties", {
      params: filters,
    });
    return data;
  },

  async getOne(id: string) {
    const { data } = await apiClient.get<ApiSuccessResponse<Property>>(`/properties/${id}`);
    return data;
  },

  async getMyProperties() {
    const { data } = await apiClient.get<ApiSuccessResponse<Property[]>>(
      "/properties/my-properties",
    );
    return data;
  },

  async create(payload: CreatePropertyPayload) {
    const { data } = await apiClient.post<ApiSuccessResponse<Property>>("/properties", payload);
    return data;
  },

  async update(id: string, payload: UpdatePropertyPayload) {
    const { data } = await apiClient.patch<ApiSuccessResponse<Property>>(
      `/properties/${id}`,
      payload,
    );
    return data;
  },

  async remove(id: string) {
    const { data } = await apiClient.delete<ApiSuccessResponse<Property>>(`/properties/${id}`);
    return data;
  },
};
