"use client";

import { Star, MessageSquare } from "lucide-react";
import { EmptyState } from "@/components/common/empty-state";
import { Skeleton } from "@/components/common/skeleton";
import { usePropertyReviews } from "@/hooks/use-reviews";
import { formatDate } from "@/lib/utils";

export function PropertyReviews({ propertyId }: { propertyId: string }) {
  const { data: reviews, isLoading } = usePropertyReviews(propertyId);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 2 }).map((_, index) => (
          <Skeleton key={index} className="h-20 w-full" />
        ))}
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <EmptyState
        icon={MessageSquare}
        title="No reviews yet"
        description="Be the first tenant to review this property after your stay."
      />
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="rounded-xl border border-border bg-surface p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">{review.tenant?.name ?? "Tenant"}</p>
            <div className="flex items-center gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="size-4"
                  fill={index < review.rating ? "currentColor" : "none"}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
          <p className="mt-2 text-xs text-muted">{formatDate(review.createdAt)}</p>
        </div>
      ))}
    </div>
  );
}
