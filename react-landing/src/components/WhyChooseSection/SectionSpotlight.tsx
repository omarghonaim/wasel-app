import { motion, useMotionTemplate, type MotionValue } from 'framer-motion';

const PATTERN_URL = '/assets/landing/img/react_assets/PATTERN-1.png';

type SectionSpotlightProps = {
  active: boolean;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
};

/**
 * Single section-level pattern layer. Revealed via one soft circular spotlight
 * that follows smoothed cursor motion values across the whole section.
 */
export function SectionSpotlight({ active, mouseX, mouseY }: SectionSpotlightProps) {
  const maskImage = useMotionTemplate`radial-gradient(circle 260px at ${mouseX}px ${mouseY}px, black 0%, black 55%, transparent 100%)`;

  return (
    <motion.div
      aria-hidden="true"
      className={[
        'pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 ease-out',
        active ? 'opacity-100' : 'opacity-0',
      ].join(' ')}
      style={{
        WebkitMaskImage: maskImage,
        maskImage,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.11]"
        style={{
          backgroundImage: `url(${PATTERN_URL})`,
          backgroundSize: '420px',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
        }}
      />
    </motion.div>
  );
}
