"use client";

import { Folder, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/common/badge";
import { Button } from "@/components/common/button";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { Skeleton } from "@/components/common/skeleton";
import { CategoryFormModal } from "@/components/admin/category-form-modal";
import { useCategories } from "@/hooks/use-categories";
import { useDeleteCategory } from "@/hooks/use-admin-categories";
import { getApiErrorMessage } from "@/lib/error";
import type { Category } from "@/types/category";

export default function AdminCategoriesPage() {
  const { data: categories, isLoading, isError, error, refetch } = useCategories();
  const deleteCategory = useDeleteCategory();

  const [formOpen, setFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  function openCreate() {
    setEditingCategory(null);
    setFormOpen(true);
  }

  function openEdit(category: Category) {
    setEditingCategory(category);
    setFormOpen(true);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      await deleteCategory.mutateAsync(deleteTarget.id);
      setDeleteTarget(null);
    } catch {
      // error toast already shown by the mutation (handles the "in use" conflict too)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Category Management</h1>
          <p className="mt-1 text-muted-foreground">Manage property categories.</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="size-4" aria-hidden="true" />
          Add Category
        </Button>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-32" />
          ))}
        </div>
      )}

      {isError && <ErrorState message={getApiErrorMessage(error)} onRetry={() => refetch()} />}

      {!isLoading && !isError && categories?.length === 0 && (
        <EmptyState
          icon={Folder}
          title="No categories yet"
          description="Create a category so landlords can classify their properties."
          action={
            <Button size="sm" onClick={openCreate}>
              Add Category
            </Button>
          }
        />
      )}

      {!isLoading && !isError && categories && categories.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div key={category.id} className="rounded-xl border border-border bg-surface p-5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-foreground">{category.name}</h3>
                <Badge tone={category.isActive ? "success" : "neutral"}>
                  {category.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              {category.description && (
                <p className="mt-2 text-sm text-muted-foreground">{category.description}</p>
              )}
              <div className="mt-4 flex gap-3 border-t border-border pt-4">
                <Button size="sm" variant="secondary" onClick={() => openEdit(category)}>
                  <Pencil className="size-3.5" aria-hidden="true" />
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => setDeleteTarget(category)}>
                  <Trash2 className="size-3.5" aria-hidden="true" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <CategoryFormModal open={formOpen} onClose={() => setFormOpen(false)} category={editingCategory} />

      {deleteTarget && (
        <ConfirmDialog
          open={Boolean(deleteTarget)}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
          title="Delete category"
          description={`Are you sure you want to delete "${deleteTarget.name}"? Categories already used by properties cannot be deleted.`}
          confirmLabel="Delete"
          loading={deleteCategory.isPending}
        />
      )}
    </div>
  );
}
