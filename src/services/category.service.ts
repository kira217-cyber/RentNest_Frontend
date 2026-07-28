import { apiClient } from "@/lib/api-client";
import type { ApiSuccessResponse } from "@/types/api";
import type { Category } from "@/types/category";

export type CreateCategoryPayload = {
  name: string;
  description?: string;
  isActive?: boolean;
};

export type UpdateCategoryPayload = Partial<CreateCategoryPayload>;

export const CategoryService = {
  async getAll() {
    const { data } = await apiClient.get<ApiSuccessResponse<Category[]>>("/categories");
    return data;
  },

  async create(payload: CreateCategoryPayload) {
    const { data } = await apiClient.post<ApiSuccessResponse<Category>>("/categories", payload);
    return data;
  },

  async update(id: string, payload: UpdateCategoryPayload) {
    const { data } = await apiClient.patch<ApiSuccessResponse<Category>>(
      `/categories/${id}`,
      payload,
    );
    return data;
  },

  async remove(id: string) {
    const { data } = await apiClient.delete<ApiSuccessResponse<Category>>(`/categories/${id}`);
    return data;
  },
};
