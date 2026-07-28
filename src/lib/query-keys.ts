import type { AdminPropertyQuery, AdminRentalQuery, AdminUserQuery } from "@/types/admin";
import type { PropertyFilters } from "@/types/property";

export const queryKeys = {
  auth: ["auth", "me"] as const,
  categories: ["categories"] as const,
  category: (id: string) => ["categories", id] as const,
  properties: (filters?: PropertyFilters) => ["properties", filters ?? {}] as const,
  property: (id: string) => ["properties", id] as const,
  myProperties: ["landlord", "properties"] as const,
  propertyReviews: (propertyId: string) => ["reviews", "property", propertyId] as const,
  tenantRentals: ["tenant", "rentals"] as const,
  rental: (id: string) => ["rentals", id] as const,
  landlordRequests: ["landlord", "requests"] as const,
  payments: ["tenant", "payments"] as const,
  payment: (id: string) => ["payments", id] as const,
  adminDashboard: ["admin", "dashboard"] as const,
  adminUsers: (query?: AdminUserQuery) => ["admin", "users", query ?? {}] as const,
  adminProperties: (query?: AdminPropertyQuery) => ["admin", "properties", query ?? {}] as const,
  adminProperty: (id: string) => ["admin", "properties", id] as const,
  adminRentals: (query?: AdminRentalQuery) => ["admin", "rentals", query ?? {}] as const,
  adminRental: (id: string) => ["admin", "rentals", id] as const,
};
