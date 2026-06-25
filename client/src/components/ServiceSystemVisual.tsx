import { motion } from 'framer-motion';
import { Bot, Check, LayoutDashboard, MonitorSmartphone, Workflow } from 'lucide-react';

const stages = [
  {
    icon: MonitorSmartphone,
    number: '01',
    label: 'Entrada',
    title: 'Site',
    detail: 'Novo contato',
    position: 'left-[4%] top-[8%]',
    rotate: -5,
  },
  {
    icon: Bot,
    number: '02',
    label: 'Conversa',
    title: 'Agente IA',
    detail: 'Lead qualificado',
    position: 'right-[4%] top-[15%]',
    rotate: 4,
  },
  {
    icon: LayoutDashboard,
    number: '03',
    label: 'Organização',
    title: 'Sistema',
    detail: 'Dados registrados',
    position: 'left-[7%] bottom-[8%]',
    rotate: 3,
  },
  {
    icon: Workflow,
    number: '04',
    label: 'Execução',
    title: 'Automação',
    detail: 'Próximo passo feito',
    position: 'right-[5%] bottom-[5%]',
    rotate: -4,
  },
] as const;

export default function ServiceSystemVisual() {
  return (
    <>
      <div className="service-system-mobile relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#081525] p-4 sm:hidden">
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-sky-300/10" />
        <div className="relative">
          <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-sky-300/70">Fluxo ATY</div>
              <div className="mt-1 text-sm font-semibold text-white">Um contato, quatro ações</div>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-400/10 text-sky-300">
              <Workflow className="h-4 w-4" />
            </span>
          </div>

          <div className="relative space-y-3">
            <div className="absolute bottom-5 left-[1.2rem] top-5 w-px bg-gradient-to-b from-sky-300/10 via-sky-300/50 to-emerald-300/40" />
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <motion.article
                  key={stage.title}
                  className="relative flex items-center gap-3 rounded-[1.15rem] border border-white/10 bg-[#0c1929]/95 p-3.5 text-white shadow-[0_16px_38px_rgba(0,0,0,0.22)]"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                >
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sky-300/20 bg-[#0b57b5] text-sky-100">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-sky-300/65">{stage.label}</span>
                      <span className="font-mono text-[9px] font-bold text-white/30">{stage.number}</span>
                    </div>
                    <div className="mt-1 font-bold">{stage.title}</div>
                    <div className="mt-0.5 text-xs text-white/45">{stage.detail}</div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            className="mt-4 flex items-center gap-3 rounded-[1.15rem] border border-emerald-300/20 bg-emerald-300/[0.08] p-4"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-slate-950">
              <Check className="h-5 w-5" />
            </span>
            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-300/70">Resultado</div>
              <div className="mt-1 font-bold text-white">Contato resolvido e próximo passo executado.</div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative hidden h-[560px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#081525] sm:block">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:38px_38px]" />
      <div className="absolute left-1/2 top-1/2 h-[56%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-sky-300/15" />
      <div className="absolute left-1/2 top-1/2 h-[34%] w-[35%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 760 560" fill="none">
        <path
          d="M225 145 C310 175 315 220 380 280 C445 340 465 375 555 410"
          stroke="rgba(125,211,252,.24)"
          strokeWidth="2"
          strokeDasharray="7 10"
        />
        <path
          d="M540 155 C455 180 445 225 380 280 C315 335 300 380 215 410"
          stroke="rgba(125,211,252,.18)"
          strokeWidth="2"
          strokeDasharray="7 10"
        />
        <motion.circle
          r="6"
          fill="#7dd3fc"
          filter="drop-shadow(0 0 8px #38bdf8)"
          animate={{ offsetDistance: ['0%', '100%'] }}
          style={{ offsetPath: "path('M225 145 C310 175 315 220 380 280 C445 340 465 375 555 410')" }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
        />
      </svg>

      <motion.div
        className="absolute left-1/2 top-1/2 z-20 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[2rem] border border-sky-300/30 bg-[#0b57b5] text-white shadow-[0_0_80px_rgba(14,165,233,0.32)]"
        animate={{ y: [-5, 5, -5], rotate: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="text-[9px] font-bold uppercase tracking-[0.24em] text-sky-200">Fluxo ATY</div>
        <div className="mt-2 text-center text-lg font-bold leading-5">Contato<br />resolvido</div>
        <div className="mt-3 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400 text-slate-950">
          <Check className="h-4 w-4" />
        </div>
      </motion.div>

      {stages.map((stage, index) => {
        const Icon = stage.icon;
        return (
          <motion.article
            key={stage.title}
            className={`absolute ${stage.position} z-10 w-[40%] max-w-[250px] rounded-[1.4rem] border border-white/10 bg-[#0c1929]/95 p-4 text-white shadow-[0_22px_55px_rgba(0,0,0,0.32)] backdrop-blur`}
            initial={{ opacity: 0, scale: 0.84, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            animate={{ rotate: [stage.rotate - 1, stage.rotate + 1, stage.rotate - 1] }}
            transition={{
              opacity: { duration: 0.5, delay: index * 0.12 },
              scale: { duration: 0.5, delay: index * 0.12 },
              y: { duration: 0.5, delay: index * 0.12 },
              rotate: { duration: 5 + index, repeat: Infinity, ease: 'easeInOut' },
            }}
            whileHover={{ scale: 1.04, rotate: 0, borderColor: 'rgba(56,189,248,.5)' }}
          >
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-300/20 bg-sky-300/10 text-sky-300">
                <Icon className="h-5 w-5" />
              </div>
              <span className="font-mono text-[10px] font-bold text-white/35">{stage.number}</span>
            </div>
            <div className="mt-5 text-[9px] font-bold uppercase tracking-[0.2em] text-sky-300/65">{stage.label}</div>
            <h3 className="mt-1 text-xl font-bold">{stage.title}</h3>
            <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-3 text-xs font-semibold text-white/50">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {stage.detail}
            </div>
          </motion.article>
        );
      })}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
        um dado entra · quatro frentes trabalham
      </div>
      </div>
    </>
  );
}
