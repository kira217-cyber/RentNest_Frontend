"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { CategoryService } from "@/services/category.service";

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: async () => (await CategoryService.getAll()).data,
  });
}
