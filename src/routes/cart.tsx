import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { useCart } from "@/lib/cart";

const rupees = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — Mandar Benare Agarbatti" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, subtotal } = useCart();
  return (
    <section className="container-x py-10 md:py-14">
      <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Cart" }]} />
      <h1 className="mt-3 mb-8 break-words font-serif text-3xl sm:text-4xl">Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-serif text-2xl">Your cart is waiting for fragrance.</p>
          <Link
            to="/shop"
            className="mt-6 inline-block btn-saffron rounded-full px-7 py-3.5 text-sm font-medium"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-4">
            {items.map((it) => (
              <div
                key={it.product.id + it.pack}
                className="flex flex-col gap-4 rounded-2xl border bg-card p-4 sm:flex-row"
              >
                <img
                  src={it.product.image}
                  alt={it.product.name}
                  className="aspect-square w-full rounded-lg object-cover sm:h-24 sm:w-24"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between gap-3">
                    <div className="min-w-0">
                      <div className="break-words font-medium">{it.product.name}</div>
                      <div className="text-xs text-muted-foreground">{it.pack}</div>
                    </div>
                    <button
                      onClick={() => remove(it.product.id, it.pack)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <div className="inline-flex items-center border rounded-full">
                      <button
                        onClick={() => setQty(it.product.id, it.pack, it.qty - 1)}
                        className="p-2"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-3 text-sm">{it.qty}</span>
                      <button
                        onClick={() => setQty(it.product.id, it.pack, it.qty + 1)}
                        className="p-2"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="font-semibold">{rupees.format(it.qty * it.product.price)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <aside className="h-fit space-y-4 rounded-2xl border bg-card p-5 sm:p-6">
            <h2 className="font-serif text-xl">Order Summary</h2>
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{rupees.format(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <input
              placeholder="Coupon code"
              className="w-full rounded-full border bg-background px-4 py-2.5 text-sm"
            />
            <Link
              to="/checkout"
              className="block w-full text-center btn-saffron rounded-full px-6 py-3.5 font-medium"
            >
              Proceed to Checkout
            </Link>
            <Link to="/shop" className="block text-center text-sm text-muted-foreground">
              Continue Shopping
            </Link>
          </aside>
        </div>
      )}
    </section>
  );
}
