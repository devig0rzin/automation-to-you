import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useAnimationFrame,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { useRef, useState, type PointerEvent } from 'react';
import WhatsAppIcon from '../WhatsAppIcon';
import { BriefLayer, CodeLayer, DesignLayer, IntegrationChip, WireframeLayer } from './SiteLayers';
import { useIsMobile } from '@/hooks/useMobile';
import { trackEvent } from '@/lib/analytics';
import { whatsappLink } from '@/lib/site';

/*
  Topo do site + "Como nasce seu site".
  Uma seção alta com um palco fixo (sticky). Conforme a pessoa rola, o site de exemplo
  se desmonta nas camadas do processo e depois volta montado, "no ar".
*/

export const STAGES = [
  {
    title: 'A gente entende seu negócio',
    copy: 'Uma conversa para definir para quem é o site, o que ele precisa vender e qual é a ação que o visitante deve tomar.',
  },
  {
    title: 'Estrutura antes de enfeite',
    copy: 'Desenhamos as páginas e a ordem das informações. Você aprova o esqueleto antes de qualquer cor.',
  },
  {
    title: 'Design com a cara da sua marca',
    copy: 'Cores, tipografia e imagens pensadas para o seu público. Nada de template com o logo trocado.',
  },
  {
    title: 'A IA acelera, o programador revisa',
    copy: 'A IA escreve o rascunho do código rápido. Um programador revisa cada parte, testa no celular e corrige o que deixaria o site lento.',
  },
  {
    title: 'Tudo ligado de verdade',
    copy: 'Pagamento por Pix e cartão, contato caindo no seu WhatsApp e agenda funcionando. Testamos como se fôssemos o seu cliente.',
  },
  {
    title: 'No ar, com o seu domínio',
    copy: 'Publicamos, configuramos domínio e hospedagem e acompanhamos as primeiras semanas para ajustar o que precisar.',
  },
] as const;

const HERO_END = 0.1;
const STAGE_LEN = (1 - HERO_END) / STAGES.length;

// Momentos-chave da animação (proporção da rolagem dentro da seção)
const KEYS = [0, HERO_END, 0.15, 0.85, 0.94, 1];

function piecewise(p: number, values: number[]) {
  if (p <= KEYS[0]) return values[0];
  for (let i = 1; i < KEYS.length; i += 1) {
    if (p <= KEYS[i]) {
      const t = (p - KEYS[i - 1]) / (KEYS[i] - KEYS[i - 1] || 1);
      const eased = t * t * (3 - 2 * t);
      return values[i - 1] + (values[i] - values[i - 1]) * eased;
    }
  }
  return values[values.length - 1];
}

const explodeAt = (p: number) => piecewise(p, [0, 0, 1, 1, 0, 0]);

function stageAt(p: number) {
  if (p < HERO_END) return -1;
  return Math.min(STAGES.length - 1, Math.floor((p - HERO_END) / STAGE_LEN));
}

const heroWhatsApp = whatsappLink('Oi! Quero um orçamento de site para o meu negócio.');

export default function BuildJourney() {
  // A montagem acompanha a rolagem (é a pessoa que controla), então roda para todo mundo.
  // Quem pediu menos movimento no sistema só perde os efeitos automáticos (balanço e inclinação).
  const reduceMotion = Boolean(useReducedMotion());
  return <AnimatedJourney reduceMotion={reduceMotion} />;
}

