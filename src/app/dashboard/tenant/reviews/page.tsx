"use client";

import { Star } from "lucide-react";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { Skeleton } from "@/components/common/skeleton";
import { ReviewEligibleCard } from "@/components/tenant/review-eligible-card";
import { useTenantRentals } from "@/hooks/use-rentals";
import { getApiErrorMessage } from "@/lib/error";
import { isRentalReviewable } from "@/lib/rental-eligibility";

export default function TenantReviewsPage() {
  const { data: rentals, isLoading, isError, error, refetch } = useTenantRentals();
  const eligibleRentals = rentals?.filter(isRentalReviewable) ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reviews</h1>
        <p className="mt-1 text-muted-foreground">
          Share your experience for properties you&apos;ve completed payment for.
        </p>
      </div>

      {isLoading && (
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <Skeleton key={index} className="h-32" />
          ))}
        </div>
      )}

      {isError && <ErrorState message={getApiErrorMessage(error)} onRetry={() => refetch()} />}

      {!isLoading && !isError && eligibleRentals.length === 0 && (
        <EmptyState
          icon={Star}
          title="Nothing to review yet"
          description="Once you've completed payment for an active rental, you can leave a review here."
        />
      )}

      {!isLoading && !isError && eligibleRentals.length > 0 && (
        <div className="space-y-4">
          {eligibleRentals.map((rental) => (
            <ReviewEligibleCard key={rental.id} rental={rental} />
          ))}
        </div>
      )}
    </div>
  );
}
