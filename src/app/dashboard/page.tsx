"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "@/components/common/spinner";
import { useAuth } from "@/hooks/use-auth";
import { dashboardPathForRole } from "@/lib/roles";

export default function DashboardIndexPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace(dashboardPathForRole(user.role));
    }
  }, [user, router]);

  return <Spinner />;
}