function AnimatedJourney({ reduceMotion }: { reduceMotion: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const [stage, setStage] = useState(-1);
  const isMobile = useIsMobile();
  const gap = isMobile ? 78 : 100;

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = stageAt(value);
    setStage((current) => (current === next ? current : next));
  });

  // Inclinação leve seguindo o mouse, só no topo
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltX = useSpring(mouseX, { stiffness: 80, damping: 18 });
  const tiltY = useSpring(mouseY, { stiffness: 80, damping: 18 });

  // No celular não tem mouse: o site de exemplo balança devagar sozinho no topo
  const idle = useMotionValue(0);
  const usesMouse = useRef(false);
  useAnimationFrame((time) => {
    if (reduceMotion || usesMouse.current) return;
    idle.set(Math.sin(time / 1700));
  });

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || reduceMotion) return;
    if (!usesMouse.current) {
      usesMouse.current = true;
      idle.set(0);
    }
    mouseX.set((event.clientX / window.innerWidth) * 2 - 1);
    mouseY.set((event.clientY / window.innerHeight) * 2 - 1);
  };

  const rotateX = useTransform<number, number>([scrollYProgress, tiltY, idle], ([p, my, wave]) => {
    const atTop = p < HERO_END ? 1 : 0;
    return piecewise(p, [10, 10, 54, 54, 0, 0]) - my * 5 * atTop + wave * 2.5 * atTop;
  });
  const rotateY = useTransform<number, number>([scrollYProgress, tiltX, idle], ([p, mx, wave]) => {
    const atTop = p < HERO_END ? 1 : 0;
    return piecewise(p, [-16, -16, 0, 0, 0, 0]) + mx * 7 * atTop + wave * 7 * atTop;
  });
  const floatY = useTransform(idle, (wave) => wave * 6);
  const rotateZ = useTransform(scrollYProgress, (p) => piecewise(p, [0, 0, -30, -30, 0, 0]));
  const explode = useTransform(scrollYProgress, explodeAt);
  const stackY = useTransform<number, number>([explode, floatY, scrollYProgress], ([e, f, p]) => e * (isMobile ? -30 : -70) + (p < HERO_END ? f : 0));

  const heroOpacity = useTransform(scrollYProgress, [0, 0.055, 0.095], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.095], [0, -40]);
  const stepsOpacity = useTransform(scrollYProgress, [0.085, 0.12], [0, 1]);
  const progressScale = useTransform(scrollYProgress, [HERO_END, 1], [0, 1]);

  const live = stage === -1 || stage === STAGES.length - 1;

  return (
    <section
      ref={sectionRef}
      id="inicio"
      aria-label="Como nasce seu site"
      className="relative h-[680vh] bg-[var(--aty-paper)] md:h-[640vh]"
      onPointerMove={handlePointerMove}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <StageBackdrop progress={scrollYProgress} />

        <div className="relative mx-auto grid w-full max-w-[1320px] flex-1 grid-rows-[auto_1fr] px-5 pt-[92px] sm:px-8 md:grid-cols-[0.92fr_1.08fr] md:grid-rows-1 md:items-center md:gap-6 md:pt-20 lg:px-12">
          {/* Coluna de texto */}
          <div className={`relative transition-[min-height] duration-500 md:min-h-[520px] ${stage === -1 ? 'min-h-[330px]' : 'min-h-[200px]'}`}>
            <motion.div
              className="absolute inset-x-0 top-0 md:top-1/2 md:-translate-y-1/2"
              style={{ opacity: heroOpacity, y: heroY }}
              aria-hidden={stage !== -1}
            >
              <HeroCopy interactive={stage === -1} />
            </motion.div>

            <motion.div
              className={`absolute inset-x-0 top-0 md:top-1/2 md:-translate-y-1/2 ${stage === -1 ? 'pointer-events-none' : ''}`}
              style={{ opacity: stepsOpacity }}
              aria-hidden={stage === -1}
            >
              <StepsDesktop stage={stage} progressScale={progressScale} />
              <StepMobile stage={stage} />
            </motion.div>
          </div>

          {/* Palco 3D */}
          <div className="aty-stage relative min-h-0 min-w-0 md:h-full" aria-hidden="true">
            <div className="absolute left-1/2 top-[46%] ml-[-280px] mt-[-190px] md:top-1/2">
            <motion.div
              className="aty-stage-scale relative"
              style={{ rotateX, rotateY, rotateZ, y: stackY }}
            >
              <Layer instant={reduceMotion} gap={gap} explode={explode} order={0} active={stage === 1} dim={stage >= 0 && stage < 5}>
                <WireframeLayer />
              </Layer>
              <Layer instant={reduceMotion} gap={gap} explode={explode} order={1} active={stage === 2} dim={stage >= 0 && stage < 5}>
                <DesignLayer live={live} />
              </Layer>
              <Layer instant={reduceMotion} gap={gap} explode={explode} order={2} active={stage === 3} dim={stage >= 0 && stage < 5} onlyWhenExploded>
                <CodeLayer />
              </Layer>
              <Layer instant={reduceMotion} gap={gap} explode={explode} order={3} active={stage === 4} dim={stage >= 0 && stage < 5} restingZ={46}>
                <div className="absolute -left-12 top-[262px]">
                  <IntegrationChip kind="whatsapp" />
                </div>
                <div className="absolute -right-12 top-[54px]">
                  <IntegrationChip kind="pix" />
                </div>
                <div className="absolute -bottom-8 right-6">
                  <IntegrationChip kind="agenda" />
                </div>
              </Layer>
              <Layer instant={reduceMotion} gap={gap} explode={explode} order={4} active={stage === 0} dim={stage >= 0 && stage < 5} onlyWhenExploded>
                <BriefLayer />
              </Layer>
            </motion.div>
            </div>
          </div>
        </div>

        <motion.a
          href="#comecar"
          style={{ opacity: heroOpacity }}
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap text-[13px] font-medium text-[var(--aty-muted)] transition hover:text-[var(--aty-blue)] md:bottom-5 md:text-sm"
        >
          Role para ver um site sendo montado
          <ArrowDown className="h-4 w-4" />
        </motion.a>
      </div>
      <span id="comecar" className="absolute left-0 top-[100svh]" aria-hidden="true" />
    </section>
  );
}

