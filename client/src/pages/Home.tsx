import AgentSimulatorSection from '@/components/AgentSimulatorSection';
import AutomationBridge from '@/components/AutomationBridge';
import FaqSection from '@/components/FaqSection';
import FinalCTA from '@/components/FinalCTA';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import Footer from '@/components/Footer';
import HumanAISection from '@/components/HumanAISection';
import IncludedSection from '@/components/IncludedSection';
import MaintenanceSection from '@/components/MaintenanceSection';
import SegmentsMarquee from '@/components/SegmentsMarquee';
import BuildJourney from '@/components/journey/BuildJourney';
import ProjectsSection from '@/components/ProjectsSection';
import SiteHeader from '@/components/SiteHeader';
import SiteTypesSection from '@/components/SiteTypesSection';

export default function Home() {
  return (
    <div className="aty-page relative min-h-screen bg-[var(--aty-paper)] text-[var(--aty-ink)]">
      <a
        href="#projetos"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:shadow"
      >
        Pular para o conteúdo
      </a>
      <SiteHeader />
      <main>
        <BuildJourney />
        <SegmentsMarquee />
        <ProjectsSection />
        <IncludedSection />
        <HumanAISection />
        <SiteTypesSection />
        <MaintenanceSection />
        <AutomationBridge />
        <AgentSimulatorSection />
        <FaqSection />
        <FinalCTA />
      </main>
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}
