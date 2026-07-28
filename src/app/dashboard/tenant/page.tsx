"use client";

import { CheckCircle2, Clock, CreditCard, KeyRound, ListChecks } from "lucide-react";
import Link from "next/link";
import { ErrorState } from "@/components/common/error-state";
import { EmptyState } from "@/components/common/empty-state";
import { Skeleton } from "@/components/common/skeleton";
import { StatCard } from "@/components/dashboard/stat-card";
import { RentalCard } from "@/components/tenant/rental-card";
import { useTenantRentals } from "@/hooks/use-rentals";
import { getApiErrorMessage } from "@/lib/error";

export default function TenantOverviewPage() {
  const { data: rentals, isLoading, isError, error, refetch } = useTenantRentals();

  const stats = {
    total: rentals?.length ?? 0,
    pending: rentals?.filter((r) => r.status === "PENDING").length ?? 0,
    approved: rentals?.filter((r) => r.status === "APPROVED").length ?? 0,
    active: rentals?.filter((r) => r.status === "ACTIVE" || r.status === "COMPLETED").length ?? 0,
  };

  const recentRentals = rentals?.slice(0, 3) ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Tenant Overview</h1>
        <p className="mt-1 text-muted-foreground">Track your rental requests and payments.</p>
      </div>

      {isLoading && (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-28" />
          ))}
        </div>
      )}

      {isError && <ErrorState message={getApiErrorMessage(error)} onRetry={() => refetch()} />}

      {!isLoading && !isError && (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard label="Total Requests" value={stats.total} icon={ListChecks} />
            <StatCard label="Pending" value={stats.pending} icon={Clock} tone="warning" />
            <StatCard label="Approved" value={stats.approved} icon={CheckCircle2} tone="info" />
            <StatCard label="Active / Completed" value={stats.active} icon={KeyRound} tone="success" />
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Recent Requests</h2>
              <Link
                href="/dashboard/tenant/rentals"
                className="text-sm font-medium text-primary hover:underline"
              >
                View all
              </Link>
            </div>

            {recentRentals.length === 0 ? (
              <EmptyState
                icon={CreditCard}
                title="No rental requests yet"
                description="Browse properties and submit your first rental request."
                action={
                  <Link href="/properties" className="text-sm font-medium text-primary hover:underline">
                    Browse Properties
                  </Link>
                }
              />
            ) : (
              <div className="space-y-4">
                {recentRentals.map((rental) => (
                  <RentalCard key={rental.id} rental={rental} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
