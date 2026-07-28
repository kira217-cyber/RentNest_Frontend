"use client";

import { Building2 } from "lucide-react";
import { Container } from "@/components/common/container";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { PropertyCardSkeleton } from "@/components/common/skeleton";
import { PropertyCard } from "@/components/properties/property-card";
import { useProperties } from "@/hooks/use-properties";
import { getApiErrorMessage } from "@/lib/error";

export function FeaturedProperties() {
  const { data, isLoading, isError, error, refetch } = useProperties({
    page: 1,
    limit: 6,
    status: "AVAILABLE",
  });

  return (
    <section className="py-16">
      <Container>
        <div className="mb-8 flex flex-col gap-2 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Featured Properties</h2>
          <p className="text-muted-foreground">
            Freshly listed homes available for rent right now.
          </p>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <PropertyCardSkeleton key={index} />
            ))}
          </div>
        )}

        {isError && (
          <ErrorState message={getApiErrorMessage(error)} onRetry={() => refetch()} />
        )}

        {!isLoading && !isError && data?.data.length === 0 && (
          <EmptyState
            icon={Building2}
            title="No properties available yet"
            description="Check back soon — new listings are added regularly."
          />
        )}

        {!isLoading && !isError && data && data.data.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.data.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
