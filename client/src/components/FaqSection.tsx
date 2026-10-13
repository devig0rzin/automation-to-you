import Reveal from './Reveal';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    q: 'Quanto custa um site?',
    a: 'Depende do tipo e do que ele precisa fazer. Uma landing page custa bem menos que um site com pagamento e agendamento. Você conta o que precisa no WhatsApp e recebe uma proposta fechada, com valor e prazo por escrito, sem surpresa no meio do caminho.',
  },
  {
    q: 'Quanto tempo demora para ficar pronto?',
    a: 'Também depende do tamanho. Como a IA acelera a parte repetitiva, a gente entrega bem mais rápido que o modelo tradicional. O prazo vem na proposta e você acompanha cada etapa: estrutura, design, código e publicação.',
  },
  {
    q: 'Se vocês usam IA, o site não vai ficar genérico?',
    a: 'Não. A IA escreve rascunhos e acelera tarefas repetitivas. A estrutura, o design e a revisão do código são feitos por um programador, pensando no seu público e no que o site precisa vender.',
  },
  {
    q: 'Preciso já ter domínio e hospedagem?',
    a: 'Não. Se você já tiver, a gente usa. Se não, registramos e configuramos com você, e os acessos ficam no seu nome.',
  },
  {
    q: 'Dá para receber pagamento pelo site?',
    a: 'Dá. Pix, cartão ou link de pagamento, usando plataformas como Mercado Pago ou Stripe. Antes de publicar, testamos a compra completa como se fôssemos o seu cliente.',
  },
  {
    q: 'Já tenho um site. Vocês reformulam?',
    a: 'Sim. Analisamos o que funciona e o que trava no site atual e propomos o que mudar. Às vezes vale reformular, às vezes vale começar do zero, e a gente explica o porquê.',
  },
  {
    q: 'E depois que o site estiver no ar?',
    a: 'A gente continua cuidando dele com o plano de manutenção mensal: alterações do dia a dia, segurança, cópias de segurança e suporte direto pelo WhatsApp. Se quiser evoluir com novas páginas, atendimento automático ou um CRM, a base já fica pronta para isso.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

export default function FaqSection() {
  return (
    <section id="duvidas" className="relative bg-white px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <Reveal>
          <h2 className="font-display text-[2.4rem] font-bold leading-[1] tracking-[-0.035em] text-[var(--aty-ink)] sm:text-5xl">
            Perguntas que todo mundo faz
          </h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-[var(--aty-muted)]">
            Ficou alguma de fora? Manda no WhatsApp que a gente responde.
          </p>
        </Reveal>
        <Accordion type="single" collapsible defaultValue="item-0" className="border-t border-[var(--aty-line)]">
          {faqs.map(({ q, a }, index) => (
            <AccordionItem key={q} value={`item-${index}`} className="border-[var(--aty-line)]">
              <AccordionTrigger className="font-display py-6 text-lg font-semibold tracking-[-0.01em] text-[var(--aty-ink)] hover:no-underline sm:text-xl">
                {q}
              </AccordionTrigger>
              <AccordionContent className="max-w-[62ch] pb-6 text-[15px] leading-relaxed text-[var(--aty-muted)] sm:text-base">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
