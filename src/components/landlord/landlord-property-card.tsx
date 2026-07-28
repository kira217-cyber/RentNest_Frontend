"use client";

import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/common/badge";
import { Button } from "@/components/common/button";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { Select } from "@/components/forms/select";
import { PropertyImage } from "@/components/properties/property-image";
import { useDeleteProperty, useUpdateProperty } from "@/hooks/use-landlord-properties";
import { PROPERTY_STATUS_TONE, toTitleCase } from "@/lib/status";
import { formatCurrency } from "@/lib/utils";
import type { Property, PropertyStatus } from "@/types/property";

export function LandlordPropertyCard({ property }: { property: Property }) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const updateProperty = useUpdateProperty(property.id);
  const deleteProperty = useDeleteProperty();

  function handleStatusChange(status: PropertyStatus) {
    updateProperty.mutate({ status });
  }

  async function handleDelete() {
    try {
      await deleteProperty.mutateAsync(property.id);
      setDeleteOpen(false);
    } catch {
      // error toast already shown by the mutation
    }
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-surface sm:flex-row">
      <div className="relative h-40 w-full shrink-0 sm:h-auto sm:w-48">
        <PropertyImage src={property.images?.[0]} alt={property.title} sizes="192px" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <Link
              href={`/properties/${property.id}`}
              className="font-semibold text-foreground hover:text-primary"
            >
              {property.title}
            </Link>
            <p className="text-sm text-muted-foreground">{property.location}</p>
          </div>
          <Badge tone={PROPERTY_STATUS_TONE[property.status]}>{toTitleCase(property.status)}</Badge>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span>{property.bedrooms} bed</span>
          <span>{property.bathrooms} bath</span>
          <span className="font-medium text-foreground">{formatCurrency(property.price)}/mo</span>
          {!property.isPublished && <Badge tone="neutral">Unpublished</Badge>}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-border pt-3">
          <Select
            aria-label="Change status"
            value={property.status}
            onChange={(event) => handleStatusChange(event.target.value as PropertyStatus)}
            disabled={updateProperty.isPending}
            className="h-9 w-auto text-xs"
          >
            <option value="AVAILABLE">Available</option>
            <option value="RENTED">Rented</option>
            <option value="UNAVAILABLE">Unavailable</option>
          </Select>

          <Link href={`/dashboard/landlord/properties/${property.id}/edit`}>
            <Button type="button" size="sm" variant="secondary">
              <Pencil className="size-3.5" aria-hidden="true" />
              Edit
            </Button>
          </Link>

          <Button
            type="button"
            size="sm"
            variant="destructive"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2 className="size-3.5" aria-hidden="true" />
            Delete
          </Button>
        </div>
      </div>

      <ConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete property"
        description={`Are you sure you want to delete "${property.title}"? This cannot be undone.`}
        confirmLabel="Delete"
        loading={deleteProperty.isPending}
      />
    </div>
  );
}
