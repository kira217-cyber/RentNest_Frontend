"use client";

import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/common/button";
import { Input } from "@/components/forms/input";
import { Select } from "@/components/forms/select";
import { useCategories } from "@/hooks/use-categories";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useQueryParams } from "@/hooks/use-query-params";

const BEDROOM_OPTIONS = [1, 2, 3, 4, 5];

export function PropertyFilters() {
  const { params, setParams, clearParams } = useQueryParams();
  const { data: categories } = useCategories();

  const [search, setSearch] = useState(params.search ?? "");
  const [location, setLocation] = useState(params.location ?? "");
  const [minPrice, setMinPrice] = useState(params.minPrice ?? "");
  const [maxPrice, setMaxPrice] = useState(params.maxPrice ?? "");

  const debouncedSearch = useDebouncedValue(search);
  const debouncedLocation = useDebouncedValue(location);
  const debouncedMinPrice = useDebouncedValue(minPrice);
  const debouncedMaxPrice = useDebouncedValue(maxPrice);

  useEffect(() => {
    setParams(
      {
        search: debouncedSearch,
        location: debouncedLocation,
        minPrice: debouncedMinPrice,
        maxPrice: debouncedMaxPrice,
      },
      { resetPage: true },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, debouncedLocation, debouncedMinPrice, debouncedMaxPrice]);

  const hasActiveFilters = Object.keys(params).some((key) => key !== "page");

  function handleClear() {
    setSearch("");
    setLocation("");
    setMinPrice("");
    setMaxPrice("");
    clearParams();
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-4 sm:p-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 rounded-lg border border-border px-3">
            <Search className="size-4 shrink-0 text-muted" aria-hidden="true" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by title or description"
              aria-label="Search properties"
              className="border-0 px-0 focus:ring-0"
            />
          </div>
        </div>

        <Input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Location"
          aria-label="Filter by location"
        />

        <Select
          aria-label="Filter by category"
          value={params.categoryId ?? ""}
          onChange={(event) => setParams({ categoryId: event.target.value }, { resetPage: true })}
        >
          <option value="">All categories</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>

        <Input
          type="number"
          min={0}
          value={minPrice}
          onChange={(event) => setMinPrice(event.target.value)}
          placeholder="Min price"
          aria-label="Minimum price"
        />

        <Input
          type="number"
          min={0}
          value={maxPrice}
          onChange={(event) => setMaxPrice(event.target.value)}
          placeholder="Max price"
          aria-label="Maximum price"
        />

        <Select
          aria-label="Filter by bedrooms"
          value={params.bedrooms ?? ""}
          onChange={(event) => setParams({ bedrooms: event.target.value }, { resetPage: true })}
        >
          <option value="">Any bedrooms</option>
          {BEDROOM_OPTIONS.map((count) => (
            <option key={count} value={count}>
              {count}+ bedroom{count > 1 ? "s" : ""}
            </option>
          ))}
        </Select>

        <Select
          aria-label="Filter by availability"
          value={params.status ?? ""}
          onChange={(event) => setParams({ status: event.target.value }, { resetPage: true })}
        >
          <option value="">Any availability</option>
          <option value="AVAILABLE">Available</option>
          <option value="RENTED">Rented</option>
          <option value="UNAVAILABLE">Unavailable</option>
        </Select>
      </div>

      {hasActiveFilters && (
        <div className="mt-4 flex justify-end">
          <Button variant="ghost" size="sm" onClick={handleClear}>
            <X className="size-4" aria-hidden="true" />
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
