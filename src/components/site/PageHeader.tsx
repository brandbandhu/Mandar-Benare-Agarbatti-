import { Breadcrumb } from "./Breadcrumb";

export function PageHeader({
  title,
  subtitle,
  crumbs,
}: {
  title: string;
  subtitle?: string;
  crumbs: { label: string; to?: string }[];
}) {
  return (
    <section className="bg-muted/40 border-b">
      <div className="container-x py-10 md:py-16">
        <Breadcrumb items={crumbs} />
        <h1 className="mt-3 break-words font-serif text-3xl sm:text-4xl md:text-5xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-3xl text-muted-foreground">{subtitle}</p>}
      </div>
    </section>
  );
}
