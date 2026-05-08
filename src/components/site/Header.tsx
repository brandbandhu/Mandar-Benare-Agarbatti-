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
      <div className="bg-nav text-nav-foreground text-[11px] sm:text-xs border-b border-border/70">
        <div className="container-x flex items-center justify-center py-2 text-center leading-relaxed">
          <span>
            Free shipping on selected pooja essentials · Fast delivery within 7 days · Trusted
            incense for daily worship
          </span>
        </div>
      </div>
      <header
        className={`sticky top-0 z-40 bg-nav text-nav-foreground border-b border-border/70 backdrop-blur transition-all ${scrolled ? "shadow-card" : ""}`}
      >
        <div className="container-x flex h-16 sm:h-20 md:h-24 items-center justify-between gap-2 sm:gap-4">
          <Link
            to="/"
            className="flex shrink-0 items-center"
            aria-label="Mandar Benare Agarbatti home"
          >
            <img
              src={logoImg}
              alt="Mandar Benare Agarbatti"
              className="h-11 w-auto sm:h-14 md:h-16"
            />
          </Link>
          <nav className="hidden lg:flex items-center gap-4 text-[13px] xl:gap-7 xl:text-sm">
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
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <button
              aria-label="Search"
              onClick={() => setSearch((s) => !s)}
              className="grid h-10 w-10 place-items-center rounded-full hover:bg-primary/10"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              aria-label="Cart"
              onClick={() => setOpen(true)}
              className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-primary/10"
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
              className="grid h-10 w-10 place-items-center rounded-full hover:bg-primary/10 lg:hidden"
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
                  className="w-full rounded-full border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring sm:px-5"
                />
              </form>
            </div>
          </div>
        )}
      </header>
      {mobile && (
        <div className="fixed inset-0 z-50 bg-foreground/40" onClick={() => setMobile(false)}>
          <aside
            className="absolute right-0 top-0 h-full w-full max-w-sm overflow-y-auto bg-background p-5 shadow-soft fade-in sm:p-6"
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
