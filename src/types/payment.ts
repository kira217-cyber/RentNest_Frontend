import type { Property } from "./property";

export type PaymentProvider = "STRIPE" | "SSLCOMMERZ";

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED";

export type Payment = {
  id: string;
  rentalRequestId: string;
  amount: number;
  provider: PaymentProvider;
  status: PaymentStatus;
  transactionId?: string | null;
  stripeSessionId?: string | null;
  paymentIntentId?: string | null;
  paidAt?: string | null;
  failedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  rentalRequest?: {
    id: string;
    property: Property;
  };
};

export type CreatePaymentPayload = {
  rentalRequestId: string;
};

export type CreatePaymentResponse = {
  payment: Payment;
  checkoutUrl: string | null;
  sessionId: string;
};

export type ConfirmPaymentPayload = {
  sessionId: string;
};
