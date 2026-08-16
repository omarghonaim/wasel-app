import { useEffect, useRef, useState } from 'react';
import styles from './AboutStats.module.css';

const COUNT_DURATION_MS = 1600;

type StatConfig = {
  id: string;
  label: string;
  display: string;
  target: number | null;
  prefix?: string;
  suffix?: string;
};

const STATS: readonly StatConfig[] = [
  {
    id: 'coverage',
    label: 'Qatar store coverage',
    display: '+90%',
    target: 90,
    prefix: '+',
    suffix: '%',
  },
  {
    id: 'users',
    label: 'Active users',
    display: '1000s',
    target: 1000,
    suffix: 's',
  },
  {
    id: 'partners',
    label: 'Trusted brand partners',
    display: '50+',
    target: 50,
    suffix: '+',
  },
  {
    id: 'fleet',
    label: 'Reliable delivery fleet',
    display: 'Fast',
    target: null,
  },
  {
    id: 'qatar',
    label: 'Built for Qatar',
    display: '100%',
    target: 100,
    suffix: '%',
  },
];

const DELAY_CLASS = [
  styles.itemDelay0,
  styles.itemDelay1,
  styles.itemDelay2,
  styles.itemDelay3,
  styles.itemDelay4,
] as const;

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function formatCountedValue(stat: StatConfig, current: number) {
  if (stat.target === null) return stat.display;
  return `${stat.prefix ?? ''}${Math.round(current)}${stat.suffix ?? ''}`;
}

function StatValue({
  stat,
  active,
  reduceMotion,
}: {
  stat: StatConfig;
  active: boolean;
  reduceMotion: boolean;
}) {
  const [current, setCurrent] = useState(0);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (stat.target === null) return;

    if (reduceMotion) {
      setCurrent(stat.target);
      return;
    }

    if (!active || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    let frameId = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / COUNT_DURATION_MS);
      setCurrent(stat.target! * easeOutCubic(progress));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [active, reduceMotion, stat]);

  if (stat.target === null) {
    return <p className={styles.value}>{stat.display}</p>;
  }

  return (
    <p className={styles.value} aria-label={stat.display}>
      {formatCountedValue(stat, reduceMotion || active ? current : 0)}
    </p>
  );
}

export function AboutStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);

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
        threshold: 0.3,
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
      aria-label="Wasel statistics"
    >
      <div className={styles.pattern} aria-hidden="true" />
      <div className={styles.inner}>
        <ul className={styles.list}>
          {STATS.map((stat, index) => (
            <li
              key={stat.id}
              className={[
                styles.item,
                DELAY_CLASS[index],
                visible ? styles.itemVisible : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <StatValue
                stat={stat}
                active={visible}
                reduceMotion={reduceMotion}
              />
              <p className={styles.label}>{stat.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
