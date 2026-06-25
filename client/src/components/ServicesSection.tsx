import { motion } from 'framer-motion';
import { Bot, Braces, LayoutDashboard, MonitorSmartphone, Workflow } from 'lucide-react';
import ServiceSystemVisual from './ServiceSystemVisual';

const offers = [
  {
    icon: MonitorSmartphone,
    number: '01',
    title: 'Sites e páginas de campanha',
    copy: 'Uma presença digital forte para apresentar, vender e direcionar o próximo passo.',
    items: ['Institucional', 'Landing pages', 'Experiências interativas'],
  },
  {
    icon: LayoutDashboard,
    number: '02',
    title: 'Aplicações e portais',
    copy: 'Interfaces para clientes e equipes consultarem dados, executarem tarefas e acompanharem processos.',
    items: ['Dashboards', 'Área do cliente', 'Sistemas internos'],
  },
  {
    icon: Bot,
    number: '03',
    title: 'Atendimento com IA',
    copy: 'Agentes treinados com as informações, regras e limites reais da sua operação.',
    items: ['WhatsApp', 'Triagem', 'Qualificação'],
  },
  {
    icon: Workflow,
    number: '04',
    title: 'Automação operacional',
    copy: 'Fluxos que movimentam dados e tarefas entre as ferramentas que sua equipe já usa.',
    items: ['CRM', 'Planilhas', 'Notificações'],
  },
];

export default function ServicesSection() {
  return (
    <section id="entregas" className="relative overflow-hidden bg-[#07111f] py-20 text-white sm:py-24 md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(14,165,233,.13),transparent_25rem),radial-gradient(circle_at_12%_74%,rgba(11,87,181,.12),transparent_28rem)]" />
      <div className="pointer-events-none absolute -right-44 top-20 h-[34rem] w-[34rem] rounded-full border border-sky-300/10" />
      <div className="pointer-events-none absolute -right-24 top-40 h-[22rem] w-[22rem] rounded-full border border-dashed border-sky-300/10" />
      <div className="pointer-events-none absolute -left-52 bottom-20 h-[32rem] w-[32rem] rounded-full border border-white/[0.05]" />
      <svg className="pointer-events-none absolute right-10 top-16 h-48 w-48 opacity-[0.08]" viewBox="0 0 200 200" fill="none" aria-hidden="true">
        <circle cx="100" cy="100" r="72" stroke="#7dd3fc" />
        <circle cx="100" cy="100" r="48" stroke="#7dd3fc" strokeDasharray="5 8" />
        <path d="M100 18V55M100 145V182M18 100H55M145 100H182" stroke="#7dd3fc" />
        <path d="M42 42L68 68M132 132L158 158M158 42L132 68M68 132L42 158" stroke="#7dd3fc" />
        <circle cx="100" cy="100" r="9" fill="#7dd3fc" />
      </svg>

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <motion.header
          className="grid gap-8 border-b border-white/10 pb-14 lg:grid-cols-[1fr_0.75fr] lg:items-end"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65 }}
        >
          <div>
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
              <Braces className="h-4 w-4" />
              O que podemos construir
            </div>
            <h2 className="mt-6 max-w-4xl text-balance text-[2.75rem] font-bold leading-[0.94] tracking-[-0.045em] sm:text-5xl md:text-7xl">
              Um contato entra. O sistema inteiro responde.
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-white/60">
            Entramos no ponto que mais trava o negócio hoje e deixamos a estrutura preparada para o próximo passo.
            O projeto pode começar pequeno sem nascer limitado.
          </p>
        </motion.header>

        <motion.div
          className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
        >
          <ServiceSystemVisual />
          <div className="flex flex-col justify-between rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5 sm:rounded-[2rem] sm:p-7 md:p-9">
            <div>
              <div className="font-mono text-xs font-bold text-sky-300">ATY / ARCHITECTURE</div>
              <h3 className="mt-6 text-3xl font-bold leading-[1.03] tracking-[-0.035em] sm:text-4xl md:text-5xl">
                O efeito visual agora mostra o trabalho acontecendo.
              </h3>
              <p className="mt-6 text-base leading-8 text-white/60">
                O visitante chega pelo site, conversa com o agente, vira informação organizada e aciona o próximo passo.
                A animação segue exatamente a lógica da entrega.
              </p>
            </div>
            <a
              href="https://github.com/devig0rzin/automation-to-you"
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center justify-between border-t border-white/10 pt-5 text-sm font-bold text-white transition hover:text-sky-300"
            >
              Ver o projeto no GitHub
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </motion.div>

        <div className="mt-16 grid gap-4 lg:grid-cols-12">
          {offers.map((offer, index) => {
            const Icon = offer.icon;
            const layout = [
              'lg:col-span-7',
              'lg:col-span-5',
              'lg:col-span-5',
              'lg:col-span-7',
            ][index];
            return (
              <motion.article
                key={offer.title}
                className={`group relative min-h-[280px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-sky-300/25 hover:bg-white/[0.055] sm:min-h-[310px] sm:rounded-[1.8rem] sm:p-7 md:p-9 ${layout}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.55, delay: index * 0.04 }}
              >
                <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full border border-white/[0.06] transition duration-500 group-hover:scale-110 group-hover:border-sky-300/15" />
                <div className="absolute right-7 top-7 font-mono text-5xl font-bold tracking-[-0.08em] text-white/[0.045]">{offer.number}</div>

                <div className="relative flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] border border-sky-300/15 bg-sky-300/[0.07] text-sky-300 transition group-hover:bg-sky-300/[0.12]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="font-mono text-xs font-bold text-sky-300/60">{offer.number} / 04</div>
                  </div>

                  <h3 className="mt-8 max-w-xl text-2xl font-bold tracking-[-0.03em] sm:mt-10 sm:text-3xl md:text-4xl">{offer.title}</h3>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-white/55">{offer.copy}</p>

                  <div className="mt-auto flex flex-wrap gap-2 pt-8">
                    {offer.items.map((item) => (
                      <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white/65">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
