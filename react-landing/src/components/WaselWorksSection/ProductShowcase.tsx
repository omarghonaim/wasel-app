import { motion, useReducedMotion } from 'framer-motion';
import styles from './WaselWorksSection.module.css';

const PHONE_IMAGE =
  '/assets/landing/img/react_assets/product-service/featured-mobile.png?v=2';

type ProductShowcaseProps = {
  logo?: string | null;
  businessName?: string | null;
};

export function ProductShowcase({
  logo = null,
  businessName,
}: ProductShowcaseProps) {
  const reduceMotion = useReducedMotion();
  const brand = businessName || 'Wasel';

  return (
    <div className={styles.showcase}>
      <motion.div
        className={styles.logoWrap}
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {logo ? (
          <img
            src={logo}
            alt={brand}
            className={styles.logo}
          />
        ) : null}
      </motion.div>

      <motion.h2
        id="wasel-works-heading"
        className={styles.showcaseHeading}
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
      >
        Everything you need,
        <br />
        <em className={styles.delivered}>Delivered</em> beautifully!
      </motion.h2>

      <motion.div
        className={styles.phoneWrap}
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={PHONE_IMAGE}
          alt="Wasel mobile experience"
          className={styles.phone}
          width={667}
          height={707}
        />
      </motion.div>
    </div>
  );
}
