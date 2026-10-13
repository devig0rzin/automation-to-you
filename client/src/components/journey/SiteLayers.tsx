import { CalendarCheck, Check, Lock, MessageCircle, QrCode } from 'lucide-react';

/*
  As camadas do site de exemplo ("Studio Aurora", um negócio fictício) que se monta na seção
  "Como nasce seu site". Todas têm o mesmo tamanho (560 x 380) para empilhar em 3D.
*/

const STUDIO_AURORA_PHOTO = '/studio-aurora/hero.webp';

const services = [
  ['Limpeza de pele', 'R$ 180'],
  ['Peeling suave', 'R$ 240'],
  ['Drenagem', 'R$ 150'],
] as const;

export function WireframeLayer() {
  return (
    <div className="h-full w-full overflow-hidden rounded-[18px] border border-[#c9d5e6] bg-white shadow-[0_30px_60px_-30px_rgba(10,26,51,0.35)]">
      <div className="flex h-[34px] items-center gap-1.5 border-b border-dashed border-[#c9d5e6] px-4">
        <span className="h-2 w-2 rounded-full border border-[#b4c3d8]" />
        <span className="h-2 w-2 rounded-full border border-[#b4c3d8]" />
        <span className="h-2 w-2 rounded-full border border-[#b4c3d8]" />
      </div>
      <div className="flex h-[38px] items-center justify-between border-b border-dashed border-[#c9d5e6] px-6">
        <span className="h-3 w-24 rounded border border-dashed border-[#9fb2cc]" />
        <div className="flex gap-3">
          <span className="h-2.5 w-12 rounded border border-dashed border-[#9fb2cc]" />
          <span className="h-2.5 w-12 rounded border border-dashed border-[#9fb2cc]" />
          <span className="h-5 w-16 rounded-full border border-dashed border-[#0b57b5]" />
        </div>
      </div>
      <div className="grid h-[186px] grid-cols-[1.1fr_0.9fr] gap-6 px-6 py-6">
        <div className="flex flex-col gap-2.5">
          <span className="h-2.5 w-28 rounded border border-dashed border-[#9fb2cc]" />
          <span className="h-6 w-full rounded border border-dashed border-[#9fb2cc]" />
          <span className="h-6 w-4/5 rounded border border-dashed border-[#9fb2cc]" />
          <span className="h-2.5 w-11/12 rounded border border-dashed border-[#c9d5e6]" />
          <span className="h-2.5 w-3/4 rounded border border-dashed border-[#c9d5e6]" />
          <span className="mt-1 h-8 w-36 rounded-full border border-dashed border-[#0b57b5]" />
        </div>
        <div className="relative rounded-xl border border-dashed border-[#9fb2cc]">
          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden="true">
            <path d="M0 0L100 100M100 0L0 100" stroke="#c9d5e6" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 px-6">
        {services.map(([name]) => (
          <span key={name} className="h-[88px] rounded-lg border border-dashed border-[#9fb2cc]" />
        ))}
      </div>
    </div>
  );
}