function Layer({
  instant,
  gap,
  explode,
  order,
  active,
  dim,
  restingZ = order * 2,
  onlyWhenExploded = false,
  children,
}: {
  instant: boolean;
  gap: number;
  explode: MotionValue<number>;
  order: number;
  active: boolean;
  dim: boolean;
  restingZ?: number;
  onlyWhenExploded?: boolean;
  children: React.ReactNode;
}) {
  const z = useTransform(explode, (e) => restingZ * (1 - e) + (order - 2) * gap * e);
  const visibility = useTransform(explode, (e) => (onlyWhenExploded ? Math.max(0, (e - 0.35) / 0.65) : 1));

  return (
    <motion.div className="aty-layer" style={{ z, opacity: visibility }}>
      <motion.div
        className="aty-layer"
        animate={{ z: active ? 46 : 0, opacity: dim && !active ? 0.42 : 1 }}
        transition={instant ? { duration: 0 } : { type: 'spring', stiffness: 140, damping: 22 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function StageBackdrop({ progress }: { progress: MotionValue<number> }) {
  const glowX = useTransform(progress, [0, 1], ['72%', '58%']);
  const background = useTransform(
    glowX,
    (x) =>
      `radial-gradient(42rem 30rem at ${x} 46%, rgba(124,196,255,0.28), transparent 70%), radial-gradient(30rem 22rem at 8% 92%, rgba(11,87,181,0.07), transparent 70%)`,
  );
  return (
    <>
      <motion.div className="pointer-events-none absolute inset-0" style={{ background }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[var(--aty-line)]" />
    </>
  );
}

function HeroCopy({ interactive }: { interactive: boolean }) {
  return (
    <div className={interactive ? '' : 'pointer-events-none'}>
      <h1 className="font-display max-w-[17ch] text-balance text-[2.55rem] font-bold leading-[0.98] tracking-[-0.035em] text-[var(--aty-ink)] min-[400px]:text-[2.85rem] sm:text-6xl md:text-5xl lg:text-[3.6rem] xl:text-[4.35rem]">
        Sites que vendem. Feitos por gente, acelerados por IA.
      </h1>
      <p className="mt-5 max-w-[34rem] text-[15px] leading-relaxed text-[var(--aty-muted)] sm:mt-6 sm:text-lg">
        Criamos o site do seu negócio do zero e cuidamos dele depois. Bonito, rápido no celular e ligado ao seu Pix,
        WhatsApp e agenda.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
        <a
          href={heroWhatsApp}
          target="_blank"
          rel="noreferrer"
          tabIndex={interactive ? 0 : -1}
          onClick={() => trackEvent('click_whatsapp', { cta_location: 'hero', link_url: heroWhatsApp })}
          className="inline-flex min-h-[52px] items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-[var(--aty-ink)] px-6 text-[15px] font-semibold text-white shadow-[0_18px_40px_-18px_rgba(10,26,51,0.6)] transition hover:bg-[var(--aty-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--aty-blue)] focus-visible:ring-offset-2"
        >
          <WhatsAppIcon variant="inverse" className="h-5 w-5" />
          Pedir orçamento
        </a>
        <a
          href="#projetos"
          tabIndex={interactive ? 0 : -1}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 text-[15px] font-semibold text-[var(--aty-ink)] transition hover:text-[var(--aty-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--aty-blue)]"
        >
          Ver sites que já fizemos
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

function StepsDesktop({ stage, progressScale }: { stage: number; progressScale: MotionValue<number> }) {
  return (
    <div className="hidden md:block">
      <h2 className="font-display text-4xl font-bold tracking-[-0.03em] text-[var(--aty-ink)] lg:text-5xl">Como nasce seu site</h2>
      <p className="mt-3 max-w-md text-base leading-relaxed text-[var(--aty-muted)]">
        Seis etapas, todas visíveis para você. Este é o Studio Aurora, um exemplo montado na sua frente.
      </p>
      <div className="relative mt-9 pl-7">
        <div className="absolute bottom-2 left-[5px] top-2 w-px bg-[var(--aty-line)]" />
        <motion.div
          className="absolute left-[5px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-[var(--aty-blue)]"
          style={{ scaleY: progressScale }}
        />
        <ol className="space-y-1">
          {STAGES.map((item, index) => {
            const isActive = index === stage;
            const isDone = index < stage;
            return (
              <li key={item.title} className="relative py-2">
                <span
                  className={`absolute -left-7 top-[15px] h-[11px] w-[11px] rounded-full border-2 transition-colors duration-300 ${
                    isActive
                      ? 'border-[var(--aty-blue)] bg-[var(--aty-blue)]'
                      : isDone
                        ? 'border-[var(--aty-blue)] bg-white'
                        : 'border-[#c4d0e0] bg-[var(--aty-paper)]'
                  }`}
                />
                <div className="flex items-baseline gap-3">
                  <span className={`text-sm tabular-nums ${isActive ? 'text-[var(--aty-blue)]' : 'text-[#9aa8bc]'}`}>{index + 1}</span>
                  <span
                    className={`font-display text-xl font-semibold tracking-[-0.015em] transition-colors duration-300 lg:text-2xl ${
                      isActive ? 'text-[var(--aty-ink)]' : 'text-[#9aa8bc]'
                    }`}
                  >
                    {item.title}
                  </span>
                </div>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.p
                      key="copy"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden pl-[1.6rem] text-[15px] leading-relaxed text-[var(--aty-muted)]"
                    >
                      <span className="block max-w-md pt-1.5">{item.copy}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function StepMobile({ stage }: { stage: number }) {
  const index = Math.max(0, stage);
  const item = STAGES[index];
  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-[1.65rem] font-bold tracking-[-0.03em] text-[var(--aty-ink)]">Como nasce seu site</h2>
        <span className="text-sm tabular-nums text-[var(--aty-muted)]">
          {index + 1} de {STAGES.length}
        </span>
      </div>
      <div className="mt-3 flex gap-1">
        {STAGES.map((s, i) => (
          <span key={s.title} className={`h-1 flex-1 rounded-full transition-colors ${i <= index ? 'bg-[var(--aty-blue)]' : 'bg-[var(--aty-line)]'}`} />
        ))}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          className="mt-4"
        >
          <div className="font-display text-xl font-semibold tracking-[-0.015em] text-[var(--aty-ink)]">{item.title}</div>
          <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--aty-muted)]">{item.copy}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
