"use client";

import { CreditCard } from "lucide-react";
import { Badge } from "@/components/common/badge";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { Skeleton } from "@/components/common/skeleton";
import { useTenantPayments } from "@/hooks/use-payments";
import { getApiErrorMessage } from "@/lib/error";
import { PAYMENT_STATUS_TONE, toTitleCase } from "@/lib/status";
import { formatCurrency, formatDateTime } from "@/lib/utils";

export default function TenantPaymentsPage() {
  const { data: payments, isLoading, isError, error, refetch } = useTenantPayments();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Payment History</h1>
        <p className="mt-1 text-muted-foreground">All payments made for your approved rentals.</p>
      </div>

      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-24" />
          ))}
        </div>
      )}

      {isError && <ErrorState message={getApiErrorMessage(error)} onRetry={() => refetch()} />}

      {!isLoading && !isError && payments?.length === 0 && (
        <EmptyState
          icon={CreditCard}
          title="No payments yet"
          description="Payments will appear here once you pay for an approved rental request."
        />
      )}

      {!isLoading && !isError && payments && payments.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-160 text-left text-sm">
            <thead className="border-b border-border bg-background text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Property</th>
                <th className="px-4 py-3 font-medium">Transaction ID</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Paid At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-4 py-4 font-medium text-foreground">
                    {payment.rentalRequest?.property.title ?? payment.rentalRequestId}
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">
                    <span className="font-mono text-xs">{payment.transactionId ?? "—"}</span>
                  </td>
                  <td className="px-4 py-4 font-medium text-foreground">
                    {formatCurrency(payment.amount)}
                  </td>
                  <td className="px-4 py-4">
                    <Badge tone={PAYMENT_STATUS_TONE[payment.status]}>
                      {toTitleCase(payment.status)}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">
                    {payment.paidAt ? formatDateTime(payment.paidAt) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
