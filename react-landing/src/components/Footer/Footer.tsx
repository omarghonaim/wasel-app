import { motion, useReducedMotion } from 'framer-motion';
import {
  COMPANY_LINKS,
  FooterLinks,
  IMPORTANT_LINKS,
  LEGAL_LINKS,
} from './FooterLinks';
import { SocialLinks, type SocialLinksConfig } from './SocialLinks';
import { StoreButtons } from './StoreButtons';

const PATTERN_URL = '/assets/landing/img/react_assets/PATTERN-1.png';

const FOOTER_BG = '#0E0B1D';

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export type FooterProps = {
  logo: string | null;
  businessName?: string | null;
  appUrlIos?: string | null;
  appUrlAndroid?: string | null;
  socialLinks?: SocialLinksConfig;
  /** Homepage keeps the patterned top strip; About omits it under the stats. */
  showTopPattern?: boolean;
};

export function Footer({
  logo,
  businessName,
  appUrlIos,
  appUrlAndroid,
  socialLinks,
  showTopPattern = true,
}: FooterProps) {
  const reduceMotion = useReducedMotion();
  const brand = businessName || 'Wasel';
  const year = new Date().getFullYear();

  return (
    <footer className="w-full text-white" style={{ backgroundColor: FOOTER_BG }}>
      {showTopPattern ? (
        <div
          aria-hidden="true"
          className="h-11 w-full opacity-[0.22] sm:h-12 md:h-14"
          style={{
            backgroundImage: `url(${PATTERN_URL})`,
            backgroundSize: 'auto 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat-x',
          }}
        />
      ) : null}

      <motion.div
        initial={reduceMotion ? false : 'hidden'}
        whileInView={reduceMotion ? undefined : 'show'}
        viewport={{ once: true, amount: 0.15 }}
        variants={reduceMotion ? undefined : staggerContainer}
        className="mx-auto w-full max-w-site px-5 py-12 sm:px-6 sm:py-14 md:px-8 md:py-16 lg:px-10 lg:py-[4.5rem]"
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 xl:gap-20">
          <motion.div
            variants={reduceMotion ? undefined : fadeUpItem}
            className="flex flex-col items-center text-center md:items-start md:text-left"
          >
            <a href="/#top" className="inline-flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70">
              {logo ? (
                <img
                  src={logo}
                  alt={brand}
                  loading="lazy"
                  decoding="async"
                  className="h-10 w-auto max-w-[9.5rem] object-contain object-left sm:h-11 md:h-12"
                />
              ) : (
                <span className="font-display text-2xl font-bold tracking-tight text-white">
                  {brand}
                </span>
              )}
            </a>

            <StoreButtons
              appUrlIos={appUrlIos}
              appUrlAndroid={appUrlAndroid}
              className="mt-6 sm:mt-7"
            />

            <SocialLinks links={socialLinks} className="mt-8 sm:mt-9" />
          </motion.div>

          <motion.div
            variants={reduceMotion ? undefined : fadeUpItem}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 md:justify-items-start lg:justify-items-end"
          >
            <FooterLinks
              title="Company"
              links={COMPANY_LINKS}
              align="center"
              className="md:[&_h3]:text-left md:[&_ul]:items-start"
            />
            <FooterLinks
              title="Important Links"
              links={IMPORTANT_LINKS}
              align="center"
              className="md:[&_h3]:text-left md:[&_ul]:items-start"
            />
          </motion.div>
        </div>

        <motion.div
          variants={reduceMotion ? undefined : fadeUpItem}
          className="mt-12 border-t border-white/10 pt-6 sm:mt-14 sm:pt-7 md:mt-16"
        >
          <div className="flex flex-col items-center gap-4 text-center sm:gap-5 md:flex-row md:items-center md:justify-between md:text-left">
            <p className="text-xs text-white/45 sm:text-[0.8rem]">
              © {year} {brand}. All rights reserved.
            </p>

            <nav aria-label="Legal">
              <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-6 md:justify-end">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.href + link.label}>
                    <a
                      href={link.href}
                      className="text-xs text-white/45 transition-colors duration-300 ease-out hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70 sm:text-[0.8rem]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
