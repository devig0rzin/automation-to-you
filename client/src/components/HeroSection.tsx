import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Menu, MessageSquareText, X } from 'lucide-react';
import { useState } from 'react';
import HeroStudioScene from './HeroStudioScene';
import Logo from './Logo';
import TechnologyBackdrop from './TechnologyBackdrop';

function scrollToProjects() {
  document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section id="hero-section" className="aty-light-detail relative min-h-[100dvh] overflow-hidden bg-white/72 text-slate-950">
      <TechnologyBackdrop variant="right" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_74%_35%,rgba(14,165,233,0.11),transparent_28rem),radial-gradient(circle_at_16%_78%,rgba(11,87,181,0.06),transparent_24rem)]" />

      <div className="hero-header-safe relative z-30 mx-auto max-w-[1440px] px-5 pt-5 sm:px-8 lg:px-12">
        <header className="relative mx-auto flex max-w-4xl items-center justify-between rounded-lg border border-slate-200 bg-white/88 px-3 py-3 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:px-5">
          <a href="#hero-section" aria-label="Voltar ao início" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <Logo className="h-11 w-11 sm:h-12 sm:w-12" />
            <div>
              <div className="text-base font-bold leading-none">ATY</div>
              <div className="mt-1 hidden text-[11px] font-medium text-slate-500 sm:block">Development & Automation</div>
            </div>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
            <a href="#projetos" className="transition hover:text-[#0b57b5]">Projetos</a>
            <a href="#servicos" className="transition hover:text-[#0b57b5]">Serviços</a>
            <a href="#simulador-agente" className="transition hover:text-[#0b57b5]">Simulador</a>
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 transition active:scale-95 md:hidden"
              aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <a
              href="https://wa.me/5511987793213?text=Oi%2C%20quero%20conhecer%20a%20ATY"
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-white shadow-[0_12px_28px_rgba(15,23,42,0.2)] transition hover:-translate-y-0.5 hover:bg-[#0b57b5] active:scale-95"
              aria-label="Falar com a ATY"
            >
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav
                id="mobile-navigation"
                className="absolute inset-x-0 top-[calc(100%+0.65rem)] grid gap-1 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_24px_60px_rgba(15,23,42,0.16)] md:hidden"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.18 }}
              >
                {[
                  ['Projetos', '#projetos'],
                  ['Serviços', '#servicos'],
                  ['Simulador', '#simulador-agente'],
                  ['Entregas', '#entregas'],
                ].map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex min-h-12 items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-slate-700 transition active:bg-sky-50 active:text-[#0b57b5]"
                  >
                    {label}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
        </header>
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-2 px-5 pb-16 pt-5 sm:min-h-[calc(100dvh-6rem)] sm:gap-4 sm:px-8 sm:pb-10 sm:pt-8 lg:grid-cols-[0.84fr_1.16fr] lg:px-12">
        <div className="max-w-2xl py-7 sm:py-8">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-2 text-xs font-bold text-[#0b57b5]">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Projetos digitais e automações sob medida
          </div>
          <h1 className="text-balance text-[2.75rem] font-bold leading-[0.96] min-[360px]:text-5xl sm:text-6xl lg:text-[5.5rem]">
            Construímos o digital que faz seu negócio parecer maior.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
            Sites com 3D, landing pages, aplicativos e automações com IA. Da primeira impressão até a operação que
            acontece nos bastidores.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={scrollToProjects}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 py-4 text-base font-bold text-white shadow-[0_18px_42px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-[#0b57b5]"
            >
              Ver o que construímos
              <ArrowRight className="h-5 w-5" />
            </button>
            <a
              href="https://wa.me/5511987793213?text=Oi%2C%20quero%20tirar%20um%20projeto%20do%20papel"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-4 text-base font-bold text-slate-800 transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-[#0b57b5]"
            >
              <MessageSquareText className="h-5 w-5 text-emerald-500" />
              Falar sobre um projeto
            </a>
          </div>
          <div className="mt-10 hidden grid-cols-3 gap-4 border-t border-slate-200 pt-6 sm:grid">
            <HeroMetric value="3D" label="experiências que respondem" />
            <HeroMetric value="Web" label="sites, apps e portais" />
            <HeroMetric value="IA" label="automação de ponta a ponta" />
          </div>
        </div>

        <div className="hidden md:block">
          <HeroStudioScene />
        </div>
      </div>

      <motion.button
        type="button"
        onClick={scrollToProjects}
        className="absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 text-xs font-bold text-slate-500 md:flex"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      >
        Continue explorando
        <ArrowDown className="h-4 w-4" />
      </motion.button>
    </section>
  );
}

function HeroMetric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-xl font-bold text-[#0b57b5] sm:text-2xl">{value}</div>
      <div className="mt-1 text-xs leading-5 text-slate-500">{label}</div>
    </div>
  );
}
