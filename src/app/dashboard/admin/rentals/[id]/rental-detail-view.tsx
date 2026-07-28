"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/common/badge";
import { ErrorState } from "@/components/common/error-state";
import { Skeleton } from "@/components/common/skeleton";
import { useAdminRental } from "@/hooks/use-admin";
import { getApiErrorMessage } from "@/lib/error";
import { PAYMENT_STATUS_TONE, RENTAL_STATUS_TONE, toTitleCase } from "@/lib/status";
import { formatCurrency, formatDate, formatDateTime } from "@/lib/utils";

export function AdminRentalDetailView({ rentalId }: { rentalId: string }) {
  const { data: rental, isLoading, isError, error, refetch } = useAdminRental(rentalId);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (isError || !rental) {
    return <ErrorState message={getApiErrorMessage(error)} onRetry={() => refetch()} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard/admin/rentals" className="text-sm text-primary hover:underline">
          &larr; Back to rentals
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold text-foreground">{rental.property.title}</h1>
          <Badge tone={RENTAL_STATUS_TONE[rental.status]}>{toTitleCase(rental.status)}</Badge>
        </div>
        <p className="mt-1 flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="size-4" aria-hidden="true" />
          {rental.property.location}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border border-border bg-surface p-5">
            <h2 className="font-semibold text-foreground">Rental Details</h2>
            <dl className="mt-3 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-muted-foreground">Move-in</dt>
                <dd className="font-medium text-foreground">{formatDate(rental.moveInDate)}</dd>
              </div>
              {rental.moveOutDate && (
                <div>
                  <dt className="text-muted-foreground">Move-out</dt>
                  <dd className="font-medium text-foreground">{formatDate(rental.moveOutDate)}</dd>
                </div>
              )}
              <div>
                <dt className="text-muted-foreground">Requested</dt>
                <dd className="font-medium text-foreground">{formatDateTime(rental.createdAt)}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Rent</dt>
                <dd className="font-medium text-foreground">{formatCurrency(rental.property.price)}/mo</dd>
              </div>
            </dl>
            {rental.message && (
              <p className="mt-4 rounded-lg bg-background p-3 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Tenant message: </span>
                {rental.message}
              </p>
            )}
            {rental.landlordNote && (
              <p className="mt-3 rounded-lg bg-background p-3 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Landlord note: </span>
                {rental.landlordNote}
              </p>
            )}
          </div>

          {rental.payment && (
            <div className="rounded-xl border border-border bg-surface p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-foreground">Payment</h2>
                <Badge tone={PAYMENT_STATUS_TONE[rental.payment.status]}>
                  {toTitleCase(rental.payment.status)}
                </Badge>
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-muted-foreground">Amount</dt>
                  <dd className="font-medium text-foreground">{formatCurrency(rental.payment.amount)}</dd>
                </div>
                {rental.payment.paidAt && (
                  <div>
                    <dt className="text-muted-foreground">Paid At</dt>
                    <dd className="font-medium text-foreground">{formatDateTime(rental.payment.paidAt)}</dd>
                  </div>
                )}
              </dl>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-xl border border-border bg-surface p-5">
            <h2 className="font-semibold text-foreground">Tenant</h2>
            <p className="mt-2 text-sm font-medium text-foreground">{rental.tenant.name}</p>
            <div className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              <p className="flex items-center gap-1.5">
                <Mail className="size-3.5" aria-hidden="true" />
                {rental.tenant.email}
              </p>
              {rental.tenant.phone && (
                <p className="flex items-center gap-1.5">
                  <Phone className="size-3.5" aria-hidden="true" />
                  {rental.tenant.phone}
                </p>
              )}
            </div>
          </div>

          {rental.property.landlord && (
            <div className="rounded-xl border border-border bg-surface p-5">
              <h2 className="font-semibold text-foreground">Landlord</h2>
              <p className="mt-2 text-sm font-medium text-foreground">{rental.property.landlord.name}</p>
              <div className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                <p className="flex items-center gap-1.5">
                  <Mail className="size-3.5" aria-hidden="true" />
                  {rental.property.landlord.email}
                </p>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
