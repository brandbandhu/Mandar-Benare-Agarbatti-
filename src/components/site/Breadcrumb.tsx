import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
export function Breadcrumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="min-w-0 text-xs text-muted-foreground md:text-sm">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => (
          <li key={i} className="flex min-w-0 items-center gap-1.5">
            {it.to ? (
              <Link to={it.to} className="break-words hover:text-foreground">
                {it.label}
              </Link>
            ) : (
              <span className="break-words text-foreground">{it.label}</span>
            )}
            {i < items.length - 1 && <ChevronRight className="h-3.5 w-3.5 shrink-0" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
