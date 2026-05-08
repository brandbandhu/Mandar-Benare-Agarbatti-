import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { products } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/scent-finder")({
  head: () => ({ meta: [{ title: "Scent Finder — Mandar Benare Agarbatti" }] }),
  component: Quiz,
});

const qs = [
  {
    q: "When do you usually use incense?",
    opts: ["Morning Puja", "Meditation", "Evening Relaxation", "Festivals"],
  },
  {
    q: "Which fragrance family do you prefer?",
    opts: ["Floral", "Woody", "Sweet", "Traditional Dhoop"],
  },
  {
    q: "What mood do you want to create?",
    opts: ["Peaceful", "Devotional", "Energizing", "Festive"],
  },
];

function recommend(ans: string[]) {
  const rules: Record<string, (product: (typeof products)[number]) => boolean> = {
    Floral: (p) =>
      /rose|gulab|mogra|jasmine|kewda|champa|floral/i.test(`${p.fragrance} ${p.description}`),
    Woody: (p) => /chandan|sandal|wood|woody|masala/i.test(`${p.fragrance} ${p.description}`),
    Sweet: (p) => /sweet|rose|gulab|mogra|champa|magenta/i.test(`${p.fragrance} ${p.description}`),
    "Traditional Dhoop": (p) => p.categories?.includes("Dhoop") || p.category === "Dhoop",
    Festivals: (p) => p.mood?.includes("Festive Pooja") || p.badge === "Premium",
    "Morning Puja": (p) => p.bestFor.includes("Daily Puja") || p.mood?.includes("Morning Prayers"),
    Meditation: (p) =>
      p.bestFor.includes("Meditation") ||
      /chandan|sandal|meditation|masala/i.test(`${p.fragrance} ${p.description}`),
    Festive: (p) =>
      p.mood?.includes("Festive Pooja") ||
      /premium|gift|diwali/i.test(`${p.name} ${p.subcategory}`),
  };
  const recs = products.filter((p) => ans.some((a) => rules[a]?.(p))).slice(0, 4);
  return recs.length ? recs : products.slice(0, 4);
}

function Quiz() {
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState<string[]>([]);
  const done = step >= qs.length;
  const recs = done ? recommend(ans) : [];
  return (
    <>
      <PageHeader
        title="Find Your Scent"
        subtitle="Answer 3 quick questions to discover your perfect daily fragrance."
        crumbs={[{ label: "Home", to: "/" }, { label: "Scent Finder" }]}
      />
      <section className="container-x py-14 max-w-3xl">
        {!done ? (
          <div className="rounded-2xl border bg-card p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-secondary">
              Step {step + 1} of {qs.length}
            </p>
            <h2 className="font-serif text-2xl md:text-3xl mt-2">{qs[step].q}</h2>
            <div className="grid sm:grid-cols-2 gap-3 mt-6">
              {qs[step].opts.map((o) => (
                <button
                  key={o}
                  onClick={() => {
                    setAns([...ans, o]);
                    setStep(step + 1);
                  }}
                  className="text-left rounded-xl border p-4 hover:border-secondary hover:bg-muted transition-colors"
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="font-serif text-3xl">Your perfect picks</h2>
            <p className="text-muted-foreground mt-2">Hand-selected based on your preferences.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
              {recs.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              <button
                onClick={() => {
                  setAns([]);
                  setStep(0);
                }}
                className="btn-outline-dark rounded-full px-6 py-3 text-sm"
              >
                Retake
              </button>
              <Link to="/shop" className="btn-saffron rounded-full px-6 py-3 text-sm">
                Browse All
              </Link>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
