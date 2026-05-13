import { motion, useInView } from 'framer-motion';
import { ArrowRight, CheckCircle2, MessageSquareText, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Logo from './Logo';

const proofPoints = [
  'Agentes de IA para atendimento e vendas',
  'Fluxos conectados ao WhatsApp',
  'Demonstração visual antes do orçamento',
];

const metrics = [
  { value: '24/7', label: 'atendimento automatizado' },
  { value: '3x', label: 'mais contexto no lead' },
  { value: 'IA', label: 'treinada para seu negócio' },
];

function scrollToSimulator() {
  document.getElementById('simulador-agente')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

export default function HeroSection() {
  const [language, setLanguage] = useState<'PT' | 'EN'>('PT');
  const heroRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isHeroInView = useInView(heroRef, { amount: 0.42 });

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (isHeroInView) {
      void video.play().catch(() => undefined);
      return;
    }

    video.pause();
  }, [isHeroInView]);

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden border-b border-slate-200 bg-[#f8fbff] text-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.86),transparent_28rem),radial-gradient(circle_at_78%_32%,rgba(186,230,253,0.42),transparent_34rem),linear-gradient(135deg,#ffffff_0%,#f8fbff_48%,#eef7ff_100%)]" />
      <div className="absolute right-0 top-0 h-full w-[58%] bg-[radial-gradient(circle_at_52%_50%,rgba(255,255,255,0.68),transparent_28rem),radial-gradient(circle_at_62%_54%,rgba(203,213,225,0.28),transparent_34rem),linear-gradient(90deg,transparent_0%,rgba(248,251,255,0.78)_34%,rgba(255,255,255,0.90)_100%)]" />
      <div className="absolute left-1/2 top-0 h-px w-[72rem] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />

      <motion.div
        className="pointer-events-none absolute inset-y-0 right-0 z-[1] hidden w-[64vw] overflow-hidden lg:block"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 14%, black 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 14%, black 100%)',
        }}
        initial={{ opacity: 0, x: 36 }}
        animate={isHeroInView ? { opacity: 1, x: 0, y: [0, -8, 0] } : { opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 7, repeat: isHeroInView ? Infinity : 0, ease: 'easeInOut' }}
      >
        <video
          ref={videoRef}
          src="/computador_v2.mp4"
          className="absolute inset-0 h-full w-full scale-[1.14] object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Demonstração visual da automação com IA da ATY"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_48%,transparent_42%,rgba(248,251,255,0.48)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,251,255,0)_0%,rgba(248,251,255,0.54)_12%,transparent_28%,transparent_92%,rgba(248,251,255,0.62)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#f8fbff_0%,rgba(248,251,255,0.10)_18%,transparent_36%,transparent_72%,rgba(248,251,255,0.30)_100%)]" />
        <div className="absolute -inset-20 bg-[radial-gradient(circle_at_54%_48%,rgba(14,165,233,0.18),transparent_34rem)] blur-2xl" />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1440px] flex-col px-5 py-5 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between gap-4">
          <a href="#" aria-label="ATY" className="inline-flex items-center transition duration-300 hover:opacity-90">
            <Logo className="h-8 w-auto sm:h-9" />
          </a>

          <div className="flex items-center rounded-full border border-white/70 bg-white/55 p-1 text-xs font-semibold text-slate-600 shadow-[0_12px_32px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <button
              type="button"
              onClick={() => setLanguage('PT')}
              className={`rounded-full px-3 py-1.5 transition duration-300 ${
                language === 'PT' ? 'bg-slate-950 text-white shadow-sm' : 'hover:bg-white/70 hover:text-slate-950'
              }`}
            >
              PT
            </button>
            <button
              type="button"
              onClick={() => setLanguage('EN')}
              className={`rounded-full px-3 py-1.5 transition duration-300 ${
                language === 'EN' ? 'bg-slate-950 text-white shadow-sm' : 'hover:bg-white/70 hover:text-slate-950'
              }`}
            >
              EN
            </button>
          </div>
        </header>

        <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-8 lg:py-8 xl:gap-10">
          <motion.div
            className="max-w-3xl text-left"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-700 shadow-[0_12px_32px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-sky-700" />
              IA para operações comerciais
            </div>

            <h1 className="premium-led-text-light max-w-4xl text-balance text-5xl font-bold leading-[0.96] sm:text-6xl lg:text-[5.9rem]">
              Automação com IA para empresas que querem parecer impossíveis de ignorar.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-700 md:text-xl">
              Criamos agentes inteligentes, fluxos comerciais e experiências de atendimento que transformam interesse em conversa qualificada no WhatsApp.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button onClick={scrollToSimulator} className="premium-button px-6 py-4 text-base">
                Testar automação
                <ArrowRight className="h-5 w-5" />
              </button>
              <a
                href="https://wa.me/?text=Ol%C3%A1!%20Quero%20conhecer%20as%20automa%C3%A7%C3%B5es%20da%20Automation%20to%20You."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/70 bg-white/55 px-6 py-4 text-base font-semibold text-slate-800 shadow-[0_12px_32px_rgba(15,23,42,0.08)] backdrop-blur-xl transition duration-300 hover:border-sky-300/70 hover:bg-white/75 hover:text-slate-950"
              >
                <MessageSquareText className="h-5 w-5" />
                Falar com especialista
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-white/70 bg-white/45 px-4 py-4 shadow-[0_14px_38px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                  <div className="text-2xl font-bold text-sky-800">{metric.value}</div>
                  <div className="mt-1 text-xs leading-5 text-slate-600">{metric.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              {proofPoints.map((point) => (
                <div key={point} className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-sky-700" />
                  {point}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative isolate aspect-[16/9] w-full justify-self-end overflow-hidden rounded-[2rem] bg-[#f8fbff] shadow-[0_36px_110px_rgba(15,23,42,0.10)] lg:hidden"
            initial={{ opacity: 0, y: 18, x: 24 }}
            animate={isHeroInView ? { opacity: 1, x: 0, y: [0, -8, 0] } : { opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 7, repeat: isHeroInView ? Infinity : 0, ease: 'easeInOut' }}
          >
            <video
              src="/computador_v2.mp4"
              className="absolute inset-0 h-full w-full scale-[1.08] object-cover object-center"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Demonstração visual da automação com IA da ATY"
            />

            {false && (
              <>
              <div className="absolute -inset-14 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.34),transparent_58%),radial-gradient(circle_at_58%_44%,rgba(100,116,139,0.42),transparent_62%)] blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.5rem] shadow-[0_36px_100px_rgba(71,85,105,0.32)] [transform:rotateY(-5deg)_rotateX(1deg)]">
                <video
                  src="/computador_v2.mp4"
                  className="aspect-[16/10] w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Demonstração visual da automação com IA da ATY"
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_58%,rgba(203,213,225,0.20)_100%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(226,232,240,0.22)_0%,transparent_16%,transparent_84%,rgba(203,213,225,0.18)_100%)]" />
              </div>
              </>
            )}

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,transparent_42%,rgba(248,251,255,0.42)_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#f8fbff_0%,rgba(248,251,255,0.62)_9%,transparent_22%,transparent_78%,rgba(248,251,255,0.58)_91%,#f8fbff_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#f8fbff_0%,rgba(248,251,255,0.18)_16%,transparent_32%,transparent_68%,rgba(248,251,255,0.22)_84%,#f8fbff_100%)]" />
            <div className="pointer-events-none absolute -inset-10 bg-[radial-gradient(circle_at_58%_45%,rgba(14,165,233,0.16),transparent_35rem)] blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
