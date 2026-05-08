import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { ShopGrid } from "@/components/site/Shop";

const map: Record<string, { name: "Agarbatti" | "Dhoop" | "Pooja Samagri"; copy: string }> = {
  "agarbatti": { name: "Agarbatti", copy: "Explore premium agarbatti for daily prayer, meditation and home fragrance. Choose from Gulab, Kewda, Mogra, Chandan, Masala Agarbatti and premium devotional fragrances." },
  "dhoop": { name: "Dhoop", copy: "Bring depth, purity and divine aroma to your pooja rituals with dhoop sticks, cup dhoop, dhoop candy, loban, gugul and more." },
  "pooja-samagri": { name: "Pooja Samagri", copy: "Complete your daily worship with essential pooja samagri including Ashtagandha, Chandan Tika, Pure Ghee Batti, Kapoor Dani and Camphor Cones." },
};

export const Route = createFileRoute("/category/$slug")({
  beforeLoad: ({ params }) => { if (!map[params.slug]) throw notFound(); },
  head: ({ params }) => {
    const c = map[params.slug];
    return { meta: c ? [{ title: `${c.name} — Mandar Benare Agarbatti` }, { name: "description", content: c.copy }] : [] };
  },
  component: CategoryPage,
  notFoundComponent: () => <div className="container-x py-20 text-center">Category not found</div>,
  errorComponent: ({ error }) => <div className="container-x py-20 text-center">{error.message}</div>,
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const c = map[slug];
  return (
    <>
      <PageHeader title={c.name} subtitle={c.copy} crumbs={[{ label: "Home", to: "/" }, { label: "Shop", to: "/shop" }, { label: c.name }]} />
      <section className="container-x py-12 md:py-16">
        <ShopGrid initialCategory={c.name} title={c.name.toLowerCase()} />
      </section>
      <section className="bg-muted/40 py-16">
        <div className="container-x max-w-3xl">
          <h2 className="font-serif text-2xl mb-3">About {c.name}</h2>
          <p className="text-muted-foreground leading-relaxed">{c.copy}</p>
        </div>
      </section>
    </>
  );
}
