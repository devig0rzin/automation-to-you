import { motion } from 'framer-motion';
import { BarChart3, Bot, Cpu, MessageSquare, Network, Zap } from 'lucide-react';

const services = [
  {
    icon: <Bot className="h-5 w-5" />,
    title: 'Agentes de IA sob medida',
    description: 'Prompts, regras de atendimento e comportamento do agente configurados para cada segmento.',
  },
  {
    icon: <MessageSquare className="h-5 w-5" />,
    title: 'Fluxos conversacionais',
    description: 'Árvores de mensagens com botões, respostas e caminhos claros para WhatsApp e captação de leads.',
  },
  {
    icon: <Network className="h-5 w-5" />,
    title: 'Integrações operacionais',
    description: 'Conexões com planilhas, CRMs, APIs e ferramentas que já fazem parte da rotina do negócio.',
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: 'Automação de tarefas',
    description: 'Redução de processos repetitivos com rotinas confiáveis, rastreáveis e fáceis de manter.',
  },
  {
    icon: <Cpu className="h-5 w-5" />,
    title: 'Simulação antes da venda',
    description: 'O cliente vê o valor da automação na prática antes de falar com o time comercial.',
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: 'Dados para decisão',
    description: 'Conversas e leads organizados para acompanhamento, análise e melhoria contínua da operação.',
  },
];

export default function ServicesSection() {
  return (
    <section className="light-section">
      <div className="section-inner">
        <motion.div
          className="mb-14 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="light-eyebrow mb-5">O que entregamos</div>
          <h2 className="text-balance text-4xl font-semibold text-slate-950 md:text-6xl">
            Automação com cara de produto, não de experimento.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Da primeira mensagem até a integração final, o projeto é desenhado para parecer confiável, simples e comercialmente pronto.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              className="light-card group p-6"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              viewport={{ once: true }}
            >
              <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-xl border border-sky-100 bg-sky-50 text-sky-600 transition group-hover:border-sky-300 group-hover:bg-sky-100">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-950">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{service.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
