import { motion, useReducedMotion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import Reveal from './Reveal';

const rows = [
  ['Visual', 'Parece com mil outros sites', 'Pensado para o seu público e a sua marca'],
  ['No celular', 'Quebra em tela pequena e ninguém percebe', 'Testado em celular antes de ir ao ar'],
  ['Formulário', 'Botão bonito que não manda nada para ninguém', 'Cada contato chega no seu WhatsApp'],
  ['Pagamento', 'Página de vendas sem pagamento funcionando', 'Pix e cartão testados de ponta a ponta'],
  ['Quando dá problema', 'Você sozinho com um código que não entende', 'Você fala direto com quem programou'],
] as const;

export default function HumanAISection() {
  const reduce = useReducedMotion();
  return (
    <section id="ia-e-programador" className="relative bg-[var(--aty-ink)] px-5 py-24 text-white sm:px-8 md:py-32 lg:px-12">
      <div className="mx-auto max-w-[1180px]">
        <Reveal className="grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <h2 className="font-display text-[2.4rem] font-bold leading-[1] tracking-[-0.035em] sm:text-5xl md:text-6xl">
            A IA acelera. O programador decide.
          </h2>
          <p className="max-w-lg text-base leading-relaxed text-[#a9b8cf] sm:text-lg">
            Usamos IA para fazer em dias o que levaria semanas. Mas quem define a estrutura, revisa o código e testa cada
            botão é uma pessoa. É essa a diferença entre ter um site e ter um site que funciona.
          </p>
        </Reveal>

        <div className="mt-14 overflow-hidden rounded-[22px] border border-white/10" role="table" aria-label="Site feito só com IA comparado com site feito com a ATY">
          <div role="row" className="hidden grid-cols-[0.6fr_1fr_1fr] border-b border-white/10 bg-white/[0.03] text-sm md:grid">
            <span role="columnheader" className="px-6 py-4 text-[#7f93b2]">
              <span className="sr-only">Assunto</span>
            </span>
            <span role="columnheader" className="px-6 py-4 font-medium text-[#a9b8cf]">
              Site gerado só com IA
            </span>
            <span role="columnheader" className="border-l border-white/10 bg-white/[0.04] px-6 py-4 font-semibold text-white">
              Site feito com a ATY
            </span>
          </div>
          {rows.map(([topic, alone, aty], index) => (
            <motion.div
              role="row"
              key={topic}
              className="grid border-b border-white/10 last:border-b-0 md:grid-cols-[0.6fr_1fr_1fr]"
              initial={reduce ? false : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <span role="rowheader" className="font-display px-5 pt-5 text-lg font-semibold md:px-6 md:py-5">
                {topic}
              </span>
              <span role="cell" className="flex items-start gap-3 px-5 pt-3 text-[15px] leading-relaxed text-[#a9b8cf] md:px-6 md:py-5">
                <X className="mt-1 h-4 w-4 shrink-0 text-[#7f93b2]" aria-label="Só com IA:" />
                {alone}
              </span>
              <span
                role="cell"
                className="flex items-start gap-3 px-5 pb-5 pt-2 text-[15px] leading-relaxed text-white md:border-l md:border-white/10 md:bg-white/[0.04] md:px-6 md:py-5"
              >
                <Check className="mt-1 h-4 w-4 shrink-0 text-[#5fe3a1]" aria-label="Com a ATY:" />
                {aty}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
