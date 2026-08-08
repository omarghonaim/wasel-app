import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { HeroContent } from './HeroContent';
import { HeroSlider } from './HeroSlider';
import { HeroVideo } from './HeroVideo';
import type { HeroSliderItem } from '@/types/settings';

type HeroProps = {
  logo: string | null;
  businessName?: string | null;
  sliderItems: HeroSliderItem[];
  onDownloadApp?: () => void;
  onWhyUs?: () => void;
};

export function Hero({
  logo,
  businessName,
  sliderItems,
  onDownloadApp,
  onWhyUs,
}: HeroProps) {
  return (
    <section
      id="top"
      className="relative isolate min-h-svh overflow-hidden text-surface"
    >
      <HeroVideo />

      <Header
        logo={logo}
        businessName={businessName}
        onDownloadApp={onDownloadApp}
      />

      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-site flex-col justify-center px-5 pb-16 pt-28 md:px-8 lg:px-10 lg:pb-20 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10 xl:gap-16">
          <HeroContent onDownloadApp={onDownloadApp} onWhyUs={onWhyUs} />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-start lg:justify-end"
          >
            <HeroSlider items={sliderItems} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
