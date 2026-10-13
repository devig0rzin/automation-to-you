import { Briefcase, Flower2, Hammer, Heart, Scissors, Sparkles, Stethoscope, Trees, Utensils } from 'lucide-react';

// Tipos de negócio que a ATY atende. Edite à vontade.
const segments = [
  { icon: Stethoscope, label: 'Clínicas' },
  { icon: Sparkles, label: 'Estética' },
  { icon: Trees, label: 'Paisagismo' },
  { icon: Hammer, label: 'Marcenaria' },
  { icon: Heart, label: 'Casamentos' },
  { icon: Scissors, label: 'Barbearias' },
  { icon: Flower2, label: 'Manicure' },
  { icon: Utensils, label: 'Delivery' },
  { icon: Briefcase, label: 'Prestadores de serviço' },
];

export default function SegmentsMarquee() {
  const row = (hidden: boolean) => (
    <ul className="aty-marquee-track flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14" aria-hidden={hidden}>
      {segments.map(({ icon: Icon, label }) => (
        <li key={label} className="flex items-center gap-2.5 whitespace-nowrap">
          <Icon className="h-[18px] w-[18px] text-[var(--aty-blue)]" strokeWidth={1.8} />
          <span className="font-display text-lg font-semibold tracking-[-0.01em] text-[var(--aty-ink)] sm:text-xl">{label}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Tipos de negócio que atendemos" className="border-y border-[var(--aty-line)] bg-white py-6 sm:py-7">
      <div className="mx-auto mb-4 max-w-[1180px] px-5 text-sm text-[var(--aty-muted)] sm:px-8 lg:px-12">Feito para negócios como</div>
      <div className="aty-marquee flex overflow-hidden">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
