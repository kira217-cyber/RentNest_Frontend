"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/error";
import { queryKeys } from "@/lib/query-keys";
import { RentalService } from "@/services/rental.service";
import type { CreateRentalPayload } from "@/types/rental";

export function useCreateRentalRequest(propertyId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateRentalPayload) => RentalService.create(payload),
    onSuccess: () => {
      toast.success("Rental request submitted successfully.");
      queryClient.invalidateQueries({ queryKey: queryKeys.tenantRentals });
      if (propertyId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.property(propertyId) });
      }
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useTenantRentals() {
  return useQuery({
    queryKey: queryKeys.tenantRentals,
    queryFn: async () => (await RentalService.getMyRentals()).data,
  });
}

export function useLandlordRequests() {
  return useQuery({
    queryKey: queryKeys.landlordRequests,
    queryFn: async () => (await RentalService.getLandlordRequests()).data,
  });
}
