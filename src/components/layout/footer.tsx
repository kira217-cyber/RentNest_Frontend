import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/common/container";
import { Logo } from "./logo";

const EXPLORE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Browse Properties" },
  { href: "/auth/register", label: "List Your Property" },
];

const ROLE_LINKS = [
  { href: "/properties", label: "Find a Rental" },
  { href: "/auth/register", label: "Become a Landlord" },
  { href: "/auth/login", label: "Sign In" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="grid gap-10 py-12 md:grid-cols-4">
        <div className="space-y-3 md:col-span-2 md:pr-8">
          <Logo />
          <p className="max-w-sm text-sm text-muted-foreground">
            RentNest helps tenants discover verified rental homes and helps landlords manage
            listings and requests in one clean, modern dashboard.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Explore</h3>
          <ul className="mt-3 space-y-2">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Get Started</h3>
          <ul className="mt-3 space-y-2">
            {ROLE_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Mail className="size-4" aria-hidden="true" /> support@rentnest.app
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4" aria-hidden="true" /> +880 1700-000000
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4" aria-hidden="true" /> Dhaka, Bangladesh
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-border py-5">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} RentNest. All rights reserved.</p>
          <p>Built with Next.js, TypeScript &amp; Tailwind CSS.</p>
        </Container>
      </div>
    </footer>
  );
}
