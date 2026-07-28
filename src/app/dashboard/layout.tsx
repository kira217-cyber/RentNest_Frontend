import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { RoleGuard } from "@/components/dashboard/role-guard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard>
      <DashboardShell>{children}</DashboardShell>
    </RoleGuard>
  );
}
