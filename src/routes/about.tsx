import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import heroImg from "@/assets/hero.jpg";
import catA from "@/assets/cat-agarbatti.jpg";
import { Leaf, Sparkles, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Mandar Benare Agarbatti" },
      {
        name: "description",
        content: "Built around the timeless Indian tradition of fragrance, prayer and purity.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="relative h-[36vh] min-h-[240px] sm:min-h-[280px]">
        <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/40" />
        <div className="container-x relative flex h-full flex-col justify-end pb-8 sm:pb-10">
          <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "About" }]} />
          <h1 className="mt-3 break-words font-serif text-3xl sm:text-4xl md:text-6xl">
            Our Story
          </h1>
        </div>
      </section>
      <section className="container-x grid items-center gap-10 py-14 md:grid-cols-2 md:gap-12 md:py-24">
        <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-soft">
          <img src={catA} alt="Crafted incense" className="h-full w-full object-cover" />
        </div>
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-secondary">Heritage</span>
          <h2 className="mt-3 break-words font-serif text-3xl md:text-5xl">
            Tradition, Purity, Devotion
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Mandar Benare Agarbatti is built around the timeless Indian tradition of fragrance,
            prayer and purity. From daily pooja to peaceful meditation, our products are crafted to
            enrich every spiritual moment.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Each agarbatti, dhoop and pooja samagri is made with carefully selected natural
            ingredients, refined recipes and a devotional touch carried across generations.
          </p>
        </div>
      </section>
      <section className="bg-muted/40 py-16">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              i: Leaf,
              t: "Handcrafted Quality",
              d: "Made in small batches with traditional techniques.",
            },
            {
              i: Sparkles,
              t: "Signature Fragrances",
              d: "Unique floral, woody and devotional blends.",
            },
            {
              i: ShieldCheck,
              t: "Trusted Purity",
              d: "Tested for quality and devotional integrity.",
            },
          ].map(({ i: Icon, t, d }) => (
            <div key={t} className="rounded-2xl bg-card p-5 shadow-card sm:p-7">
              <Icon className="h-7 w-7 text-secondary" />
              <h3 className="font-serif text-xl mt-3">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="container-x py-16 text-center md:py-20">
        <h2 className="break-words font-serif text-3xl md:text-4xl">
          Bring devotion into your home
        </h2>
        <Link
          to="/shop"
          className="mt-6 inline-block w-full rounded-full btn-saffron px-7 py-3.5 text-center text-sm font-medium sm:w-auto"
        >
          Shop the Collection
        </Link>
      </section>
    </>
  );
}
