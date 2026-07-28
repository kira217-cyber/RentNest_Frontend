"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { ReviewService } from "@/services/review.service";

export function usePropertyReviews(propertyId: string) {
  return useQuery({
    queryKey: queryKeys.propertyReviews(propertyId),
    queryFn: async () => (await ReviewService.getByProperty(propertyId)).data,
    enabled: Boolean(propertyId),
  });
}
