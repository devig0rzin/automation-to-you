import Reveal from './Reveal';
import WhatsAppIcon from './WhatsAppIcon';
import { trackEvent } from '@/lib/analytics';
import { whatsappLink } from '@/lib/site';

const link = whatsappLink('Oi! Quero tirar meu site do papel. Posso contar o que preciso?');

export default function FinalCTA() {
  return (
    <section id="contato" className="relative bg-[var(--aty-paper)] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <Reveal className="mx-auto max-w-[1180px] text-center">
        <h2 className="font-display mx-auto max-w-[16ch] text-balance text-[2.6rem] font-bold leading-[0.98] tracking-[-0.04em] text-[var(--aty-ink)] sm:text-6xl md:text-7xl">
          Conta para a gente o que o seu negócio precisa.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[var(--aty-muted)] sm:text-lg">
          Uma mensagem no WhatsApp já basta. A gente responde com as perguntas certas e uma proposta feita para você,
          não um orçamento genérico.
        </p>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent('click_whatsapp', { cta_location: 'final_cta', link_url: link })}
          className="mt-10 inline-flex min-h-[58px] items-center justify-center gap-3 rounded-full bg-[var(--aty-ink)] px-8 text-base font-semibold text-white shadow-[0_24px_50px_-20px_rgba(10,26,51,0.6)] transition hover:bg-[var(--aty-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--aty-blue)] focus-visible:ring-offset-4"
        >
          <WhatsAppIcon variant="inverse" className="h-6 w-6" />
          Falar no WhatsApp
        </a>
      </Reveal>
    </section>
  );
}
