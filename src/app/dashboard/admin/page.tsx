"use client";

import { Building2, ClipboardList, CreditCard, Users } from "lucide-react";
import { ErrorState } from "@/components/common/error-state";
import { Skeleton } from "@/components/common/skeleton";
import { StatCard } from "@/components/dashboard/stat-card";
import { RentalsStatusChart } from "@/components/admin/rentals-status-chart";
import { UsersBreakdownChart } from "@/components/admin/users-breakdown-chart";
import { useAdminDashboard } from "@/hooks/use-admin";
import { getApiErrorMessage } from "@/lib/error";
import { formatCurrency } from "@/lib/utils";

export default function AdminOverviewPage() {
  const { data, isLoading, isError, error, refetch } = useAdminDashboard();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Overview</h1>
        <p className="mt-1 text-muted-foreground">Platform-wide statistics at a glance.</p>
      </div>

      {isLoading && (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-28" />
          ))}
        </div>
      )}

      {isError && <ErrorState message={getApiErrorMessage(error)} onRetry={() => refetch()} />}

      {!isLoading && !isError && data && (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard label="Total Users" value={data.overview.totalUsers} icon={Users} />
            <StatCard label="Tenants" value={data.overview.totalTenants} icon={Users} tone="info" />
            <StatCard label="Landlords" value={data.overview.totalLandlords} icon={Users} tone="info" />
            <StatCard label="Total Properties" value={data.overview.totalProperties} icon={Building2} />
            <StatCard
              label="Available Properties"
              value={data.overview.availableProperties}
              icon={Building2}
              tone="success"
            />
            <StatCard
              label="Rented Properties"
              value={data.overview.rentedProperties}
              icon={Building2}
              tone="info"
            />
            <StatCard
              label="Total Rentals"
              value={data.overview.totalRentals}
              icon={ClipboardList}
            />
            <StatCard
              label="Pending Rentals"
              value={data.overview.pendingRentals}
              icon={ClipboardList}
              tone="warning"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <StatCard
              label="Total Payments"
              value={data.overview.totalPayments}
              icon={CreditCard}
            />
            <StatCard
              label="Total Revenue"
              value={formatCurrency(data.overview.totalRevenue)}
              icon={CreditCard}
              tone="success"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <RentalsStatusChart overview={data.overview} />
            <UsersBreakdownChart overview={data.overview} />
          </div>
        </>
      )}
    </div>
  );
}
