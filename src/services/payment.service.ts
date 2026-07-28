import { apiClient } from "@/lib/api-client";
import type { ApiSuccessResponse } from "@/types/api";
import type {
  ConfirmPaymentPayload,
  CreatePaymentPayload,
  CreatePaymentResponse,
  Payment,
} from "@/types/payment";

export const PaymentService = {
  async create(payload: CreatePaymentPayload) {
    const { data } = await apiClient.post<ApiSuccessResponse<CreatePaymentResponse>>(
      "/payments/create",
      payload,
    );
    return data;
  },

  async confirm(payload: ConfirmPaymentPayload) {
    const { data } = await apiClient.post<ApiSuccessResponse<Payment>>(
      "/payments/confirm",
      payload,
    );
    return data;
  },

  async getMyPayments() {
    const { data } = await apiClient.get<ApiSuccessResponse<Payment[]>>("/payments");
    return data;
  },

  async getOne(id: string) {
    const { data } = await apiClient.get<ApiSuccessResponse<Payment>>(`/payments/${id}`);
    return data;
  },
};
