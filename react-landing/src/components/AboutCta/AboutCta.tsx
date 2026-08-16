import { useEffect, useRef, useState } from 'react';
import styles from './AboutCta.module.css';

type AboutCtaProps = {
  onDownloadApp?: () => void;
};

export function AboutCta({ onDownloadApp }: AboutCtaProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -6% 0px',
      },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="about-cta-heading"
    >
      <div className={styles.background} aria-hidden="true" />
      <div className={styles.overlay} aria-hidden="true" />

      <div
        className={[styles.content, visible ? styles.contentVisible : '']
          .filter(Boolean)
          .join(' ')}
      >
        <h2 id="about-cta-heading" className={styles.title}>
          Qatar is moving faster. Wasel is
          <br />
          here to deliver.
        </h2>
        <p className={styles.description}>
          Join thousands of users discovering a better way to receive goods from
          trusted local brands.
        </p>
        <div className={styles.actions}>
          <button
            type="button"
            className={[styles.button, styles.buttonPrimary].join(' ')}
            onClick={onDownloadApp}
          >
            Download App
          </button>
          <a
            href="/#join-us"
            className={[styles.button, styles.buttonSecondary].join(' ')}
          >
            Partner With Us
          </a>
        </div>
      </div>
    </section>
  );
}
