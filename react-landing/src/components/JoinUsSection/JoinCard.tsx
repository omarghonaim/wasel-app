import { memo, useCallback, type MouseEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const OVERLAY_TRANSITION = { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

/** Wasel primary — inactive overlay ~65%, active ~25% so the photo reads through. */
const OVERLAY_INACTIVE = 'rgba(88, 12, 26, 0.65)';
const OVERLAY_ACTIVE = 'rgba(88, 12, 26, 0.25)';

const LAYOUT_SPRING = { type: 'spring' as const, stiffness: 120, damping: 20, mass: 0.85 };

const CONTENT_SPRING = { type: 'spring' as const, stiffness: 140, damping: 22, mass: 0.5 };

export type JoinCardData = {
  id: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  image: string;
  underlineImage: string;
  buttonText: string;
  type: 'driver' | 'vendor';
};

type JoinCardProps = {
  card: JoinCardData;
  isActive: boolean;
  isDesktop: boolean;
  reduceMotion: boolean;
  onActivate: () => void;
  onButtonClick?: () => void;
};

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function JoinCardButton({
  label,
  onClick,
}: {
  label: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group/btn inline-flex items-center gap-3 rounded-full bg-white py-2.5 pl-5 pr-2.5 text-[13px] font-semibold text-ink shadow-[0_4px_16px_rgba(0,0,0,0.14)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.2)] active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <span>{label}</span>
      <span
        aria-hidden="true"
        className="inline-flex h-7 w-7 items-center justify-center rounded-[6px] bg-burgundy text-white transition-transform duration-300 ease-out group-hover/btn:translate-x-0.5"
      >
        <ArrowIcon />
      </span>
    </button>
  );
}

export const JoinCard = memo(function JoinCard({
  card,
  isActive,
  isDesktop,
  reduceMotion,
  onActivate,
  onButtonClick,
}: JoinCardProps) {
  const layoutTransition = reduceMotion ? { duration: 0 } : LAYOUT_SPRING;
  const contentTransition = reduceMotion
    ? { duration: 0.2 }
    : { opacity: { duration: 0.35, ease: [0.22, 1, 0.36, 1] }, y: CONTENT_SPRING };

  const handleButtonClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onButtonClick?.();
    },
    [onButtonClick],
  );

  return (
    <motion.article
      layout={isDesktop && !reduceMotion}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      onClick={onActivate}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onActivate();
        }
      }}
      transition={layoutTransition}
      className={[
        'group relative cursor-pointer overflow-hidden rounded-[24px] outline-none',
        'shadow-[0_10px_32px_-18px_rgba(0,0,0,0.45)]',
        'transition-[box-shadow] duration-500 ease-out',
        'hover:shadow-[0_18px_42px_-16px_rgba(0,0,0,0.5)]',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-burgundy',
        isDesktop
          ? [
              'min-h-[22rem] sm:min-h-[26rem] lg:min-h-[30rem] xl:min-h-[32rem]',
              isActive ? 'flex-[65_1_0%]' : 'flex-[35_1_0%]',
            ].join(' ')
          : [
              'w-full min-h-[15rem] sm:min-h-[17rem]',
              isActive
                ? 'ring-2 ring-white/35 shadow-[0_16px_40px_-14px_rgba(0,0,0,0.55)]'
                : 'opacity-95',
            ].join(' '),
      ].join(' ')}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={card.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full scale-100 object-cover transition-transform duration-[650ms] ease-out will-change-transform group-hover:scale-[1.04]"
        />
      </div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        initial={false}
        animate={{
          backgroundColor: isActive ? OVERLAY_ACTIVE : OVERLAY_INACTIVE,
        }}
        transition={reduceMotion ? { duration: 0 } : OVERLAY_TRANSITION}
      />

      <div className="relative z-10 flex h-full min-h-[inherit] flex-col items-start justify-start px-6 pb-6 pt-7 sm:px-7 sm:pb-7 sm:pt-8 md:px-8 md:pt-9 lg:px-9 lg:pt-10">
        <div className="w-fit max-w-full">
          <motion.h3
            layout="position"
            transition={reduceMotion ? { duration: 0 } : CONTENT_SPRING}
            className="font-display text-[1.65rem] leading-[1.1] tracking-tight text-white sm:text-[1.85rem] lg:text-[2.1rem] xl:text-[2.25rem]"
          >
            <span className="block font-medium">{card.titleLine1}</span>
            <span className="block font-extrabold">{card.titleLine2}</span>
          </motion.h3>

          <img
            src={card.underlineImage}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="mt-3 h-[7px] w-full object-contain object-left sm:mt-3.5 sm:h-[8px] lg:mt-4 lg:h-[9px]"
          />
        </div>

        <AnimatePresence initial={false}>
          {isActive ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={contentTransition}
              className="w-full overflow-hidden"
            >
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ delay: 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4 max-w-md text-sm leading-relaxed text-white/90 sm:mt-5 sm:text-[0.95rem] lg:max-w-lg"
              >
                {card.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ delay: 0.1, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 sm:mt-6 lg:mt-7"
              >
                <JoinCardButton label={card.buttonText} onClick={handleButtonClick} />
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.article>
  );
});
