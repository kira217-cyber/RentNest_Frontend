import type { BadgeTone } from "@/components/common/badge";
import type { PaymentStatus } from "@/types/payment";
import type { PropertyStatus } from "@/types/property";
import type { RentalStatus } from "@/types/rental";
import type { UserStatus } from "@/types/user";

export const RENTAL_STATUS_TONE: Record<RentalStatus, BadgeTone> = {
  PENDING: "warning",
  APPROVED: "info",
  REJECTED: "danger",
  ACTIVE: "success",
  COMPLETED: "neutral",
  CANCELLED: "danger",
};

export const PROPERTY_STATUS_TONE: Record<PropertyStatus, BadgeTone> = {
  AVAILABLE: "success",
  RENTED: "info",
  UNAVAILABLE: "neutral",
};

export const PAYMENT_STATUS_TONE: Record<PaymentStatus, BadgeTone> = {
  PENDING: "warning",
  COMPLETED: "success",
  FAILED: "danger",
  CANCELLED: "neutral",
};

export const USER_STATUS_TONE: Record<UserStatus, BadgeTone> = {
  ACTIVE: "success",
  BANNED: "danger",
};

export function toTitleCase(value: string) {
  return value.charAt(0) + value.slice(1).toLowerCase();
}
