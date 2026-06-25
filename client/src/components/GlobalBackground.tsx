import { motion, useScroll, useTransform } from 'framer-motion';

export default function GlobalBackground() {
  const { scrollYProgress } = useScroll();
  const orbitY = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const orbitRotate = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const traceY = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#f5f9fe]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_6%,rgba(186,230,253,.62),transparent_29rem),radial-gradient(circle_at_88%_14%,rgba(11,87,181,.12),transparent_31rem),radial-gradient(circle_at_50%_72%,rgba(14,165,233,.08),transparent_34rem),linear-gradient(180deg,#fbfdff_0%,#f2f7fd_48%,#f8fbff_100%)]" />

      <div className="absolute inset-0 opacity-[0.26] [background-image:linear-gradient(rgba(11,87,181,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(11,87,181,.06)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_92%)]" />

      <motion.svg
        className="absolute -right-48 top-28 h-[500px] w-[500px] opacity-[0.12] sm:-right-40 sm:top-24 sm:h-[720px] sm:w-[720px] sm:opacity-[0.16]"
        viewBox="0 0 720 720"
        fill="none"
        style={{ y: orbitY, rotate: orbitRotate }}
      >
        <circle cx="360" cy="360" r="300" stroke="#0b57b5" />
        <circle cx="360" cy="360" r="218" stroke="#0ea5e9" strokeDasharray="7 14" />
        <circle cx="360" cy="360" r="112" stroke="#0b57b5" />
        <path d="M360 28V178M360 542V692M28 360H178M542 360H692" stroke="#0b57b5" />
        <path d="M126 126L232 232M488 488L594 594M594 126L488 232M232 488L126 594" stroke="#0ea5e9" />
        <circle cx="360" cy="360" r="24" fill="#0b57b5" fillOpacity=".22" />
        <circle cx="360" cy="60" r="9" fill="#0ea5e9" />
        <circle cx="660" cy="360" r="9" fill="#0ea5e9" />
      </motion.svg>

      <motion.svg
        className="absolute -left-48 top-[46%] hidden h-[620px] w-[620px] opacity-[0.11] md:block"
        viewBox="0 0 620 620"
        fill="none"
        style={{ y: traceY, rotate: orbitRotate }}
      >
        <circle cx="310" cy="310" r="252" stroke="#0b57b5" />
        <circle cx="310" cy="310" r="172" stroke="#0ea5e9" strokeDasharray="4 12" />
        <path d="M310 58V562M58 310H562" stroke="#0b57b5" />
        <circle cx="310" cy="310" r="15" fill="#0ea5e9" fillOpacity=".28" />
      </motion.svg>

      <motion.svg className="absolute inset-x-0 top-[28%] hidden h-[38rem] w-full opacity-[0.13] sm:block" viewBox="0 0 1440 600" fill="none" style={{ y: traceY }}>
        <path
          d="M-60 420 C170 420 180 140 420 140 C650 140 650 470 890 470 C1120 470 1130 220 1500 220"
          stroke="#0ea5e9"
          strokeWidth="1.5"
          strokeDasharray="6 12"
        />
        <circle cx="420" cy="140" r="7" fill="#0b57b5" />
        <circle cx="890" cy="470" r="7" fill="#0b57b5" />
        <circle cx="1210" cy="260" r="5" fill="#0ea5e9" />
      </motion.svg>

      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/75 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/55 to-transparent" />
    </div>
  );
}
