import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const HEART_SRC = '/assets/landing/img/react_assets/brands/heart%2Barrow.png';

type MarqueeTextProps = {
  /** Seconds for one full seamless cycle */
  duration?: number;
  className?: string;
};

function MarqueeUnit() {
  return (
    <span className="inline-flex items-center gap-4 sm:gap-5 md:gap-6 lg:gap-7">
      <span className="font-display text-[2.75rem] font-extrabold leading-none tracking-tight text-burgundy sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5rem]">
        Wasel
      </span>
      <img
        src={HEART_SRC}
        alt=""
        aria-hidden="true"
        className="h-[3.35rem] w-auto object-contain sm:h-[3.75rem] md:h-[4.5rem] lg:h-[5.5rem] xl:h-[6rem]"
        draggable={false}
      />
      <span className="font-display text-[2.75rem] font-extrabold leading-none tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5rem]">
        Brands
      </span>
    </span>
  );
}

/**
 * Seamless infinite horizontal marquee.
 * Two identical tracks sit side-by-side; animating -50% loops without a gap.
 */
export const MarqueeText = memo(function MarqueeText({
  duration = 30,
  className = '',
}: MarqueeTextProps) {
  const reduceMotion = useReducedMotion();

  const track = (
    <div className="flex shrink-0 items-center gap-4 pr-4 sm:gap-5 sm:pr-5 md:gap-6 md:pr-6 lg:gap-7 lg:pr-7">
      {Array.from({ length: 6 }, (_, i) => (
        <MarqueeUnit key={i} />
      ))}
    </div>
  );

  return (
    <div
      className={['relative w-full overflow-hidden', className]
        .filter(Boolean)
        .join(' ')}
      aria-hidden="true"
    >
      <motion.div
        className="flex w-max will-change-transform"
        animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }}
        transition={
          reduceMotion
            ? undefined
            : {
                duration,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'loop',
              }
        }
      >
        {track}
        {track}
      </motion.div>
    </div>
  );
});
