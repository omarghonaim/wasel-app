import { motion, useReducedMotion } from 'framer-motion';
import { Header } from '@/components/Header';
import styles from './ContactHero.module.css';

const HERO_IMAGE =
  '/assets/landing/img/react_assets/contact/Frame%20427319325.png';

const DESCRIPTION = 'Our team is here to help you 24/7.';

type ContactHeroProps = {
  logo: string | null;
  businessName?: string | null;
  onDownloadApp?: () => void;
};

export function ContactHero({ logo, businessName, onDownloadApp }: ContactHeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.hero} aria-labelledby="contact-us-heading">
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
        activeHref="/contact-us"
      />

      <div className={styles.content}>
        <motion.h1
          id="contact-us-heading"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={styles.heading}
        >
          Contact Us
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
