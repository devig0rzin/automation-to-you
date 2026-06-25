import { useEffect, useState } from 'react';
import WhatsAppIcon from './WhatsAppIcon';

export default function FloatingWhatsApp() {
  const [isSimulatorVisible, setIsSimulatorVisible] = useState(false);

  useEffect(() => {
    const simulator = document.getElementById('simulador-agente');
    if (!simulator) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsSimulatorVisible(entry.isIntersecting),
      { threshold: 0.12 },
    );

    observer.observe(simulator);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href="https://wa.me/5511987793213?text=Ol%C3%A1!%20Quero%20saber%20mais%20sobre%20agentes%20de%20IA%20e%20automa%C3%A7%C3%A3o."
      target="_blank"
      rel="noreferrer"
      className={`floating-whatsapp fixed z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_16px_38px_rgba(37,211,102,0.34)] transition hover:-translate-y-1 hover:bg-[#20bd5a] hover:shadow-[0_22px_48px_rgba(37,211,102,0.42)] active:scale-95 sm:h-16 sm:w-16 ${
        isSimulatorVisible ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      aria-label="Falar no WhatsApp"
    >
      <WhatsAppIcon variant="inverse" className="h-10 w-10 sm:h-12 sm:w-12" />
    </a>
  );
}
