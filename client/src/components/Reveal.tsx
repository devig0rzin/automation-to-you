import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/*
  Entrada suave quando o bloco aparece na tela (uma vez só).
  Funciona igual no celular e no computador; quem pediu menos movimento vê o bloco direto.
*/
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className = '',
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'article';
}) {
  const reduce = useReducedMotion();
  const Component = as === 'li' ? motion.li : as === 'article' ? motion.article : motion.div;

  if (reduce) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
