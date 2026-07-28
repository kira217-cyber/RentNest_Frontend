"use client";

import { useRouter } from "next/navigation";
import { ErrorState } from "@/components/common/error-state";
import { Skeleton } from "@/components/common/skeleton";
import { PropertyForm } from "@/components/landlord/property-form";
import { useMyProperties, useUpdateProperty } from "@/hooks/use-landlord-properties";
import { getApiErrorMessage } from "@/lib/error";
import type { PropertyFormValues } from "@/schemas/property.schema";

export function EditPropertyView({ propertyId }: { propertyId: string }) {
  const router = useRouter();
  const { data: properties, isLoading, isError, error, refetch } = useMyProperties();
  const property = properties?.find((item) => item.id === propertyId);
  const updateProperty = useUpdateProperty(propertyId);

  async function handleSubmit(values: PropertyFormValues) {
    try {
      await updateProperty.mutateAsync(values);
      router.push("/dashboard/landlord/properties");
    } catch {
      // error toast already shown by the mutation
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-3xl space-y-4">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (isError) {
    return <ErrorState message={getApiErrorMessage(error)} onRetry={() => refetch()} />;
  }

  if (!property) {
    return (
      <ErrorState
        title="Property not found"
        message="This property doesn't exist or doesn't belong to your account."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Edit Property</h1>
        <p className="mt-1 text-muted-foreground">{property.title}</p>
      </div>

      <div className="max-w-3xl rounded-xl border border-border bg-surface p-6">
        <PropertyForm
          defaultValues={{
            title: property.title,
            description: property.description,
            location: property.location,
            price: property.price,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            area: property.area ?? undefined,
            amenities: property.amenities,
            images: property.images,
            categoryId: property.categoryId,
            status: property.status,
            isPublished: property.isPublished,
          }}
          onSubmit={handleSubmit}
          isSubmitting={updateProperty.isPending}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
}
