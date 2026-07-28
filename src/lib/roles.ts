import type { UserRole } from "@/types/user";

export function dashboardPathForRole(role: UserRole) {
  if (role === "ADMIN") return "/dashboard/admin";
  if (role === "LANDLORD") return "/dashboard/landlord";
  return "/dashboard/tenant";
}
