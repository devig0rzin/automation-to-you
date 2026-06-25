type TechnologyBackdropProps = {
  variant?: 'left' | 'right' | 'wide';
};

export default function TechnologyBackdrop({ variant = 'right' }: TechnologyBackdropProps) {
  const alignment =
    variant === 'left'
      ? '-left-16 top-[18%]'
      : variant === 'wide'
        ? 'left-1/2 top-[8%] w-[92%] -translate-x-1/2'
        : '-right-16 top-[16%]';

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg className={`absolute h-[380px] w-[454px] opacity-[0.12] sm:h-[520px] sm:w-[620px] sm:opacity-[0.16] ${alignment}`} viewBox="0 0 620 520" fill="none">
        <g stroke="#0b57b5" strokeWidth="1.2">
          <path d="M24 112H136L172 148H286" />
          <path d="M24 180H98L138 220H236L274 258H398" />
          <path d="M68 408H176L214 370H342L382 330H590" />
          <path d="M310 24V94L344 128V222" />
          <path d="M496 44V118L462 152V248" />
          <path d="M144 274V340L112 372V474" />
        </g>
        <g fill="#0ea5e9">
          <circle cx="24" cy="112" r="5" /><circle cx="286" cy="148" r="5" />
          <circle cx="24" cy="180" r="4" /><circle cx="398" cy="258" r="5" />
          <circle cx="68" cy="408" r="5" /><circle cx="590" cy="330" r="5" />
          <circle cx="310" cy="24" r="4" /><circle cx="344" cy="222" r="5" />
          <circle cx="496" cy="44" r="4" /><circle cx="462" cy="248" r="5" />
        </g>
        <g stroke="#38bdf8">
          <rect x="235" y="198" width="126" height="72" rx="14" />
          <rect x="410" y="270" width="116" height="64" rx="14" strokeDasharray="5 7" />
          <rect x="62" y="230" width="98" height="58" rx="12" strokeDasharray="5 7" />
        </g>
        <g fill="#0b57b5" opacity=".65">
          <circle cx="298" cy="232" r="8" />
          <circle cx="468" cy="302" r="7" />
          <circle cx="111" cy="259" r="7" />
        </g>
        <g stroke="#0ea5e9" opacity=".8">
          <path d="M548 104l12 12 24-28" strokeWidth="3" />
          <path d="M520 430h64M520 446h42M520 462h54" />
          <path d="M184 68h72M184 82h48M184 96h62" />
        </g>
      </svg>
    </div>
  );
}
