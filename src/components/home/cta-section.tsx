import { Container } from "@/components/common/container";
import { LinkButton } from "@/components/common/button";

export function CtaSection() {
  return (
    <section className="py-16">
      <Container>
        <div className="flex flex-col items-center gap-6 rounded-2xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-16">
          <h2 className="max-w-xl text-2xl font-bold sm:text-3xl">
            Ready to find your next home or list your property?
          </h2>
          <p className="max-w-lg text-primary-foreground/90">
            Join RentNest today — it takes less than two minutes to get started.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <LinkButton
              href="/properties"
              variant="secondary"
              size="lg"
              className="text-primary"
            >
              Browse Properties
            </LinkButton>
            <LinkButton
              href="/auth/register"
              variant="secondary"
              size="lg"
              className="bg-transparent text-primary-foreground border border-primary-foreground/40 hover:bg-white/10"
            >
              Create Free Account
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
