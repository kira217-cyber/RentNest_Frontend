"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/error";
import { queryKeys } from "@/lib/query-keys";
import { ReviewService } from "@/services/review.service";
import type { CreateReviewPayload } from "@/types/review";

export function usePropertyReviews(propertyId: string) {
  return useQuery({
    queryKey: queryKeys.propertyReviews(propertyId),
    queryFn: async () => (await ReviewService.getByProperty(propertyId)).data,
    enabled: Boolean(propertyId),
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateReviewPayload) => ReviewService.create(payload),
    onSuccess: (_response, variables) => {
      toast.success("Review submitted successfully.");
      queryClient.invalidateQueries({ queryKey: queryKeys.propertyReviews(variables.propertyId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.tenantRentals });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
