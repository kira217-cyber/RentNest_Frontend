import { SearchX } from "lucide-react";
import { LinkButton } from "@/components/common/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <SearchX className="size-8" aria-hidden="true" />
      </span>
      <h1 className="text-3xl font-bold text-foreground">Page not found</h1>
      <p className="max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <div className="flex gap-3 pt-2">
        <LinkButton href="/">Go Home</LinkButton>
        <LinkButton href="/properties" variant="secondary">
          Browse Properties
        </LinkButton>
      </div>
    </div>
  );
}
