"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LinkButton } from "@/components/common/button";
import { useAuth } from "@/hooks/use-auth";
import { dashboardPathForRole } from "@/lib/roles";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { UserMenu } from "./user-menu";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface/95 backdrop-blur supports-backdrop-filter:bg-surface/80">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-background hover:text-foreground",
                pathname === link.href && "bg-background text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated && user && (
            <Link
              href={dashboardPathForRole(user.role)}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-background hover:text-foreground",
                pathname.startsWith("/dashboard") && "bg-background text-foreground",
              )}
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {!isLoading && (isAuthenticated && user ? (
            <UserMenu user={user} />
          ) : (
            <>
              <LinkButton href="/auth/login" variant="ghost" size="sm">
                Login
              </LinkButton>
              <LinkButton href="/auth/register" variant="primary" size="sm">
                Register
              </LinkButton>
            </>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          className="flex size-10 items-center justify-center rounded-lg border border-border text-foreground md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-surface px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-background"
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated && user && (
              <Link
                href={dashboardPathForRole(user.role)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-background"
              >
                Dashboard
              </Link>
            )}
          </nav>

          <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
            {!isLoading && (isAuthenticated && user ? (
              <UserMenu user={user} />
            ) : (
              <>
                <LinkButton href="/auth/login" variant="secondary" fullWidth>
                  Login
                </LinkButton>
                <LinkButton href="/auth/register" variant="primary" fullWidth>
                  Register
                </LinkButton>
              </>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
