"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/error";
import { queryKeys } from "@/lib/query-keys";
import {
  CategoryService,
  type CreateCategoryPayload,
  type UpdateCategoryPayload,
} from "@/services/category.service";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCategoryPayload) => CategoryService.create(payload),
    onSuccess: () => {
      toast.success("Category created successfully.");
      queryClient.invalidateQueries({ queryKey: queryKeys.categories });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useUpdateCategory(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateCategoryPayload) => CategoryService.update(id, payload),
    onSuccess: () => {
      toast.success("Category updated successfully.");
      queryClient.invalidateQueries({ queryKey: queryKeys.categories });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => CategoryService.remove(id),
    onSuccess: () => {
      toast.success("Category deleted successfully.");
      queryClient.invalidateQueries({ queryKey: queryKeys.categories });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
