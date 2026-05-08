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
    <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="grid gap-5 rounded-2xl border bg-card p-4 sm:grid-cols-2 lg:block lg:space-y-6 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0">
        <div>
          <h3 className="font-serif text-lg mb-3">Search</h3>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search..."
            className="w-full rounded-full border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <h3 className="font-serif text-lg mb-3">Category</h3>
          <ul className="flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-1.5 lg:overflow-visible lg:pb-0">
            {cats.map((c) => (
              <li key={c} className="shrink-0 lg:shrink">
                <button
                  onClick={() => setCat(c)}
                  className={`w-full whitespace-nowrap rounded-full px-3 py-2 text-left text-sm lg:whitespace-normal lg:rounded-md ${cat === c ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
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
      <div className="min-w-0">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            {filtered.length} {title ?? "products"}
          </p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full rounded-full border bg-background px-4 py-2 text-sm sm:w-auto"
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
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
