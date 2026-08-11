import { useCallback, useEffect, useMemo, useState } from 'react';
import { LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { JoinCard, type JoinCardData } from './JoinCard';

const ASSET_BASE = '/assets/landing/img/react_assets/join_us';

const RED_UNDERLINE = `${ASSET_BASE}/red_underline_vector.png`;
const GREY_UNDERLINE = `${ASSET_BASE}/gry_underline_vector.png`;

const cards: JoinCardData[] = [
  {
    id: 'driver',
    type: 'driver',
    titleLine1: 'Apply as',
    titleLine2: 'Driver?',
    description: "Join the Qatar's most trusted delivery Fleet.",
    image: `${ASSET_BASE}/driver_img.png`,
    underlineImage: RED_UNDERLINE,
    buttonText: 'Apply Now',
  },
  {
    id: 'vendor',
    type: 'vendor',
    titleLine1: 'Join as',
    titleLine2: 'Vendor?',
    description:
      'Grow & reach more happy customers when you partner with Wasel Platform.',
    image: `${ASSET_BASE}/vendor_img.jpg`,
    underlineImage: GREY_UNDERLINE,
    buttonText: 'Join Us',
  },
];

function useIsDesktop(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia(`(min-width: ${breakpoint}px)`).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const handleChange = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches);
    };

    setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [breakpoint]);

  return isDesktop;
}

export function JoinUsSection() {
  const reduceMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const [activeIndex, setActiveIndex] = useState(1);

  const cardItems = useMemo(() => cards, []);

  const handleActivate = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <section
      id="join-us"
      className="relative overflow-hidden bg-white py-14 text-ink md:py-16 lg:py-20"
      aria-labelledby="join-us-heading"
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-site px-4 sm:px-6 md:px-8 lg:px-10"
      >
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto w-fit max-w-full">
            <h2
              id="join-us-heading"
              className="font-display text-[1.85rem] font-medium tracking-tight text-ink/90 sm:text-4xl lg:text-[2.5rem]"
            >
              Join <span className="font-extrabold">Us</span>
            </h2>
            <img
              src={RED_UNDERLINE}
              alt=""
              aria-hidden="true"
              className="mt-2.5 h-[7px] w-full object-contain object-center sm:mt-3 sm:h-[8px] lg:h-[9px]"
              loading="lazy"
              decoding="async"
            />
          </div>
          <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-relaxed text-ink/45 sm:text-[0.95rem]">
            Become part of the Wasel community
          </p>
        </div>

        <LayoutGroup>
          <motion.div
            layout
            className={[
              'mx-auto mt-9 max-w-[82rem] md:mt-11 lg:mt-12',
              isDesktop ? 'flex flex-row gap-4 md:gap-5' : 'flex flex-col gap-4 sm:gap-5',
            ].join(' ')}
          >
            {cardItems.map((card, index) => (
              <JoinCard
                key={card.id}
                card={card}
                isActive={activeIndex === index}
                isDesktop={isDesktop}
                reduceMotion={!!reduceMotion}
                onActivate={() => handleActivate(index)}
              />
            ))}
          </motion.div>
        </LayoutGroup>
      </motion.div>
    </section>
  );
}
