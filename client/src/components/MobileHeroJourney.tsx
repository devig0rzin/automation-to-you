import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

const cards = [
  { src: '/aty-showcase-1-mobile.webp', rotate: -4, x: -22, y: 0, label: 'Projeto 01' },
  { src: '/aty-showcase-2-mobile.webp', rotate: 0, x: 0, y: 18, label: 'Projeto 02' },
  { src: '/aty-showcase-3-mobile.webp', rotate: 4, x: 22, y: 36, label: 'Projeto 03' },
] as const;

export default function MobileHeroJourney() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start 78%', 'end 6%'],
  });

  const deviceY = useTransform(scrollYProgress, [0, 0.55, 1], [0, -18, 12]);
  const deviceScale = useTransform(scrollYProgress, [0, 0.55, 1], [1, 0.96, 0.92]);
  const stackY = useTransform(scrollYProgress, [0, 0.52, 1], [0, -24, 30]);
  const stackScale = useTransform(scrollYProgress, [0, 0.52, 1], [1, 0.98, 0.88]);
  const stackOpacity = useTransform(scrollYProgress, [0, 0.72, 1], [1, 1, 0]);

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

  return (
    <div ref={stageRef} className="relative mt-9 h-[clamp(19rem,62vw,26rem)] overflow-x-clip md:hidden" aria-hidden="true">
      <motion.div
        className="absolute inset-x-0 top-2 mx-auto h-[84%] max-w-[25rem] rounded-[1.65rem] border border-slate-200/80 bg-white/58 shadow-[0_30px_80px_rgba(11,87,181,0.13)] backdrop-blur-xl"
        initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.94 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.58, ease: 'easeOut' }}
        style={reduceMotion ? undefined : { y: deviceY, scale: deviceScale, willChange: 'transform' }}
      >
        <div className="absolute inset-3 overflow-hidden rounded-[1.25rem] bg-[#071a3d]">
          <img
            src="/computador-transparent.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-90"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_22%,rgba(255,255,255,0.28),transparent_9rem),linear-gradient(180deg,rgba(7,26,61,0.04),rgba(7,26,61,0.34))]" />
          <div className="absolute left-5 top-5 h-2 w-16 rounded-full bg-white/70" />
          <div className="absolute bottom-5 right-5 h-10 w-10 rounded-full border border-white/35 bg-white/15 backdrop-blur" />
        </div>
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-[21%] h-[13.5rem] w-[min(78vw,19.5rem)] -translate-x-1/2"
        style={reduceMotion ? undefined : { y: stackY, scale: stackScale, opacity: stackOpacity, willChange: 'transform, opacity' }}
      >
        {cards.map((card, index) => (
          <motion.article
            key={card.src}
            className="absolute inset-x-0 top-0 overflow-hidden rounded-[1.05rem] border border-white/80 bg-white p-2 shadow-[0_18px_44px_rgba(15,23,42,0.16)]"
            initial={reduceMotion ? false : { opacity: 0, y: 18, rotate: card.rotate * 1.4, scale: 0.94 }}
            animate={reduceMotion ? { rotate: card.rotate, x: card.x, y: card.y, scale: 1 - index * 0.035 } : { opacity: 1, y: card.y, x: card.x, rotate: card.rotate, scale: 1 - index * 0.035 }}
            transition={{ duration: 0.5, delay: 0.16 + index * 0.08, ease: 'easeOut' }}
          >
            <div className="aspect-[1.18] overflow-hidden rounded-[0.75rem] bg-slate-100">
              <img src={card.src} alt="" className="h-full w-full object-cover" loading="eager" decoding="async" />
            </div>
            <span className="absolute bottom-4 left-4 rounded-full border border-white/50 bg-white/85 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-700 backdrop-blur">
              {card.label}
            </span>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
}
