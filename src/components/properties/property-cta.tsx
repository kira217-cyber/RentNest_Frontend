"use client";

import { useState } from "react";
import { Button, LinkButton } from "@/components/common/button";
import { useAuth } from "@/hooks/use-auth";
import type { Property } from "@/types/property";
import { RentalRequestModal } from "./rental-request-modal";

export function PropertyCta({ property }: { property: Property }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  if (isLoading) {
    return <div className="h-12 w-full animate-pulse rounded-lg bg-slate-200 sm:w-56" />;
  }

  if (!isAuthenticated) {
    return (
      <LinkButton
        href={`/auth/login?redirect=/properties/${property.id}`}
        size="lg"
        fullWidth
        className="sm:w-auto"
      >
        Login to Request
      </LinkButton>
    );
  }

  if (user?.role !== "TENANT") {
    return null;
  }

  const isAvailable = property.status === "AVAILABLE";

  return (
    <>
      <Button
        size="lg"
        fullWidth
        className="sm:w-auto"
        disabled={!isAvailable}
        onClick={() => setModalOpen(true)}
      >
        {isAvailable ? "Request to Rent" : "Not Available"}
      </Button>

      <RentalRequestModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        propertyId={property.id}
        propertyTitle={property.title}
      />
    </>
  );
}
