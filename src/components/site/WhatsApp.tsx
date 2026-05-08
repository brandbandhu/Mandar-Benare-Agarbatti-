import { MessageCircle } from "lucide-react";
export function WhatsAppFab() {
  const msg = encodeURIComponent("Hello, I am interested in Mandar Benare Agarbatti products.");
  return (
    <a
      href={`https://wa.me/919800000000?text=${msg}`}
      target="_blank"
      rel="noopener"
      aria-label="WhatsApp"
      className="fixed bottom-4 right-4 z-40 grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-soft transition-transform hover:scale-105 sm:bottom-5 sm:right-5 sm:h-14 sm:w-14"
    >
      <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
    </a>
  );
}
