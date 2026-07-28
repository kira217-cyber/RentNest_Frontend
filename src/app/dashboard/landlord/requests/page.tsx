"use client";

import { ClipboardList } from "lucide-react";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { Skeleton } from "@/components/common/skeleton";
import { LandlordRequestCard } from "@/components/landlord/landlord-request-card";
import { useLandlordRequests } from "@/hooks/use-rentals";
import { getApiErrorMessage } from "@/lib/error";

export default function LandlordRequestsPage() {
  const { data: requests, isLoading, isError, error, refetch } = useLandlordRequests();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Rental Requests</h1>
        <p className="mt-1 text-muted-foreground">Review and respond to incoming requests.</p>
      </div>

      {isLoading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-48" />
          ))}
        </div>
      )}

      {isError && <ErrorState message={getApiErrorMessage(error)} onRetry={() => refetch()} />}

      {!isLoading && !isError && requests?.length === 0 && (
        <EmptyState
          icon={ClipboardList}
          title="No requests yet"
          description="Incoming rental requests for your properties will appear here."
        />
      )}

      {!isLoading && !isError && requests && requests.length > 0 && (
        <div className="space-y-4">
          {requests.map((rental) => (
            <LandlordRequestCard key={rental.id} rental={rental} />
          ))}
        </div>
      )}
    </div>
  );
}
