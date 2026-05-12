import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import DifferentialsSection from '@/components/DifferentialsSection';
import AgentSimulatorSection from '@/components/AgentSimulatorSection';
import CTASection from '@/components/CTASection';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import Footer from '@/components/Footer';
import GlobalBackground from '@/components/GlobalBackground';

/**
 * Design: Futuristic AI Automation Center
 * - Hero cinematográfico com 3D e parallax
 * - Storytelling visual com narrativa scroll
 * - Seções com profundidade e 3D
 * - Microinterações premium
 * - Ambiente vivo com partículas e grids
 * - Autoridade visual com números reais
 */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white relative">
      <GlobalBackground />
      <main className="flex-grow relative z-10">
        <HeroSection />
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
