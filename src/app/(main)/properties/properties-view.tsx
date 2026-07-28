"use client";

import { Building2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/common/container";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { Pagination } from "@/components/common/pagination";
import { PropertyCardSkeleton } from "@/components/common/skeleton";
import { PropertyFilters } from "@/components/properties/property-filters";
import { PropertyCard } from "@/components/properties/property-card";
import { useProperties } from "@/hooks/use-properties";
import { useQueryParams } from "@/hooks/use-query-params";
import { getApiErrorMessage } from "@/lib/error";
import type { PropertyStatus } from "@/types/property";

export function PropertiesView() {
  const searchParams = useSearchParams();
  const { setParams } = useQueryParams();

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || undefined;
  const location = searchParams.get("location") || undefined;
  const categoryId = searchParams.get("categoryId") || undefined;
  const status = (searchParams.get("status") as PropertyStatus | null) || undefined;
  const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined;
  const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined;
  const bedrooms = searchParams.get("bedrooms") ? Number(searchParams.get("bedrooms")) : undefined;

  const { data, isLoading, isError, error, refetch, isFetching } = useProperties({
    page,
    limit: 12,
    search,
    location,
    categoryId,
    status,
    minPrice,
    maxPrice,
    bedrooms,
  });

  return (
    <Container className="py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Browse Properties</h1>
        <p className="mt-1 text-muted-foreground">
          {data ? `${data.meta?.total ?? data.data.length} properties found` : "Loading properties…"}
        </p>
      </div>

      <div className="mb-8">
        <PropertyFilters />
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <PropertyCardSkeleton key={index} />
          ))}
        </div>
      )}

      {isError && <ErrorState message={getApiErrorMessage(error)} onRetry={() => refetch()} />}

      {!isLoading && !isError && data?.data.length === 0 && (
        <EmptyState
          icon={Building2}
          title="No properties match your filters"
          description="Try adjusting or clearing your filters to see more results."
        />
      )}

      {!isLoading && !isError && data && data.data.length > 0 && (
        <>
          <div
            className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ${isFetching ? "opacity-60" : ""}`}
          >
            {data.data.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {data.meta && data.meta.totalPage && data.meta.totalPage > 1 && (
            <div className="mt-10">
              <Pagination
                page={page}
                totalPage={data.meta.totalPage}
                onPageChange={(nextPage) => setParams({ page: nextPage })}
              />
            </div>
          )}
        </>
      )}
    </Container>
  );
}
