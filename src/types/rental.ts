import type { Payment } from "./payment";
import type { Property } from "./property";
import type { User } from "./user";

export type RentalStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "ACTIVE"
  | "COMPLETED"
  | "CANCELLED";

export type RentalTenant = Pick<User, "id" | "name" | "email" | "phone">;

export type RentalRequest = {
  id: string;
  tenantId: string;
  propertyId: string;
  moveInDate: string;
  moveOutDate?: string | null;
  message?: string | null;
  status: RentalStatus;
  landlordNote?: string | null;
  approvedAt?: string | null;
  rejectedAt?: string | null;
  completedAt?: string | null;
  tenant?: RentalTenant;
  property: Property;
  payment?: Payment | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateRentalPayload = {
  propertyId: string;
  moveInDate: string;
  moveOutDate?: string;
  message?: string;
};

export type UpdateRentalStatusPayload = {
  status: "APPROVED" | "REJECTED";
  landlordNote?: string;
};
