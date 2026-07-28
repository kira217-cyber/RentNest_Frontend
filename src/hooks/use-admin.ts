"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/error";
import { queryKeys } from "@/lib/query-keys";
import { AdminService } from "@/services/admin.service";
import type { AdminPropertyQuery, AdminRentalQuery, AdminUserQuery } from "@/types/admin";
import type { UserStatus } from "@/types/user";

export function useAdminDashboard() {
  return useQuery({
    queryKey: queryKeys.adminDashboard,
    queryFn: async () => (await AdminService.getDashboard()).data,
  });
}

export function useAdminUsers(query: AdminUserQuery) {
  return useQuery({
    queryKey: queryKeys.adminUsers(query),
    queryFn: () => AdminService.getUsers(query),
    placeholderData: (previousData) => previousData,
  });
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: UserStatus }) =>
      AdminService.updateUserStatus(id, status),
    onSuccess: (_response, variables) => {
      toast.success(variables.status === "BANNED" ? "User banned." : "User unbanned.");
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.adminDashboard });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useAdminProperties(query: AdminPropertyQuery) {
  return useQuery({
    queryKey: queryKeys.adminProperties(query),
    queryFn: () => AdminService.getProperties(query),
    placeholderData: (previousData) => previousData,
  });
}

export function useAdminProperty(id: string) {
  return useQuery({
    queryKey: queryKeys.adminProperty(id),
    queryFn: async () => (await AdminService.getProperty(id)).data,
    enabled: Boolean(id),
  });
}

export function useAdminRentals(query: AdminRentalQuery) {
  return useQuery({
    queryKey: queryKeys.adminRentals(query),
    queryFn: () => AdminService.getRentals(query),
    placeholderData: (previousData) => previousData,
  });
}

export function useAdminRental(id: string) {
  return useQuery({
    queryKey: queryKeys.adminRental(id),
    queryFn: async () => (await AdminService.getRental(id)).data,
    enabled: Boolean(id),
  });
}
