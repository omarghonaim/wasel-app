import { useCallback, useRef, useState, type MouseEvent } from 'react';
import {
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { SectionSpotlight } from '@/components/WhyChooseSection/SectionSpotlight';
import { ProductShowcase } from './ProductShowcase';
import { HowWaselWorks } from './HowWaselWorks';
import styles from './WaselWorksSection.module.css';

const SPRING = { stiffness: 140, damping: 22, mass: 0.35 };

type WaselWorksSectionProps = {
  logo?: string | null;
  businessName?: string | null;
};

export function WaselWorksSection({
  logo = null,
  businessName,
}: WaselWorksSectionProps) {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [spotlightActive, setSpotlightActive] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mouseX = useSpring(rawX, SPRING);
  const mouseY = useSpring(rawY, SPRING);

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      rawX.set(event.clientX - rect.left);
      rawY.set(event.clientY - rect.top);
    },
    [rawX, rawY],
  );

  const handleMouseEnter = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      rawX.jump(x);
      rawY.jump(y);
      setSpotlightActive(true);
    },
    [rawX, rawY],
  );

  const handleMouseLeave = useCallback(() => {
    setSpotlightActive(false);
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={styles.section}
      aria-labelledby="wasel-works-heading"
    >
      <SectionSpotlight
        active={spotlightActive && !reduceMotion}
        mouseX={mouseX}
        mouseY={mouseY}
      />

      <div className={styles.inner}>
        <ProductShowcase logo={logo} businessName={businessName} />
      </div>
      <HowWaselWorks />
    </section>
  );
}
