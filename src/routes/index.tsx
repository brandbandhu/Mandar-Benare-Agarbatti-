import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";
import heroImg from "@/assets/hero.jpg";
import catA from "@/assets/cat-agarbatti.jpg";
import catD from "@/assets/cat-dhoop.jpg";
import {
  Sparkles,
  Leaf,
  ShieldCheck,
  Truck,
  Flame,
  HeartHandshake,
  ChevronDown,
  Star,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({ component: Home });

const productImage = (match: (product: (typeof products)[number]) => boolean, fallback: string) =>
  products.find(match)?.image ?? fallback;

const categories = [
  {
    name: "Agarbatti",
    to: "/category/agarbatti",
    img: productImage((p) => p.category === "Agarbatti", catA),
  },
  {
    name: "Premium Agarbatti",
    to: "/category/agarbatti",
    img: productImage((p) => p.category === "Agarbatti" && p.badge === "Premium", catA),
  },
  {
    name: "Black Agarbatti",
    to: "/category/agarbatti",
    img: productImage((p) => /black/i.test(p.subcategory), catA),
  },
  {
    name: "Dhoop",
    to: "/category/dhoop",
    img: productImage((p) => p.categories?.includes("Dhoop") || p.category === "Dhoop", catD),
  },
  {
    name: "Cup Dhoop",
    to: "/category/dhoop",
    img: productImage((p) => /cup dhoop/i.test(p.subcategory), catD),
  },
  {
    name: "Dhoop Candy",
    to: "/category/dhoop",
    img: productImage((p) => /candy/i.test(p.subcategory), catD),
  },
];
const moods = [
  "Morning Prayers",
  "Meditation & Yoga",
  "Stress Relief",
  "Festive Pooja",
  "Daily Home Fragrance",
  "Temple Essentials",
];
const why = [
  { i: Leaf, t: "Handcrafted Quality" },
  { i: Sparkles, t: "Unique Fragrances" },
  { i: HeartHandshake, t: "Trusted by Families" },
  { i: ShieldCheck, t: "Secure Payments" },
  { i: Truck, t: "Fast Shipping" },
  { i: Flame, t: "Ideal for Daily Puja" },
];
const faqs = [
  {
    q: "Which agarbatti is best for daily puja?",
    a: "Our Hrishikesh and Swami Masala Agarbatti, along with Chandan Black, are loved for daily worship.",
  },
  { q: "Do you deliver across India?", a: "Yes, we ship pan-India with trusted courier partners." },
  {
    q: "How long does shipping take?",
    a: "Orders are usually dispatched within 7 days and arrive within 3–6 working days after dispatch.",
  },
  {
    q: "Are these products suitable for gifting?",
    a: "Absolutely — our Premium Series is curated for festive gifting.",
  },
];
const reviews = [
  { n: "Aditi S.", t: "Beautiful fragrance and long-lasting quality." },
  { n: "Rohan P.", t: "Perfect for daily puja — the Chandan is divine." },
  { n: "Meera K.", t: "Trusted products for our home temple." },
];

function Home() {
  const best = products.filter((p) => p.badge === "Bestseller").slice(0, 8);
  const featured = products
    .filter((p) => p.badge === "Premium" || /premium/i.test(p.subcategory))
    .slice(0, 5);
  const bestProducts = best.length ? best : products.slice(0, 8);
  const featuredProducts = featured.length ? featured : products.slice(0, 5);
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Premium incense and brass diya"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        </div>
        <div className="container-x relative grid md:grid-cols-2 gap-10 py-20 md:py-32">
          <div className="fade-up">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-secondary">
              <span className="h-px w-8 bg-secondary" /> Since generations
            </span>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mt-4 leading-[1.05] text-foreground">
              Fragrance for Prayer,
              <br /> Peace & Everyday <em className="text-secondary">Devotion</em>
            </h1>
            <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-lg">
              Discover handcrafted agarbatti, dhoop and pooja essentials made to bring purity,
              positivity and calmness into your home.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="btn-saffron rounded-full px-7 py-3.5 text-sm font-medium">
                Shop Now
              </Link>
              <Link
                to="/shop"
                className="btn-outline-dark rounded-full px-7 py-3.5 text-sm font-medium"
              >
                Explore Best Sellers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by category */}
      <section className="container-x py-16 md:py-24">
        <SectionHead
          eyebrow="Collections"
          title="Shop by Category"
          sub="Curated essentials for every devotional moment."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mt-10">
          {categories.map((c) => (
            <Link key={c.name} to={c.to} className="group">
              <div className="aspect-square overflow-hidden rounded-2xl bg-muted hover-zoom shadow-card">
                <img
                  src={c.img}
                  alt={c.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-3 text-center font-serif text-base md:text-lg group-hover:text-secondary">
                {c.name}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Best sellers */}
      <section className="container-x py-10 md:py-16">
        <SectionHead
          eyebrow="Best Sellers"
          title="Most Loved Fragrances"
          sub="Trusted across thousands of Indian homes."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {bestProducts.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      {/* Mood */}
      <section className="bg-muted/40 py-16 md:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Discover" title="Shop by Mood & Scent" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
            {moods.map((m) => (
              <Link
                key={m}
                to="/scent-finder"
                className="group rounded-2xl bg-card border p-6 md:p-8 hover:-translate-y-1 transition-transform shadow-card"
              >
                <Sparkles className="h-6 w-6 text-secondary mb-3" />
                <h3 className="font-serif text-xl md:text-2xl">{m}</h3>
                <p className="text-sm text-muted-foreground mt-2 group-hover:text-foreground">
                  Explore picks →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage */}
      <section className="container-x py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-soft">
          <img
            src={catA}
            alt="Crafted incense"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-secondary">Our Story</span>
          <h2 className="font-serif text-3xl md:text-5xl mt-3">
            Rooted in Tradition, Crafted for Today
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Mandar Benare Agarbatti brings together devotional purity, trusted craftsmanship and
            soothing fragrances for homes that value peace, prayer and positivity.
          </p>
          <Link to="/about" className="mt-7 inline-block link-underline text-foreground">
            Read our story
          </Link>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className="container-x">
          <h2 className="font-serif text-3xl md:text-4xl text-center">Why Choose Mandar Benare</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-12">
            {why.map(({ i: Icon, t }) => (
              <div key={t} className="text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white/10">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <p className="mt-3 text-sm">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container-x py-16 md:py-24">
        <SectionHead eyebrow="Premium" title="Featured Range" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mt-10">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/40 py-16 md:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Reviews" title="Loved by Devotees" />
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {reviews.map((r) => (
              <div key={r.n} className="rounded-2xl bg-card p-7 shadow-card">
                <div className="flex gap-0.5 text-accent mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="font-serif text-lg italic">“{r.t}”</p>
                <p className="mt-4 text-sm text-muted-foreground">— {r.n}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scent finder */}
      <section className="container-x py-20">
        <div className="rounded-3xl bg-secondary text-secondary-foreground p-10 md:p-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl">Not sure which fragrance suits you?</h2>
            <p className="mt-3 opacity-90">
              Take our 3-question scent finder to discover your perfect daily fragrance.
            </p>
          </div>
          <div className="md:text-right">
            <Link
              to="/scent-finder"
              className="inline-block rounded-full bg-background text-foreground px-7 py-3.5 text-sm font-medium hover:opacity-90"
            >
              Find Your Scent
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x py-16">
        <SectionHead eyebrow="Help" title="Frequently Asked" />
        <div className="max-w-3xl mx-auto mt-10 space-y-3">
          {faqs.map((f, i) => (
            <FaqItem key={i} {...f} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-x pb-24">
        <div className="rounded-3xl border bg-card p-10 md:p-14 text-center">
          <h2 className="font-serif text-3xl">Stay in the Fragrance Loop</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Receive devotional offers, festive packs and fragrance recommendations.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex max-w-md mx-auto">
            <input
              placeholder="Email address"
              className="flex-1 rounded-l-full border px-5 py-3 outline-none focus:ring-2 focus:ring-ring"
            />
            <button className="btn-saffron rounded-r-full px-6 py-3 text-sm font-medium">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      {eyebrow && (
        <span className="text-xs uppercase tracking-[0.3em] text-secondary">{eyebrow}</span>
      )}
      <h2 className="font-serif text-3xl md:text-5xl mt-3">{title}</h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </div>
  );
}
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border bg-card">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="font-medium">{q}</span>
        <ChevronDown className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-5 pb-5 text-sm text-muted-foreground">{a}</div>}
    </div>
  );
}
