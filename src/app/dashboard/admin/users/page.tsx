"use client";

import { Ban, CheckCircle2, Search, Users as UsersIcon } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/common/badge";
import { Button } from "@/components/common/button";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { Pagination } from "@/components/common/pagination";
import { TableRowSkeleton } from "@/components/common/skeleton";
import { Input } from "@/components/forms/input";
import { Select } from "@/components/forms/select";
import { BanUserDialog } from "@/components/admin/ban-user-dialog";
import { useAdminUsers } from "@/hooks/use-admin";
import { useAuth } from "@/hooks/use-auth";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useQueryParams } from "@/hooks/use-query-params";
import { getApiErrorMessage } from "@/lib/error";
import { USER_STATUS_TONE, toTitleCase } from "@/lib/status";
import { formatDate } from "@/lib/utils";
import type { User } from "@/types/user";

export default function AdminUsersPage() {
  const { user: currentUser } = useAuth();
  const { params, setParams } = useQueryParams();
  const [search, setSearch] = useState(params.search ?? "");
  const debouncedSearch = useDebouncedValue(search);
  const [banTarget, setBanTarget] = useState<User | null>(null);

  const page = Number(params.page) || 1;

  const { data, isLoading, isError, error, refetch, isFetching } = useAdminUsers({
    page,
    limit: 10,
    search: debouncedSearch || undefined,
    role: (params.role as "TENANT" | "LANDLORD" | "ADMIN" | undefined) || undefined,
    status: (params.status as "ACTIVE" | "BANNED" | undefined) || undefined,
  });

  function handleSearchChange(value: string) {
    setSearch(value);
    setParams({ search: value }, { resetPage: true });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">User Management</h1>
        <p className="mt-1 text-muted-foreground">Search, filter, and moderate platform users.</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 sm:col-span-1">
          <Search className="size-4 shrink-0 text-muted" aria-hidden="true" />
          <Input
            value={search}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder="Search name, email, phone"
            aria-label="Search users"
            className="border-0 px-0 focus:ring-0"
          />
        </div>

        <Select
          aria-label="Filter by role"
          value={params.role ?? ""}
          onChange={(event) => setParams({ role: event.target.value }, { resetPage: true })}
        >
          <option value="">All roles</option>
          <option value="TENANT">Tenant</option>
          <option value="LANDLORD">Landlord</option>
          <option value="ADMIN">Admin</option>
        </Select>

        <Select
          aria-label="Filter by status"
          value={params.status ?? ""}
          onChange={(event) => setParams({ status: event.target.value }, { resetPage: true })}
        >
          <option value="">All statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="BANNED">Banned</option>
        </Select>
      </div>

      {isError && <ErrorState message={getApiErrorMessage(error)} onRetry={() => refetch()} />}

      {!isError && (
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-160 text-left text-sm">
            <thead className="border-b border-border bg-background text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Joined</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className={`divide-y divide-border ${isFetching ? "opacity-60" : ""}`}>
              {isLoading &&
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRowSkeleton key={index} columns={6} />
                ))}

              {!isLoading && data?.data.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10">
                    <EmptyState icon={UsersIcon} title="No users found" description="Try a different search or filter." />
                  </td>
                </tr>
              )}

              {!isLoading &&
                data?.data.map((user) => {
                  const isSelf = user.id === currentUser?.id;
                  const isAdmin = user.role === "ADMIN";
                  const disabled = isSelf || isAdmin;

                  return (
                    <tr key={user.id}>
                      <td className="px-4 py-3 font-medium text-foreground">{user.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                      <td className="px-4 py-3 text-muted-foreground">{toTitleCase(user.role)}</td>
                      <td className="px-4 py-3">
                        <Badge tone={USER_STATUS_TONE[user.status]}>{toTitleCase(user.status)}</Badge>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{formatDate(user.createdAt)}</td>
                      <td className="px-4 py-3">
                        <Button
                          size="sm"
                          variant={user.status === "ACTIVE" ? "destructive" : "secondary"}
                          disabled={disabled}
                          title={
                            isSelf
                              ? "You cannot change your own status"
                              : isAdmin
                                ? "Admin status cannot be changed"
                                : undefined
                          }
                          onClick={() => setBanTarget(user)}
                        >
                          {user.status === "ACTIVE" ? (
                            <>
                              <Ban className="size-3.5" aria-hidden="true" />
                              Ban
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="size-3.5" aria-hidden="true" />
                              Unban
                            </>
                          )}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
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

      {banTarget && (
        <BanUserDialog user={banTarget} open={Boolean(banTarget)} onClose={() => setBanTarget(null)} />
      )}
    </div>
  );
}
