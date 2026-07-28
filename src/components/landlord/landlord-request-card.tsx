"use client";

import { Calendar, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/common/badge";
import { Button } from "@/components/common/button";
import { RENTAL_STATUS_TONE, toTitleCase } from "@/lib/status";
import { formatDate, formatDateTime } from "@/lib/utils";
import type { RentalRequest } from "@/types/rental";
import { RequestActionModal } from "./request-action-modal";

export function LandlordRequestCard({ rental }: { rental: RentalRequest }) {
  const [action, setAction] = useState<"APPROVED" | "REJECTED" | null>(null);

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link
            href={`/properties/${rental.propertyId}`}
            className="font-semibold text-foreground hover:text-primary"
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

      <div className="mt-4 grid grid-cols-1 gap-4 border-t border-border pt-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase text-muted">Tenant</p>
          <p className="mt-1 text-sm font-medium text-foreground">{rental.tenant?.name}</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Mail className="size-3.5" aria-hidden="true" />
            {rental.tenant?.email}
          </p>
          {rental.tenant?.phone && (
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <Phone className="size-3.5" aria-hidden="true" />
              {rental.tenant.phone}
            </p>
          )}
        </div>

        <div>
          <p className="text-xs font-medium uppercase text-muted">Dates</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar className="size-3.5" aria-hidden="true" />
            Move-in: {formatDate(rental.moveInDate)}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Requested: {formatDateTime(rental.createdAt)}
          </p>
        </div>
      </div>

      {rental.message && (
        <p className="mt-3 rounded-lg bg-background p-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Message: </span>
          {rental.message}
        </p>
      )}

      {rental.status === "PENDING" && (
        <div className="mt-4 flex gap-3 border-t border-border pt-4">
          <Button size="sm" onClick={() => setAction("APPROVED")}>
            Approve
          </Button>
          <Button size="sm" variant="destructive" onClick={() => setAction("REJECTED")}>
            Reject
          </Button>
        </div>
      )}

      {action && (
        <RequestActionModal
          open={Boolean(action)}
          onClose={() => setAction(null)}
          rentalId={rental.id}
          action={action}
          propertyTitle={rental.property.title}
        />
      )}
    </div>
  );
}
