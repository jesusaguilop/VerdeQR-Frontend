import Header from '@/components/landing/header';
import HeroSection from '@/components/landing/hero-section';
import CentersSection from '@/components/landing/centers-section';
import TreesSection from '@/components/landing/trees-section';
import AccessSection from '@/components/landing/access-section';
import Footer from '@/components/landing/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <CentersSection />
        <TreesSection />
        <AccessSection />
      </main>
      <Footer />
    </div>
  );
}
