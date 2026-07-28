import { Suspense } from "react";
import { Container } from "@/components/common/container";
import { PropertyCardSkeleton } from "@/components/common/skeleton";
import { PropertiesView } from "./properties-view";

function PropertiesFallback() {
  return (
    <Container className="py-10">
      <div className="mb-8 h-24 animate-pulse rounded-xl bg-slate-200" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <PropertyCardSkeleton key={index} />
        ))}
      </div>
    </Container>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<PropertiesFallback />}>
      <PropertiesView />
    </Suspense>
  );
}
