"use client";

import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LinkButton } from "@/components/common/button";
import { Spinner } from "@/components/common/spinner";
import { useConfirmPayment } from "@/hooks/use-payments";
import { getApiErrorMessage } from "@/lib/error";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import type { Payment } from "@/types/payment";

type ConfirmationState =
  | { status: "confirming" }
  | { status: "success"; payment: Payment }
  | { status: "error"; message: string };

export function PaymentSuccessView() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const confirmPayment = useConfirmPayment();
  const hasStarted = useRef(false);

  const [state, setState] = useState<ConfirmationState>(() =>
    sessionId
      ? { status: "confirming" }
      : { status: "error", message: "Missing payment session. Please try the payment link again." },
  );

  useEffect(() => {
    if (!sessionId || hasStarted.current) return;
    hasStarted.current = true;

    confirmPayment
      .mutateAsync({ sessionId })
      .then((response) => setState({ status: "success", payment: response.data }))
      .catch((error) => setState({ status: "error", message: getApiErrorMessage(error) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  if (state.status === "confirming") {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <Spinner />
        <p className="text-muted-foreground">Confirming your payment with Stripe...</p>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <AlertTriangle className="size-7" aria-hidden="true" />
        </span>
        <h1 className="text-2xl font-bold text-foreground">Payment Confirmation Failed</h1>
        <p className="max-w-md text-muted-foreground">{state.message}</p>
        <LinkButton href="/dashboard/tenant/rentals" variant="secondary">
          Back to My Rentals
        </LinkButton>
      </div>
    );
  }

  const { payment } = state;

  return (
    <div className="flex flex-col items-center gap-4 py-12 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-success/10 text-success">
        <CheckCircle2 className="size-7" aria-hidden="true" />
      </span>
      <h1 className="text-2xl font-bold text-foreground">Payment Successful</h1>
      <p className="max-w-md text-muted-foreground">
        Your payment was completed and your rental is now active.
      </p>

      <div className="w-full max-w-sm rounded-xl border border-border bg-surface p-5 text-left text-sm">
        <div className="flex justify-between py-1">
          <span className="text-muted-foreground">Amount Paid</span>
          <span className="font-medium text-foreground">{formatCurrency(payment.amount)}</span>
        </div>
        {payment.transactionId && (
          <div className="flex justify-between py-1">
            <span className="text-muted-foreground">Transaction ID</span>
            <span className="font-mono text-xs text-foreground">{payment.transactionId}</span>
          </div>
        )}
        {payment.paidAt && (
          <div className="flex justify-between py-1">
            <span className="text-muted-foreground">Paid At</span>
            <span className="font-medium text-foreground">{formatDateTime(payment.paidAt)}</span>
          </div>
        )}
      </div>

      <LinkButton href="/dashboard/tenant/payments">View Payment History</LinkButton>
    </div>
  );
}
