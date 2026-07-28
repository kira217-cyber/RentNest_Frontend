"use client";

import { LayoutGrid } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/common/container";
import { Skeleton } from "@/components/common/skeleton";
import { useCategories } from "@/hooks/use-categories";

export function CategoriesSection() {
  const { data, isLoading, isError } = useCategories();
  const categories = (data ?? []).filter((category) => category.isActive);

  if (!isLoading && (isError || categories.length === 0)) {
    return null;
  }

  return (
    <section className="border-y border-border bg-surface py-16">
      <Container>
        <div className="mb-8 flex flex-col gap-2 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Browse by Category</h2>
          <p className="text-muted-foreground">Find the type of property that fits your needs.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={index} className="h-24 rounded-xl" />
              ))
            : categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/properties?categoryId=${category.id}`}
                  className="flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-6 text-center transition-colors hover:border-primary hover:bg-primary/5"
                >
                  <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <LayoutGrid className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium text-foreground">{category.name}</span>
                </Link>
              ))}
        </div>
      </Container>
    </section>
  );
}
