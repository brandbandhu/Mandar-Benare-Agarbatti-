import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppFab } from "./WhatsApp";
import { CartDrawer } from "./CartDrawer";
import { CartProvider } from "@/lib/cart";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <Header />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
      <WhatsAppFab />
      <CartDrawer />
    </CartProvider>
  );
}
