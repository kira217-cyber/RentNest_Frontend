import { Home } from "lucide-react";
import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 font-semibold text-foreground ${className ?? ""}`}>
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Home className="size-5" aria-hidden="true" />
      </span>
      <span className="text-lg tracking-tight">
        Rent<span className="text-primary">Nest</span>
      </span>
    </Link>
  );
}
