import { Link } from "@tanstack/react-router";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";

const rupees = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });

export function CartDrawer() {
  const { open, setOpen, items, subtotal, setQty, remove } = useCart();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-foreground/40 fade-in" onClick={() => setOpen(false)}>
      <aside
        className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-background flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-5 border-b">
          <span className="font-serif text-xl">Your Cart</span>
          <button onClick={() => setOpen(false)} className="p-1.5 rounded-full hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="h-full grid place-items-center text-center">
              <div>
                <p className="font-serif text-lg">Your cart is waiting for fragrance.</p>
                <Link
                  to="/shop"
                  onClick={() => setOpen(false)}
                  className="mt-4 inline-block btn-saffron rounded-full px-5 py-2.5 text-sm"
                >
                  Start Shopping
                </Link>
              </div>
            </div>
          ) : (
            items.map((it) => (
              <div key={it.product.id + it.pack} className="flex gap-3 py-4 border-b">
                <img
                  src={it.product.image}
                  alt={it.product.name}
                  className="h-20 w-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="font-medium leading-tight">{it.product.name}</div>
                  <div className="text-xs text-muted-foreground">{it.pack}</div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="inline-flex items-center border rounded-full">
                      <button
                        onClick={() => setQty(it.product.id, it.pack, it.qty - 1)}
                        className="p-1.5"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-2 text-sm">{it.qty}</span>
                      <button
                        onClick={() => setQty(it.product.id, it.pack, it.qty + 1)}
                        className="p-1.5"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="font-semibold">{rupees.format(it.qty * it.product.price)}</div>
                  </div>
                </div>
                <button
                  onClick={() => remove(it.product.id, it.pack)}
                  aria-label="Remove"
                  className="self-start p-1.5 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <footer className="p-5 border-t space-y-3">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-semibold">{rupees.format(subtotal)}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Shipping calculated at checkout · Usually dispatched within 7 days.
            </p>
            <Link
              to="/checkout"
              onClick={() => setOpen(false)}
              className="block w-full text-center btn-saffron rounded-full px-5 py-3 font-medium"
            >
              Proceed to Checkout
            </Link>
            <Link
              to="/cart"
              onClick={() => setOpen(false)}
              className="block w-full text-center text-sm text-muted-foreground hover:text-foreground"
            >
              View Cart
            </Link>
          </footer>
        )}
      </aside>
    </div>
  );
}
