import { useEffect, useRef, useState } from 'react';
import styles from './OurStory.module.css';

const ASSET_BASE = '/assets/landing/img/react_assets/About';
const STORY_IMAGE = `${ASSET_BASE}/${encodeURIComponent('our story-img.png')}`;

const DESCRIPTION =
  'Wasel was created to make local delivery in Qatar simpler, faster, and more dependable. We connect customers with trusted local brands, helping people receive the products they need while giving businesses a stronger way to reach more customers.';

const FEATURES = [
  {
    id: 'local-brands',
    icon: `${ASSET_BASE}/icon-1.png`,
    title: 'Local Brands First',
    description: "Supporting Qatar's trusted brands and businesses.",
  },
  {
    id: 'reliable-fleet',
    icon: `${ASSET_BASE}/icon-2.png`,
    title: 'Reliable Fleet',
    description: 'Dedicated delivery operations designed for speed and care.',
  },
  {
    id: 'seamless',
    icon: `${ASSET_BASE}/icon-3.png`,
    title: 'Seamless Experience',
    description: 'A smooth app-to-doorstep journey for every order.',
  },
] as const;

const ICON_DELAY_CLASS = [
  styles.featureIconDelay0,
  styles.featureIconDelay1,
  styles.featureIconDelay2,
] as const;

export function OurStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [iconsVisible, setIconsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIconsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        setIconsVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -8% 0px',
      },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="about-our-story-heading"
    >
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.label}>OUR STORY</p>
          <h2 id="about-our-story-heading" className={styles.heading}>
            Built to Deliver More
            <br />
            Than Orders
          </h2>
          <p className={styles.description}>{DESCRIPTION}</p>

          <ul className={styles.features}>
            {FEATURES.map((feature, index) => (
              <li key={feature.id} className={styles.feature}>
                <span
                  className={[
                    styles.featureIcon,
                    ICON_DELAY_CLASS[index],
                    iconsVisible ? styles.featureIconVisible : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <img
                    src={feature.icon}
                    alt=""
                    className={styles.featureIconImg}
                    width={65}
                    height={65}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <div className={styles.featureText}>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.media}>
          <img
            src={STORY_IMAGE}
            alt="Wasel delivery story collage with helmet and local moments"
            className={styles.imageFloat}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
