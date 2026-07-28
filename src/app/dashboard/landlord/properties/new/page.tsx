"use client";

import { useRouter } from "next/navigation";
import { PropertyForm } from "@/components/landlord/property-form";
import { useCreateProperty } from "@/hooks/use-landlord-properties";
import type { PropertyFormValues } from "@/schemas/property.schema";

export default function NewPropertyPage() {
  const router = useRouter();
  const createProperty = useCreateProperty();

  async function handleSubmit(values: PropertyFormValues) {
    try {
      await createProperty.mutateAsync(values);
      router.push("/dashboard/landlord/properties");
    } catch {
      // error toast already shown by the mutation
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Add Property</h1>
        <p className="mt-1 text-muted-foreground">List a new property for tenants to discover.</p>
      </div>

      <div className="max-w-3xl rounded-xl border border-border bg-surface p-6">
        <PropertyForm
          onSubmit={handleSubmit}
          isSubmitting={createProperty.isPending}
          submitLabel="Create Property"
        />
      </div>
    </div>
  );
}
