import { Bath, Bed, MapPin, Ruler } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/common/badge";
import { PROPERTY_STATUS_TONE, toTitleCase } from "@/lib/status";
import { cn, formatCurrency } from "@/lib/utils";
import type { Property } from "@/types/property";

export function PropertyCard({ property }: { property: Property }) {
  const cover = property.images?.[0];

  return (
    <Link
      href={`/properties/${property.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-shadow hover:shadow-lg"
    >
      <div className="relative h-48 w-full overflow-hidden bg-background">
        {cover ? (
          <Image
            src={cover}
            alt={property.title}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted">
            No image available
          </div>
        )}
        <Badge
          tone={PROPERTY_STATUS_TONE[property.status]}
          className="absolute left-3 top-3 shadow-sm"
        >
          {toTitleCase(property.status)}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        {property.category && (
          <span className="text-xs font-medium uppercase tracking-wide text-primary">
            {property.category.name}
          </span>
        )}
        <h3 className="line-clamp-1 text-base font-semibold text-foreground">{property.title}</h3>
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="size-4 shrink-0" aria-hidden="true" />
          <span className="line-clamp-1">{property.location}</span>
        </p>

        <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Bed className="size-4" aria-hidden="true" /> {property.bedrooms}
          </span>
          <span className="flex items-center gap-1">
            <Bath className="size-4" aria-hidden="true" /> {property.bathrooms}
          </span>
          {property.area && (
            <span className="flex items-center gap-1">
              <Ruler className="size-4" aria-hidden="true" /> {property.area} sqft
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <p className={cn("text-lg font-bold text-foreground")}>
            {formatCurrency(property.price)}
            <span className="text-xs font-normal text-muted-foreground"> /month</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
