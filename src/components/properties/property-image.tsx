"use client";

import { ImageOff } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function PropertyImage({
  src,
  alt,
  sizes,
}: {
  src?: string | null;
  alt: string;
  sizes: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 text-muted">
        <ImageOff className="size-6" aria-hidden="true" />
        <span className="text-xs">No image available</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      onError={() => setFailed(true)}
      className="object-cover transition-transform duration-300 group-hover:scale-105"
    />
  );
}
