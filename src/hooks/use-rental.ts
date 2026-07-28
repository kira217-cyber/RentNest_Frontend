"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { RentalService } from "@/services/rental.service";

export function useRental(id: string) {
  return useQuery({
    queryKey: queryKeys.rental(id),
    queryFn: async () => (await RentalService.getOne(id)).data,
    enabled: Boolean(id),
  });
}
