import { motion } from 'framer-motion';
import { Cpu, Gauge, Lock, TrendingUp, Users, Zap } from 'lucide-react';

const differentials = [
  {
    icon: <Cpu className="h-5 w-5" />,
    title: 'Demo antes da venda',
    description: 'O lead entende a automação em um ambiente visual, sem depender apenas de explicação verbal.',
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: 'Contexto capturado',
    description: 'Dados do negócio entram antes da simulação, deixando a conversa mais personalizada.',
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: 'Entrega mais rápida',
    description: 'Templates reduzem o tempo de montagem mantendo uma experiência com aparência exclusiva.',
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: 'Foco em conversão',
    description: 'O fluxo conduz para orçamento, agendamento ou atendimento humano com menos atrito.',
  },
  {
    icon: <Lock className="h-5 w-5" />,
    title: 'Estrutura segura',
    description: 'A chave da IA fica protegida no backend, sem exposição direta no navegador.',
  },
  {
    icon: <Gauge className="h-5 w-5" />,
    title: 'Ajuste fino',
    description: 'Tom de voz, regras e serviços podem ser refinados sem reconstruir a experiência inteira.',
  },
];

export default function DifferentialsSection() {
  return (
    <section className="light-section">
      <div className="section-inner">
        <motion.div
          className="mx-auto mb-14 max-w-3xl text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="light-eyebrow mb-5">Diferenciais</div>
          <h2 className="text-balance text-4xl font-semibold text-slate-950 md:text-6xl">
            A experiência precisa vender confiança antes de vender tecnologia.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Cada elemento visual foi pensado para explicar valor, reduzir dúvida e mostrar maturidade profissional.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {differentials.map((diff, index) => (
            <motion.article
              key={diff.title}
              className="light-card p-6"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              viewport={{ once: true }}
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-sky-100 bg-sky-50 text-sky-600">
                {diff.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-950">{diff.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{diff.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
