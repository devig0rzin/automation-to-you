import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Escolha o template',
    description: 'Partimos de um modelo por nicho para acelerar a criação sem perder contexto.',
  },
  {
    number: '02',
    title: 'Ajuste o agente',
    description: 'Nome, serviços, horários, valores, tom de voz e regras entram na simulação.',
  },
  {
    number: '03',
    title: 'Visualize o fluxo',
    description: 'O caminho da conversa fica claro em blocos, botões e respostas conectadas.',
  },
  {
    number: '04',
    title: 'Converta no WhatsApp',
    description: 'Depois da prévia, o lead já entende o valor e segue para uma conversa comercial.',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="pastel-section border-y border-slate-200/80">
      <div className="section-inner">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div
            className="lg:sticky lg:top-24"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="light-eyebrow mb-5">Processo</div>
            <h2 className="text-balance text-4xl font-semibold text-slate-950 md:text-6xl">
              Um caminho simples para transformar ideia em demonstração.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              O objetivo é reduzir explicações longas. A pessoa testa, entende e visualiza o agente funcionando no contexto dela.
            </p>
          </motion.div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.article
                key={step.number}
                className="light-card p-6 md:p-7"
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                viewport={{ once: true }}
              >
                <div className="flex gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-sky-100 bg-sky-50 text-sm font-semibold text-sky-700">
                    {step.number}
                  </div>
                  <div>
                    <div className="mb-2 flex items-center gap-2 text-sm text-emerald-600">
                      <CheckCircle2 className="h-4 w-4" />
                      Etapa validada
                    </div>
                    <h3 className="text-2xl font-semibold text-slate-950">{step.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{step.description}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
