import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

const cards = [
  { src: '/aty-showcase-1-mobile.webp', rotate: -7, x: -30, y: 10, label: 'Projeto 01', range: [0.08, 0.5], endX: -72, endY: 226, endRotate: -1, endScale: 1.18 },
  { src: '/aty-showcase-2-mobile.webp', rotate: 1, x: 0, y: 28, label: 'Projeto 02', range: [0.2, 0.66], endX: 20, endY: 296, endRotate: 2, endScale: 1.12 },
  { src: '/aty-showcase-3-mobile.webp', rotate: 7, x: 32, y: 46, label: 'Projeto 03', range: [0.34, 0.82], endX: 78, endY: 366, endRotate: 1, endScale: 1.06 },
] as const;

export default function MobileHeroJourney() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start 74%', 'end -32%'],
  });

  const deviceY = useTransform(scrollYProgress, [0, 0.52, 1], [0, -18, -28]);
  const deviceScale = useTransform(scrollYProgress, [0, 0.55, 1], [1, 0.94, 0.9]);
  const deviceOpacity = useTransform(scrollYProgress, [0, 0.62, 1], [1, 0.78, 0.48]);

  useEffect(() => {
    const projects = document.getElementById('projetos');
    if (!projects) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        window.dispatchEvent(new CustomEvent('aty-mobile-journey-arrival', { detail: entry.isIntersecting }));
      },
      { rootMargin: '-18% 0px -56% 0px', threshold: 0.01 },
    );

    observer.observe(projects);
    return () => observer.disconnect();
  }, [reduceMotion]);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    window.dispatchEvent(
      new CustomEvent('aty-mobile-project-arrival', {
        detail: [value >= 0.86, value >= 0.91, value >= 0.96],
      }),
    );
  });

  return (
    <div ref={stageRef} className="relative mx-auto mt-9 h-[clamp(26rem,112vw,34rem)] max-w-[28rem] overflow-x-clip md:hidden" aria-hidden="true">
      <motion.div
        className="absolute inset-x-3 top-2 mx-auto h-[58%] max-w-[24rem] rounded-[1.65rem] border border-slate-200/80 bg-white/58 shadow-[0_30px_80px_rgba(11,87,181,0.13)] backdrop-blur-xl"
        initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.94 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.58, ease: 'easeOut' }}
        style={reduceMotion ? undefined : { y: deviceY, scale: deviceScale, opacity: deviceOpacity, willChange: 'transform, opacity' }}
      >
        <div className="absolute inset-3 overflow-hidden rounded-[1.25rem] bg-[linear-gradient(145deg,rgba(255,255,255,0.92),rgba(224,242,254,0.82))]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_34%_22%,rgba(11,87,181,0.16),transparent_7rem),radial-gradient(circle_at_72%_70%,rgba(14,165,233,0.14),transparent_8rem)]" />
          <div className="absolute left-5 top-5 h-2 w-16 rounded-full bg-[#0b57b5]/18" />
          <div className="absolute bottom-5 right-5 h-10 w-10 rounded-full border border-[#0b57b5]/18 bg-white/40 backdrop-blur" />
        </div>
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-[24%] h-[16.5rem] w-[clamp(10.35rem,50.5vw,14.1rem)] -translate-x-1/2"
      >
        {cards.map((card, index) => (
          <JourneyCard key={card.src} card={card} index={index} progress={scrollYProgress} reduceMotion={Boolean(reduceMotion)} />
        ))}
      </motion.div>
    </div>
  );
}

function JourneyCard({
  card,
  index,
  progress,
  reduceMotion,
}: {
  card: (typeof cards)[number];
  index: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  reduceMotion: boolean;
}) {
  const x = useTransform(progress, [0, card.range[0], card.range[1], 1], [card.x, card.x, card.endX, card.endX + index * 10]);
  const y = useTransform(progress, [0, card.range[0], card.range[1], 1], [card.y, card.y, card.endY, card.endY + 42]);
  const rotate = useTransform(progress, [0, card.range[0], card.range[1], 1], [card.rotate, card.rotate, card.endRotate, card.endRotate]);
  const scale = useTransform(progress, [0, card.range[0], card.range[1], 1], [1 - index * 0.035, 1 - index * 0.035, card.endScale, card.endScale * 0.92]);
  const arrivalStart = 0.84 + index * 0.05;
  const arrivalEnd = Math.min(0.98, arrivalStart + 0.1);
  const opacity = useTransform(progress, [0, card.range[1], arrivalStart, arrivalEnd], [1, 1, 1, 0]);

  return (
    <motion.article
      data-mobile-journey-card={index + 1}
      className="absolute inset-x-0 top-0 overflow-hidden rounded-[1.05rem] border border-white/80 bg-white p-2 shadow-[0_18px_44px_rgba(15,23,42,0.16)]"
      style={reduceMotion ? { zIndex: 3 - index } : { x, y, rotate, scale, opacity, zIndex: 3 - index, willChange: 'transform, opacity' }}
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 18, rotate: card.rotate * 0.35, scale: 0.94 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, rotate: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.16 + index * 0.08, ease: 'easeOut' }}
      >
        <div className="aspect-[1.18] overflow-hidden rounded-[0.75rem] bg-slate-100">
          <img src={card.src} alt="" className="h-full w-full object-cover" loading="eager" decoding="async" />
        </div>
        <span className="absolute bottom-4 left-4 rounded-full border border-white/50 bg-white/85 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-700 backdrop-blur">
          {card.label}
        </span>
      </motion.div>
    </motion.article>
  );
}
