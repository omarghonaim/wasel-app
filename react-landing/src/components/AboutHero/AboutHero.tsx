import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Header } from '@/components/Header';
import styles from './AboutHero.module.css';

const HERO_IMAGE_DESKTOP = '/assets/landing/img/react_assets/About/aboutus-img.png';
const HERO_IMAGE_MOBILE = '/assets/landing/img/react_assets/About/video-bg.png';
const MOBILE_MAX_WIDTH = 767;

const DESCRIPTION =
  'We are more than a delivery service. We are a trusted partner helping customers, brands, and drivers move forward.';

type AboutHeroProps = {
  logo: string | null;
  businessName?: string | null;
  onDownloadApp?: () => void;
};

export function AboutHero({ logo, businessName, onDownloadApp }: AboutHeroProps) {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const update = () => {
      // Use the hero's own width (works in device frames / iframes)
      setIsMobile(el.clientWidth <= MOBILE_MAX_WIDTH);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const backgroundSrc = isMobile ? HERO_IMAGE_MOBILE : HERO_IMAGE_DESKTOP;

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      aria-labelledby="about-us-heading"
      data-about-hero-mobile={isMobile ? 'true' : 'false'}
    >
      <div className={styles.background} aria-hidden="true">
        <img
          key={backgroundSrc}
          src={backgroundSrc}
          alt=""
          className={styles.backgroundImage}
          decoding="async"
          fetchPriority="high"
        />
      </div>
      <div className={styles.overlay} aria-hidden="true" />

      <Header
        logo={logo}
        businessName={businessName}
        onDownloadApp={onDownloadApp}
        activeHref="/about"
      />

      <div className={styles.content}>
        <motion.h1
          id="about-us-heading"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={styles.heading}
        >
          About Us
        </motion.h1>
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className={styles.description}
        >
          {DESCRIPTION}
        </motion.p>
      </div>
    </section>
  );
}
