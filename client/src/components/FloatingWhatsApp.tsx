import { useEffect, useState } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { trackEvent } from '@/lib/analytics';
import { whatsappLink } from '@/lib/site';

const floatingWhatsAppUrl = whatsappLink('Oi! Vim pelo site e quero conversar sobre um site para o meu negócio.');

// Aparece depois da primeira tela e some onde já existe um botão de WhatsApp grande
const HIDE_ON = ['simulador-agente', 'contato'];

export default function FloatingWhatsApp() {
  const [pastFirstScreen, setPastFirstScreen] = useState(false);
  const [overlapping, setOverlapping] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const onScroll = () => setPastFirstScreen(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) =>
        setOverlapping((current) => {
          const next = { ...current };
          entries.forEach((entry) => {
            next[entry.target.id] = entry.isIntersecting;
          });
          return next;
        }),
      { threshold: 0.15 },
    );
    HIDE_ON.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const visible = pastFirstScreen && !Object.values(overlapping).some(Boolean);

  return (
    <a
      href={floatingWhatsAppUrl}
      target="_blank"
      rel="noreferrer"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      onClick={() => trackEvent('click_whatsapp', { cta_location: 'floating_button', link_url: floatingWhatsAppUrl })}
      className={`fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_16px_38px_rgba(37,211,102,0.34)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#20bd5a] sm:bottom-7 sm:right-7 sm:h-16 sm:w-16 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
      aria-label="Falar no WhatsApp"
    >
      <WhatsAppIcon variant="inverse" className="h-9 w-9 sm:h-11 sm:w-11" />
    </a>
  );
}
