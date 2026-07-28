import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement> & { hasError?: boolean }
>(({ className, hasError, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
        hasError ? "border-destructive" : "border-border",
        className,
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";
