import { ArrowDown } from 'lucide-react';
import Reveal from './Reveal';

const examples = [
  ['Responde na hora', 'Dúvidas de preço, horário e endereço respondidas no WhatsApp, até de madrugada.'],
  ['Separa quem quer comprar', 'Faz as perguntas certas e te entrega só os contatos prontos para fechar.'],
  ['Agenda e lembra', 'Marca o horário, confirma no dia anterior e reduz quem esquece e não aparece.'],
] as const;

export default function AutomationBridge() {
  return (
    <section id="automacao" className="relative bg-white px-5 pb-6 pt-24 sm:px-8 md:pt-32 lg:px-12">
      <div className="mx-auto max-w-[1180px]">
        <Reveal className="max-w-3xl">
          <div className="text-sm font-medium text-[var(--aty-blue)]">Depois do site</div>
          <h2 className="font-display mt-2 text-[2.4rem] font-bold leading-[1] tracking-[-0.035em] text-[var(--aty-ink)] sm:text-5xl md:text-6xl">
            Quando os contatos chegam, o atendimento vira o gargalo.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--aty-muted)] sm:text-lg">
            É aí que entra a automação. A gente coloca um atendente com IA no seu WhatsApp, treinado com as informações do
            seu negócio, que passa a conversa para você quando precisa de gente.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-8 border-t border-[var(--aty-line)] pt-8 md:grid-cols-3 md:gap-10">
          {examples.map(([title, copy], index) => (
            <Reveal as="li" key={title} delay={index * 0.07} y={18}>
              <h3 className="font-display text-xl font-semibold tracking-[-0.015em] text-[var(--aty-ink)]">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--aty-muted)]">{copy}</p>
            </Reveal>
          ))}
        </ul>

        <a
          href="#simulador-agente"
          className="mt-12 inline-flex items-center gap-2 text-[15px] font-semibold text-[var(--aty-ink)] underline decoration-[var(--aty-line)] decoration-2 underline-offset-4 transition hover:text-[var(--aty-blue)] hover:decoration-[var(--aty-blue)]"
        >
          Testar um atendente agora, de graça
          <ArrowDown className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
