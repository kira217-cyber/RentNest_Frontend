import { RoleGuard } from "@/components/dashboard/role-guard";

export default function TenantDashboardLayout({ children }: { children: React.ReactNode }) {
  return <RoleGuard allowedRoles={["TENANT"]}>{children}</RoleGuard>;
}
