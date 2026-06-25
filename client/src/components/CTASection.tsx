import { motion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

export default function CTASection() {
  return (
    <section id="contato" className="aty-light-detail relative overflow-hidden bg-white/76 px-5 py-16 sm:px-8 sm:py-20 md:py-28 lg:px-12">
      <motion.div
        className="relative mx-auto max-w-[1344px] overflow-hidden rounded-[1.6rem] bg-[#07111f] px-5 py-12 text-white shadow-[0_34px_100px_rgba(7,17,31,0.2)] sm:rounded-[2.5rem] sm:px-7 sm:py-14 md:px-14 md:py-20"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.65 }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-sky-300/10" />
        <div className="relative grid gap-12 lg:grid-cols-[1fr_320px] lg:items-end">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">Vamos conversar</div>
            <h2 className="mt-6 max-w-5xl text-balance text-[2.55rem] font-bold leading-[0.95] tracking-[-0.045em] sm:text-5xl md:text-7xl">
              Qual parte do seu negócio ainda depende de improviso?
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/60">
              Pode ser uma página que não converte, um atendimento lento ou um processo preso em tarefas manuais. Mostre o problema; a gente organiza o próximo passo.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-white/55">
              {['Conversa objetiva', 'Sem proposta genérica', 'Próximo passo claro'].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400" />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <a
            href="https://wa.me/5511987793213?text=Olá!%20Quero%20conversar%20sobre%20um%20projeto%20com%20a%20ATY."
            target="_blank"
            rel="noreferrer"
            className="group inline-flex min-h-14 items-center justify-between gap-4 rounded-2xl bg-white px-5 py-4 font-bold text-slate-950 transition hover:-translate-y-1 active:scale-[0.98] sm:gap-6 sm:px-6 sm:py-5"
          >
            <span className="flex items-center gap-3">
              <WhatsAppIcon className="h-6 w-6 text-emerald-500" />
              Explicar meu projeto
            </span>
            <ArrowUpRight className="h-5 w-5 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
