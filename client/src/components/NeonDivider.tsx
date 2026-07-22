import { motion } from 'framer-motion';

interface NeonDividerProps {
  className?: string;
}

export default function NeonDivider({ className = '' }: NeonDividerProps) {
  return (
    <div className={`relative flex items-center justify-center py-2 ${className}`}>
      {/* Line that scans in from left */}
      <motion.div
        className="h-px w-full max-w-4xl"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #00bfff 50%, transparent 100%)',
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: '-60px' }}
      />
      {/* Center glow dot */}
      <motion.div
        className="absolute h-1.5 w-1.5 rounded-full bg-sky-400"
        style={{ boxShadow: '0 0 8px 3px rgba(0,191,255,0.6)' }}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        viewport={{ once: true }}
      />
    </div>
  );
}
