"use client";

import { ImageOff } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedIndexes, setFailedIndexes] = useState<Set<number>>(new Set());

  const validImages = images.filter((_, index) => !failedIndexes.has(index));
  const active = images[activeIndex];
  const activeFailed = failedIndexes.has(activeIndex);

  function markFailed(index: number) {
    setFailedIndexes((prev) => new Set(prev).add(index));
  }

  if (images.length === 0 || validImages.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl border border-border bg-background text-muted sm:h-96">
        <div className="flex flex-col items-center gap-2">
          <ImageOff className="size-8" aria-hidden="true" />
          <span className="text-sm">No images available</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative h-64 w-full overflow-hidden rounded-xl border border-border bg-background sm:h-96">
        {active && !activeFailed ? (
          <Image
            src={active}
            alt={`${title} — image ${activeIndex + 1}`}
            fill
            priority
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover"
            onError={() => markFailed(activeIndex)}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted">
            <ImageOff className="size-8" aria-hidden="true" />
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) =>
            failedIndexes.has(index) ? null : (
              <button
                key={image + index}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`View image ${index + 1}`}
                aria-current={activeIndex === index}
                className={cn(
                  "relative size-16 shrink-0 overflow-hidden rounded-lg border-2",
                  activeIndex === index ? "border-primary" : "border-transparent",
                )}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                  onError={() => markFailed(index)}
                />
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
}
