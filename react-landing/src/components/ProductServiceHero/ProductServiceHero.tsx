import { motion, useReducedMotion } from 'framer-motion';
import { Header } from '@/components/Header';
import styles from './ProductServiceHero.module.css';

const HERO_IMAGE =
  '/assets/landing/img/react_assets/product-service/product-img.jpg';

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

  return (
    <section className={styles.hero} aria-labelledby="product-service-heading">
      <div
        className={styles.background}
        style={{ backgroundImage: `url("${HERO_IMAGE}")` }}
        aria-hidden="true"
      />
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
