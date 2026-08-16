import { useCallback, useMemo, useRef, useState, type MouseEvent } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { SectionSpotlight } from './SectionSpotlight';
import { WhyChooseCard, type WhyChooseCardProps } from './WhyChooseCard';

const ASSET = '/assets/landing/img/react_assets';

const SECTION_COPY = {
  headingBefore: 'Why Choose',
  headingBrand: 'Wasel?',
  description:
    "We are more than just a delivery service. We are your reliable partner in Qatar, connecting you with the brands you love, faster and safer.",
} as const;

const SPRING = { stiffness: 140, damping: 22, mass: 0.35 };

type CardConfig = WhyChooseCardProps & { id: string; gridClass: string };

export function WhyChoose() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [spotlightActive, setSpotlightActive] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mouseX = useSpring(rawX, SPRING);
  const mouseY = useSpring(rawY, SPRING);

  const cards = useMemo<CardConfig[]>(
    () => [
      {
        id: 'fleet',
        variant: 'fleet',
        title: 'Dedicated fleet',
        description: 'ensure your orders arrive with unmatched speed and care',
        image: `${ASSET}/grid-img-01.png`,
        buttonText: 'Discover more',
        gridClass: 'min-h-[22rem] md:min-h-[24rem] lg:col-start-1 lg:row-span-2 lg:min-h-0',
      },
      {
        id: 'percent',
        variant: 'percent',
        percentage: '90%',
        description: "of Qatar's Stores covered by Wasel",
        image: `${ASSET}/grid-img-02.png`,
        gridClass: 'min-h-[10.5rem] lg:col-start-2 lg:row-start-1 lg:min-h-0',
      },
      {
        id: 'partners',
        variant: 'partners',
        title: 'Trusted Partners',
        description:
          'with verified local brands we guarantee the highest quality for every order',
        image: `${ASSET}/grid-img-03.png`,
        backgroundColor: 'var(--color-burgundy)',
        gridClass: 'min-h-[10.5rem] lg:col-start-3 lg:row-start-1 lg:min-h-0',
      },
      {
        id: 'premium',
        variant: 'premium',
        title: 'Premium Experience',
        description:
          'From app to doorstep, enjoy a seamless, high-quality service tailored for you.',
        image: `${ASSET}/grid-img-04.png`,
        gridClass:
          'min-h-[12.5rem] lg:col-start-2 lg:col-span-2 lg:row-start-2 lg:min-h-0',
      },
    ],
    [],
  );

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
      // Seed springs so the first reveal doesn't jump from 0,0
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
      id="why-choose"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-white text-ink"
      aria-labelledby="why-choose-heading"
    >
      <SectionSpotlight
        active={spotlightActive && !reduceMotion}
        mouseX={mouseX}
        mouseY={mouseY}
      />

      <div className="relative z-10 mx-auto w-full max-w-site px-5 py-14 md:px-8 md:py-16 lg:px-10 lg:py-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2
            id="why-choose-heading"
            className="font-display text-[1.85rem] tracking-tight text-burgundy sm:text-4xl lg:text-[2.5rem]"
          >
            <span className="font-semibold">{SECTION_COPY.headingBefore} </span>
            <span className="font-extrabold">{SECTION_COPY.headingBrand}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink/50 sm:text-[0.95rem] md:mt-4">
            {SECTION_COPY.description}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: reduceMotion ? 0 : 0.1,
                delayChildren: reduceMotion ? 0 : 0.12,
              },
            },
          }}
          className="mx-auto mt-9 grid w-full max-w-[58.5rem] grid-cols-1 gap-4 md:mt-11 md:max-w-[64rem] md:gap-[1.125rem] lg:mt-12 lg:max-w-[68rem] lg:grid-cols-3 lg:grid-rows-[10.75rem_12.75rem] lg:gap-5 xl:max-w-[72rem]"
        >
          {cards.map((card) => (
            <WhyChooseCard
              key={card.id}
              variant={card.variant}
              title={card.title}
              description={card.description}
              image={card.image}
              percentage={card.percentage}
              buttonText={card.buttonText}
              backgroundColor={card.backgroundColor}
              className={card.gridClass}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
