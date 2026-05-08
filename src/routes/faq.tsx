import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [{ title: "FAQ — Mandar Benare Agarbatti" }] }),
  component: FaqPage,
});

const faqs = [
  ["Which agarbatti is best for daily puja?", "Our Hrishikesh and Swami Masala Agarbatti, along with Chandan Black, are loved for daily worship."],
  ["How do I choose the right fragrance?", "Try our Scent Finder quiz — it recommends a fragrance based on your mood and ritual."],
  ["Do you offer dhoop and pooja samagri?", "Yes — explore our full Dhoop and Pooja Samagri categories for a complete ritual setup."],
  ["How long does delivery take?", "Orders are dispatched within 7 days and delivered pan-India in 3–6 working days."],
  ["Can I order through WhatsApp?", "Yes, tap the WhatsApp button at the bottom-right and we'll help you place your order."],
  ["Are bulk orders available?", "Absolutely. Reach out via the contact form for festival gifting and bulk pricing."],
  ["Are secure payments available?", "Yes, we offer COD, UPI and secure online payments."],
  ["How should agarbatti and dhoop be stored?", "Keep in a cool, dry place away from direct sunlight to preserve fragrance."],
];

function FaqPage() {
  return (
    <>
      <PageHeader title="Frequently Asked Questions" crumbs={[{ label: "Home", to: "/" }, { label: "FAQ" }]} />
      <section className="container-x py-14 max-w-3xl">
        <div className="space-y-3">
          {faqs.map(([q, a]) => <Item key={q} q={q} a={a} />)}
        </div>
      </section>
    </>
  );
}
function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border bg-card">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between p-5 text-left">
        <span className="font-medium">{q}</span>
        <ChevronDown className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-5 pb-5 text-sm text-muted-foreground">{a}</div>}
    </div>
  );
}
