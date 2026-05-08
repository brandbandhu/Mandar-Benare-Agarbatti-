import { MessageCircle } from "lucide-react";
export function WhatsAppFab() {
  const msg = encodeURIComponent("Hello, I am interested in Mandar Benare Agarbatti products.");
  return (
    <a href={`https://wa.me/919800000000?text=${msg}`} target="_blank" rel="noopener" aria-label="WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-soft hover:scale-105 transition-transform">
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
