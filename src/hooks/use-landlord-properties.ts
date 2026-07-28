"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/error";
import { queryKeys } from "@/lib/query-keys";
import { PropertyService } from "@/services/property.service";
import type { CreatePropertyPayload, UpdatePropertyPayload } from "@/types/property";

export function useMyProperties() {
  return useQuery({
    queryKey: queryKeys.myProperties,
    queryFn: async () => (await PropertyService.getMyProperties()).data,
  });
}

export function useCreateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePropertyPayload) => PropertyService.create(payload),
    onSuccess: () => {
      toast.success("Property created successfully.");
      queryClient.invalidateQueries({ queryKey: queryKeys.myProperties });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useUpdateProperty(propertyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdatePropertyPayload) => PropertyService.update(propertyId, payload),
    onSuccess: () => {
      toast.success("Property updated successfully.");
      queryClient.invalidateQueries({ queryKey: queryKeys.myProperties });
      queryClient.invalidateQueries({ queryKey: queryKeys.property(propertyId) });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useDeleteProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (propertyId: string) => PropertyService.remove(propertyId),
    onSuccess: () => {
      toast.success("Property deleted successfully.");
      queryClient.invalidateQueries({ queryKey: queryKeys.myProperties });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
