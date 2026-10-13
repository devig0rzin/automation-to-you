import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Check, CheckCheck, Globe, Lock, Search, Smartphone, Wrench } from 'lucide-react';
import { useRef, type ReactNode } from 'react';
import Reveal from './Reveal';

/*
  "O que vem pronto": quatro itens principais com uma mini tela que se anima ao aparecer,
  e uma lista curta com o resto. As mini telas usam o Studio Aurora, o mesmo exemplo do topo.
*/

const extras = [
  { icon: Smartphone, title: 'Feito para o celular', copy: 'Testado em telas pequenas antes de tudo, porque é ali que seu cliente está.' },
  { icon: Search, title: 'Pronto para o Google', copy: 'Títulos, descrições, Analytics e Search Console configurados.' },
  { icon: Globe, title: 'Domínio e hospedagem', copy: 'Registramos e configuramos com você. Os acessos ficam no seu nome.' },
  { icon: Wrench, title: 'Manutenção contínua', copy: 'Depois de publicado, a gente continua cuidando do site.', href: '#manutencao' },
];

export default function IncludedSection() {
  return (
    <section id="incluso" className="relative bg-[var(--aty-paper)] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="mx-auto max-w-[1180px]">
        <Reveal className="grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <h2 className="font-display max-w-[16ch] text-[2.4rem] font-bold leading-[1] tracking-[-0.035em] text-[var(--aty-ink)] sm:text-5xl md:text-6xl">
            Um site bonito que não funciona é só um cartaz.
          </h2>
          <p className="max-w-md text-base leading-relaxed text-[var(--aty-muted)] sm:text-lg lg:justify-self-end">
            O que faz o site vender é o que acontece quando alguém clica. Isso pode vir junto no seu, conforme o que o seu
            negócio precisa.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <Tile title="Pagamento de verdade" copy="Pix, cartão ou link de pagamento por Mercado Pago ou Stripe. Testamos a compra inteira antes de publicar." delay={0}>
            <PaymentDemo />
          </Tile>
          <Tile title="Contato que chega em você" copy="Cada formulário avisa no seu WhatsApp e pode ir também para uma planilha ou CRM." delay={0.08}>
            <WhatsAppDemo />
          </Tile>
          <Tile title="Agendamento online" copy="O cliente escolhe o horário no site e você recebe a confirmação, sem troca de mensagem." delay={0}>
            <ScheduleDemo />
          </Tile>
          <Tile title="Rápido de abrir" copy="Imagens otimizadas e código enxuto, para o site não travar no 4G nem perder cliente na espera." delay={0.08}>
            <SpeedDemo />
          </Tile>
        </div>

        <ul className="mt-5 grid gap-px overflow-hidden rounded-[22px] border border-[var(--aty-line)] bg-[var(--aty-line)] sm:grid-cols-2 lg:grid-cols-4">
          {extras.map(({ icon: Icon, title, copy, href }) => (
            <li key={title} className="bg-white p-6">
              <Icon className="h-5 w-5 text-[var(--aty-blue)]" strokeWidth={1.8} />
              <h3 className="font-display mt-4 text-lg font-semibold tracking-[-0.01em] text-[var(--aty-ink)]">
                {href ? (
                  <a href={href} className="underline decoration-[var(--aty-line)] decoration-2 underline-offset-4 hover:decoration-[var(--aty-blue)]">
                    {title}
                  </a>
                ) : (
                  title
                )}
              </h3>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-[var(--aty-muted)]">{copy}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Tile({ title, copy, delay, children }: { title: string; copy: string; delay: number; children: ReactNode }) {
  return (
    <Reveal as="article" delay={delay} className="overflow-hidden rounded-[22px] border border-[var(--aty-line)] bg-white">
      <div className="relative flex h-[230px] items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#f2f6fc,#e9f0f9)] px-5 sm:h-[250px]">
        {children}
      </div>
      <div className="p-6 sm:p-7">
        <h3 className="font-display text-xl font-semibold tracking-[-0.015em] text-[var(--aty-ink)] sm:text-2xl">{title}</h3>
        <p className="mt-2 max-w-[48ch] text-[15px] leading-relaxed text-[var(--aty-muted)]">{copy}</p>
      </div>
    </Reveal>
  );
}

// Dispara a animação da mini tela quando ela entra na tela
function useDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  const reduce = useReducedMotion();
  const on = inView || Boolean(reduce);
  const t = (delay: number) => (reduce ? { duration: 0 } : { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const });
  return { ref, on, t };
}

function PaymentDemo() {
  const { ref, on, t } = useDemo();
  return (
    <div ref={ref} className="w-full max-w-[300px] rounded-2xl border border-[var(--aty-line)] bg-white p-4 shadow-[0_24px_50px_-28px_rgba(10,26,51,0.45)]">
      <div className="flex items-center justify-between text-[13px]">
        <span className="font-semibold text-[var(--aty-ink)]">Limpeza de pele</span>
        <span className="tabular-nums text-[var(--aty-ink)]">R$ 180,00</span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-1.5 rounded-xl bg-[#eef3f9] p-1 text-[12px] font-semibold">
        <span className="rounded-lg bg-white py-1.5 text-center text-[var(--aty-blue)] shadow-sm">Pix</span>
        <span className="py-1.5 text-center text-[var(--aty-muted)]">Cartão</span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <QrMark />
        <div className="text-[11.5px] leading-snug text-[var(--aty-muted)]">Escaneie com o app do banco ou copie o código Pix.</div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.96 }}
        animate={on ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={t(0.6)}
        className="mt-3 flex items-center gap-2 rounded-xl bg-[#e3f7ec] px-3 py-2 text-[12.5px] font-semibold text-[#0d8a50]"
      >
        <Check className="h-4 w-4" />
        Pagamento aprovado
      </motion.div>
    </div>
  );
}

function QrMark() {
  // Padrão fixo só para ilustrar um QR code
  const cells = '1110111101001110101111001011010110111010011100101101110011110111';
  return (
    <div className="grid h-14 w-14 shrink-0 grid-cols-8 gap-[2px] rounded-md border border-[var(--aty-line)] p-1">
      {cells.split('').map((c, i) => (
        <span key={i} className={c === '1' ? 'bg-[var(--aty-ink)]' : 'bg-transparent'} />
      ))}
    </div>
  );
}

function WhatsAppDemo() {
  const { ref, on, t } = useDemo();
  const bubble = 'max-w-[85%] rounded-2xl px-3 py-2 text-[12.5px] leading-snug shadow-sm';
  return (
    <div ref={ref} className="w-full max-w-[300px] rounded-[22px] border border-[var(--aty-line)] bg-[#eef3f0] p-3 shadow-[0_24px_50px_-28px_rgba(10,26,51,0.45)]">
      <div className="mb-2 flex items-center gap-2 px-1">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--aty-blue)] text-[11px] font-bold text-white">SA</span>
        <span className="text-[12.5px] font-semibold text-[var(--aty-ink)]">Site Studio Aurora</span>
      </div>
      <div className="flex flex-col gap-1.5">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={t(0.1)} className={`${bubble} bg-white text-[var(--aty-ink)]`}>
          Novo contato pelo site
          <span className="mt-1 block text-[11.5px] text-[var(--aty-muted)]">Mariana, pelo formulário de agendamento</span>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={t(0.45)} className={`${bubble} bg-white text-[var(--aty-ink)]`}>
          Quer agendar uma limpeza de pele na quinta à tarde.
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={on ? { opacity: 1, y: 0 } : {}}
          transition={t(0.9)}
          className={`${bubble} self-end bg-[#d9fdd3] text-[var(--aty-ink)]`}
        >
          Oi, Mariana! Tenho 14h, pode ser?
          <CheckCheck className="ml-1 inline h-3.5 w-3.5 text-[#53bdeb]" />
        </motion.div>
      </div>
    </div>
  );
}

function ScheduleDemo() {
  const { ref, on, t } = useDemo();
  const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];
  const slots = ['09:00', '10:30', '14:00', '16:30'];
  return (
    <div ref={ref} className="w-full max-w-[320px] rounded-2xl border border-[var(--aty-line)] bg-white p-4 shadow-[0_24px_50px_-28px_rgba(10,26,51,0.45)]">
      <div className="text-[13px] font-semibold text-[var(--aty-ink)]">Escolha um horário</div>
      <div className="mt-3 grid grid-cols-5 gap-1.5">
        {days.map((day, i) => (
          <motion.span
            key={day}
            animate={on && i === 3 ? { backgroundColor: '#0b57b5', color: '#ffffff' } : {}}
            transition={t(0.3)}
            className="rounded-lg bg-[#eef3f9] py-1.5 text-center text-[12px] font-semibold text-[var(--aty-muted)]"
          >
            {day}
          </motion.span>
        ))}
      </div>
      <div className="mt-2.5 grid grid-cols-4 gap-1.5">
        {slots.map((slot, i) => (
          <motion.span
            key={slot}
            animate={on && i === 2 ? { borderColor: '#0b57b5', color: '#0b57b5' } : {}}
            transition={t(0.7)}
            className="rounded-lg border border-[var(--aty-line)] py-1.5 text-center text-[12px] tabular-nums text-[var(--aty-ink)]"
          >
            {slot}
          </motion.span>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={on ? { opacity: 1, y: 0 } : {}}
        transition={t(1.05)}
        className="mt-3 flex items-center gap-2 rounded-xl bg-[#e6f0ff] px-3 py-2 text-[12.5px] font-semibold text-[var(--aty-blue)]"
      >
        <Check className="h-4 w-4" />
        Quinta, 14:00 confirmado
      </motion.div>
    </div>
  );
}

function SpeedDemo() {
  const { ref, on, t } = useDemo();
  const rings = ['Desempenho', 'Acessibilidade', 'SEO'];
  const circumference = 2 * Math.PI * 26;
  return (
    <div ref={ref} className="w-full max-w-[330px] rounded-2xl border border-[var(--aty-line)] bg-white p-4 shadow-[0_24px_50px_-28px_rgba(10,26,51,0.45)]">
      <div className="flex items-center gap-2 rounded-lg bg-[#eef3f9] px-2.5 py-1.5 text-[11.5px] text-[var(--aty-muted)]">
        <Lock className="h-3 w-3" />
        studioaurora.com.br
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {rings.map((label, i) => (
          <div key={label} className="flex flex-col items-center gap-1.5">
            <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90" aria-hidden="true">
              <circle cx="32" cy="32" r="26" fill="none" stroke="#e3ebf5" strokeWidth="6" />
              <motion.circle
                cx="32"
                cy="32"
                r="26"
                fill="none"
                stroke="#12b76a"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={on ? { strokeDashoffset: circumference * 0.04 } : {}}
                transition={{ ...t(0.2 + i * 0.15), duration: 1.1 }}
              />
            </svg>
            <span className="text-center text-[11px] font-medium text-[var(--aty-ink)]">{label}</span>
          </div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={on ? { opacity: 1 } : {}}
        transition={t(1.3)}
        className="mt-3 text-center text-[12px] text-[var(--aty-muted)]"
      >
        Medido no celular, com internet 4G
      </motion.div>
    </div>
  );
}
