import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';

function scrollToSimulator() {
  document.getElementById('simulador-agente')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

export default function CTASection() {
  return (
    <section className="pastel-section">
      <div className="section-inner">
        <motion.div
          className="light-panel mx-auto max-w-5xl overflow-hidden p-8 text-center md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-100 bg-sky-50 text-sky-600">
            <Sparkles className="h-6 w-6" />
          </div>
          <h2 className="mx-auto max-w-4xl text-balance text-4xl font-semibold leading-tight text-slate-950 md:text-6xl">
            Mostre qualidade antes do cliente pedir orçamento.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Use a prévia como porta de entrada: o lead entende a solução, testa o fluxo e chega mais preparado para fechar.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <button onClick={scrollToSimulator} className="warm-button px-6 py-4 text-base">
              Testar o simulador
              <ArrowRight className="h-5 w-5" />
            </button>
            <a
              href="https://wa.me/?text=Ol%C3%A1!%20Quero%20saber%20mais%20sobre%20agentes%20de%20IA%20e%20automa%C3%A7%C3%A3o."
              target="_blank"
              rel="noreferrer"
              className="soft-button px-6 py-4 text-base"
            >
              <MessageCircle className="h-5 w-5" />
              Chamar no WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
