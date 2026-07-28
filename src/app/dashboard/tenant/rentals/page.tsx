"use client";

import { ClipboardList } from "lucide-react";
import Link from "next/link";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { Skeleton } from "@/components/common/skeleton";
import { RentalCard } from "@/components/tenant/rental-card";
import { useTenantRentals } from "@/hooks/use-rentals";
import { getApiErrorMessage } from "@/lib/error";

export default function TenantRentalsPage() {
  const { data: rentals, isLoading, isError, error, refetch } = useTenantRentals();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Rentals</h1>
        <p className="mt-1 text-muted-foreground">All your rental requests and their status.</p>
      </div>

      {isLoading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-40" />
          ))}
        </div>
      )}

      {isError && <ErrorState message={getApiErrorMessage(error)} onRetry={() => refetch()} />}

      {!isLoading && !isError && rentals?.length === 0 && (
        <EmptyState
          icon={ClipboardList}
          title="No rental requests yet"
          description="Browse properties and submit your first rental request."
          action={
            <Link href="/properties" className="text-sm font-medium text-primary hover:underline">
              Browse Properties
            </Link>
          }
        />
      )}

      {!isLoading && !isError && rentals && rentals.length > 0 && (
        <div className="space-y-4">
          {rentals.map((rental) => (
            <RentalCard key={rental.id} rental={rental} />
          ))}
        </div>
      )}
    </div>
  );
}
