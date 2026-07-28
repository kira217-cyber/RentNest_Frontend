"use client";

import { Building2, Plus, Search } from "lucide-react";
import { useState } from "react";
import { LinkButton } from "@/components/common/button";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { Skeleton } from "@/components/common/skeleton";
import { Input } from "@/components/forms/input";
import { LandlordPropertyCard } from "@/components/landlord/landlord-property-card";
import { useMyProperties } from "@/hooks/use-landlord-properties";
import { getApiErrorMessage } from "@/lib/error";

export default function LandlordPropertiesPage() {
  const { data: properties, isLoading, isError, error, refetch } = useMyProperties();
  const [search, setSearch] = useState("");

  const filtered = properties?.filter((property) =>
    `${property.title} ${property.location}`.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Properties</h1>
          <p className="mt-1 text-muted-foreground">Manage your property listings.</p>
        </div>
        <LinkButton href="/dashboard/landlord/properties/new">
          <Plus className="size-4" aria-hidden="true" />
          Add Property
        </LinkButton>
      </div>

      {!isLoading && !isError && properties && properties.length > 0 && (
        <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3">
          <Search className="size-4 shrink-0 text-muted" aria-hidden="true" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search your properties"
            aria-label="Search your properties"
            className="border-0 px-0 focus:ring-0"
          />
        </div>
      )}

      {isLoading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-40" />
          ))}
        </div>
      )}

      {isError && <ErrorState message={getApiErrorMessage(error)} onRetry={() => refetch()} />}

      {!isLoading && !isError && properties?.length === 0 && (
        <EmptyState
          icon={Building2}
          title="No properties yet"
          description="Create your first listing to start receiving rental requests."
          action={
            <LinkButton href="/dashboard/landlord/properties/new" size="sm">
              Add Property
            </LinkButton>
          }
        />
      )}

      {!isLoading && !isError && filtered && filtered.length === 0 && properties && properties.length > 0 && (
        <EmptyState icon={Search} title="No matches" description="Try a different search term." />
      )}

      {!isLoading && !isError && filtered && filtered.length > 0 && (
        <div className="space-y-4">
          {filtered.map((property) => (
            <LandlordPropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
