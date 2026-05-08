import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { CheckCircle2, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/order-success")({
  validateSearch: z.object({ id: z.string().optional() }),
  head: () => ({ meta: [{ title: "Thank You — Mandar Benare Agarbatti" }] }),
  component: SuccessPage,
});

function SuccessPage() {
  const { id } = Route.useSearch();
  return (
    <section className="container-x py-20 text-center max-w-xl mx-auto">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground"><CheckCircle2 className="h-10 w-10" /></div>
      <h1 className="font-serif text-4xl mt-6">Thank You for Your Order</h1>
      <p className="text-muted-foreground mt-3">Your order has been received. Our team will contact you soon with confirmation and shipping details.</p>
      {id && <p className="mt-4 text-sm">Order Number: <span className="font-semibold">{id}</span></p>}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/shop" className="btn-saffron rounded-full px-6 py-3 text-sm font-medium">Continue Shopping</Link>
        <a href="https://wa.me/919800000000" target="_blank" rel="noopener" className="inline-flex items-center gap-2 btn-outline-dark rounded-full px-6 py-3 text-sm font-medium">
          <MessageCircle className="h-4 w-4" /> WhatsApp Support
        </a>
      </div>
    </section>
  );
}
