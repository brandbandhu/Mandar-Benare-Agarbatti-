import { Breadcrumb } from "./Breadcrumb";
export function PageHeader({ title, subtitle, crumbs }: { title: string; subtitle?: string; crumbs: { label: string; to?: string }[] }) {
  return (
    <section className="bg-muted/40 border-b">
      <div className="container-x py-12 md:py-16">
        <Breadcrumb items={crumbs} />
        <h1 className="font-serif text-4xl md:text-5xl mt-3">{title}</h1>
        {subtitle && <p className="text-muted-foreground mt-3 max-w-2xl">{subtitle}</p>}
      </div>
    </section>
  );
}
