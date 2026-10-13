import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import { trackEvent } from '@/lib/analytics';
import { whatsappLink } from '@/lib/site';

const links = [
  ['Projetos', '#projetos'],
  ['O que vem pronto', '#incluso'],
  ['Tipos de site', '#tipos'],
  ['Manutenção', '#manutencao'],
  ['Automação', '#automacao'],
] as const;

const headerWhatsApp = whatsappLink('Oi! Vim pelo site da ATY e quero conversar sobre um projeto.');

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-4">
      <header
        className={`relative mx-auto flex max-w-[1180px] items-center justify-between rounded-full border px-2.5 py-2 transition-all duration-300 sm:px-3 ${
          scrolled || open
            ? 'border-[var(--aty-line)] bg-white/90 shadow-[0_16px_40px_-24px_rgba(10,26,51,0.45)] backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <a href="#inicio" className="flex items-center gap-2.5 rounded-full pr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--aty-blue)]" aria-label="ATY, voltar ao início">
          <Logo className="h-9 w-9" />
          <span className="font-display text-lg font-bold tracking-[-0.02em] text-[var(--aty-ink)]">ATY</span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="rounded-full px-3.5 py-2 text-[14px] font-medium text-[var(--aty-muted)] transition hover:bg-[#eef3fa] hover:text-[var(--aty-ink)]"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href={headerWhatsApp}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent('click_whatsapp', { cta_location: 'header', link_url: headerWhatsApp })}
            className="inline-flex h-10 items-center rounded-full bg-[var(--aty-ink)] px-4 text-[14px] font-semibold text-white transition hover:bg-[var(--aty-blue)]"
          >
            Falar no WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--aty-ink)] transition hover:bg-[#eef3fa] lg:hidden"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            aria-controls="menu-mobile"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              id="menu-mobile"
              aria-label="Menu"
              className="absolute inset-x-0 top-[calc(100%+0.5rem)] rounded-3xl border border-[var(--aty-line)] bg-white p-2 shadow-[0_24px_60px_-20px_rgba(10,26,51,0.35)] lg:hidden"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16 }}
            >
              {links.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center rounded-2xl px-4 text-[15px] font-medium text-[var(--aty-ink)] active:bg-[#eef3fa]"
                >
                  {label}
                </a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
