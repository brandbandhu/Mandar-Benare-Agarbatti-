import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import heroImg from "@/assets/hero.jpg";
import catA from "@/assets/cat-agarbatti.jpg";
import { Leaf, Sparkles, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About — Mandar Benare Agarbatti" },
    { name: "description", content: "Built around the timeless Indian tradition of fragrance, prayer and purity." },
  ]}),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="relative h-[40vh] min-h-[280px]">
        <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/40" />
        <div className="container-x relative h-full flex flex-col justify-end pb-10">
          <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "About" }]} />
          <h1 className="font-serif text-4xl md:text-6xl mt-3">Our Story</h1>
        </div>
      </section>
      <section className="container-x py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-soft">
          <img src={catA} alt="Crafted incense" className="h-full w-full object-cover" />
        </div>
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-secondary">Heritage</span>
          <h2 className="font-serif text-3xl md:text-5xl mt-3">Tradition, Purity, Devotion</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Mandar Benare Agarbatti is built around the timeless Indian tradition of fragrance, prayer and purity. From daily pooja to peaceful meditation, our products are crafted to enrich every spiritual moment.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Each agarbatti, dhoop and pooja samagri is made with carefully selected natural ingredients, refined recipes and a devotional touch carried across generations.
          </p>
        </div>
      </section>
      <section className="bg-muted/40 py-16">
        <div className="container-x grid md:grid-cols-3 gap-6">
          {[
            { i: Leaf, t: "Handcrafted Quality", d: "Made in small batches with traditional techniques." },
            { i: Sparkles, t: "Signature Fragrances", d: "Unique floral, woody and devotional blends." },
            { i: ShieldCheck, t: "Trusted Purity", d: "Tested for quality and devotional integrity." },
          ].map(({ i: Icon, t, d }) => (
            <div key={t} className="rounded-2xl bg-card p-7 shadow-card">
              <Icon className="h-7 w-7 text-secondary" />
              <h3 className="font-serif text-xl mt-3">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="container-x py-20 text-center">
        <h2 className="font-serif text-3xl md:text-4xl">Bring devotion into your home</h2>
        <Link to="/shop" className="mt-6 inline-block btn-saffron rounded-full px-7 py-3.5 text-sm font-medium">Shop the Collection</Link>
      </section>
    </>
  );
}
