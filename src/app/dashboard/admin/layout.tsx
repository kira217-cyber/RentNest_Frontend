import { RoleGuard } from "@/components/dashboard/role-guard";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return <RoleGuard allowedRoles={["ADMIN"]}>{children}</RoleGuard>;
}
