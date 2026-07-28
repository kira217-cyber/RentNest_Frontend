"use client";

import { CreditCard, MapPin } from "lucide-react";
import { useState } from "react";
import { Button, LinkButton } from "@/components/common/button";
import { ErrorState } from "@/components/common/error-state";
import { Skeleton } from "@/components/common/skeleton";
import { useRental } from "@/hooks/use-rental";
import { useCreatePaymentSession } from "@/hooks/use-payments";
import { getApiErrorMessage } from "@/lib/error";
import { isRentalPayable } from "@/lib/rental-eligibility";
import { formatCurrency, formatDate } from "@/lib/utils";

export function PayView({ rentalId }: { rentalId: string }) {
  const { data: rental, isLoading, isError, error, refetch } = useRental(rentalId);
  const createPaymentSession = useCreatePaymentSession();
  const [redirecting, setRedirecting] = useState(false);

  async function handlePay() {
    try {
      setRedirecting(true);
      const response = await createPaymentSession.mutateAsync({ rentalRequestId: rentalId });
      if (response.data.checkoutUrl) {
        window.location.href = response.data.checkoutUrl;
      } else {
        setRedirecting(false);
      }
    } catch {
      setRedirecting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-lg space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (isError || !rental) {
    return <ErrorState message={getApiErrorMessage(error)} onRetry={() => refetch()} />;
  }

  if (!isRentalPayable(rental)) {
    return (
      <div className="mx-auto max-w-lg space-y-4 text-center">
        <ErrorState
          title="Payment not available"
          message={
            rental.payment?.status === "COMPLETED"
              ? "This rental request has already been paid for."
              : "This rental request must be approved by the landlord before you can pay."
          }
        />
        <LinkButton href="/dashboard/tenant/rentals" variant="secondary">
          Back to My Rentals
        </LinkButton>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Complete Payment</h1>
        <p className="mt-1 text-muted-foreground">
          You&apos;re paying for your approved rental request.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-surface p-6">
        <h2 className="font-semibold text-foreground">{rental.property.title}</h2>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4" aria-hidden="true" />
          {rental.property.location}
        </p>

        <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Move-in date</span>
            <span className="font-medium text-foreground">{formatDate(rental.moveInDate)}</span>
          </div>
          <div className="flex justify-between text-base">
            <span className="text-muted-foreground">Amount due</span>
            <span className="font-bold text-foreground">{formatCurrency(rental.property.price)}</span>
          </div>
        </div>

        <Button
          fullWidth
          className="mt-6"
          onClick={handlePay}
          loading={createPaymentSession.isPending || redirecting}
        >
          <CreditCard className="size-4" aria-hidden="true" />
          Pay Now with Stripe
        </Button>
      </div>
    </div>
  );
}
