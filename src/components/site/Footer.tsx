import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import logoImg from "@/assets/logo (1).png";

export function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="container-x grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-14">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-4">
            <Link
              to="/"
              className="inline-flex rounded-md bg-white/95 p-2"
              aria-label="Mandar Benare Agarbatti home"
            >
              <img src={logoImg} alt="Mandar Benare Agarbatti" className="h-12 w-auto" />
            </Link>
          </div>
          <p className="text-sm/6 text-primary-foreground/80">
            Handcrafted agarbatti, dhoop and pooja essentials for purity, prayer and peaceful
            living.
          </p>
          <div className="flex gap-3 mt-5">
            <a
              href="#"
              aria-label="Instagram"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="min-w-0">
          <h4 className="font-serif text-lg mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li>
              <Link to="/category/$slug" params={{ slug: "agarbatti" }}>
                Agarbatti
              </Link>
            </li>
            <li>
              <Link to="/category/$slug" params={{ slug: "dhoop" }}>
                Dhoop & Cup Dhoop
              </Link>
            </li>
            <li>
              <Link to="/category/$slug" params={{ slug: "pooja-samagri" }}>
                Pooja Samagri
              </Link>
            </li>
            <li>
              <Link to="/shop">All Products</Link>
            </li>
          </ul>
        </div>
        <div className="min-w-0">
          <h4 className="font-serif text-lg mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/scent-finder">Scent Finder</Link>
            </li>
          </ul>
        </div>
        <div className="min-w-0">
          <h4 className="font-serif text-lg mb-4">Stay in touch</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80 mb-4">
            <li className="flex gap-2 break-words">
              <Phone className="h-4 w-4 shrink-0 mt-0.5" /> +91 98000 00000
            </li>
            <li className="flex gap-2 break-all">
              <Mail className="h-4 w-4 shrink-0 mt-0.5" /> hello@mandarbenare.in
            </li>
            <li className="flex gap-2 break-words">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5" /> Maharashtra, India
            </li>
          </ul>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-2 sm:max-w-md sm:flex-row lg:flex-col xl:flex-row"
          >
            <input
              placeholder="Your email"
              className="min-w-0 flex-1 rounded-full px-4 py-2 text-sm text-foreground sm:rounded-l-full sm:rounded-r-none lg:rounded-full xl:rounded-l-full xl:rounded-r-none"
            />
            <button className="rounded-full bg-accent text-accent-foreground px-4 py-2 text-sm font-medium sm:rounded-l-none sm:rounded-r-full lg:rounded-full xl:rounded-l-none xl:rounded-r-full">
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-5 text-center text-xs text-primary-foreground/70 md:flex-row md:justify-between md:text-left">
          <span>© {new Date().getFullYear()} Mandar Benare Agarbatti. All rights reserved.</span>
          <span>Crafted with devotion in India.</span>
        </div>
      </div>
    </footer>
  );
}
