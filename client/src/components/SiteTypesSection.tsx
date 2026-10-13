import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Reveal from './Reveal';
import { useState, type KeyboardEvent } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { trackEvent } from '@/lib/analytics';
import { whatsappLink } from '@/lib/site';

const types = [
  {
    id: 'landing',
    name: 'Landing page',
    short: 'Uma página, um objetivo',
    forWho: 'Para lançar um produto, divulgar um serviço ou receber o tráfego de anúncios do Instagram e do Google.',
    includes: ['Uma página focada em uma única ação', 'Botão e formulário ligados ao WhatsApp', 'Pronta para anúncios, com Analytics', 'Texto pensado para converter'],
    message: 'Oi! Quero um orçamento de landing page.',
  },
  {
    id: 'institucional',
    name: 'Site institucional',
    short: 'A cara do seu negócio na internet',
    forWho: 'Para clínicas, escritórios, prestadores de serviço e lojas físicas que precisam passar confiança e ser encontrados.',
    includes: ['Páginas de serviços, sobre e contato', 'Galeria de trabalhos ou portfólio', 'Configuração no Google', 'Domínio e e-mail profissional'],
    message: 'Oi! Quero um orçamento de site institucional.',
  },
  {
    id: 'vendas',
    name: 'Site com vendas ou agenda',
    short: 'O cliente resolve tudo sozinho',
    forWho: 'Para quem quer vender, receber sinal ou deixar o cliente marcar horário sem precisar responder mensagem por mensagem.',
    includes: ['Pagamento por Pix e cartão', 'Agendamento online com confirmação', 'Avisos no seu WhatsApp', 'Painel para acompanhar pedidos'],
    message: 'Oi! Quero um orçamento de site com pagamento ou agendamento.',
  },
  {
    id: 'sob-medida',
    name: 'Sistema sob medida',
    short: 'Quando planilha não dá mais conta',
    forWho: 'Para quem precisa de área do cliente, CRM, painel interno ou um processo que hoje vive espalhado em planilhas.',
    includes: ['Área do cliente com login', 'CRM ou painel interno', 'Integração com as ferramentas que você já usa', 'Automações entre sistemas'],
    message: 'Oi! Quero conversar sobre um sistema sob medida.',
  },
] as const;

export default function SiteTypesSection() {
  const [active, setActive] = useState(0);
  const current = types[active];
  const link = whatsappLink(current.message);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp' && event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const delta = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : -1;
    const next = (active + delta + types.length) % types.length;
    setActive(next);
    document.getElementById(`tipo-${types[next].id}`)?.focus();
  };

  return (
    <section id="tipos" className="relative bg-white px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="mx-auto max-w-[1180px]">
        <Reveal className="grid gap-6 md:grid-cols-[1fr_0.8fr] md:items-end">
          <h2 className="font-display text-[2.4rem] font-bold leading-[1] tracking-[-0.035em] text-[var(--aty-ink)] sm:text-5xl md:text-6xl">
            Que tipo de site você precisa?
          </h2>
          <p className="max-w-md text-base leading-relaxed text-[var(--aty-muted)] sm:text-lg md:justify-self-end">
            Cada projeto recebe uma proposta fechada, com valor e prazo por escrito. Escolha o mais próximo e a gente
            ajusta na conversa. Todos podem vir com manutenção mensal.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-8">
          <div role="tablist" aria-label="Tipos de site" aria-orientation="vertical" className="grid grid-cols-2 gap-2 lg:flex lg:flex-col">
            {types.map((type, index) => {
              const selected = index === active;
              return (
                <button
                  key={type.id}
                  id={`tipo-${type.id}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls="tipo-painel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(index)}
                  onKeyDown={onKeyDown}
                  className={`rounded-2xl border px-4 py-3.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--aty-blue)] lg:px-6 lg:py-5 ${
                    selected
                      ? 'border-[var(--aty-ink)] bg-[var(--aty-ink)] text-white'
                      : 'border-[var(--aty-line)] bg-white text-[var(--aty-ink)] hover:border-[#b9c7da]'
                  }`}
                >
                  <span className="font-display block text-[15px] font-semibold leading-snug tracking-[-0.015em] sm:text-lg lg:text-xl">{type.name}</span>
                  <span className={`mt-0.5 hidden text-sm lg:block ${selected ? 'text-[#a9b8cf]' : 'text-[var(--aty-muted)]'}`}>{type.short}</span>
                </button>
              );
            })}
          </div>

          <div
            id="tipo-painel"
            role="tabpanel"
            aria-labelledby={`tipo-${current.id}`}
            className="rounded-[22px] border border-[var(--aty-line)] bg-[var(--aty-paper)] p-6 sm:p-9"
          >
            <AnimatePresence mode="wait" initial={false}>
            <motion.div key={current.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}>
            <div className="text-sm font-medium text-[var(--aty-blue)]">{current.short}</div>
            <h3 className="font-display mt-1.5 text-3xl font-bold tracking-[-0.025em] text-[var(--aty-ink)] sm:text-4xl">{current.name}</h3>
            <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-[var(--aty-muted)]">{current.forWho}</p>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {current.includes.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[15px] text-[var(--aty-ink)]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--aty-go)]" />
                  {item}
                </li>
              ))}
            </ul>
            </motion.div>
            </AnimatePresence>

            <div className="mt-9 flex flex-col gap-4 border-t border-[var(--aty-line)] pt-7 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-[var(--aty-muted)]">Valor e prazo vêm na proposta, sem letra miúda.</p>
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('click_whatsapp', { cta_location: 'site_types', site_type: current.id, link_url: link })}
                className="inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-full bg-[var(--aty-ink)] px-6 text-[15px] font-semibold text-white transition hover:bg-[var(--aty-blue)]"
              >
                <WhatsAppIcon variant="inverse" className="h-5 w-5" />
                Pedir orçamento de {current.name.toLowerCase()}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
