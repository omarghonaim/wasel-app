import { Hero } from '@/components/Hero';
import { WhyChoose } from '@/components/WhyChooseSection';
import { BrandsSection } from '@/components/BrandsSection';
import { CategoriesSection } from '@/components/CategoriesSection';
import { JoinUsSection } from '@/components/JoinUsSection';
import type { HeroSliderItem, SiteSettings } from '@/types/settings';

/**
 * Placeholder slider content until backend landing data is wired.
 * Keep shape compatible with API-driven items later.
 */
const DEFAULT_SLIDER_ITEMS: HeroSliderItem[] = [
  { id: 'trusted-brands', label: 'Trusted Brands' },
  { id: 'fast-delivery', label: 'Fast Delivery' },
  { id: 'special-offers', label: 'Special Offers' },
  { id: 'secure-payment', label: 'Secure Payment' },
  { id: 'local-support', label: 'Local Support' },
];

export function Home({ settings }: { settings: SiteSettings | null }) {

  const handleDownloadApp = () => {
    const android = settings?.appUrlAndroid;
    const ios = settings?.appUrlIos;
    const target = android || ios;
    if (target) {
      window.open(target, '_blank', 'noopener,noreferrer');
    }
  };

  const handleWhyUs = () => {
    document.getElementById('why-choose')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main>
      <Hero
        logo={settings?.logo ?? null}
        businessName={settings?.businessName}
        sliderItems={DEFAULT_SLIDER_ITEMS}
        onDownloadApp={handleDownloadApp}
        onWhyUs={handleWhyUs}
      />

      <WhyChoose />
      <BrandsSection />
      <CategoriesSection />
      <JoinUsSection />

      {/* Anchors for header links until later sections are built */}
      <section id="blog" className="sr-only" aria-hidden="true" />
      <section id="contact" className="sr-only" aria-hidden="true" />
    </main>
  );
}
