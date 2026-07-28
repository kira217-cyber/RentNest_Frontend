import { Suspense } from "react";
import { Container } from "@/components/common/container";
import { Spinner } from "@/components/common/spinner";
import { PaymentSuccessView } from "./success-view";

export const metadata = {
  title: "Payment Successful",
};

export default function PaymentSuccessPage() {
  return (
    <Container className="py-10">
      <Suspense fallback={<Spinner />}>
        <PaymentSuccessView />
      </Suspense>
    </Container>
  );
}
