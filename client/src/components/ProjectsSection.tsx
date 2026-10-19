import { useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import Reveal from './Reveal';
import { useIsMobile } from '@/hooks/useMobile';
import { trackEvent } from '@/lib/analytics';

/*
  PORTFÓLIO
  Para adicionar um site: copie um bloco e preencha.
  - src / mobileSrc: print em 16:9 (ex.: 1672x941 e 1000x563, .webp) dentro de client/public/projects/
  - sem print ainda? deixe src como null e preencha "cover" (cor de fundo da capa provisória)
  - video (opcional): mp4 curto e sem som; toca sozinho quando o card aparece na tela
  O primeiro da lista aparece grande; os outros entram na grade abaixo.
*/
type Project = {
  name: string;
  kind: string;
  summary: string;
  delivered: string[];
  url: string;
  src: string | null;
  mobileSrc?: string;
  video?: { src: string; mobileSrc: string; poster: string };
  cover?: { background: string; ink: string; tagline: string };
};

const projects: Project[] = [
  {
    name: 'Next Phase Finish Carpentry',
    kind: 'Marcenaria de acabamento nos EUA',
    summary:
      'Site em inglês para gerar pedidos de orçamento no mercado americano, com galeria de obras, antes e depois e vídeos dos projetos.',
    delivered: ['Site institucional', 'Galeria de obras', 'Pedido de orçamento'],
    url: 'https://nextphasefinishcarpentry.com/',
    src: '/projects/next-phase-final.webp',
    mobileSrc: '/projects/next-phase-final-mobile.webp',
    video: {
      src: '/projects/next-phase.mp4',
      mobileSrc: '/projects/next-phase-mobile.mp4',
      poster: '/projects/next-phase-poster.webp',
    },
  },
  {
    name: 'Jequitibá Paisagismo',
    kind: 'Paisagismo de alto padrão em Alphaville',
    summary:
      'Site para escritório de paisagismo autoral: método em etapas, escopos de contratação, obras entregues, depoimentos e agendamento de visita técnica.',
    delivered: ['Visita técnica', 'Obras entregues', 'Escopos de contratação'],
    url: 'https://jequitiba-kappa.vercel.app/',
    src: '/projects/jequitiba-final.webp',
    mobileSrc: '/projects/jequitiba-final-mobile.webp',
    video: {
      src: '/projects/jequitiba.mp4',
      mobileSrc: '/projects/jequitiba-mobile.mp4',
      poster: '/projects/jequitiba-poster.webp',
    },
  },
  {
    name: 'João Pedro e Jessica',
    kind: 'Site de casamento',
    summary: 'Confirmação de presença, lista de presentes, localização e contagem regressiva num só lugar.',
    delivered: ['Confirmação de presença', 'Lista de presentes', 'Contagem regressiva'],
    url: 'https://www.casamentojoaojessica.com.br/',
    src: '/projects/joao-jessica-final.webp',
    mobileSrc: '/projects/joao-jessica-final-mobile.webp',
    video: {
      src: '/projects/joao-jessica.mp4',
      mobileSrc: '/projects/joao-jessica-mobile.mp4',
      poster: '/projects/joao-jessica-poster.webp',
    },
  },
  {
    name: 'Espaço Néia',
    kind: 'Clínica de estética',
    summary: 'Tratamentos e campanhas apresentados com clareza, e o agendamento de avaliação indo direto para o WhatsApp da clínica.',
    delivered: ['Página de tratamentos', 'Campanhas', 'Agendamento no WhatsApp'],
    url: 'https://espaco-neia.vercel.app/',
    src: '/projects/espaco-neia-final.webp',
    mobileSrc: '/projects/espaco-neia-final-mobile.webp',
    video: {
      src: '/projects/espaco-neia.mp4',
      mobileSrc: '/projects/espaco-neia-mobile.mp4',
      poster: '/projects/espaco-neia-poster.webp',
    },
  },
];

export default function ProjectsSection() {
  const [featured, ...rest] = projects;

  return (
    <section id="projetos" className="relative bg-white px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="mx-auto max-w-[1180px]">
        <Reveal className="grid gap-6 md:grid-cols-[1fr_0.8fr] md:items-end">
          <h2 className="font-display text-[2.4rem] font-bold leading-[1] tracking-[-0.035em] text-[var(--aty-ink)] sm:text-5xl md:text-6xl">
            Sites que a gente já colocou no ar
          </h2>
          <p className="max-w-md text-base leading-relaxed text-[var(--aty-muted)] sm:text-lg md:justify-self-end">
            Alguns são de clientes, outros são projetos nossos. Clique em qualquer um e navegue como se fosse o visitante.
          </p>
        </Reveal>

        <div className="mt-14">
          <ProjectCard project={featured} featured />
        </div>
        <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-x-10 lg:grid-cols-3">
          {rest.map((project, index) => (
            <ProjectCard key={project.name} project={project} delay={index * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, featured = false, delay = 0 }: { project: Project; featured?: boolean; delay?: number }) {
  const track = () =>
    trackEvent('click_project', { cta_location: 'projects', project_name: project.name, link_url: project.url });

  return (
    <Reveal as="article" delay={delay} className={featured ? 'grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-center lg:gap-12' : ''}>
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={track}
        className="group block overflow-hidden rounded-[22px] bg-[#eef3fa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--aty-blue)] focus-visible:ring-offset-4"
        aria-label={`Abrir o site ${project.name}`}
      >
        <ProjectMedia project={project} />
      </a>
      <div className={featured ? '' : 'mt-6'}>
        <div className="text-sm font-medium text-[var(--aty-blue)]">{project.kind}</div>
        <h3 className="font-display mt-1.5 text-2xl font-bold tracking-[-0.02em] text-[var(--aty-ink)] sm:text-[1.7rem]">{project.name}</h3>
        <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-[var(--aty-muted)] sm:text-base">{project.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-[var(--aty-ink)]">
          {project.delivered.map((item) => (
            <li key={item} className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-[var(--aty-blue)]" />
              {item}
            </li>
          ))}
        </ul>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={track}
          className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[var(--aty-ink)] underline decoration-[var(--aty-line)] decoration-2 underline-offset-4 transition hover:text-[var(--aty-blue)] hover:decoration-[var(--aty-blue)]"
        >
          Abrir o site
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </Reveal>
  );
}

function ProjectMedia({ project }: { project: Project }) {
  return (
    <div className="relative aspect-[16/9] overflow-hidden bg-[#e9eef5]">
      {project.video ? (
        <ProjectVideo project={project} />
      ) : project.src ? (
        <picture>
          {project.mobileSrc && <source media="(max-width: 767px)" srcSet={project.mobileSrc} type="image/webp" />}
          <img
            src={project.src}
            alt={`O site ${project.name} aberto no computador e no celular`}
            width={1672}
            height={941}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.015]"
          />
        </picture>
      ) : (
        <ProjectCover project={project} />
      )}
    </div>
  );
}

// Vídeo sem som que só toca enquanto está visível. Quem pediu menos movimento vê a imagem parada.
function ProjectVideo({ project }: { project: Project }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const video = project.video!;

  useEffect(() => {
    const element = ref.current;
    if (!element || reduce) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) element.play().catch(() => undefined);
        else element.pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [reduce, isMobile]);

  if (reduce) {
    return <img src={video.poster} alt={`O site ${project.name} aberto no computador e no celular`} className="h-full w-full object-cover" loading="lazy" />;
  }

  return (
    <video
      key={isMobile ? 'mobile' : 'desktop'}
      ref={ref}
      className="h-full w-full object-cover"
      poster={video.poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={`Vídeo do site ${project.name} aberto no computador e no celular`}
    >
      <source src={isMobile ? video.mobileSrc : video.src} type="video/mp4" />
    </video>
  );
}

// Capa provisória para projeto que ainda não tem print. Troque por uma imagem quando tiver.
function ProjectCover({ project }: { project: Project }) {
  const cover = project.cover ?? { background: '#0a1a33', ink: '#ffffff', tagline: project.kind };
  return (
    <div
      className="flex h-full w-full flex-col justify-end p-6 transition duration-500 group-hover:scale-[1.02] sm:p-8"
      style={{ background: cover.background, color: cover.ink }}
    >
      <div className="text-[13px] opacity-60">{new URL(project.url).hostname}</div>
      <div className="font-display mt-2 text-3xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-4xl">{project.name}</div>
      <div className="mt-2 max-w-[30ch] text-[15px] opacity-75">{cover.tagline}</div>
    </div>
  );
}
