import Header from '@/components/landing/header';
import HeroSection from '@/components/landing/hero-section';
import BenefitsSection from '@/components/landing/benefits-section';
import CentersSection from '@/components/landing/centers-section';
import TreesSection from '@/components/landing/trees-section';
import CommunitySection from '@/components/landing/community-section';
import Footer from '@/components/landing/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <BenefitsSection />
        <CentersSection />
        <TreesSection />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  );
}
