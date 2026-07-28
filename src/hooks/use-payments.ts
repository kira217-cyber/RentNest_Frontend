"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/error";
import { queryKeys } from "@/lib/query-keys";
import { PaymentService } from "@/services/payment.service";
import type { ConfirmPaymentPayload, CreatePaymentPayload } from "@/types/payment";

export function useTenantPayments() {
  return useQuery({
    queryKey: queryKeys.payments,
    queryFn: async () => (await PaymentService.getMyPayments()).data,
  });
}

export function useCreatePaymentSession() {
  return useMutation({
    mutationFn: (payload: CreatePaymentPayload) => PaymentService.create(payload),
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useConfirmPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ConfirmPaymentPayload) => PaymentService.confirm(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tenantRentals });
      queryClient.invalidateQueries({ queryKey: queryKeys.payments });
    },
  });
}
