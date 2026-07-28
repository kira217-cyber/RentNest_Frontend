"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { Spinner } from "@/components/common/spinner";
import { useAuth } from "@/hooks/use-auth";
import type { UserRole } from "@/types/user";

export function RoleGuard({
  allowedRoles,
  children,
}: {
  allowedRoles?: UserRole[];
  children: ReactNode;
}) {
  const router = useRouter();
  const { user, status, isLoading } = useAuth();
  const isRoleAllowed = !allowedRoles || (user ? allowedRoles.includes(user.role) : false);

  useEffect(() => {
    if (isLoading) return;

    if (status === "unauthenticated") {
      router.replace("/auth/login");
      return;
    }

    if (user && !isRoleAllowed) {
      router.replace("/unauthorized");
    }
  }, [isLoading, status, user, isRoleAllowed, router]);

  if (isLoading || status !== "authenticated" || !user || !isRoleAllowed) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
}
