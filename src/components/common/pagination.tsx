import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function getPageWindow(current: number, total: number) {
  const window = 1;
  const pages = new Set<number>([1, total, current]);

  for (let offset = 1; offset <= window; offset += 1) {
    if (current - offset >= 1) pages.add(current - offset);
    if (current + offset <= total) pages.add(current + offset);
  }

  return Array.from(pages).sort((a, b) => a - b);
}

export function Pagination({
  page,
  totalPage,
  onPageChange,
}: {
  page: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPage <= 1) return null;

  const pages = getPageWindow(page, totalPage);

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        className="flex size-9 items-center justify-center rounded-lg border border-border text-foreground disabled:opacity-40 hover:bg-background"
      >
        <ChevronLeft className="size-4" />
      </button>

      {pages.map((pageNumber, index) => {
        const previous = pages[index - 1];
        const showEllipsis = previous !== undefined && pageNumber - previous > 1;

        return (
          <span key={pageNumber} className="flex items-center gap-1">
            {showEllipsis && <span className="px-1 text-sm text-muted">…</span>}
            <button
              type="button"
              onClick={() => onPageChange(pageNumber)}
              aria-current={pageNumber === page ? "page" : undefined}
              className={cn(
                "flex size-9 items-center justify-center rounded-lg text-sm font-medium",
                pageNumber === page
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-foreground hover:bg-background",
              )}
            >
              {pageNumber}
            </button>
          </span>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPage}
        aria-label="Next page"
        className="flex size-9 items-center justify-center rounded-lg border border-border text-foreground disabled:opacity-40 hover:bg-background"
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}
