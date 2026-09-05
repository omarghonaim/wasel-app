import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Header } from '@/components/Header';
import styles from './ProductServiceHero.module.css';

const HERO_IMAGE =
  '/assets/landing/img/react_assets/product-service/product-img.jpg';
const MOBILE_MAX_WIDTH = 767;

const DESCRIPTION =
  'We reflects the rhythm of life in Qatar with understanding the importance of trust, speed, Quality, and service — values that shape every delivery we make.';

type ProductServiceHeroProps = {
  logo: string | null;
  businessName?: string | null;
  onDownloadApp?: () => void;
};

export function ProductServiceHero({
  logo,
  businessName,
  onDownloadApp,
}: ProductServiceHeroProps) {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const update = () => {
      setIsMobile(el.clientWidth <= MOBILE_MAX_WIDTH);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      aria-labelledby="product-service-heading"
      data-product-hero-mobile={isMobile ? 'true' : 'false'}
    >
      <div className={styles.background} aria-hidden="true">
        <img
          src={HERO_IMAGE}
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
        activeHref="/product-and-service"
      />

      <div className={styles.content}>
        <motion.h1
          id="product-service-heading"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={styles.heading}
        >
          Product & Service
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
