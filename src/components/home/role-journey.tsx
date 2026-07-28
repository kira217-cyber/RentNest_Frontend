import { ArrowRight, Building2, UserRound } from "lucide-react";
import { Container } from "@/components/common/container";
import { LinkButton } from "@/components/common/button";

const ROLES = [
  {
    icon: UserRound,
    title: "For Tenants",
    description:
      "Search properties, submit rental requests, track approvals, pay securely, and leave reviews after you move in.",
    href: "/auth/register",
    cta: "Find a rental",
  },
  {
    icon: Building2,
    title: "For Landlords",
    description:
      "List properties in minutes, manage incoming requests, approve or reject tenants, and track your portfolio from one dashboard.",
    href: "/auth/register",
    cta: "List a property",
  },
];

export function RoleJourney() {
  return (
    <section className="border-y border-border bg-surface py-16">
      <Container>
        <div className="mb-10 flex flex-col gap-2 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Built for Every Role</h2>
          <p className="text-muted-foreground">
            Whether you&apos;re renting or listing, RentNest has a dedicated experience for you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {ROLES.map((role) => (
            <div
              key={role.title}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-background p-8"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <role.icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="text-xl font-semibold text-foreground">{role.title}</h3>
              <p className="text-sm text-muted-foreground">{role.description}</p>
              <LinkButton href={role.href} variant="outline" size="sm" className="mt-auto w-fit">
                {role.cta}
                <ArrowRight className="size-4" aria-hidden="true" />
              </LinkButton>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
