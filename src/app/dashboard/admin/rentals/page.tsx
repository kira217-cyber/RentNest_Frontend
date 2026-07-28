"use client";

import { ClipboardList, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/common/badge";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { Pagination } from "@/components/common/pagination";
import { TableRowSkeleton } from "@/components/common/skeleton";
import { Input } from "@/components/forms/input";
import { Select } from "@/components/forms/select";
import { useAdminRentals } from "@/hooks/use-admin";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useQueryParams } from "@/hooks/use-query-params";
import { getApiErrorMessage } from "@/lib/error";
import { RENTAL_STATUS_TONE, toTitleCase } from "@/lib/status";
import { formatDate } from "@/lib/utils";

export default function AdminRentalsPage() {
  const { params, setParams } = useQueryParams();
  const [search, setSearch] = useState(params.search ?? "");
  const debouncedSearch = useDebouncedValue(search);
  const page = Number(params.page) || 1;

  const { data, isLoading, isError, error, refetch, isFetching } = useAdminRentals({
    page,
    limit: 10,
    search: debouncedSearch || undefined,
    status: params.status || undefined,
  });

  function handleSearchChange(value: string) {
    setSearch(value);
    setParams({ search: value }, { resetPage: true });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Rentals Moderation</h1>
        <p className="mt-1 text-muted-foreground">Inspect all rental requests on the platform.</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 sm:col-span-2">
          <Search className="size-4 shrink-0 text-muted" aria-hidden="true" />
          <Input
            value={search}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder="Search tenant, property, or location"
            aria-label="Search rentals"
            className="border-0 px-0 focus:ring-0"
          />
        </div>

        <Select
          aria-label="Filter by status"
          value={params.status ?? ""}
          onChange={(event) => setParams({ status: event.target.value }, { resetPage: true })}
        >
          <option value="">Any status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
          <option value="ACTIVE">Active</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </Select>
      </div>

      {isError && <ErrorState message={getApiErrorMessage(error)} onRetry={() => refetch()} />}

      {!isError && (
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-160 text-left text-sm">
            <thead className="border-b border-border bg-background text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Property</th>
                <th className="px-4 py-3 font-medium">Tenant</th>
                <th className="px-4 py-3 font-medium">Move-in</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className={`divide-y divide-border ${isFetching ? "opacity-60" : ""}`}>
              {isLoading &&
                Array.from({ length: 5 }).map((_, index) => <TableRowSkeleton key={index} columns={4} />)}

              {!isLoading && data?.data.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-10">
                    <EmptyState icon={ClipboardList} title="No rentals found" description="Try a different search or filter." />
                  </td>
                </tr>
              )}

              {!isLoading &&
                data?.data.map((rental) => (
                  <tr key={rental.id}>
                    <td className="px-4 py-3 font-medium text-foreground">
                      <Link href={`/dashboard/admin/rentals/${rental.id}`} className="hover:text-primary">
                        {rental.property.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{rental.tenant?.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{formatDate(rental.moveInDate)}</td>
                    <td className="px-4 py-3">
                      <Badge tone={RENTAL_STATUS_TONE[rental.status]}>{toTitleCase(rental.status)}</Badge>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {!isLoading && !isError && data?.meta && data.meta.totalPage && data.meta.totalPage > 1 && (
        <Pagination
          page={page}
          totalPage={data.meta.totalPage}
          onPageChange={(nextPage) => setParams({ page: nextPage })}
        />
      )}
    </div>
  );
}
