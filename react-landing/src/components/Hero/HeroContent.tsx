import { motion } from 'framer-motion';
import { Button } from '@/components/Button';

type HeroContentProps = {
  onDownloadApp?: () => void;
  onWhyUs?: () => void;
};

export function HeroContent({ onDownloadApp, onWhyUs }: HeroContentProps) {
  return (
    <div className="flex max-w-xl flex-col items-start text-left">
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="mb-4 text-sm font-medium text-surface/90 md:text-base"
      >
        We serves in Qatar with ❤️
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-4xl leading-[1.08] tracking-tight text-surface sm:text-5xl lg:text-[3.5rem]"
      >
        <span className="block font-semibold">The trusted platform to</span>
        <span className="relative mt-1 inline-block font-extrabold">
          Deliver your needs
          <span
            className="pointer-events-none absolute -bottom-1 left-0 h-[2px] w-[92%] origin-left rounded-full bg-surface/90"
            aria-hidden="true"
          />
        </span>
      </motion.h1>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.12, delayChildren: 0.45 },
          },
        }}
        className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:items-center"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 16 },
            show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
          }}
          className="w-full sm:w-auto"
        >
          <Button
            variant="primary"
            fullWidth
            className="sm:w-auto sm:min-w-[10.5rem]"
            onClick={onDownloadApp}
          >
            Download App
          </Button>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 16 },
            show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
          }}
          className="w-full sm:w-auto"
        >
          <Button
            variant="secondary"
            fullWidth
            className="sm:w-auto sm:min-w-[10.5rem]"
            onClick={onWhyUs}
          >
            Why Us?
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
