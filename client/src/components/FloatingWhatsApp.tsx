import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/?text=Ol%C3%A1!%20Quero%20saber%20mais%20sobre%20agentes%20de%20IA%20e%20automa%C3%A7%C3%A3o."
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_14px_35px_rgba(37,211,102,0.35)] transition hover:-translate-y-1 hover:bg-[#20bd5a]"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
