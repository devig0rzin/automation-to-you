import { ArrowRight, Instagram, Mail, MessageCircle } from 'lucide-react';
import Logo from './Logo';

const productLinks = ['Agentes de IA', 'Fluxos', 'Automações', 'Integrações'];
const companyLinks = ['Sobre', 'Contato', 'Privacidade', 'Termos'];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50/80 to-transparent" />
      <div className="relative z-10 container mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-[1.3fr_0.7fr_0.7fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <Logo className="h-16 w-auto" />
              <div>
                <div className="text-xs text-slate-500">AI automation studio</div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">
              Criamos experiências digitais com IA, automação e design para empresas que querem vender tecnologia com mais autoridade.
            </p>
          </div>

          <FooterColumn title="Produto" links={productLinks} />
          <FooterColumn title="Empresa" links={companyLinks} />

          <div>
            <h4 className="mb-4 text-sm font-semibold text-slate-950">Contato</h4>
            <div className="flex gap-3">
              <SocialLink href="https://instagram.com/automationtoy" label="Instagram">
                <Instagram className="h-5 w-5" />
              </SocialLink>
              <SocialLink href="https://wa.me/5511999999999" label="WhatsApp">
                <MessageCircle className="h-5 w-5" />
              </SocialLink>
              <SocialLink href="mailto:contato@automationtoyou.com" label="Email">
                <Mail className="h-5 w-5" />
              </SocialLink>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>&copy; {currentYear} Automation to You. Todos os direitos reservados.</p>
          <p>Design, IA e automação para experiências comerciais melhores.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-semibold text-slate-950">{title}</h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="group inline-flex items-center gap-1 text-sm text-slate-600 transition hover:text-sky-700">
              {link}
              <ArrowRight className="h-3 w-3 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
    >
      {children}
    </a>
  );
}
