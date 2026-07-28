"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { PropertyService } from "@/services/property.service";
import type { PropertyFilters } from "@/types/property";

export function useProperties(filters: PropertyFilters = {}) {
  return useQuery({
    queryKey: queryKeys.properties(filters),
    queryFn: () => PropertyService.getAll(filters),
    placeholderData: (previousData) => previousData,
  });
}

export function useProperty(id: string) {
  return useQuery({
    queryKey: queryKeys.property(id),
    queryFn: async () => (await PropertyService.getOne(id)).data,
    enabled: Boolean(id),
  });
}
