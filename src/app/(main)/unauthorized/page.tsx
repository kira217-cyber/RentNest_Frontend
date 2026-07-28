"use client";

import { ShieldAlert } from "lucide-react";
import { Container } from "@/components/common/container";
import { LinkButton } from "@/components/common/button";
import { useAuth } from "@/hooks/use-auth";
import { dashboardPathForRole } from "@/lib/roles";

export default function UnauthorizedPage() {
  const { user, isAuthenticated } = useAuth();

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-16 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <ShieldAlert className="size-7" aria-hidden="true" />
      </span>
      <h1 className="text-2xl font-bold text-foreground">Access Denied</h1>
      <p className="max-w-md text-muted-foreground">
        You don&apos;t have permission to view this page. If you think this is a mistake, contact
        support or go back to a page you have access to.
      </p>
      <div className="flex gap-3 pt-2">
        <LinkButton href="/" variant="secondary">
          Go Home
        </LinkButton>
        {isAuthenticated && user && (
          <LinkButton href={dashboardPathForRole(user.role)}>Go to My Dashboard</LinkButton>
        )}
      </div>
    </Container>
  );
}
