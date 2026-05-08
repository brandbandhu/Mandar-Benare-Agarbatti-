import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  qty: number;
  pack: string;
}

interface CartCtx {
  items: CartItem[];
  add: (p: Product, qty?: number, pack?: string) => void;
  remove: (id: number, pack: string) => void;
  setQty: (id: number, pack: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
}

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem("mb_cart");
    if (raw)
      try {
        setItems(JSON.parse(raw));
      } catch {
        localStorage.removeItem("mb_cart");
      }
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("mb_cart", JSON.stringify(items));
  }, [items]);

  const add: CartCtx["add"] = (p, qty = 1, pack) => {
    const usePack = pack ?? p.packSize;
    setItems((prev) => {
      const i = prev.findIndex((x) => x.product.id === p.id && x.pack === usePack);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + qty };
        return next;
      }
      return [...prev, { product: p, qty, pack: usePack }];
    });
    setOpen(true);
  };
  const remove: CartCtx["remove"] = (id, pack) =>
    setItems((prev) => prev.filter((x) => !(x.product.id === id && x.pack === pack)));
  const setQty: CartCtx["setQty"] = (id, pack, qty) =>
    setItems((prev) =>
      prev.map((x) =>
        x.product.id === id && x.pack === pack ? { ...x, qty: Math.max(1, qty) } : x,
      ),
    );
  const clear = () => setItems([]);

  const value = useMemo<CartCtx>(
    () => ({
      items,
      add,
      remove,
      setQty,
      clear,
      open,
      setOpen,
      count: items.reduce((s, i) => s + i.qty, 0),
      subtotal: items.reduce((s, i) => s + i.qty * i.product.price, 0),
    }),
    [items, open],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useCart = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart must be inside CartProvider");
  return v;
};
