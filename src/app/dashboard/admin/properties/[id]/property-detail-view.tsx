"use client";

import { Mail, MapPin, Phone, Star } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/common/badge";
import { ErrorState } from "@/components/common/error-state";
import { Skeleton } from "@/components/common/skeleton";
import { useAdminProperty } from "@/hooks/use-admin";
import { getApiErrorMessage } from "@/lib/error";
import { PROPERTY_STATUS_TONE, RENTAL_STATUS_TONE, toTitleCase } from "@/lib/status";
import { formatCurrency, formatDate } from "@/lib/utils";

export function AdminPropertyDetailView({ propertyId }: { propertyId: string }) {
  const { data: property, isLoading, isError, error, refetch } = useAdminProperty(propertyId);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (isError || !property) {
    return <ErrorState message={getApiErrorMessage(error)} onRetry={() => refetch()} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard/admin/properties" className="text-sm text-primary hover:underline">
          &larr; Back to properties
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold text-foreground">{property.title}</h1>
          <Badge tone={PROPERTY_STATUS_TONE[property.status]}>{toTitleCase(property.status)}</Badge>
        </div>
        <p className="mt-1 flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="size-4" aria-hidden="true" />
          {property.location}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border border-border bg-surface p-5">
            <h2 className="font-semibold text-foreground">Details</h2>
            <dl className="mt-3 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-muted-foreground">Price</dt>
                <dd className="font-medium text-foreground">{formatCurrency(property.price)}/mo</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Bedrooms</dt>
                <dd className="font-medium text-foreground">{property.bedrooms}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Bathrooms</dt>
                <dd className="font-medium text-foreground">{property.bathrooms}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Category</dt>
                <dd className="font-medium text-foreground">{property.category?.name ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Published</dt>
                <dd className="font-medium text-foreground">{property.isPublished ? "Yes" : "No"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Listed On</dt>
                <dd className="font-medium text-foreground">{formatDate(property.createdAt)}</dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-muted-foreground">{property.description}</p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-5">
            <h2 className="font-semibold text-foreground">
              Rental Requests ({property.rentalRequests.length})
            </h2>
            <div className="mt-3 space-y-3">
              {property.rentalRequests.length === 0 && (
                <p className="text-sm text-muted-foreground">No rental requests for this property.</p>
              )}
              {property.rentalRequests.map((rental) => (
                <div key={rental.id} className="flex items-center justify-between rounded-lg bg-background p-3 text-sm">
                  <span className="text-foreground">{rental.tenant?.name}</span>
                  <Badge tone={RENTAL_STATUS_TONE[rental.status]}>{toTitleCase(rental.status)}</Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface p-5">
            <h2 className="font-semibold text-foreground">Reviews ({property.reviews.length})</h2>
            <div className="mt-3 space-y-3">
              {property.reviews.length === 0 && (
                <p className="text-sm text-muted-foreground">No reviews yet.</p>
              )}
              {property.reviews.map((review) => (
                <div key={review.id} className="rounded-lg bg-background p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{review.tenant?.name}</span>
                    <span className="flex items-center gap-1 text-amber-500">
                      <Star className="size-3.5" fill="currentColor" />
                      {review.rating}
                    </span>
                  </div>
                  <p className="mt-1 text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="rounded-xl border border-border bg-surface p-5">
          <h2 className="font-semibold text-foreground">Landlord</h2>
          <p className="mt-2 text-sm font-medium text-foreground">{property.landlord.name}</p>
          <div className="mt-2 space-y-1.5 text-sm text-muted-foreground">
            <p className="flex items-center gap-1.5">
              <Mail className="size-3.5" aria-hidden="true" />
              {property.landlord.email}
            </p>
            {property.landlord.phone && (
              <p className="flex items-center gap-1.5">
                <Phone className="size-3.5" aria-hidden="true" />
                {property.landlord.phone}
              </p>
            )}
          </div>
          <Badge tone={property.landlord.status === "ACTIVE" ? "success" : "danger"} className="mt-3">
            {toTitleCase(property.landlord.status)}
          </Badge>
        </aside>
      </div>
    </div>
  );
}
