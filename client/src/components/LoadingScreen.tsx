import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, GitBranch, MessageCircle } from 'lucide-react';
import Logo from './Logo';

interface LoadingScreenProps {
  onComplete: () => void;
}

const loadingSteps = ['Preparando interface', 'Organizando fluxos', 'Carregando prévia'];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((currentProgress) => {
        if (currentProgress >= 100) {
          clearInterval(progressTimer);
          setTimeout(onComplete, 420);
          return 100;
        }

        return Math.min(currentProgress + 4, 100);
      });
    }, 45);

    return () => clearInterval(progressTimer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#f8fbff]"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(186,230,253,0.62),transparent_34%),radial-gradient(circle_at_70%_70%,rgba(11,47,120,0.10),transparent_32%)]" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-sky-200/80 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="relative z-10 w-[min(92vw,520px)] rounded-2xl border border-slate-200 bg-white/90 p-8 shadow-[0_28px_90px_rgba(15,23,42,0.14)] backdrop-blur-xl"
        >
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#0b57b5] text-white shadow-[0_18px_42px_rgba(14,165,233,0.24)]">
              <MessageCircle className="h-7 w-7" />
            </div>
            <div>
              <Logo className="mb-2 h-14 w-auto" />
              <h1 className="mt-1 text-2xl font-semibold text-slate-950">Abrindo o simulador</h1>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-3 gap-2">
            {loadingSteps.map((step, index) => {
              const isDone = progress >= (index + 1) * 30;

              return (
                <div
                  key={step}
                  className={`rounded-lg border px-3 py-3 transition ${
                    isDone ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    {isDone ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <GitBranch className="h-4 w-4 text-slate-500" />
                    )}
                    <span className="text-[11px] text-slate-500">0{index + 1}</span>
                  </div>
                  <p className="text-xs leading-4 text-slate-600">{step}</p>
                </div>
              );
            })}
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
              <span>Carregando experiência</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#0b2f78] via-[#0b57b5] to-[#12b8ee]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
