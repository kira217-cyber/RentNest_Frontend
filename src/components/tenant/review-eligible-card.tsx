"use client";

import { MapPin, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/common/badge";
import { Button } from "@/components/common/button";
import { Skeleton } from "@/components/common/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { usePropertyReviews } from "@/hooks/use-reviews";
import { formatDate } from "@/lib/utils";
import type { RentalRequest } from "@/types/rental";
import { ReviewFormModal } from "./review-form-modal";

export function ReviewEligibleCard({ rental }: { rental: RentalRequest }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const { data: reviews, isLoading } = usePropertyReviews(rental.propertyId);
  const myReview = reviews?.find((review) => review.tenantId === user?.id);

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link
            href={`/properties/${rental.propertyId}`}
            className="text-base font-semibold text-foreground hover:text-primary"
          >
            {rental.property.title}
          </Link>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4" aria-hidden="true" />
            {rental.property.location}
          </p>
        </div>
        {myReview && <Badge tone="success">Reviewed</Badge>}
      </div>

      <div className="mt-4">
        {isLoading ? (
          <Skeleton className="h-16 w-full" />
        ) : myReview ? (
          <div className="rounded-lg bg-background p-3">
            <div className="flex items-center gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="size-4"
                  fill={index < myReview.rating ? "currentColor" : "none"}
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{myReview.comment}</p>
            <p className="mt-1 text-xs text-muted">Reviewed on {formatDate(myReview.createdAt)}</p>
          </div>
        ) : (
          <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
            Leave a Review
          </Button>
        )}
      </div>

      <ReviewFormModal
        open={open}
        onClose={() => setOpen(false)}
        propertyId={rental.propertyId}
        propertyTitle={rental.property.title}
      />
    </div>
  );
}
