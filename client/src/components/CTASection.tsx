import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowRight, Bot, MessageCircle } from 'lucide-react';

function scrollToSimulator() {
  document.getElementById('simulador-agente')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

export default function CTASection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="relative overflow-hidden bg-black py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,217,255,0.16),_transparent_34%)]" />
      <motion.div
        className="relative z-10 container mx-auto max-w-5xl px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          variants={itemVariants}
          className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-400 text-black shadow-[0_0_40px_rgba(0,217,255,0.35)]"
        >
          <Bot className="h-7 w-7" />
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="mx-auto max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl"
        >
          Seu proximo cliente pode testar o agente antes de pedir orcamento.
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 md:text-xl"
        >
          Use o simulador como porta de entrada: ele coleta o lead, mostra valor na hora e abre caminho para fechar o projeto completo.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-9 flex flex-col justify-center gap-4 sm:flex-row"
        >
          <button
            onClick={scrollToSimulator}
            className="btn-neon-solid flex items-center justify-center gap-2 rounded-lg font-semibold"
          >
            Testar o simulador
            <ArrowRight className="h-5 w-5" />
          </button>
          <button className="btn-neon flex items-center justify-center gap-2 rounded-lg font-semibold">
            <MessageCircle className="h-5 w-5" />
            Chamar no WhatsApp
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
