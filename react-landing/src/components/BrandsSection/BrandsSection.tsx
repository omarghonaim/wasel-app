import { memo, useMemo, useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { BrandCard } from './BrandCard';
import { MarqueeText } from './MarqueeText';

const BRANDS_BASE = '/assets/landing/img/react_assets/brands';

type BrandItem = {
  id: string;
  src: string;
  alt: string;
};

const SECOND_ROW_BRANDS: BrandItem[] = [
  { id: 'r2-1', src: `${BRANDS_BASE}/2nd%20raw/card-1.png`, alt: 'Brand partner' },
  { id: 'r2-2', src: `${BRANDS_BASE}/2nd%20raw/card-2.png`, alt: 'Brand partner' },
  { id: 'r2-3', src: `${BRANDS_BASE}/2nd%20raw/card-3.png`, alt: 'Brand partner' },
  { id: 'r2-4', src: `${BRANDS_BASE}/2nd%20raw/card-4.png`, alt: 'Brand partner' },
];

const THIRD_ROW_BRANDS: BrandItem[] = [
  { id: 'r3-1', src: `${BRANDS_BASE}/3rd%20raw/card-1.png`, alt: 'Brand partner' },
  { id: 'r3-2', src: `${BRANDS_BASE}/3rd%20raw/card-2.png`, alt: 'Brand partner' },
  { id: 'r3-3', src: `${BRANDS_BASE}/3rd%20raw/card-3.png`, alt: 'Brand partner' },
  { id: 'r3-4', src: `${BRANDS_BASE}/3rd%20raw/card-4.png`, alt: 'Brand partner' },
];

const PATTERN_URL = '/assets/landing/img/react_assets/PATTERN-1.png';

/** Duplicate logos so parallax translation never reveals empty edges. */
function expandBrands(brands: BrandItem[], copies = 3): BrandItem[] {
  return Array.from({ length: copies }, (_, copy) =>
    brands.map((brand) => ({
      ...brand,
      id: `${brand.id}-c${copy}`,
    })),
  ).flat();
}

type LogoRowProps = {
  brands: BrandItem[];
  x: MotionValue<number>;
  className?: string;
};

const LogoRow = memo(function LogoRow({ brands, x, className = '' }: LogoRowProps) {
  return (
    <div className={['relative w-full overflow-hidden', className].filter(Boolean).join(' ')}>
      <motion.div
        style={{ x }}
        className="flex w-max items-center gap-3 will-change-transform sm:gap-4 md:gap-5"
      >
        {brands.map((brand) => (
          <BrandCard key={brand.id} src={brand.src} alt={brand.alt} />
        ))}
      </motion.div>
    </div>
  );
});

export function BrandsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const secondRow = useMemo(() => expandBrands(SECOND_ROW_BRANDS, 3), []);
  const thirdRow = useMemo(() => expandBrands(THIRD_ROW_BRANDS, 3), []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Scroll down → row 2 left, row 3 right (and reverse on scroll up)
  const rawRow2 = useTransform(scrollYProgress, [0, 1], [120, -180]);
  const rawRow3 = useTransform(scrollYProgress, [0, 1], [-140, 160]);

  const springConfig = { stiffness: 90, damping: 28, mass: 0.35 };
  const row2X = useSpring(rawRow2, springConfig);
  const row3X = useSpring(rawRow3, springConfig);

  const staticRow2 = useTransform(() => 0);
  const staticRow3 = useTransform(() => -40);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative overflow-x-hidden bg-white py-14 text-ink md:py-16 lg:py-20"
      aria-labelledby="brands-heading"
    >
      {/* Subtle geometric texture behind logo rows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[42%] opacity-[0.06]"
        style={{
          backgroundImage: `url(${PATTERN_URL})`,
          backgroundSize: '420px',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
        }}
      />

      <h2 id="brands-heading" className="sr-only">
        Wasel Brands
      </h2>

      <div className="relative z-10">
        <MarqueeText duration={30} />

        <p className="mx-auto mt-5 max-w-md px-5 text-center text-sm font-medium leading-relaxed text-ink/50 sm:mt-6 sm:text-[0.95rem] md:mt-7">
          We&apos;re all about helping local brands connect with more people and
          grow quicker.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:mt-12 sm:gap-5 md:mt-14 md:gap-6">
          <LogoRow
            brands={secondRow}
            x={reduceMotion ? staticRow2 : row2X}
          />
          <LogoRow
            brands={thirdRow}
            x={reduceMotion ? staticRow3 : row3X}
          />
        </div>
      </div>
    </section>
  );
}