export function DesignLayer({ live }: { live: boolean }) {
  return (
    <div className="h-full w-full overflow-hidden rounded-[18px] border border-[#d6e2f1] bg-[#f8fbff] shadow-[0_40px_80px_-28px_rgba(10,26,51,0.45)]">
      <div className="flex h-[34px] items-center gap-3 border-b border-[#e3ebf5] bg-white px-4">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#d3dbe6]" />
          <span className="h-2 w-2 rounded-full bg-[#d3dbe6]" />
          <span className="h-2 w-2 rounded-full bg-[#d3dbe6]" />
        </div>
        <div className="flex h-[22px] flex-1 items-center gap-1.5 rounded-md bg-[#eef3f9] px-2.5 text-[10.5px] text-[#5b6b82]">
          <Lock className="h-2.5 w-2.5" />
          studioaurora.com.br
        </div>
        <span
          className={`flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold transition-colors duration-500 ${
            live ? 'bg-[#e3f7ec] text-[#0d8a50]' : 'bg-[#eef3f9] text-[#7f8ea3]'
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${live ? 'bg-[#12b76a]' : 'bg-[#b6c3d4]'}`} />
          {live ? 'No ar' : 'Em construção'}
        </span>
      </div>

      <div className="flex h-[38px] items-center justify-between px-6">
        <span className="font-display text-[15px] font-bold tracking-[-0.02em] text-[#0a1a33]">Studio Aurora</span>
        <div className="flex items-center gap-4 text-[10.5px] font-medium text-[#5b6b82]">
          <span>Tratamentos</span>
          <span>Sobre</span>
          <span className="rounded-full bg-[#0b57b5] px-3 py-1 text-white">Agendar</span>
        </div>
      </div>

      <div className="grid h-[186px] grid-cols-[1.1fr_0.9fr] gap-6 px-6 py-5">
        <div>
          <div className="text-[10px] font-semibold text-[#0b57b5]">Estética avançada em Campinas</div>
          <div className="font-display mt-2 text-[27px] font-bold leading-[1.02] tracking-[-0.03em] text-[#0a1a33]">
            Pele cuidada por quem entende.
          </div>
          <div className="mt-2.5 text-[11px] leading-[1.5] text-[#5b6b82]">
            Avaliação gratuita e protocolo feito para a sua pele, sem pacote empurrado.
          </div>
          <div className="mt-3.5 inline-flex items-center gap-1.5 rounded-full bg-[#0b57b5] px-3.5 py-2 text-[11px] font-semibold text-white">
            <CalendarCheck className="h-3 w-3" />
            Agendar avaliação
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl bg-[linear-gradient(160deg,#e9f1fb,#cfdcec)]">
          {/* Foto do site de exemplo. Coloque o arquivo em client/public/studio-aurora/hero.webp (3:2, ex.: 1536x1024). */}
          <img
            src={STUDIO_AURORA_PHOTO}
            alt=""
            width={1536}
            height={1024}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[68%_50%]"
            onError={(event) => {
              event.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute bottom-3 left-3 rounded-full bg-white/85 px-2.5 py-1 text-[9.5px] font-semibold text-[#0b3f86]">
            ★ 4,9 no Google
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 px-6">
        {services.map(([name, price]) => (
          <div key={name} className="flex h-[88px] flex-col justify-between rounded-lg border border-[#dfe8f4] bg-white p-3">
            <div className="text-[11.5px] font-semibold text-[#0a1a33]">{name}</div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#5b6b82]">{price}</span>
              <span className="rounded-full bg-[#e6f0ff] px-2 py-0.5 text-[9.5px] font-semibold text-[#0b57b5]">Reservar</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CodeLayer() {
  const lines: Array<[string, string]> = [
    ['c', '// rascunho escrito com IA em minutos'],
    ['k', '<Hero'],
    ['a', '  titulo="Pele cuidada por quem entende."'],
    ['a', '  acao={agendarAvaliacao}'],
    ['k', '/>'],
    ['k', '<Servicos lista={tratamentos} pix />'],
    ['c', '// revisado por programador:'],
    ['ok', '✓ carrega rápido no 4G'],
    ['ok', '✓ funciona em celular pequeno'],
    ['ok', '✓ formulário testado de ponta a ponta'],
  ];
  const tone: Record<string, string> = {
    c: 'text-[#7f93b2]',
    k: 'text-[#9ccbff]',
    a: 'text-[#e8eef8]',
    ok: 'text-[#5fe3a1]',
  };

  return (
    <div className="absolute right-[-38px] top-[36px] w-[318px] rounded-2xl border border-white/10 bg-[#0a1a33] p-4 shadow-[0_40px_80px_-24px_rgba(10,26,51,0.6)]">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-code text-[10.5px] text-[#7f93b2]">Hero.tsx</span>
        <span className="rounded-full bg-[#12b76a]/15 px-2 py-0.5 text-[9.5px] font-semibold text-[#5fe3a1]">Aprovado</span>
      </div>
      <div className="font-code space-y-[3px] text-[10.5px] leading-[1.55]">
        {lines.map(([kind, text], index) => (
          <div key={index} className={tone[kind]}>
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}

export function BriefLayer() {
  return (
    <div className="absolute left-[-24px] top-[-26px] w-[236px] rotate-[-3deg] rounded-xl border border-[#e7dcae] bg-[#fff8d9] p-4 shadow-[0_30px_50px_-20px_rgba(10,26,51,0.35)]">
      <div className="font-display text-[14px] font-bold text-[#4a3d10]">Briefing</div>
      <ul className="mt-2 space-y-1.5 text-[11px] leading-[1.4] text-[#5f5218]">
        <li>Clínica de estética em Campinas</li>
        <li>Objetivo: agendar avaliações</li>
        <li>Clientes chegam pelo Instagram</li>
        <li>Precisa: Pix, WhatsApp e agenda</li>
      </ul>
    </div>
  );
}

export function IntegrationChip({ kind }: { kind: 'pix' | 'whatsapp' | 'agenda' }) {
  const content = {
    pix: { icon: <QrCode className="h-3.5 w-3.5" />, title: 'Pix recebido', detail: 'R$ 180,00, limpeza de pele', color: 'bg-[#e6f0ff] text-[#0b57b5]' },
    whatsapp: { icon: <MessageCircle className="h-3.5 w-3.5" />, title: 'Novo contato no WhatsApp', detail: 'Mariana quer agendar', color: 'bg-[#e3f7ec] text-[#0d8a50]' },
    agenda: { icon: <Check className="h-3.5 w-3.5" />, title: 'Avaliação agendada', detail: 'Quinta, 14h', color: 'bg-[#e6f0ff] text-[#0b57b5]' },
  }[kind];

  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-[#dce4ef] bg-white py-2 pl-2 pr-3.5 shadow-[0_18px_40px_-16px_rgba(10,26,51,0.4)]">
      <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${content.color}`}>{content.icon}</span>
      <span className="leading-tight">
        <span className="block text-[11.5px] font-semibold text-[#0a1a33]">{content.title}</span>
        <span className="block text-[10.5px] text-[#5b6b82]">{content.detail}</span>
      </span>
    </div>
  );
}
