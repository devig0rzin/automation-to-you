import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { Bot, LayoutDashboard, MonitorSmartphone, Workflow } from 'lucide-react';
import { useRef, useState } from 'react';

const capabilities = [
  {
    icon: MonitorSmartphone,
    number: '01',
    short: 'Presença',
    title: 'Sites que fazem a empresa parecer do tamanho que ela quer ser.',
    description:
      'Criamos páginas rápidas, responsivas e visualmente fortes para apresentar sua oferta com clareza e conduzir o visitante até a ação.',
    deliverables: ['Sites institucionais', 'Landing pages', 'Experiências 3D'],
    outcome: 'Mais percepção de valor antes da primeira conversa.',
  },
  {
    icon: LayoutDashboard,
    number: '02',
    short: 'Produto',
    title: 'Sistemas que organizam o trabalho sem criar mais trabalho.',
    description:
      'Transformamos processos espalhados em produtos digitais claros para clientes, equipes e parceiros operarem no mesmo lugar.',
    deliverables: ['Portais de cliente', 'Dashboards', 'Sistemas internos'],
    outcome: 'Menos improviso e mais visibilidade sobre a operação.',
  },
  {
    icon: Bot,
    number: '03',
    short: 'Conversa',
    title: 'Agentes que atendem com contexto — e sabem quando chamar uma pessoa.',
    description:
      'A IA recebe, entende, qualifica e encaminha cada contato seguindo o tom de voz e as regras reais do negócio.',
    deliverables: ['WhatsApp', 'Qualificação', 'Atendimento contínuo'],
    outcome: 'Respostas mais rápidas sem perder o controle da conversa.',
  },
  {
    icon: Workflow,
    number: '04',
    short: 'Operação',
    title: 'Automações que continuam trabalhando depois que o cliente fecha.',
    description:
      'Conectamos formulários, CRMs, planilhas, APIs e notificações para que a informação avance sem depender de tarefas manuais.',
    deliverables: ['Integrações', 'Rotinas automáticas', 'Dados conectados'],
    outcome: 'Tempo devolvido à equipe e menos erro entre ferramentas.',
  },
] as const;

