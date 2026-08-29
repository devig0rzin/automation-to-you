import { useEffect, useState } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { trackEvent } from '@/lib/analytics';

const floatingWhatsAppUrl =
  'https://wa.me/5511987793213?text=Ol%C3%A1!%20Quero%20saber%20mais%20sobre%20agentes%20de%20IA%20e%20automa%C3%A7%C3%A3o.';

export default function FloatingWhatsApp() {
  const [isSimulatorVisible, setIsSimulatorVisible] = useState(false);
  const [isCapabilitiesVisible, setIsCapabilitiesVisible] = useState(false);

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

  useEffect(() => {
    const capabilities = document.getElementById('servicos');
    if (!capabilities) return;

    const updateVisibility = () => {
      const rect = capabilities.getBoundingClientRect();
      setIsCapabilitiesVisible(rect.top < window.innerHeight * 0.92 && rect.bottom > window.innerHeight * 0.08);
    };

    const observer = new IntersectionObserver(
      ([entry]) => setIsCapabilitiesVisible(entry.isIntersecting),
      { rootMargin: '-8% 0px -8% 0px', threshold: 0.01 },
    );

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);
    observer.observe(capabilities);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, []);

  return (
    <a
      href={floatingWhatsAppUrl}
      target="_blank"
      rel="noreferrer"
      onClick={() =>
        trackEvent('click_whatsapp', {
          cta_location: 'floating_button',
          link_url: floatingWhatsAppUrl,
        })
      }
      className={`floating-whatsapp fixed z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] shadow-[0_16px_38px_rgba(37,211,102,0.34)] transition hover:-translate-y-1 hover:bg-[#20bd5a] hover:shadow-[0_22px_48px_rgba(37,211,102,0.42)] active:scale-95 sm:h-16 sm:w-16 ${
        isSimulatorVisible || isCapabilitiesVisible ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      aria-label="Falar no WhatsApp"
    >
      <WhatsAppIcon variant="inverse" className="h-9 w-9 sm:h-12 sm:w-12" />
    </a>
  );
}
