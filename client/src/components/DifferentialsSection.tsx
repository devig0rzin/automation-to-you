import { motion } from 'framer-motion';
import { Eye, Gauge, MessageSquareText, Puzzle, ShieldCheck, Wrench } from 'lucide-react';
import TechnologyBackdrop from './TechnologyBackdrop';

const principles = [
  [Eye, '01', 'Decisão visível', 'Escopo, prioridades e escolhas ficam claros. Você sabe o que está sendo feito e por quê.'],
  [Puzzle, '02', 'Integração real', 'Construímos em volta da operação existente e conectamos as ferramentas que já fazem parte da rotina.'],
  [Gauge, '03', 'Qualidade de produção', 'Performance, responsividade, segurança e estabilidade entram desde a primeira versão.'],
  [MessageSquareText, '04', 'Contato direto', 'Você conversa com quem desenha e implementa. Menos repasse, menos ruído e respostas mais rápidas.'],
  [ShieldCheck, '05', 'Base preparada', 'Código, dados e acessos ficam organizados para crescer sem depender de improviso.'],
  [Wrench, '06', 'Continuidade', 'A entrega inclui contexto, documentação e acompanhamento para continuar útil depois da publicação.'],
];

export default function DifferentialsSection() {
  return (
    <section id="diferenciais" className="aty-light-detail aty-light-detail--reverse relative overflow-hidden bg-[#f4f7fb]/82 py-20 text-slate-950 sm:py-24 md:py-36">
      <TechnologyBackdrop variant="left" />
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <motion.header
          className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#0b57b5]">Nosso padrão de trabalho</div>
            <h2 className="mt-6 max-w-4xl text-balance text-[2.65rem] font-bold leading-[0.95] tracking-[-0.045em] sm:text-5xl md:text-7xl">
              Feito para funcionar depois do lançamento.
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-slate-600">
            Uma boa entrega não depende de quem a construiu estar sempre por perto. Ela precisa ser clara, estável e utilizável pela empresa.
          </p>
        </motion.header>

        <div className="mt-12 border-t border-slate-200 sm:mt-16">
          {principles.map(([Icon, number, title, copy], index) => (
            <motion.article
              key={title as string}
              className="group grid grid-cols-[44px_1fr] gap-x-4 gap-y-3 border-b border-slate-200 py-7 md:grid-cols-[72px_60px_0.8fr_1.2fr] md:items-center md:gap-5 md:py-10"
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <div className="font-mono text-xs font-bold text-[#0b57b5]">{number as string}</div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-sky-200 bg-white/70 text-[#0b57b5] transition group-hover:bg-[#0b57b5] group-hover:text-white">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="self-center text-xl font-bold tracking-[-0.02em] md:text-3xl">{title as string}</h3>
              <p className="col-span-2 max-w-2xl text-sm leading-7 text-slate-600 md:col-span-1 md:text-base">{copy as string}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
