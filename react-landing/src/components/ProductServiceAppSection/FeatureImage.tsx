import { useEffect, useRef, useState } from 'react';
import type { AppFeatureLayout } from './features';
import styles from './ProductServiceAppSection.module.css';

type FeatureImageProps = {
  src: string;
  alt: string;
  layout: AppFeatureLayout;
};

export function FeatureImage({ src, alt, layout }: FeatureImageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    if (reduceMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -6% 0px',
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const fromLeft = layout === 'image-left';

  return (
    <div ref={rootRef} className={styles.media}>
      <div
        className={[
          styles.imageWrap,
          fromLeft ? styles.imageFromLeft : styles.imageFromRight,
          visible ? styles.imageVisible : '',
          reduceMotion ? styles.imageNoMotion : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <img
          src={src}
          alt={alt}
          className={styles.image}
          width={560}
          height={590}
          draggable={false}
          loading="lazy"
        />
      </div>
    </div>
  );
}
