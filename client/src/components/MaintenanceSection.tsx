import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Check, HardDriveDownload, LineChart, MessageCircle, PencilLine, ShieldCheck } from 'lucide-react';
import { useRef } from 'react';
import Reveal from './Reveal';
import WhatsAppIcon from './WhatsAppIcon';
import { trackEvent } from '@/lib/analytics';
import { whatsappLink } from '@/lib/site';

// Confira se esta lista bate com o que o plano de manutenção da ATY inclui hoje
const included = [
  { icon: PencilLine, title: 'Alterações no dia a dia', copy: 'Trocar preço, foto, texto, horário ou incluir um serviço novo. Você pede no WhatsApp e a gente faz.' },
  { icon: ShieldCheck, title: 'Segurança em dia', copy: 'Certificado de segurança, atualizações e cuidado com o que roda por trás do site.' },
  { icon: HardDriveDownload, title: 'Cópias de segurança', copy: 'Se algo der errado, dá para voltar o site como estava.' },
  { icon: LineChart, title: 'De olho no resultado', copy: 'Acompanhamos visitas e contatos e sugerimos melhorias quando algo pode render mais.' },
  { icon: MessageCircle, title: 'Suporte direto', copy: 'Você fala com quem desenvolveu o site, sem abrir chamado e esperar fila.' },
];

const link = whatsappLink('Oi! Quero saber do pacote de site com manutenção.');

export default function MaintenanceSection() {
  return (
    <section id="manutencao" className="relative bg-[var(--aty-paper)] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="mx-auto grid max-w-[1180px] gap-14 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:gap-16">
        <div>
          <Reveal>
            <div className="text-sm font-medium text-[var(--aty-blue)]">Pacote completo</div>
            <h2 className="font-display mt-2 max-w-[15ch] text-[2.4rem] font-bold leading-[1] tracking-[-0.035em] text-[var(--aty-ink)] sm:text-5xl md:text-6xl">
              Site no ar não é fim de projeto.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-[var(--aty-muted)] sm:text-lg">
              A gente desenvolve o seu site do zero e continua cuidando dele depois. Você não precisa caçar outro programador
              quando quiser trocar um preço ou quando alguma coisa parar de funcionar.
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {included.map(({ icon: Icon, title, copy }, index) => (
              <Reveal as="li" key={title} delay={index * 0.05} y={18}>
                <div className="flex items-center gap-2.5">
                  <Icon className="h-[18px] w-[18px] text-[var(--aty-blue)]" strokeWidth={1.8} />
                  <h3 className="font-display text-lg font-semibold tracking-[-0.01em] text-[var(--aty-ink)]">{title}</h3>
                </div>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-[var(--aty-muted)]">{copy}</p>
              </Reveal>
            ))}
          </ul>

          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent('click_whatsapp', { cta_location: 'maintenance', link_url: link })}
            className="mt-10 inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-[var(--aty-ink)] px-6 text-[15px] font-semibold text-white transition hover:bg-[var(--aty-blue)]"
          >
            <WhatsAppIcon variant="inverse" className="h-5 w-5" />
            Quero site com manutenção
          </a>
        </div>

        <Reveal delay={0.1}>
          <StatusPanel />
        </Reveal>
      </div>
    </section>
  );
}

// Painel ilustrativo do Studio Aurora (negócio fictício do topo) sendo acompanhado
function StatusPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduce = useReducedMotion();
  const on = inView || Boolean(reduce);
  const days = 30;

  const log = [
    ['Hoje', 'Preço da drenagem atualizado', 'Pedido pelo WhatsApp'],
    ['Ontem', 'Cópia de segurança feita', 'Automática'],
    ['Seg', 'Foto nova na página de tratamentos', 'Pedido pelo WhatsApp'],
    ['Sex', 'Certificado de segurança renovado', 'Automática'],
  ] as const;

  return (
    <div ref={ref} className="rounded-[26px] border border-[var(--aty-line)] bg-white p-5 shadow-[0_40px_80px_-40px_rgba(10,26,51,0.45)] sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[13px] text-[var(--aty-muted)]">studioaurora.com.br</div>
          <div className="font-display mt-0.5 text-xl font-semibold text-[var(--aty-ink)]">Manutenção do site</div>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-[#e3f7ec] px-2.5 py-1 text-[12px] font-semibold text-[#0d8a50]">
          <span className="relative flex h-2 w-2">
            {!reduce && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#12b76a] opacity-60" />}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#12b76a]" />
          </span>
          No ar
        </span>
      </div>

      <div className="mt-6">
        <div className="flex items-baseline justify-between text-[12.5px] text-[var(--aty-muted)]">
          <span>Últimos 30 dias</span>
          <span>Online o tempo todo</span>
        </div>
        <div className="mt-2 flex h-9 items-end gap-[3px]" aria-hidden="true">
          {Array.from({ length: days }, (_, i) => (
            <motion.span
              key={i}
              className="flex-1 origin-bottom rounded-[3px] bg-[#12b76a]"
              initial={{ scaleY: reduce ? 1 : 0.15, opacity: reduce ? 1 : 0.3 }}
              animate={on ? { scaleY: 1, opacity: 1 } : {}}
              transition={reduce ? { duration: 0 } : { duration: 0.4, delay: i * 0.025 }}
              style={{ height: '100%' }}
            />
          ))}
        </div>
      </div>

      <div className="mt-7 text-[13px] font-semibold text-[var(--aty-ink)]">Últimas atividades</div>
      <ul className="mt-3 divide-y divide-[var(--aty-line)]">
        {log.map(([when, what, how], i) => (
          <motion.li
            key={what}
            className="flex items-start gap-3 py-3"
            initial={reduce ? false : { opacity: 0, x: 12 }}
            animate={on ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.5 + i * 0.12 }}
          >
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e6f0ff] text-[var(--aty-blue)]">
              <Check className="h-3.5 w-3.5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[14px] text-[var(--aty-ink)]">{what}</span>
              <span className="block text-[12.5px] text-[var(--aty-muted)]">{how}</span>
            </span>
            <span className="shrink-0 text-[12.5px] tabular-nums text-[var(--aty-muted)]">{when}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
