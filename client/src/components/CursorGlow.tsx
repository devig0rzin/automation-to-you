import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -400, y: -400 });
  const target = useRef({ x: -400, y: -400 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Lerp para suavidade
      pos.current.x += (target.current.x - pos.current.x) * 0.075;
      pos.current.y += (target.current.y - pos.current.y) * 0.075;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${pos.current.x - 200}px, ${pos.current.y - 200}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed left-0 top-0 z-50 h-[400px] w-[400px] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(0,191,255,0.10) 0%, rgba(0,191,255,0.04) 40%, transparent 70%)',
        filter: 'blur(32px)',
        willChange: 'transform',
      }}
    />
  );
}
