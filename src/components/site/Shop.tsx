import { useMemo, useState } from "react";
import { products as ALL, type Category, type Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

interface Props {
  initialCategory?: string;
  initialQuery?: string;
  title?: string;
}

export function ShopGrid({ initialCategory, initialQuery = "", title }: Props) {
  const maxAvailablePrice = Math.ceil(Math.max(...ALL.map((p) => p.price), 400) / 10) * 10;
  const [cat, setCat] = useState<string>(initialCategory ?? "All");
  const [q, setQ] = useState(initialQuery);
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(maxAvailablePrice);

  const filtered = useMemo(() => {
    let list: Product[] = ALL.slice();
    if (cat !== "All")
      list = list.filter((p) => p.category === cat || p.categories?.includes(cat as Category));
    if (q) {
      const s = q.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(s) ||
          p.fragrance.toLowerCase().includes(s) ||
          p.subcategory.toLowerCase().includes(s),
      );
    }
    list = list.filter((p) => p.price <= maxPrice);
    if (sort === "low") list.sort((a, b) => a.price - b.price);
    else if (sort === "high") list.sort((a, b) => b.price - a.price);
    else if (sort === "best") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [cat, q, sort, maxPrice]);

  const cats = ["All", ...Array.from(new Set(ALL.flatMap((p) => p.categories ?? [p.category])))];

  return (
    <div className="grid lg:grid-cols-[260px_1fr] gap-10">
      <aside className="space-y-6">
        <div>
          <h3 className="font-serif text-lg mb-3">Search</h3>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search..."
            className="w-full rounded-full border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <h3 className="font-serif text-lg mb-3">Category</h3>
          <ul className="space-y-1.5">
            {cats.map((c) => (
              <li key={c}>
                <button
                  onClick={() => setCat(c)}
                  className={`w-full text-left text-sm px-3 py-2 rounded-md ${cat === c ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                >
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-serif text-lg mb-3">Price ≤ ₹{maxPrice}</h3>
          <input
            type="range"
            min={0}
            max={maxAvailablePrice}
            step={10}
            value={maxPrice}
            onChange={(e) => setMaxPrice(+e.target.value)}
            className="w-full accent-secondary"
          />
        </div>
      </aside>
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <p className="text-sm text-muted-foreground">
            {filtered.length} {title ?? "products"}
          </p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-full border bg-background px-4 py-2 text-sm"
          >
            <option value="featured">Featured</option>
            <option value="best">Best Selling</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">No products match your filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
