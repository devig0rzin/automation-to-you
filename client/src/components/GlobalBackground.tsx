import { useEffect, useRef } from 'react';

export default function GlobalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
    };

    const particles: Particle[] = [];

    const setSize = () => {
      const ratio = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const createParticles = () => {
      particles.length = 0;
      const count = width < 768 ? 22 : 44;
      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          radius: Math.random() * 1.4 + 0.4,
          opacity: Math.random() * 0.26 + 0.08,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, 'rgba(186, 230, 253, 0.22)');
      gradient.addColorStop(0.5, 'rgba(18, 184, 238, 0.10)');
      gradient.addColorStop(1, 'rgba(11, 47, 120, 0.08)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < -10) particle.x = width + 10;
        if (particle.x > width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = height + 10;
        if (particle.y > height + 10) particle.y = -10;

        ctx.beginPath();
        ctx.fillStyle = `rgba(14, 165, 233, ${particle.opacity * 0.65})`;
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = index + 1; j < particles.length; j += 1) {
          const next = particles[j];
          const dx = particle.x - next.x;
          const dy = particle.y - next.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 118) {
            ctx.strokeStyle = `rgba(14, 165, 233, ${0.04 * (1 - distance / 118)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(next.x, next.y);
            ctx.stroke();
          }
        }
      });

      animationFrame = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      setSize();
      createParticles();
    };

    handleResize();
    draw();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-[#f8fbff]">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(186,230,253,0.48),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(11,47,120,0.10),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0)_0%,#f8fbff_86%)]" />
      <div className="subtle-grid absolute inset-0 opacity-20" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/70 to-transparent" />
    </div>
  );
}
