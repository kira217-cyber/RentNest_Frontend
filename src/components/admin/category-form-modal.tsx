"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/common/button";
import { Modal } from "@/components/common/modal";
import { Field } from "@/components/forms/field";
import { Input } from "@/components/forms/input";
import { Textarea } from "@/components/forms/textarea";
import { useCreateCategory, useUpdateCategory } from "@/hooks/use-admin-categories";
import { categorySchema, type CategoryFormValues } from "@/schemas/category.schema";
import type { Category } from "@/types/category";

export function CategoryFormModal({
  open,
  onClose,
  category,
}: {
  open: boolean;
  onClose: () => void;
  category?: Category | null;
}) {
  const isEditing = Boolean(category);
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory(category?.id ?? "");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    values: {
      name: category?.name ?? "",
      description: category?.description ?? "",
      isActive: category?.isActive ?? true,
    },
  });

  function handleClose() {
    reset();
    onClose();
  }

  async function onSubmit(values: CategoryFormValues) {
    try {
      if (isEditing && category) {
        await updateCategory.mutateAsync(values);
      } else {
        await createCategory.mutateAsync(values);
      }
      handleClose();
    } catch {
      // error toast already shown by the mutation
    }
  }

  const isPending = createCategory.isPending || updateCategory.isPending;

  return (
    <Modal open={open} onClose={handleClose} title={isEditing ? "Edit Category" : "Add Category"}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Field label="Name" htmlFor="name" error={errors.name?.message} required>
          <Input id="name" hasError={Boolean(errors.name)} {...register("name")} />
        </Field>

        <Field
          label="Description"
          htmlFor="description"
          error={errors.description?.message}
          hint="Optional"
        >
          <Textarea id="description" rows={3} {...register("description")} />
        </Field>

        <label className="flex items-center gap-2 text-sm text-foreground">
          <input type="checkbox" className="size-4" {...register("isActive")} />
          Active (visible for new property listings)
        </label>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" loading={isPending}>
            {isEditing ? "Save Changes" : "Create Category"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
