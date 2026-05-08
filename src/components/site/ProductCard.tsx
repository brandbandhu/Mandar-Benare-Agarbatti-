import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/lib/cart";

const rupees = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });

export function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  const packLabel = p.gramOptions.length > 1 ? p.gramOptions.join(" / ") : p.packSize;

  return (
    <article className="group relative rounded-2xl bg-card shadow-card overflow-hidden flex flex-col">
      <Link
        to="/product/$slug"
        params={{ slug: p.slug }}
        className="block relative aspect-square overflow-hidden hover-zoom bg-muted"
      >
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover"
        />
        {p.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-accent text-accent-foreground text-[10px] uppercase tracking-wider px-2.5 py-1">
            {p.badge}
          </span>
        )}
        <button
          aria-label="Wishlist"
          className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="h-4 w-4" />
        </button>
      </Link>
      <div className="p-4 flex-1 flex flex-col">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
          {p.category} · {p.fragrance}
        </div>
        <Link
          to="/product/$slug"
          params={{ slug: p.slug }}
          className="mt-1 font-serif text-lg leading-tight hover:text-secondary transition-colors"
        >
          {p.name}
        </Link>
        <div className="text-xs text-muted-foreground mt-1">{packLabel}</div>
        <div className="mt-3 flex items-center gap-2">
          <span className="font-semibold">{p.priceLabel ?? rupees.format(p.price)}</span>
          {p.oldPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {rupees.format(p.oldPrice)}
            </span>
          )}
        </div>
        <button
          onClick={() => add(p)}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-full btn-saffron px-4 py-2.5 text-sm font-medium"
        >
          <ShoppingBag className="h-4 w-4" /> Add to Cart
        </button>
      </div>
    </article>
  );
}
