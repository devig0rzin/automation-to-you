import { motion, useMotionValue } from 'framer-motion';
import { useEffect, useRef } from 'react';

const cards = [
  { src: '/aty-showcase-1.png', rotate: -5 },
  { src: '/aty-showcase-2.png', rotate: 1 },
  { src: '/aty-showcase-3.png', rotate: 5 },
] as const;

export default function ImageJourneyOverlay() {
  const progress = useMotionValue(0);
  const arrivedRef = useRef(false);

  useEffect(() => {
    const update = () => {
      const origin = document.getElementById('hero-card-origin');
      const destination = document.getElementById('showcase-slot-1');
      if (!origin || !destination || window.innerWidth < 768) return;

      const destinationRect = destination.getBoundingClientRect();
      const destinationTop = destinationRect.top + window.scrollY;
      const end = Math.max(1, destinationTop - window.innerHeight * 0.3);
      const nextProgress = clamp(window.scrollY / end, 0, 1);
      progress.set(nextProgress);

      const arrived = nextProgress >= 0.995;
      if (arrived !== arrivedRef.current) {
        arrivedRef.current = arrived;
        document.documentElement.dataset.journeyArrived = String(arrived);
        window.dispatchEvent(new CustomEvent('aty-journey-arrival', { detail: arrived }));
      }
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [progress]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[15] hidden overflow-hidden md:block">
      {cards.map((card, index) => (
        <JourneyCard key={card.src} card={card} index={index} progress={progress} />
      ))}
    </div>
  );
}

function JourneyCard({
  card,
  index,
  progress,
}: {
  card: (typeof cards)[number];
  index: number;
  progress: ReturnType<typeof useMotionValue<number>>;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const width = useMotionValue(280);
  const rotate = useMotionValue<number>(card.rotate);
  const scale = useMotionValue(1);
  const opacity = useMotionValue(1);

  useEffect(() => {
    const update = (value: number) => {
      const origin = document.getElementById('hero-card-origin');
      const destination = document.getElementById(`showcase-slot-${index + 1}`);
      if (!origin || !destination) return;

      const originRect = origin.getBoundingClientRect();
      const destinationRect = destination.getBoundingClientRect();
      const startWidth = Math.min(390, originRect.width * 0.62);
      const startX = originRect.left + originRect.width * 0.27 + index * originRect.width * 0.055;
      const startY = originRect.top + originRect.height * 0.16 + index * originRect.height * 0.055;
      const staggerStart = index * 0.045;
      const localProgress = clamp((value - staggerStart) / (1 - staggerStart), 0, 1);
      const eased = easeInOutCubic(localProgress);

      x.set(lerp(startX, destinationRect.left, eased));
      y.set(lerp(startY, destinationRect.top, eased));
      width.set(lerp(startWidth, destinationRect.width, eased));
      rotate.set(lerp(card.rotate, 0, eased));
      scale.set(lerp(1 - index * 0.035, 1, eased));
      opacity.set(value >= 0.995 ? 0 : 1);
    };

    const unsubscribe = progress.on('change', update);
    update(progress.get());
    return unsubscribe;
  }, [card.rotate, index, opacity, progress, rotate, scale, width, x, y]);

  return (
    <motion.article
      className="absolute overflow-hidden rounded-[1.2rem] border border-slate-200 bg-slate-50 p-3 shadow-[0_18px_50px_rgba(15,23,42,0.12)]"
      style={{ left: 0, top: 0, x, y, width, rotate, scale, opacity }}
    >
      <div className="aspect-[1.18] overflow-hidden rounded-[0.9rem]">
        <img src={card.src} alt="" className="h-full w-full object-cover" />
      </div>
    </motion.article>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function lerp(from: number, to: number, progress: number) {
  return from + (to - from) * progress;
}

function easeInOutCubic(value: number) {
  return value < 0.5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2;
}
