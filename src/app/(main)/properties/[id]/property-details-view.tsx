"use client";

import { Bath, Bed, Mail, MapPin, Phone, Ruler, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/common/badge";
import { Container } from "@/components/common/container";
import { ErrorState } from "@/components/common/error-state";
import { Skeleton } from "@/components/common/skeleton";
import { PropertyCta } from "@/components/properties/property-cta";
import { PropertyGallery } from "@/components/properties/property-gallery";
import { PropertyReviews } from "@/components/properties/property-reviews";
import { useProperty } from "@/hooks/use-properties";
import { getApiErrorMessage } from "@/lib/error";
import { PROPERTY_STATUS_TONE, toTitleCase } from "@/lib/status";
import { formatCurrency } from "@/lib/utils";

export function PropertyDetailsView({ propertyId }: { propertyId: string }) {
  const { data: property, isLoading, isError, error, refetch } = useProperty(propertyId);

  if (isLoading) {
    return (
      <Container className="space-y-6 py-10">
        <Skeleton className="h-96 w-full rounded-xl" />
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
      </Container>
    );
  }

  if (isError || !property) {
    const status = (error as { response?: { status?: number } } | undefined)?.response?.status;
    return (
      <Container className="py-10">
        <ErrorState
          title={status === 404 ? "Property not found" : "Unable to load this property"}
          message={
            status === 404
              ? "This listing may have been removed or is no longer published."
              : getApiErrorMessage(error)
          }
          onRetry={status === 404 ? undefined : () => refetch()}
        />
        <div className="mt-4 text-center">
          <Link href="/properties" className="text-sm font-medium text-primary hover:underline">
            Back to all properties
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <PropertyGallery images={property.images} title={property.title} />

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={PROPERTY_STATUS_TONE[property.status]}>
                {toTitleCase(property.status)}
              </Badge>
              {property.category && <Badge tone="info">{property.category.name}</Badge>}
            </div>
            <h1 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
              {property.title}
            </h1>
            <p className="mt-1 flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="size-4" aria-hidden="true" />
              {property.location}
            </p>

            <div className="mt-4 flex flex-wrap gap-6 border-y border-border py-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Bed className="size-5 text-primary" aria-hidden="true" />
                {property.bedrooms} Bedrooms
              </span>
              <span className="flex items-center gap-2">
                <Bath className="size-5 text-primary" aria-hidden="true" />
                {property.bathrooms} Bathrooms
              </span>
              {property.area && (
                <span className="flex items-center gap-2">
                  <Ruler className="size-5 text-primary" aria-hidden="true" />
                  {property.area} sqft
                </span>
              )}
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-foreground">Description</h2>
              <p className="mt-2 whitespace-pre-line text-muted-foreground">
                {property.description}
              </p>
            </div>

            {property.amenities.length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-foreground">Amenities</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {property.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-foreground">Reviews</h2>
            <PropertyReviews propertyId={property.id} />
          </div>
        </div>

        <aside className="space-y-6 lg:col-span-1">
          <div className="rounded-xl border border-border bg-surface p-6">
            <p className="text-3xl font-bold text-foreground">
              {formatCurrency(property.price)}
              <span className="text-sm font-normal text-muted-foreground"> /month</span>
            </p>
            <div className="mt-5">
              <PropertyCta property={property} />
            </div>
          </div>

          {property.landlord && (
            <div className="rounded-xl border border-border bg-surface p-6">
              <h2 className="text-base font-semibold text-foreground">Listed by</h2>
              <div className="mt-3 flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <UserIcon className="size-5" aria-hidden="true" />
                </span>
                <p className="font-medium text-foreground">{property.landlord.name}</p>
              </div>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Mail className="size-4" aria-hidden="true" />
                  {property.landlord.email}
                </p>
                {property.landlord.phone && (
                  <p className="flex items-center gap-2">
                    <Phone className="size-4" aria-hidden="true" />
                    {property.landlord.phone}
                  </p>
                )}
              </div>
            </div>
          )}
        </aside>
      </div>
    </Container>
  );
}
