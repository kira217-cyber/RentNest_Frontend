"use client";

import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";
import { Button, LinkButton } from "@/components/common/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="size-8" aria-hidden="true" />
      </span>
      <h1 className="text-3xl font-bold text-foreground">Something went wrong</h1>
      <p className="max-w-md text-muted-foreground">
        An unexpected error occurred. Please try again, or head back to the homepage.
      </p>
      <div className="flex gap-3 pt-2">
        <Button onClick={reset}>Try Again</Button>
        <LinkButton href="/" variant="secondary">
          Go Home
        </LinkButton>
      </div>
    </div>
  );
}
