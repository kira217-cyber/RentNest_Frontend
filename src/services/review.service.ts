import { apiClient } from "@/lib/api-client";
import type { ApiSuccessResponse } from "@/types/api";
import type { CreateReviewPayload, Review } from "@/types/review";

export const ReviewService = {
  async create(payload: CreateReviewPayload) {
    const { data } = await apiClient.post<ApiSuccessResponse<Review>>("/reviews", payload);
    return data;
  },

  async getByProperty(propertyId: string) {
    const { data } = await apiClient.get<ApiSuccessResponse<Review[]>>(
      `/reviews/property/${propertyId}`,
    );
    return data;
  },
};
