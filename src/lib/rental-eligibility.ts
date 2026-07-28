import type { RentalRequest } from "@/types/rental";

export function isRentalPayable(rental: RentalRequest) {
  return rental.status === "APPROVED" && rental.payment?.status !== "COMPLETED";
}

export function isRentalReviewable(rental: RentalRequest) {
  return (
    (rental.status === "ACTIVE" || rental.status === "COMPLETED") &&
    rental.payment?.status === "COMPLETED"
  );
}
