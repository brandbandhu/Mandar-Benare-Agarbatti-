import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { useCart } from "@/lib/cart";

const rupees = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Mandar Benare Agarbatti" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const nav = useNavigate();
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = "MB" + Math.floor(100000 + Math.random() * 900000);
    clear();
    nav({ to: "/order-success", search: { id: orderId } });
  };
  return (
    <section className="container-x py-10 md:py-14">
      <Breadcrumb
        items={[{ label: "Home", to: "/" }, { label: "Cart", to: "/cart" }, { label: "Checkout" }]}
      />
      <h1 className="font-serif text-4xl mt-3 mb-8">Checkout</h1>
      <form onSubmit={submit} className="grid lg:grid-cols-[1fr_380px] gap-10">
        <div className="space-y-8">
          <Section title="Contact Information">
            <Input name="name" label="Full Name" required />
            <Input name="email" type="email" label="Email" required />
            <Input name="phone" label="Mobile Number" required />
          </Section>
          <Section title="Shipping Address">
            <Input name="addr1" label="Address Line 1" required />
            <Input name="addr2" label="Address Line 2" />
            <div className="grid sm:grid-cols-3 gap-4">
              <Input name="city" label="City" required />
              <Input name="state" label="State" required />
              <Input name="pin" label="PIN Code" required />
            </div>
            <Input name="notes" label="Order Notes" />
          </Section>
          <Section title="Payment Method">
            {["Cash on Delivery", "UPI", "Online Payment"].map((m, i) => (
              <label
                key={m}
                className="flex items-center gap-3 rounded-xl border p-4 cursor-pointer"
              >
                <input
                  type="radio"
                  name="pay"
                  defaultChecked={i === 0}
                  className="accent-secondary"
                />
                <span>{m}</span>
              </label>
            ))}
          </Section>
        </div>
        <aside className="rounded-2xl border bg-card p-6 h-fit space-y-4">
          <h2 className="font-serif text-xl">Order Summary</h2>
          <div className="space-y-3 max-h-72 overflow-y-auto">
            {items.length === 0 && (
              <p className="text-sm text-muted-foreground">Your cart is empty.</p>
            )}
            {items.map((it) => (
              <div key={it.product.id + it.pack} className="flex gap-3 text-sm">
                <img src={it.product.image} alt="" className="h-14 w-14 rounded-lg object-cover" />
                <div className="flex-1">
                  <div className="font-medium leading-tight">{it.product.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {it.pack} × {it.qty}
                  </div>
                </div>
                <div className="font-medium">{rupees.format(it.qty * it.product.price)}</div>
              </div>
            ))}
          </div>
          <div className="border-t pt-3 flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{rupees.format(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{rupees.format(subtotal)}</span>
          </div>
          <button
            disabled={items.length === 0}
            className="w-full btn-saffron rounded-full px-6 py-3.5 font-medium disabled:opacity-50"
          >
            Place Order
          </button>
        </aside>
      </form>
    </section>
  );
}
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <h2 className="font-serif text-xl mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
function Input({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        {...props}
        className="mt-1 w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}
