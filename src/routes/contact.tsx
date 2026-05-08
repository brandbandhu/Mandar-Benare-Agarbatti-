import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Mandar Benare Agarbatti" }] }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHeader title="Contact Us" subtitle="We'd love to hear from you. Reach out for orders, queries or bulk gifting." crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]} />
      <section className="container-x py-14 grid md:grid-cols-[1.2fr_1fr] gap-10">
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="rounded-2xl border bg-card p-7 space-y-4">
          {sent && <div className="rounded-lg bg-primary/10 text-primary p-4 text-sm">Thank you. Your message has been submitted successfully.</div>}
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name" required />
            <Field label="Email" type="email" required />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Phone Number" />
            <Field label="Subject" />
          </div>
          <label className="block">
            <span className="text-sm font-medium">Message</span>
            <textarea required rows={5} className="mt-1 w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
          </label>
          <button className="btn-saffron rounded-full px-7 py-3 text-sm font-medium">Send Message</button>
        </form>
        <aside className="space-y-5">
          <div className="rounded-2xl border bg-card p-6 space-y-4">
            <h3 className="font-serif text-xl">Get in Touch</h3>
            <p className="flex items-start gap-3 text-sm"><Phone className="h-4 w-4 mt-0.5 text-secondary" /> +91 98000 00000</p>
            <p className="flex items-start gap-3 text-sm"><Mail className="h-4 w-4 mt-0.5 text-secondary" /> hello@mandarbenare.in</p>
            <p className="flex items-start gap-3 text-sm"><MapPin className="h-4 w-4 mt-0.5 text-secondary" /> Maharashtra, India</p>
            <p className="text-sm text-muted-foreground">Mon–Sat · 10:00 AM – 7:00 PM</p>
            <a href="https://wa.me/919800000000" target="_blank" rel="noopener" className="inline-flex items-center gap-2 btn-saffron rounded-full px-5 py-2.5 text-sm font-medium">
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>
          <div className="aspect-video rounded-2xl bg-muted overflow-hidden border">
            <iframe title="map" src="https://www.openstreetmap.org/export/embed.html?bbox=72.5%2C18.9%2C73.2%2C19.3&layer=mapnik" className="w-full h-full" />
          </div>
        </aside>
      </section>
    </>
  );
}
function Field({ label, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input {...rest} className="mt-1 w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
    </label>
  );
}
