import type { Property } from "./property";
import type { RentalRequest } from "./rental";
import type { Review } from "./review";
import type { User } from "./user";

export type AdminDashboardStats = {
  overview: {
    totalUsers: number;
    totalTenants: number;
    totalLandlords: number;
    totalProperties: number;
    availableProperties: number;
    rentedProperties: number;
    totalRentals: number;
    pendingRentals: number;
    approvedRentals: number;
    activeRentals: number;
    completedRentals: number;
    totalPayments: number;
    completedPayments: number;
    totalRevenue: number;
  };
  recentUsers: Pick<User, "id" | "name" | "email" | "role" | "status" | "createdAt">[];
  recentRentals: RentalRequest[];
};

export type AdminUserQuery = {
  page?: number;
  limit?: number;
  search?: string;
  role?: "TENANT" | "LANDLORD" | "ADMIN";
  status?: "ACTIVE" | "BANNED";
};

export type AdminPropertyQuery = {
  page?: number;
  limit?: number;
  search?: string;
  location?: string;
  categoryId?: string;
  status?: string;
  landlordId?: string;
};

export type AdminRentalQuery = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  tenantId?: string;
  propertyId?: string;
};

export type AdminPropertyDetail = Property & {
  landlord: Pick<User, "id" | "name" | "email" | "phone" | "status">;
  rentalRequests: RentalRequest[];
  reviews: Review[];
};

export type AdminRentalDetail = RentalRequest & {
  tenant: Pick<User, "id" | "name" | "email" | "phone" | "photo" | "status" | "createdAt">;
};
