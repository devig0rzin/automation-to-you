import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import TechnologyBackdrop from './TechnologyBackdrop';

const steps = [
  {
    number: '01',
    verb: 'Entender',
    title: 'Começamos pelo que precisa mudar.',
    copy: 'Mapeamos o gargalo, quem participa do processo, as ferramentas atuais e o resultado que realmente importa.',
    output: 'Diagnóstico e prioridade',
  },
  {
    number: '02',
    verb: 'Desenhar',
    title: 'A solução aparece antes do código.',
    copy: 'Organizamos o fluxo, a interface e as integrações para que você enxergue o projeto e valide as decisões.',
    output: 'Fluxo e protótipo',
  },
  {
    number: '03',
    verb: 'Construir',
    title: 'Você acompanha enquanto ganha forma.',
    copy: 'Desenvolvemos em ciclos curtos, mostramos o progresso e ajustamos o caminho sem esconder o trabalho.',
    output: 'Versões funcionais',
  },
  {
    number: '04',
    verb: 'Operar',
    title: 'A entrega entra na rotina.',
    copy: 'Publicamos, conectamos os serviços, acompanhamos o uso e refinamos o que precisa continuar evoluindo.',
    output: 'Produção e acompanhamento',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="processo" className="aty-light-detail relative overflow-hidden bg-white/78 py-20 text-slate-950 sm:py-24 md:py-36">
      <TechnologyBackdrop variant="right" />
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <motion.header
          className="grid gap-8 border-b border-slate-200 pb-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-end"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#0b57b5]">Do problema à produção</div>
            <h2 className="mt-6 max-w-4xl text-balance text-[2.65rem] font-bold leading-[0.95] tracking-[-0.045em] sm:text-5xl md:text-7xl">
              Você vê o projeto avançar. Sem caixa-preta.
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-slate-600">
            Cada etapa termina com algo concreto para avaliar. Menos apresentações abstratas, mais decisões visíveis e versões funcionando.
          </p>
        </motion.header>

        <div className="relative mt-12 sm:mt-16">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-slate-200 lg:block" />
          <div className="grid gap-5 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.article
                key={step.number}
                className="group relative rounded-[1.4rem] border border-slate-200 bg-white/75 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-sm sm:rounded-[1.6rem] sm:p-6 md:p-7"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-8 border-white bg-[#0b57b5] font-mono text-xs font-bold text-white shadow-[0_10px_28px_rgba(11,87,181,0.25)]">
                  {step.number}
                </div>
                <div className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-[#0b57b5]">{step.verb}</div>
                <h3 className="mt-3 text-2xl font-bold leading-tight tracking-[-0.025em]">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{step.copy}</p>
                <div className="mt-7 flex items-center gap-2 border-t border-slate-200 pt-5 text-xs font-bold text-slate-500">
                  <Check className="h-4 w-4 text-emerald-500" />
                  {step.output}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
