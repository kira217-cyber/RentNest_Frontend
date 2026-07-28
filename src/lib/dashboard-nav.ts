import {
  Building2,
  ClipboardList,
  CreditCard,
  Folder,
  LayoutDashboard,
  Star,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { UserRole } from "@/types/user";

export type DashboardNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const DASHBOARD_NAV: Record<UserRole, DashboardNavItem[]> = {
  TENANT: [
    { href: "/dashboard/tenant", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/tenant/rentals", label: "My Rentals", icon: ClipboardList },
    { href: "/dashboard/tenant/payments", label: "Payments", icon: CreditCard },
    { href: "/dashboard/tenant/reviews", label: "Reviews", icon: Star },
  ],
  LANDLORD: [
    { href: "/dashboard/landlord", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/landlord/properties", label: "Properties", icon: Building2 },
    { href: "/dashboard/landlord/requests", label: "Requests", icon: ClipboardList },
  ],
  ADMIN: [
    { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/admin/users", label: "Users", icon: Users },
    { href: "/dashboard/admin/categories", label: "Categories", icon: Folder },
    { href: "/dashboard/admin/properties", label: "Properties", icon: Building2 },
    { href: "/dashboard/admin/rentals", label: "Rentals", icon: ClipboardList },
  ],
};
