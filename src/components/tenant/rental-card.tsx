"use client";

import { Calendar, MapPin, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/common/badge";
import { LinkButton, Button } from "@/components/common/button";
import { isRentalPayable, isRentalReviewable } from "@/lib/rental-eligibility";
import { RENTAL_STATUS_TONE, toTitleCase } from "@/lib/status";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { RentalRequest } from "@/types/rental";
import { ReviewFormModal } from "./review-form-modal";

export function RentalCard({ rental }: { rental: RentalRequest }) {
  const [reviewOpen, setReviewOpen] = useState(false);
  const payable = isRentalPayable(rental);
  const reviewable = isRentalReviewable(rental);

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
        <Badge tone={RENTAL_STATUS_TONE[rental.status]}>{toTitleCase(rental.status)}</Badge>
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Calendar className="size-4" aria-hidden="true" />
          Move-in: {formatDate(rental.moveInDate)}
        </span>
        {rental.moveOutDate && (
          <span className="flex items-center gap-1.5">
            <Calendar className="size-4" aria-hidden="true" />
            Move-out: {formatDate(rental.moveOutDate)}
          </span>
        )}
        <span className="font-medium text-foreground">{formatCurrency(rental.property.price)}/mo</span>
      </div>

      {rental.landlordNote && (
        <p className="mt-3 flex items-start gap-1.5 rounded-lg bg-background p-3 text-sm text-muted-foreground">
          <MessageSquare className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>
            <span className="font-medium text-foreground">Landlord note: </span>
            {rental.landlordNote}
          </span>
        </p>
      )}

      {(payable || reviewable) && (
        <div className="mt-4 flex flex-wrap gap-3 border-t border-border pt-4">
          {payable && (
            <LinkButton href={`/dashboard/tenant/requests/${rental.id}/pay`} size="sm">
              Pay Now
            </LinkButton>
          )}
          {reviewable && (
            <Button size="sm" variant="outline" onClick={() => setReviewOpen(true)}>
              Leave a Review
            </Button>
          )}
        </div>
      )}

      <ReviewFormModal
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        propertyId={rental.propertyId}
        propertyTitle={rental.property.title}
      />
    </div>
  );
}
