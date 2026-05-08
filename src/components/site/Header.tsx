import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, Search, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import logoImg from "@/assets/logo (1).png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/category/agarbatti", label: "Agarbatti" },
  { to: "/category/dhoop", label: "Dhoop" },
  { to: "/category/pooja-samagri", label: "Pooja Samagri" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState(false);
  const loc = useLocation();
  useEffect(() => {
    setMobile(false);
    setSearch(false);
  }, [loc.pathname]);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 8);
    f();
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <>
      <div className="bg-nav text-nav-foreground text-xs border-b border-border/70">
        <div className="container-x flex items-center justify-center py-2 text-center">
          <span>
            Free shipping on selected pooja essentials · Fast delivery within 7 days · Trusted
            incense for daily worship
          </span>
        </div>
      </div>
      <header
        className={`sticky top-0 z-40 bg-nav text-nav-foreground border-b border-border/70 backdrop-blur transition-all ${scrolled ? "shadow-card" : ""}`}
      >
        <div className="container-x flex h-20 md:h-24 items-center justify-between gap-4">
          <Link
            to="/"
            className="flex shrink-0 items-center"
            aria-label="Mandar Benare Agarbatti home"
          >
            <img src={logoImg} alt="Mandar Benare Agarbatti" className="h-14 w-auto md:h-16" />
          </Link>
          <nav className="hidden lg:flex items-center gap-7 text-sm">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="link-underline text-nav-foreground/85 hover:text-nav-foreground"
                activeProps={{ className: "text-nav-foreground font-semibold" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              aria-label="Search"
              onClick={() => setSearch((s) => !s)}
              className="p-2 rounded-full hover:bg-primary/10"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              aria-label="Cart"
              onClick={() => setOpen(true)}
              className="relative p-2 rounded-full hover:bg-primary/10"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 grid h-5 w-5 place-items-center rounded-full bg-secondary text-secondary-foreground text-[10px]">
                  {count}
                </span>
              )}
            </button>
            <button
              aria-label="Menu"
              onClick={() => setMobile(true)}
              className="lg:hidden p-2 rounded-full hover:bg-primary/10"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
        {search && (
          <div className="border-t bg-background">
            <div className="container-x py-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const v = (e.currentTarget.q as HTMLInputElement).value;
                  window.location.href = `/shop?q=${encodeURIComponent(v)}`;
                }}
              >
                <input
                  name="q"
                  autoFocus
                  placeholder="Search agarbatti, dhoop, pooja samagri..."
                  className="w-full rounded-full border bg-background px-5 py-3 outline-none focus:ring-2 focus:ring-ring"
                />
              </form>
            </div>
          </div>
        )}
      </header>
      {mobile && (
        <div className="fixed inset-0 z-50 bg-foreground/40" onClick={() => setMobile(false)}>
          <aside
            className="absolute right-0 top-0 h-full w-80 max-w-[85%] bg-background p-6 fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <span className="font-serif text-xl">Menu</span>
              <button onClick={() => setMobile(false)} className="p-2">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-4 text-base">
              {nav.map((n) => (
                <Link key={n.to} to={n.to} className="py-2 border-b border-border/60">
                  {n.label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
