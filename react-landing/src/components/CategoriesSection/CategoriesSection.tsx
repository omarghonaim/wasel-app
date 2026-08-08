import { useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Keyboard, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { CategoryCard, type CategoryCardProps } from './CategoryCard';

const CATEGORIES_BASE = '/assets/landing/img/react_assets/categories';

type CategoryItem = CategoryCardProps & {
  id: string;
};

const categories: CategoryItem[] = [
  {
    id: 'sweets',
    title: 'Sweets',
    image: `${CATEGORIES_BASE}/_EcommerceCategoryItem%20%281%29.png`,
  },
  {
    id: 'bakery',
    title: 'Bakery',
    image: `${CATEGORIES_BASE}/_EcommerceCategoryItem%20%284%29.png`,
  },
  {
    id: 'personal-care',
    title: 'Personal Care',
    image: `${CATEGORIES_BASE}/_EcommerceCategoryItem.png`,
  },
  {
    id: 'dairy',
    title: 'Dairy',
    image: `${CATEGORIES_BASE}/_EcommerceCategoryItem%20%282%29.png`,
  },
];

function expandCategories(items: CategoryItem[], copies = 4): CategoryItem[] {
  return Array.from({ length: copies }, (_, copy) =>
    items.map((item) => ({
      ...item,
      id: `${item.id}-${copy}`,
    })),
  ).flat();
}

function ArrowIcon({ direction }: { direction: 'previous' | 'next' }) {
  const next = direction === 'next';

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 sm:h-[1.05rem] sm:w-[1.05rem]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {next ? (
        <path d="M5 12h14M13 6l6 6-6 6" />
      ) : (
        <path d="M19 12H5M11 6l-6 6 6 6" />
      )}
    </svg>
  );
}

export function CategoriesSection() {
  const swiperRef = useRef<SwiperType | null>(null);
  const reduceMotion = useReducedMotion();
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const sliderCategories = useMemo(() => expandCategories(categories), []);

  const pauseAutoplay = () => {
    swiperRef.current?.autoplay?.stop();
  };

  const resumeAutoplay = () => {
    swiperRef.current?.autoplay?.start();
  };

  const handlePaginationClick = (index: number) => {
    swiperRef.current?.slideToLoop(index);
  };

  return (
    <section
      className="relative overflow-hidden bg-[#f5f6f8] py-14 text-ink md:py-16 lg:py-20"
      aria-labelledby="categories-heading"
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-site px-4 sm:px-6 md:px-8 lg:px-10"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="categories-heading"
            className="font-display text-[1.85rem] font-medium tracking-tight text-ink/90 sm:text-4xl lg:text-[2.5rem]"
          >
            Wasel <span className="font-extrabold">Categories</span>
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-relaxed text-ink/45 sm:text-[0.95rem]">
            Discover wasel categories
          </p>
        </div>

        <div
          className="relative mx-auto mt-9 max-w-[82rem] md:mt-11 lg:mt-12"
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
        >
          <button
            type="button"
            className="wasel-categories-prev absolute left-0 top-[42%] z-20 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-burgundy shadow-[0_12px_28px_-16px_rgba(0,0,0,0.55)] transition duration-300 ease-out hover:-translate-x-0.5 hover:scale-105 hover:shadow-[0_16px_32px_-16px_rgba(90,21,40,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy sm:h-11 sm:w-11 md:-left-2 lg:-left-5"
            aria-label="Previous category"
          >
            <ArrowIcon direction="previous" />
          </button>

          <button
            type="button"
            className="wasel-categories-next absolute right-0 top-[42%] z-20 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-burgundy shadow-[0_12px_28px_-16px_rgba(0,0,0,0.55)] transition duration-300 ease-out hover:translate-x-0.5 hover:scale-105 hover:shadow-[0_16px_32px_-16px_rgba(90,21,40,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy sm:h-11 sm:w-11 md:-right-2 lg:-right-5"
            aria-label="Next category"
          >
            <ArrowIcon direction="next" />
          </button>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18 }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: reduceMotion ? 0 : 0.06,
                  delayChildren: reduceMotion ? 0 : 0.1,
                },
              },
            }}
          >
            <Swiper
              modules={[Autoplay, Keyboard, Navigation]}
              className="wasel-categories-swiper"
              loop
              speed={720}
              grabCursor
              watchSlidesProgress
              keyboard={{ enabled: true }}
              navigation={{
                prevEl: '.wasel-categories-prev',
                nextEl: '.wasel-categories-next',
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 2.2,
                  spaceBetween: 14,
                },
                480: {
                  slidesPerView: 2.8,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 6,
                  spaceBetween: 22,
                },
                1280: {
                  slidesPerView: 7,
                  spaceBetween: 24,
                },
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setActiveCategoryIndex(swiper.realIndex % categories.length);
              }}
            >
              {sliderCategories.map((category) => (
                <SwiperSlide key={category.id}>
                  <CategoryCard title={category.title} image={category.image} />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          <div
            className="mt-7 flex items-center justify-center gap-2"
            role="tablist"
            aria-label="Category carousel pagination"
          >
            {categories.map((category, index) => {
              const active = index === activeCategoryIndex;

              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-label={`Show ${category.title}`}
                  aria-selected={active}
                  onClick={() => handlePaginationClick(index)}
                  className={[
                    'h-1 rounded-full transition-[width,background-color,box-shadow] duration-[360ms] ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-burgundy',
                    active
                      ? 'w-9 bg-[#580C1A] shadow-[0_5px_12px_-8px_rgba(88,12,26,0.7)]'
                      : 'w-2.5 bg-[#D6D6D6] hover:bg-[#c9c9c9]',
                  ].join(' ')}
                />
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
