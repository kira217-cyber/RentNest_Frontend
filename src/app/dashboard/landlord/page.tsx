"use client";

import { Building2, CheckCircle2, ClipboardList, Clock, Home } from "lucide-react";
import Link from "next/link";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { Skeleton } from "@/components/common/skeleton";
import { StatCard } from "@/components/dashboard/stat-card";
import { LandlordRequestCard } from "@/components/landlord/landlord-request-card";
import { useMyProperties } from "@/hooks/use-landlord-properties";
import { useLandlordRequests } from "@/hooks/use-rentals";
import { getApiErrorMessage } from "@/lib/error";

export default function LandlordOverviewPage() {
  const {
    data: properties,
    isLoading: propertiesLoading,
    isError: propertiesError,
    error: propertiesErrorObj,
    refetch: refetchProperties,
  } = useMyProperties();
  const {
    data: requests,
    isLoading: requestsLoading,
    isError: requestsError,
    error: requestsErrorObj,
    refetch: refetchRequests,
  } = useLandlordRequests();

  const isLoading = propertiesLoading || requestsLoading;
  const isError = propertiesError || requestsError;

  const stats = {
    totalProperties: properties?.length ?? 0,
    available: properties?.filter((p) => p.status === "AVAILABLE").length ?? 0,
    rented: properties?.filter((p) => p.status === "RENTED").length ?? 0,
    pendingRequests: requests?.filter((r) => r.status === "PENDING").length ?? 0,
    activeRequests:
      requests?.filter((r) => r.status === "APPROVED" || r.status === "ACTIVE").length ?? 0,
  };

  const pendingRequests = requests?.filter((r) => r.status === "PENDING").slice(0, 3) ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Landlord Overview</h1>
        <p className="mt-1 text-muted-foreground">Your properties and rental requests at a glance.</p>
      </div>

      {isLoading && (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-28" />
          ))}
        </div>
      )}

      {isError && (
        <ErrorState
          message={getApiErrorMessage(propertiesErrorObj ?? requestsErrorObj)}
          onRetry={() => {
            refetchProperties();
            refetchRequests();
          }}
        />
      )}

      {!isLoading && !isError && (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
            <StatCard label="Total Properties" value={stats.totalProperties} icon={Building2} />
            <StatCard label="Available" value={stats.available} icon={Home} tone="success" />
            <StatCard label="Rented" value={stats.rented} icon={Home} tone="info" />
            <StatCard label="Pending Requests" value={stats.pendingRequests} icon={Clock} tone="warning" />
            <StatCard label="Approved / Active" value={stats.activeRequests} icon={CheckCircle2} tone="info" />
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Pending Requests</h2>
              <Link
                href="/dashboard/landlord/requests"
                className="text-sm font-medium text-primary hover:underline"
              >
                View all
              </Link>
            </div>

            {pendingRequests.length === 0 ? (
              <EmptyState
                icon={ClipboardList}
                title="No pending requests"
                description="New rental requests for your properties will show up here."
              />
            ) : (
              <div className="space-y-4">
                {pendingRequests.map((rental) => (
                  <LandlordRequestCard key={rental.id} rental={rental} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
