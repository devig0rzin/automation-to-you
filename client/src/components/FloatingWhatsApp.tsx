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
      className={`fixed bottom-5 right-5 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-transparent transition hover:-translate-y-1 ${
        isSimulatorVisible ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      aria-label="Falar no WhatsApp"
    >
      <WhatsAppIcon className="h-16 w-16 drop-shadow-[0_12px_24px_rgba(37,211,102,0.32)]" />
    </a>
  );
}
