import AgentSimulatorSection from '@/components/AgentSimulatorSection';
import CapabilitiesStorySection from '@/components/CapabilitiesStorySection';
import CreativeShowcaseSection from '@/components/CreativeShowcaseSection';
import CTASection from '@/components/CTASection';
import DifferentialsSection from '@/components/DifferentialsSection';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import Footer from '@/components/Footer';
import GlobalBackground from '@/components/GlobalBackground';
import HeroSection from '@/components/HeroSection';
import ImageJourneyOverlay from '@/components/ImageJourneyOverlay';
import HowItWorksSection from '@/components/HowItWorksSection';
import ServicesSection from '@/components/ServicesSection';

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-transparent text-slate-950">
      <GlobalBackground />
      <ImageJourneyOverlay />
      <main className="relative z-10 flex-grow">
        <HeroSection />
        <CreativeShowcaseSection />
        <CapabilitiesStorySection />
        <AgentSimulatorSection />
        <ServicesSection />
        <HowItWorksSection />
        <DifferentialsSection />
        <CTASection />
      </main>
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}
