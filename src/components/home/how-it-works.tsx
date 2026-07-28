import { CheckCircle2, KeySquare, Search, Send } from "lucide-react";
import { Container } from "@/components/common/container";

const STEPS = [
  {
    icon: Search,
    title: "Browse Verified Listings",
    description: "Explore properties by location, price, category, and amenities.",
  },
  {
    icon: Send,
    title: "Submit a Rental Request",
    description: "Share your move-in date and a short message with the landlord.",
  },
  {
    icon: CheckCircle2,
    title: "Get Approved",
    description: "Landlords review requests and approve the ones that fit.",
  },
  {
    icon: KeySquare,
    title: "Pay & Move In",
    description: "Complete a secure Stripe payment and your rental becomes active.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16">
      <Container>
        <div className="mb-10 flex flex-col gap-2 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">How RentNest Works</h2>
          <p className="text-muted-foreground">From search to move-in, in four simple steps.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <div
              key={step.title}
              className="relative rounded-xl border border-border bg-surface p-6 text-center"
            >
              <span className="absolute right-4 top-4 text-xs font-semibold text-muted">
                0{index + 1}
              </span>
              <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <step.icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
