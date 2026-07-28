import { XCircle } from "lucide-react";
import { Container } from "@/components/common/container";
import { LinkButton } from "@/components/common/button";

export const metadata = {
  title: "Payment Cancelled",
};

export default function PaymentCancelPage() {
  return (
    <Container className="flex flex-col items-center gap-4 py-16 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <XCircle className="size-7" aria-hidden="true" />
      </span>
      <h1 className="text-2xl font-bold text-foreground">Payment Cancelled</h1>
      <p className="max-w-md text-muted-foreground">
        Your payment was not completed and your rental request has not been marked as paid. You
        can retry the payment any time from your rentals page.
      </p>
      <div className="flex gap-3">
        <LinkButton href="/dashboard/tenant/rentals">Retry Payment</LinkButton>
        <LinkButton href="/dashboard/tenant" variant="secondary">
          Back to Dashboard
        </LinkButton>
      </div>
    </Container>
  );
}
