import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Star, ShoppingBag, Truck, Shield, Leaf, Minus, Plus } from "lucide-react";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { ProductCard } from "@/components/site/ProductCard";
import { getBySlug, products } from "@/data/products";
import { useCart } from "@/lib/cart";

const rupees = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });

export const Route = createFileRoute("/product/$slug")({
  beforeLoad: ({ params }) => {
    if (!getBySlug(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const p = getBySlug(params.slug);
    return p
      ? {
          meta: [
            { title: `${p.name} — Mandar Benare Agarbatti` },
            { name: "description", content: p.description },
            { property: "og:title", content: p.name },
            { property: "og:description", content: p.description },
            { property: "og:image", content: p.image },
          ],
        }
      : {};
  },
  component: ProductPage,
  notFoundComponent: () => <div className="container-x py-20 text-center">Product not found</div>,
  errorComponent: ({ error }) => (
    <div className="container-x py-20 text-center">{error.message}</div>
  ),
});

function ProductPage() {
  const { slug } = Route.useParams();
  const p = getBySlug(slug)!;
  const { add } = useCart();
  const gallery = useMemo(
    () => (p.imageFiles?.length ? p.imageFiles : [p.image]),
    [p.image, p.imageFiles],
  );
  const [activeImage, setActiveImage] = useState(gallery[0]);
  const [pack, setPack] = useState(p.gramOptions[0] ?? p.packSize);
  const [qty, setQty] = useState(1);
  const related = products
    .filter(
      (x) =>
        x.id !== p.id &&
        (x.category === p.category ||
          x.categories?.some((c) => (p.categories ?? [p.category]).includes(c))),
    )
    .slice(0, 4);
  const roundedRating = Math.round(p.rating);

  useEffect(() => {
    setActiveImage(gallery[0]);
    setPack(p.gramOptions[0] ?? p.packSize);
  }, [gallery, p.gramOptions, p.packSize]);

  return (
    <>
      <div className="container-x pt-8">
        <Breadcrumb
          items={[
            { label: "Home", to: "/" },
            { label: "Shop", to: "/shop" },
            { label: p.category, to: `/category/${p.category.toLowerCase().replace(" ", "-")}` },
            { label: p.name },
          ]}
        />
      </div>
      <section className="container-x grid gap-8 py-8 md:py-10 lg:grid-cols-2 lg:gap-16">
        <div className="min-w-0">
          <div className="aspect-square overflow-hidden rounded-3xl bg-muted shadow-soft">
            <img src={activeImage} alt={p.name} className="h-full w-full object-cover" />
          </div>
          {gallery.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-5 sm:gap-3">
              {gallery.map((image, index) => (
                <button
                  key={image}
                  onClick={() => setActiveImage(image)}
                  className={`aspect-square overflow-hidden rounded-xl border bg-muted ${activeImage === image ? "border-secondary" : "border-transparent"}`}
                  aria-label={`View product image ${index + 1}`}
                >
                  <img src={image} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <div className="break-words text-xs uppercase tracking-[0.25em] text-secondary">
            {p.category} · {p.subcategory}
          </div>
          <h1 className="mt-2 break-words font-serif text-3xl md:text-5xl">{p.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            <span className="flex shrink-0 text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < roundedRating ? "fill-current" : ""}`} />
              ))}
            </span>
            <span className="text-muted-foreground">
              {p.rating > 0 ? `${p.rating} · ${p.reviewsCount} reviews` : "No reviews yet"}
            </span>
          </div>
          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-serif text-3xl">{p.priceLabel ?? rupees.format(p.price)}</span>
            {p.oldPrice && (
              <span className="text-muted-foreground line-through">
                {rupees.format(p.oldPrice)}
              </span>
            )}
          </div>
          <p className="mt-5 text-muted-foreground leading-relaxed">{p.description}</p>

          <div className="mt-7">
            <div className="text-sm font-medium mb-2">Pack Size</div>
            <div className="flex flex-wrap gap-2">
              {p.gramOptions.map((g) => (
                <button
                  key={g}
                  onClick={() => setPack(g)}
                  className={`rounded-full border px-4 py-2 text-sm ${pack === g ? "bg-primary text-primary-foreground border-primary" : "hover:border-foreground"}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="inline-flex w-fit items-center rounded-full border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3">
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="p-3">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => add(p, qty, pack)}
              className="inline-flex w-full flex-1 items-center justify-center gap-2 rounded-full btn-saffron px-6 py-3.5 font-medium"
            >
              <ShoppingBag className="h-4 w-4" /> Add to Cart
            </button>
          </div>
          <Link
            to="/checkout"
            onClick={() => add(p, qty, pack)}
            className="mt-3 block w-full text-center btn-outline-dark rounded-full px-6 py-3.5 font-medium"
          >
            Buy Now
          </Link>

          <div className="mt-8 grid grid-cols-1 gap-3 text-xs text-muted-foreground sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 shrink-0 text-secondary" /> 7-day dispatch
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 shrink-0 text-secondary" /> Secure payments
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4 shrink-0 text-secondary" /> Handcrafted
            </div>
          </div>
        </div>
      </section>

      <section className="container-x grid gap-6 py-10 md:grid-cols-2 md:gap-10 md:py-12">
        <div className="rounded-2xl border bg-card p-5 sm:p-7">
          <h2 className="font-serif text-2xl mb-4">Fragrance Profile</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <span className="text-muted-foreground">Top:</span> {p.fragranceProfile.top}
            </li>
            <li>
              <span className="text-muted-foreground">Heart:</span> {p.fragranceProfile.heart}
            </li>
            <li>
              <span className="text-muted-foreground">Base:</span> {p.fragranceProfile.base}
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border bg-card p-5 sm:p-7">
          <h2 className="font-serif text-2xl mb-4">Best Used For</h2>
          <div className="flex flex-wrap gap-2">
            {p.bestFor.map((b) => (
              <span key={b} className="rounded-full bg-muted px-3 py-1 text-sm">
                {b}
              </span>
            ))}
          </div>
          <h3 className="font-serif text-lg mt-6 mb-2">Usage Instructions</h3>
          <p className="text-sm text-muted-foreground">{p.usageInstructions}</p>
          <h3 className="font-serif text-lg mt-6 mb-2">Shipping</h3>
          <p className="text-sm text-muted-foreground">
            Usually dispatched within 7 days. Delivered pan-India.
          </p>
        </div>
      </section>

      <section className="container-x py-12">
        <h2 className="mb-8 break-words font-serif text-3xl">You may also love</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((r) => (
            <ProductCard key={r.id} p={r} />
          ))}
        </div>
      </section>
    </>
  );
}
