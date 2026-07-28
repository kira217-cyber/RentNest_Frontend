import { RoleGuard } from "@/components/dashboard/role-guard";

export default function LandlordDashboardLayout({ children }: { children: React.ReactNode }) {
  return <RoleGuard allowedRoles={["LANDLORD"]}>{children}</RoleGuard>;
}
