import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import TechnologyBackdrop from './TechnologyBackdrop';

const cards = [
  {
    eyebrow: 'Card 01',
    title: 'Imagem que abre a experiência com peso de produto.',
    description: 'A composição apresenta o projeto com clareza e ajuda o cliente a entender o valor da entrega.',
    src: '/aty-showcase-1.png',
  },
  {
    eyebrow: 'Card 02',
    title: 'Um produto digital apresentado com profundidade.',
    description: 'Interface, informação e acabamento visual trabalhando juntos sem competir pela atenção.',
    src: '/aty-showcase-2.png',
  },
  {
    eyebrow: 'Card 03',
    title: 'Automação explicada de forma visual e direta.',
    description: 'A imagem fecha a sequência e mostra como as partes do negócio passam a trabalhar conectadas.',
    src: '/aty-showcase-3.png',
  },
] as const;

const revealVariants = {
  'slide-up': {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

export default function CreativeShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [journeyArrived, setJourneyArrived] = useState(false);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.025, 1.05]);

  useEffect(() => {
    const updateArrival = (event: Event) => {
      setJourneyArrived((event as CustomEvent<boolean>).detail);
    };

    setJourneyArrived(document.documentElement.dataset.journeyArrived === 'true');
    window.addEventListener('aty-journey-arrival', updateArrival);
    return () => window.removeEventListener('aty-journey-arrival', updateArrival);
  }, []);

  return (
    <section ref={sectionRef} id="projetos" className="aty-light-detail aty-light-detail--reverse relative overflow-hidden bg-white/76 py-20 text-slate-950 sm:py-24 md:py-32">
      <TechnologyBackdrop variant="left" />
      <motion.div className="pointer-events-none absolute inset-0" style={{ scale: bgScale }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(11,87,181,0.07),transparent_28rem),radial-gradient(circle_at_82%_22%,rgba(14,165,233,0.06),transparent_24rem)]" />
      </motion.div>

      <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
        <Reveal className="mx-auto max-w-4xl text-center" variant="slide-up">
          <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">
            Projetos selecionados
          </span>
          <h2 className="mt-5 text-balance text-[2.65rem] font-bold leading-[0.96] sm:text-5xl md:text-7xl">
            O cliente não precisa imaginar. Ele vê.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Cada entrega combina design, desenvolvimento e automação para tornar o valor do projeto visível.
          </p>
        </Reveal>

        <Reveal
          className="mt-7 flex items-center justify-center gap-3 text-sm font-semibold text-slate-500"
          variant="fade"
          delay={0.08}
        >
          <Sparkles className="h-4 w-4 text-sky-500" />
          Três projetos, apresentados sem distração.
        </Reveal>

        <div className="mt-14 grid gap-9 md:grid-cols-3 md:gap-5 lg:gap-7">
          {cards.map((card, index) => (
            <ProjectCard key={card.title} card={card} index={index} journeyArrived={journeyArrived} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  card,
  index,
  journeyArrived,
}: {
  card: (typeof cards)[number];
  index: number;
  journeyArrived: boolean;
}) {
  return (
    <Reveal variant="slide-up" delay={index * 0.1}>
      <article>
        <div
          id={`showcase-slot-${index + 1}`}
          className={`overflow-hidden rounded-[1.2rem] border border-slate-200 bg-slate-50 p-3 shadow-[0_14px_40px_rgba(15,23,42,0.07)] transition-opacity duration-150 ${
            journeyArrived ? 'opacity-100' : 'opacity-100 md:opacity-0'
          }`}
        >
          <div className="relative aspect-[1.18] overflow-hidden rounded-[0.9rem]">
            <img src={card.src} alt={card.title} className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/20" />
            <span className="absolute bottom-4 left-4 rounded-full border border-white/40 bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-700 backdrop-blur">
              {card.eyebrow}
            </span>
          </div>
        </div>
        <div className="pt-5">
          <h3 className="text-lg font-bold leading-snug text-slate-950">{card.title}</h3>
          <p className="mt-2 text-base leading-7 text-slate-500">{card.description}</p>
        </div>
      </article>
    </Reveal>
  );
}

function Reveal({
  children,
  variant,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  variant: keyof typeof revealVariants;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-20%' }}
      variants={revealVariants[variant]}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
