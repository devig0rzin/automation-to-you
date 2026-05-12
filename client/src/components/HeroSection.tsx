import { motion } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  CalendarCheck,
  CheckCircle2,
  MessageSquareText,
  MousePointerClick,
  Sparkles,
} from 'lucide-react';

const quickWins = [
  'Captura lead antes do teste',
  'Simula agente com IA',
  'Mostra fluxo de mensagens',
  'Conduz para WhatsApp',
];

const previewMessages = [
  {
    role: 'assistant',
    text: 'Oi, sou a Lia da Bella Nails. Quer marcar manicure, pedicure ou alongamento?',
  },
  {
    role: 'user',
    text: 'Quero saber valor de alongamento e horario para sexta.',
  },
  {
    role: 'assistant',
    text: 'O alongamento comeca em R$ 130. Para sexta eu posso checar manha ou tarde. Qual periodo fica melhor?',
  },
];

function scrollToSimulator() {
  document.getElementById('simulador-agente')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#05070d] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,_rgba(0,217,255,0.16),_transparent_26%),radial-gradient(circle_at_82%_22%,_rgba(16,185,129,0.12),_transparent_24%),linear-gradient(180deg,_#05070d_0%,_#071018_56%,_#050505_100%)]" />
      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400 text-sm font-black text-black shadow-[0_0_35px_rgba(0,217,255,0.35)]">
              AT
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-white">
                Automation to You
              </div>
              <div className="text-xs text-cyan-200">IA para atendimento e vendas</div>
            </div>
          </div>

          <button
            onClick={scrollToSimulator}
            className="hidden rounded-lg border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/15 sm:block"
          >
            Testar agente
          </button>
        </header>

        <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:py-16">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
              <Sparkles className="h-4 w-4" />
              Previa gratuita de automacao
            </div>

            <h1 className="text-4xl font-black leading-[1.04] tracking-normal text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Teste um atendimento de IA antes de contratar.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Cadastre seus dados, escolha um modelo e veja uma previa no estilo WhatsApp com IA e botoes de fluxo.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={scrollToSimulator}
                className="btn-neon-solid flex items-center justify-center gap-2 rounded-lg px-6 py-4 text-base font-bold"
              >
                Fazer cadastro gratuito
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="btn-neon flex items-center justify-center gap-2 rounded-lg px-6 py-4 text-base font-bold">
                <MessageSquareText className="h-5 w-5" />
                Falar no WhatsApp
              </button>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {quickWins.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.12 }}
          >
            <div className="rounded-xl border border-cyan-300/20 bg-slate-950/80 p-4 shadow-[0_0_80px_rgba(0,217,255,0.14)] backdrop-blur-xl">
              <div className="mb-4 grid grid-cols-3 gap-2">
                <HeroMetric icon={<MousePointerClick className="h-4 w-4" />} label="Lead" value="Capturado" />
                <HeroMetric icon={<Bot className="h-4 w-4" />} label="Template" value="Manicure" />
                <HeroMetric icon={<CalendarCheck className="h-4 w-4" />} label="Objetivo" value="Agendar" />
              </div>

              <div className="overflow-hidden rounded-xl border border-cyan-300/15 bg-black">
                <div className="flex items-center gap-3 border-b border-cyan-300/10 bg-slate-950 px-4 py-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-300 text-black">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Lia Assistente</div>
                    <div className="text-xs text-emerald-300">respondendo como WhatsApp</div>
                  </div>
                </div>

                <div className="space-y-3 p-4">
                  {previewMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[82%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                          message.role === 'user'
                            ? 'bg-cyan-300 text-black'
                            : 'bg-slate-900 text-slate-100'
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {['Saudacao', 'Preco', 'Agenda'].map((step, index) => (
                  <div key={step} className="rounded-lg border border-cyan-300/10 bg-cyan-300/5 p-3">
                    <div className="text-xs text-cyan-200">Fluxo {index + 1}</div>
                    <div className="mt-1 font-semibold text-white">{step}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HeroMetric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-cyan-300/10 bg-cyan-300/5 p-3">
      <div className="mb-2 flex items-center gap-2 text-xs text-cyan-200">
        {icon}
        {label}
      </div>
      <div className="text-sm font-semibold text-white">{value}</div>
    </div>
  );
}
