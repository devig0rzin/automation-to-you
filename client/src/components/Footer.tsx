import { Instagram, Mail } from 'lucide-react';
import Logo from './Logo';
import WhatsAppIcon from './WhatsAppIcon';
import { trackEvent } from '@/lib/analytics';
import { EMAIL, INSTAGRAM_URL, whatsappLink } from '@/lib/site';

const nav = [
  ['Como nasce seu site', '#inicio'],
  ['Projetos', '#projetos'],
  ['O que vem pronto', '#incluso'],
  ['Tipos de site', '#tipos'],
  ['Manutenção', '#manutencao'],
  ['Automação', '#automacao'],
  ['Dúvidas', '#duvidas'],
] as const;

export default function Footer() {
  const year = new Date().getFullYear();
  const wa = whatsappLink();

  return (
    <footer className="border-t border-[var(--aty-line)] bg-white px-5 pb-10 pt-14 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-[1180px] gap-10 md:grid-cols-[1.2fr_1fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <Logo className="h-11 w-11" />
            <span className="font-display text-xl font-bold tracking-[-0.02em] text-[var(--aty-ink)]">Automation To You</span>
          </div>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[var(--aty-muted)]">
            Sites do zero e manutenção contínua, sistemas e automação com IA para pequenas e médias empresas. Feitos por programador, acelerados por IA.
          </p>
        </div>

        <nav aria-label="Rodapé">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
            {nav.map(([label, href]) => (
              <li key={href}>
                <a href={href} className="text-[15px] text-[var(--aty-muted)] transition hover:text-[var(--aty-ink)]">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="space-y-3">
          <li>
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('click_whatsapp', { cta_location: 'footer', link_url: wa })}
              className="inline-flex items-center gap-2.5 text-[15px] text-[var(--aty-ink)] transition hover:text-[var(--aty-blue)]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp
            </a>
          </li>
          <li>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2.5 text-[15px] text-[var(--aty-ink)] transition hover:text-[var(--aty-blue)]">
              <Instagram className="h-5 w-5" />
              Instagram
            </a>
          </li>
          <li>
            <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2.5 text-[15px] text-[var(--aty-ink)] transition hover:text-[var(--aty-blue)]">
              <Mail className="h-5 w-5" />
              {EMAIL}
            </a>
          </li>
        </ul>
      </div>
      <div className="mx-auto mt-12 max-w-[1180px] border-t border-[var(--aty-line)] pt-6 text-sm text-[var(--aty-muted)]">
        © {year} Automation To You. Todos os direitos reservados.
      </div>
    </footer>
  );
}
