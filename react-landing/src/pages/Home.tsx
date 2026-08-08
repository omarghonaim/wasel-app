import { Hero } from '@/components/Hero';
import { useSettings } from '@/hooks/useSettings';
import type { HeroSliderItem } from '@/types/settings';

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

export function Home() {
  const { settings } = useSettings();

  const handleDownloadApp = () => {
    const android = settings?.appUrlAndroid;
    const ios = settings?.appUrlIos;
    const target = android || ios;
    if (target) {
      window.open(target, '_blank', 'noopener,noreferrer');
    }
  };

  const handleWhyUs = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
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

      {/* Anchors for header links until later sections are built */}
      <section id="about" className="sr-only" aria-hidden="true" />
      <section id="products" className="sr-only" aria-hidden="true" />
      <section id="blog" className="sr-only" aria-hidden="true" />
      <section id="contact" className="sr-only" aria-hidden="true" />
    </main>
  );
}
