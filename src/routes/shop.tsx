import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { PageHeader } from "@/components/site/PageHeader";
import { ShopGrid } from "@/components/site/Shop";

export const Route = createFileRoute("/shop")({
  validateSearch: z.object({ q: z.string().optional() }),
  head: () => ({ meta: [{ title: "Shop — Mandar Benare Agarbatti" }, { name: "description", content: "Browse all agarbatti, dhoop and pooja samagri." }] }),
  component: ShopPage,
});

function ShopPage() {
  const { q } = Route.useSearch();
  return (
    <>
      <PageHeader title="Shop" subtitle="Browse our complete collection of devotional fragrances and pooja essentials." crumbs={[{ label: "Home", to: "/" }, { label: "Shop" }]} />
      <section className="container-x py-12 md:py-16">
        <ShopGrid initialQuery={q ?? ""} />
      </section>
    </>
  );
}
