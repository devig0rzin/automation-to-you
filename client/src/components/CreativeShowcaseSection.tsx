import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import TechnologyBackdrop from './TechnologyBackdrop';
import { useIsMobile } from '@/hooks/useMobile';
import { trackEvent } from '@/lib/analytics';

const cards = [
  {
    eyebrow: 'Next Phase',
    title: 'Sites para empresas nos EUA',
    description: 'Criamos sites profissionais para empresas que atuam no mercado americano, com apresentação de serviços, portfólio e foco em gerar novos pedidos de orçamento.',
    url: 'https://nextphasefinishcarpentry.com/',
    src: '/projects/next-phase-final.webp',
    mobileSrc: '/projects/next-phase-final-mobile.webp',
    alt: 'Next Phase Finish Carpentry website project',
  },
  {
    eyebrow: 'Casamento',
    title: 'Sites para casamento',
    description: 'Criamos experiências digitais para casamentos, reunindo confirmação de presença, localização, presentes, informações do evento e contagem regressiva.',
    url: 'https://www.casamentojoaojessica.com.br/',
    src: '/projects/joao-jessica-final.webp',
    mobileSrc: '/projects/joao-jessica-final-mobile.webp',
    alt: 'João Pedro e Jessica wedding website project',
  },
  {
    eyebrow: 'Espaço Néia',
    title: 'Sites para clínicas e estética',
    description: 'Desenvolvemos sites para clínicas e negócios de estética, apresentando tratamentos, campanhas e facilitando o contato e o agendamento de avaliações.',
    url: 'https://espa-o-neia.vercel.app/',
    src: '/projects/espaco-neia-final.webp',
    mobileSrc: '/projects/espaco-neia-final-mobile.webp',
    alt: 'Espaço Néia aesthetics website project',
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
  const isMobile = useIsMobile();
  const [journeyArrived, setJourneyArrived] = useState(false);
  const [mobileJourneyArrived, setMobileJourneyArrived] = useState(false);
  const mobileProjectArrivalsRef = useRef([false, false, false]);
  const [mobileProjectArrivals, setMobileProjectArrivals] = useState([false, false, false]);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.025, 1.05]);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (!isMobile || value < 0.14) return;

    const next = [true, true, true];
    mobileProjectArrivalsRef.current = next;
    setMobileProjectArrivals(next);
  });

  useEffect(() => {
    const updateArrival = (event: Event) => {
      setJourneyArrived((event as CustomEvent<boolean>).detail);
    };

    setJourneyArrived(document.documentElement.dataset.journeyArrived === 'true');
    window.addEventListener('aty-journey-arrival', updateArrival);
    return () => window.removeEventListener('aty-journey-arrival', updateArrival);
  }, []);

  useEffect(() => {
    const updateMobileArrival = (event: Event) => {
      setMobileJourneyArrived((event as CustomEvent<boolean>).detail);
    };

    window.addEventListener('aty-mobile-journey-arrival', updateMobileArrival);
    return () => window.removeEventListener('aty-mobile-journey-arrival', updateMobileArrival);
  }, []);

  useEffect(() => {
    const updateProjectArrival = (event: Event) => {
      const detail = (event as CustomEvent<boolean[]>).detail;
      if (Array.isArray(detail)) {
        const next = detail.slice(0, 3);
        if (next.some((value, index) => value !== mobileProjectArrivalsRef.current[index])) {
          mobileProjectArrivalsRef.current = next;
          setMobileProjectArrivals(next);
        }
      }
    };

    window.addEventListener('aty-mobile-project-arrival', updateProjectArrival);
    return () => window.removeEventListener('aty-mobile-project-arrival', updateProjectArrival);
  }, []);

  useEffect(() => {
    if (!isMobile || !mobileJourneyArrived) return;

    const next = [true, true, true];
    mobileProjectArrivalsRef.current = next;
    setMobileProjectArrivals(next);
  }, [isMobile, mobileJourneyArrived]);

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
            <ProjectCard
              key={card.title}
              card={card}
              index={index}
              journeyArrived={journeyArrived}
              mobileJourneyArrived={mobileJourneyArrived}
              mobileProjectArrived={mobileProjectArrivals[index]}
              isMobile={isMobile}
            />
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
  mobileJourneyArrived,
  mobileProjectArrived,
  isMobile,
}: {
  card: (typeof cards)[number];
  index: number;
  journeyArrived: boolean;
  mobileJourneyArrived: boolean;
  mobileProjectArrived: boolean;
  isMobile: boolean;
}) {
  const trackProjectLink = (linkType: 'image' | 'name' | 'text') => {
    trackEvent('click_project', {
      cta_location: 'selected_projects',
      project_name: card.title,
      link_type: linkType,
      link_url: card.url,
    });
  };

  return (
    <Reveal variant="slide-up" delay={index * 0.1}>
      <article>
        <motion.div
          id={`showcase-slot-${index + 1}`}
          data-mobile-project-card={index + 1}
          className={`overflow-hidden rounded-[1.2rem] border border-slate-200 bg-slate-50 p-3 shadow-[0_14px_40px_rgba(15,23,42,0.07)] transition-opacity duration-150 ${
            journeyArrived ? 'opacity-100' : 'opacity-100 md:opacity-0'
          }`}
          animate={isMobile ? { opacity: mobileProjectArrived ? 1 : 0, y: mobileProjectArrived ? 0 : 24, scale: mobileProjectArrived ? 1 : 0.96 } : undefined}
          transition={{ duration: 0.42, delay: index * 0.08, ease: 'easeOut' }}
        >
          <a
            href={card.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block aspect-[1.18] overflow-hidden rounded-[0.9rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b57b5] focus-visible:ring-offset-2"
            onClick={() => trackProjectLink('image')}
          >
            <picture className="block h-full w-full">
              <source media="(max-width: 767px)" srcSet={card.mobileSrc} type="image/webp" />
              <img src={card.src} alt={card.alt} className="h-full w-full object-cover" loading="lazy" />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/20" />
            <span className="absolute bottom-4 left-4 max-w-[calc(100%-2rem)] rounded-full border border-white/40 bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-700 backdrop-blur">
              {card.eyebrow}
            </span>
          </a>
        </motion.div>
        <motion.div
          className="pt-5"
          animate={isMobile ? { opacity: mobileJourneyArrived ? 1 : 0.72, y: mobileJourneyArrived ? 0 : 10 } : undefined}
          transition={{ duration: 0.42, delay: index * 0.08 + 0.04, ease: 'easeOut' }}
        >
          <h3 className="text-lg font-bold leading-snug text-slate-950">
            <a
              href={card.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#0b57b5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b57b5] focus-visible:ring-offset-2"
              onClick={() => trackProjectLink('name')}
            >
              {card.title}
            </a>
          </h3>
          <p className="mt-2 text-base leading-7 text-slate-500">{card.description}</p>
          <a
            href={card.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#0b57b5] transition-colors hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b57b5] focus-visible:ring-offset-2"
            onClick={() => trackProjectLink('text')}
          >
            Ver site
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </motion.div>
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
