import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { HeroSliderItem } from '@/types/settings';

type HeroSliderProps = {
  items: HeroSliderItem[];
  intervalMs?: number;
};

export function HeroSlider({ items, intervalMs = 2800 }: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [items.length, intervalMs]);

  if (!items.length) return null;

  const visibleWindow = buildWindow(items, activeIndex);

  return (
    <div
      className="relative flex w-full max-w-[20rem] flex-col items-start justify-center gap-5 md:max-w-[22rem] lg:ml-auto"
      aria-live="polite"
      aria-atomic="true"
    >
      {visibleWindow.map((entry) => {
        const isActive = entry.offset === 0;

        return (
          <AnimatePresence mode="popLayout" key={`${entry.item.id}-${entry.offset}`}>
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{
                opacity: isActive ? 1 : 0.42,
                y: 0,
                scale: isActive ? 1 : 0.94,
              }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className={[
                'flex w-full items-center gap-3',
                isActive ? 'text-surface' : 'text-surface/50',
              ].join(' ')}
            >
              {isActive ? (
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-white shadow-[0_0_24px_rgba(34,197,94,0.45)]"
                  aria-hidden="true"
                >
                  <CheckIcon />
                </span>
              ) : (
                <span className="h-8 w-8 shrink-0" aria-hidden="true" />
              )}

              <span
                className={[
                  'font-display leading-none tracking-tight',
                  isActive
                    ? 'text-3xl font-bold md:text-4xl'
                    : 'text-xl font-semibold md:text-2xl',
                ].join(' ')}
              >
                {entry.item.label}
              </span>
            </motion.div>
          </AnimatePresence>
        );
      })}
    </div>
  );
}

function buildWindow(items: HeroSliderItem[], activeIndex: number) {
  const offsets = [-2, -1, 0, 1, 2];

  return offsets.map((offset) => {
    const index = (activeIndex + offset + items.length * 10) % items.length;
    return {
      offset,
      item: items[index],
    };
  });
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.5 8.2L6.4 11.1L12.5 4.9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
