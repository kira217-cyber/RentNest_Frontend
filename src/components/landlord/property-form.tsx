"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/common/button";
import { Field } from "@/components/forms/field";
import { Input } from "@/components/forms/input";
import { Select } from "@/components/forms/select";
import { TagInput } from "@/components/forms/tag-input";
import { Textarea } from "@/components/forms/textarea";
import { useCategories } from "@/hooks/use-categories";
import { propertySchema, type PropertyFormValues } from "@/schemas/property.schema";

export function PropertyForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel = "Save Property",
}: {
  defaultValues?: Partial<PropertyFormValues>;
  onSubmit: (values: PropertyFormValues) => void | Promise<void>;
  isSubmitting?: boolean;
  submitLabel?: string;
}) {
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      price: Number.NaN,
      bedrooms: Number.NaN,
      bathrooms: Number.NaN,
      area: undefined,
      amenities: [],
      images: [],
      categoryId: "",
      status: "AVAILABLE",
      isPublished: true,
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <Field label="Title" htmlFor="title" error={errors.title?.message} required>
        <Input id="title" hasError={Boolean(errors.title)} {...register("title")} />
      </Field>

      <Field label="Description" htmlFor="description" error={errors.description?.message} required>
        <Textarea
          id="description"
          rows={5}
          hasError={Boolean(errors.description)}
          {...register("description")}
        />
      </Field>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Location" htmlFor="location" error={errors.location?.message} required>
          <Input id="location" hasError={Boolean(errors.location)} {...register("location")} />
        </Field>

        <Field label="Category" htmlFor="categoryId" error={errors.categoryId?.message} required>
          <Select
            id="categoryId"
            hasError={Boolean(errors.categoryId)}
            disabled={categoriesLoading}
            {...register("categoryId")}
          >
            <option value="">Select category</option>
            {categories
              ?.filter((category) => category.isActive)
              .map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </Select>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
        <Field label="Price (BDT)" htmlFor="price" error={errors.price?.message} required>
          <Input
            id="price"
            type="number"
            min={0}
            hasError={Boolean(errors.price)}
            {...register("price", { valueAsNumber: true })}
          />
        </Field>

        <Field label="Bedrooms" htmlFor="bedrooms" error={errors.bedrooms?.message} required>
          <Input
            id="bedrooms"
            type="number"
            min={0}
            hasError={Boolean(errors.bedrooms)}
            {...register("bedrooms", { valueAsNumber: true })}
          />
        </Field>

        <Field label="Bathrooms" htmlFor="bathrooms" error={errors.bathrooms?.message} required>
          <Input
            id="bathrooms"
            type="number"
            min={0}
            hasError={Boolean(errors.bathrooms)}
            {...register("bathrooms", { valueAsNumber: true })}
          />
        </Field>

        <Field label="Area (sqft)" htmlFor="area" error={errors.area?.message} hint="Optional">
          <Input
            id="area"
            type="number"
            min={0}
            hasError={Boolean(errors.area)}
            {...register("area", {
              setValueAs: (value) => (value === "" ? undefined : Number(value)),
            })}
          />
        </Field>
      </div>

      <Field
        label="Amenities"
        htmlFor="amenities"
        error={errors.amenities?.message}
        hint="Press Enter to add, e.g. WiFi, Parking"
      >
        <Controller
          control={control}
          name="amenities"
          render={({ field }) => (
            <TagInput value={field.value} onChange={field.onChange} placeholder="Add an amenity" />
          )}
        />
      </Field>

      <Field
        label="Image URLs"
        htmlFor="images"
        error={errors.images?.message}
        hint="Paste an image URL and press Enter"
      >
        <Controller
          control={control}
          name="images"
          render={({ field }) => (
            <TagInput value={field.value} onChange={field.onChange} placeholder="https://..." />
          )}
        />
      </Field>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Availability" htmlFor="status" error={errors.status?.message} required>
          <Select id="status" hasError={Boolean(errors.status)} {...register("status")}>
            <option value="AVAILABLE">Available</option>
            <option value="RENTED">Rented</option>
            <option value="UNAVAILABLE">Unavailable</option>
          </Select>
        </Field>

        <Field label="Visibility" htmlFor="isPublished" error={errors.isPublished?.message}>
          <label className="flex h-11 items-center gap-2 text-sm text-foreground">
            <input id="isPublished" type="checkbox" className="size-4" {...register("isPublished")} />
            Published (visible to tenants)
          </label>
        </Field>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="submit" loading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