export default function CapabilitiesStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const activeRef = useRef(0);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = getMobileStoryChapter(value);
    if (next !== activeRef.current) {
      activeRef.current = next;
      setActive(next);
    }
  });

  const handleSelect = (index: number) => {
    activeRef.current = index;
    setActive(index);
  };

  return (
    <section
      ref={sectionRef}
      id="servicos"
      className={`aty-light-detail relative bg-[#f4f7fb]/82 text-slate-950 ${reduceMotion ? '' : 'h-[320vh]'} lg:h-[440vh]`}
    >
      <div className="hidden h-dvh overflow-hidden lg:sticky lg:top-0 lg:block">
        <div className="mx-auto flex h-full max-w-[1440px] flex-col px-12 py-8">
          <header className="grid shrink-0 gap-8 border-b border-slate-200 pb-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#0b57b5]">
                <span className="h-px w-10 bg-[#0b57b5]" />
                Uma parceira para construir e operar
              </div>
              <h2 className="mt-4 max-w-4xl text-balance text-4xl font-bold leading-[0.94] tracking-[-0.045em] xl:text-6xl">
                Do primeiro clique ao processo rodando sozinho.
              </h2>
            </div>
            <div className="pb-1">
              <p className="max-w-xl text-base leading-7 text-slate-600">
                A página fica parada por um instante. Cada movimento revela uma parte do sistema que conecta presença,
                produto, conversa e operação.
              </p>
              <div className="mt-5 flex items-center gap-3 text-sm font-semibold text-slate-500">
                <span className="font-mono text-[#0b57b5]">{capabilities[active].number} / 04</span>
                continue rolando para avançar
              </div>
            </div>
          </header>

          <div className="grid min-h-0 flex-1 gap-12 py-8 lg:grid-cols-[0.88fr_1.12fr] xl:gap-20">
            <SystemMap active={active} onSelect={handleSelect} />
            <ActiveChapter active={active} />
          </div>

          <div className="grid shrink-0 grid-cols-4 gap-3 border-t border-slate-200 pt-5">
            {capabilities.map((capability, index) => (
              <button
                key={capability.short}
                type="button"
                onClick={() => setActive(index)}
                className="group text-left"
              >
                <div className="h-1 overflow-hidden rounded-full bg-slate-200">
                  <motion.div
                    className="h-full origin-left bg-[#0b57b5]"
                    animate={{ scaleX: index <= active ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <div className={`mt-2 text-xs font-bold uppercase tracking-[0.14em] transition ${index === active ? 'text-[#0b57b5]' : 'text-slate-400'}`}>
                  {capability.number} {capability.short}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {reduceMotion ? <MobileStaticCapabilities /> : <MobileStickyCapabilities active={active} />}
    </section>
  );
}

function getMobileStoryChapter(progress: number) {
  if (progress < 0.27) return 0;
  if (progress < 0.52) return 1;
  if (progress < 0.77) return 2;
  return 3;
}

function MobileStickyCapabilities({ active }: { active: number }) {
  const capability = capabilities[active];

  return (
    <div data-mobile-capabilities-stage="true" className="sticky top-0 flex h-[100svh] min-h-[35.5rem] overflow-hidden px-2.5 py-[max(0.6rem,env(safe-area-inset-top))] sm:px-4 lg:hidden">
      <div className="relative mx-auto flex h-full w-full max-w-[30rem] flex-col justify-between overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white/86 p-2.5 shadow-[0_26px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl min-[390px]:rounded-[1.6rem] min-[390px]:p-5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_12%,rgba(14,165,233,0.14),transparent_13rem),radial-gradient(circle_at_15%_78%,rgba(11,87,181,0.08),transparent_12rem)]" />

        <div className="relative mx-auto max-w-[24rem] shrink-0 text-center">
          <div className="mx-auto max-w-[18rem] text-[9px] font-bold uppercase leading-4 tracking-[0.14em] text-[#0b57b5] min-[390px]:max-w-none min-[390px]:text-[10px] min-[390px]:tracking-[0.16em]">
            Uma parceira para construir e operar
          </div>
          <h2 className="mx-auto mt-2 max-w-[20rem] text-balance text-[clamp(1.52rem,7.5vw,2.15rem)] font-bold leading-[1] tracking-[-0.025em] min-[390px]:max-w-[22rem] min-[390px]:text-[clamp(1.78rem,8vw,2.65rem)] min-[390px]:tracking-[-0.035em]">
            Do primeiro clique ao processo rodando sozinho.
          </h2>
          <div className="mt-2 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 min-[390px]:mt-3 min-[390px]:gap-3">
            <span className="font-mono text-[#0b57b5]">{capability.number} / 04</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span>continue rolando</span>
          </div>
        </div>

        <MobileSystemMap active={active} />

        <div className="relative min-h-[12.9rem] shrink-0 rounded-[1.15rem] border border-slate-200/80 bg-white/72 p-3 shadow-[0_16px_42px_rgba(15,23,42,0.07)] min-[390px]:min-h-[15.5rem] min-[390px]:rounded-[1.25rem] min-[390px]:p-4">
          {capabilities.map((item, index) => (
            <MobileCapabilityPanel key={item.title} capability={item} active={active === index} />
          ))}
        </div>

        <div className="relative grid shrink-0 grid-cols-4 gap-2">
          {capabilities.map((item, index) => (
            <div key={item.short}>
              <div className="h-1 overflow-hidden rounded-full bg-slate-200">
                <motion.div
                  className="h-full origin-left bg-[#0b57b5]"
                  animate={{ scaleX: index <= active ? 1 : 0 }}
                  transition={{ duration: 0.34 }}
                />
              </div>
              <div className={`mt-1 text-[9px] font-bold uppercase tracking-[0.08em] ${index === active ? 'text-[#0b57b5]' : 'text-slate-400'}`}>
                {item.number}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileCapabilityPanel({ capability, active }: { capability: (typeof capabilities)[number]; active: boolean }) {
  const Icon = capability.icon;

  return (
    <motion.article
      data-mobile-capability-panel={capability.number}
      data-active={active}
      animate={{
        opacity: active ? 1 : 0,
        y: active ? 0 : 14,
        pointerEvents: active ? 'auto' : 'none',
      }}
      transition={{ duration: 0.34, ease: 'easeOut' }}
      className="absolute inset-3 flex flex-col min-[390px]:inset-4"
    >
      <div className="grid grid-cols-[2.35rem_1fr] items-start gap-2.5 min-[390px]:grid-cols-[2.75rem_1fr] min-[390px]:gap-3">
        <motion.div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.85rem] border border-sky-200 bg-sky-50 text-[#0b57b5] min-[390px]:h-11 min-[390px]:w-11 min-[390px]:rounded-[1rem]"
          animate={{ scale: active ? 1 : 0.82, rotate: active ? 0 : -8 }}
          transition={{ duration: 0.32, ease: 'easeOut' }}
        >
          <Icon className="h-5 w-5" />
        </motion.div>
        <div className="min-w-0">
          <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#0b57b5]">
            {capability.number} / {capability.short}
          </div>
          <h3 className="mt-1 text-[clamp(0.98rem,4.35vw,1.2rem)] font-bold leading-[1.08] tracking-[-0.01em] text-slate-950 min-[390px]:text-[clamp(1.08rem,4.75vw,1.42rem)] min-[390px]:tracking-[-0.015em]">
            {capability.title}
          </h3>
        </div>
      </div>

      <p className="mt-2 line-clamp-2 text-[0.8125rem] leading-5 text-slate-600 min-[390px]:mt-3 min-[390px]:line-clamp-3 min-[390px]:text-sm min-[390px]:leading-6">{capability.description}</p>
      <div className="mt-2 flex flex-wrap gap-1.5 min-[390px]:mt-3">
        {capability.deliverables.map((item) => (
          <span key={item} className="rounded-full border border-sky-100 bg-sky-50 px-2.5 py-1 text-[10px] font-bold text-sky-800">
            {item}
          </span>
        ))}
      </div>
      <div className="mt-2 hidden max-w-[13.2rem] border-t border-slate-200 pt-2 text-[0.7rem] font-bold leading-4 text-slate-900 min-[360px]:block min-[360px]:max-w-none min-[390px]:mt-auto min-[390px]:pt-3 min-[390px]:text-sm min-[390px]:leading-5">
        {capability.outcome}
      </div>
    </motion.article>
  );
}

function MobileSystemMap({ active }: { active: number }) {
  const ActiveIcon = capabilities[active].icon;
  const positions = [
    'left-1/2 top-0 -translate-x-1/2',
    'right-1 top-1/2 -translate-y-1/2',
    'bottom-0 left-1/2 -translate-x-1/2',
    'left-1 top-1/2 -translate-y-1/2',
  ];

  return (
    <div className="relative mx-auto my-1 aspect-square w-[min(64vw,12rem)] shrink-0 min-[390px]:my-4 min-[390px]:w-[min(70vw,18rem)]">
      <motion.div
        className="absolute inset-[18%] rounded-full border border-dashed border-[#0b57b5]/18"
        animate={{ rotate: active * 90 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-[34%] rounded-[1.4rem] border border-sky-200 bg-white shadow-[0_18px_45px_rgba(11,87,181,0.12)]" />
      <AnimatePresence mode="wait">
        <motion.div
          key={capabilities[active].short}
          className="absolute inset-[39%] z-10 flex items-center justify-center rounded-[1rem] bg-[#0b57b5] text-white shadow-[0_0_38px_rgba(11,87,181,0.28)]"
          initial={{ opacity: 0, scale: 0.75, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotate: 15 }}
          transition={{ duration: 0.36 }}
        >
          <ActiveIcon className="h-5 w-5" />
        </motion.div>
      </AnimatePresence>

      {capabilities.map((item, index) => {
        const Icon = item.icon;
        const selected = index === active;
        const complete = index < active;
        return (
          <motion.div
            key={item.short}
            className={`absolute ${positions[index]} z-20 flex w-[4.2rem] flex-col items-center gap-1 rounded-[0.8rem] border px-1 py-1.5 text-center transition min-[390px]:w-[5.5rem] min-[390px]:rounded-[0.9rem] min-[390px]:px-2 min-[390px]:py-2 ${
              selected
                ? 'border-sky-300 bg-sky-50 text-[#0b57b5] shadow-[0_14px_34px_rgba(11,87,181,0.14)]'
                : complete
                  ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
                  : 'border-slate-200 bg-white/80 text-slate-400'
            }`}
            animate={{ scale: selected ? 1.05 : 0.96, opacity: selected || complete ? 1 : 0.72 }}
            transition={{ duration: 0.32 }}
          >
            <Icon className="h-4 w-4" />
            <span className="text-[9px] font-bold uppercase tracking-[0.08em]">{item.short}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

function MobileStaticCapabilities() {
  return (
    <div className="mx-auto px-5 py-20 sm:px-8 sm:py-24 lg:hidden">
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#0b57b5]">Uma parceira para construir e operar</div>
        <h2 className="mt-5 text-balance text-[2.65rem] font-bold leading-[0.96] tracking-[-0.04em] sm:text-5xl">
          Do primeiro clique ao processo rodando sozinho.
        </h2>
        <div className="mt-14 space-y-6">
          {capabilities.map((capability, index) => (
            <MobileChapter key={capability.title} capability={capability} index={index} />
          ))}
        </div>
      </div>
  );
}

function SystemMap({ active, onSelect }: { active: number; onSelect: (index: number) => void }) {
  const ActiveIcon = capabilities[active].icon;
  const positions = [
    'left-1/2 top-0 -translate-x-1/2',
    'right-0 top-1/2 -translate-y-1/2',
    'bottom-0 left-1/2 -translate-x-1/2',
    'left-0 top-1/2 -translate-y-1/2',
  ];

  return (
    <motion.div
      className="relative flex min-h-0 flex-col overflow-hidden rounded-[2rem] bg-[#07111f] p-7 text-white shadow-[0_30px_90px_rgba(7,17,31,0.22)] xl:p-9"
      animate={{ rotateY: active % 2 === 0 ? -1.2 : 1.2, rotateX: active < 2 ? 0.8 : -0.8 }}
      transition={{ duration: 0.7 }}
      style={{ transformPerspective: 1200 }}
    >
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-sky-500/15 blur-3xl" />

      <div className="relative flex items-center justify-between">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">Sistema ATY</div>
          <div className="mt-1 text-sm font-semibold text-white/75">Uma frente alimenta a próxima</div>
        </div>
        <div className="text-xs font-semibold text-emerald-300">fluxo conectado</div>
      </div>

      <div className="relative mx-auto my-auto aspect-square w-full max-w-[380px]">
        <motion.div
          className="absolute inset-[17%] rounded-full border border-dashed border-white/15"
          animate={{ rotate: active * 90 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-[34%] rounded-full border border-white/10 bg-white/[0.04]" />
        <AnimatePresence mode="wait">
          <motion.div
            key={capabilities[active].short}
            className="absolute inset-[38%] z-10 flex items-center justify-center rounded-[1.4rem] border border-sky-400/35 bg-sky-400/12 text-sky-300 shadow-[0_0_55px_rgba(56,189,248,0.2)]"
            initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.7, rotate: 20 }}
            transition={{ duration: 0.42 }}
          >
            <ActiveIcon className="h-8 w-8" />
          </motion.div>
        </AnimatePresence>

        {capabilities.map((capability, index) => {
          const Icon = capability.icon;
          const selected = index === active;
          return (
            <button
              key={capability.short}
              type="button"
              onClick={() => onSelect(index)}
              className={`absolute ${positions[index]} z-20 flex w-28 flex-col items-center gap-2 rounded-[1.15rem] border px-3 py-3.5 transition duration-500 ${
                selected
                  ? 'border-sky-400/45 bg-sky-400/15 text-white shadow-[0_16px_45px_rgba(0,0,0,0.3)]'
                  : 'border-white/10 bg-[#0c1828]/90 text-white/35'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-bold uppercase tracking-[0.12em]">{capability.short}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={capabilities[active].outcome}
          className="relative border-t border-white/10 pt-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-sky-300">
            {capabilities[active].number} · {capabilities[active].short}
          </div>
          <p className="mt-2 text-lg font-semibold leading-6 text-white">{capabilities[active].outcome}</p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

function ActiveChapter({ active }: { active: number }) {
  const capability = capabilities[active];

  return (
    <div className="relative flex min-h-0 items-center">
      <AnimatePresence mode="wait">
        <motion.article
          key={capability.title}
          className="w-full"
          initial={{ opacity: 0, y: 45, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -45, filter: 'blur(10px)' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#0b57b5]">
            {capability.number} / {capability.short}
          </div>
          <h3 className="mt-6 max-w-3xl text-balance text-4xl font-bold leading-[1.02] tracking-[-0.035em] xl:text-6xl">
            {capability.title}
          </h3>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{capability.description}</p>

          <div className="mt-9 grid gap-7 border-t border-slate-200 pt-7 sm:grid-cols-[1fr_1.05fr]">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Entregas</div>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {capability.deliverables.map((item) => (
                  <span key={item} className="text-sm font-semibold text-slate-600">{item}</span>
                ))}
              </div>
            </div>
            <div className="border-l-2 border-sky-200 pl-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Impacto</div>
              <p className="mt-3 text-base font-bold leading-7 text-slate-950">{capability.outcome}</p>
            </div>
          </div>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}

function MobileChapter({ capability, index }: { capability: (typeof capabilities)[number]; index: number }) {
  const Icon = capability.icon;
  return (
    <motion.article
      className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_16px_44px_rgba(15,23,42,0.06)] sm:p-6"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
    >
      <div className="flex items-center justify-between">
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#0b57b5]">{capability.number} / {capability.short}</div>
        <Icon className="h-5 w-5 text-[#0b57b5]" />
      </div>
      <h3 className="mt-5 text-2xl font-bold leading-[1.06] tracking-[-0.025em] sm:text-3xl">{capability.title}</h3>
      <p className="mt-4 text-base leading-7 text-slate-600">{capability.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {capability.deliverables.map((item) => (
          <span key={item} className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-800">
            {item}
          </span>
        ))}
      </div>
      <div className="mt-6 border-t border-slate-200 pt-5 text-sm font-bold leading-6">{capability.outcome}</div>
    </motion.article>
  );
}
