import { memo } from 'react';
import { motion } from 'framer-motion';

export type CategoryCardProps = {
  title: string;
  image: string;
};

export const CategoryCard = memo(function CategoryCard({
  title,
  image,
}: CategoryCardProps) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 18 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      whileHover={{
        y: -6,
        scale: 1.03,
        boxShadow: '0 22px 38px -24px rgba(90,21,40,0.42)',
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      className="group flex w-full max-w-[9.75rem] cursor-grab flex-col items-center rounded-[1.5rem] px-2 pb-3 pt-1 text-center outline-none transition-shadow duration-300 ease-out will-change-transform active:cursor-grabbing sm:max-w-[10.5rem] md:max-w-[11rem]"
    >
      <div className="flex aspect-square w-full items-end justify-center">
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-full w-full object-contain transition-transform duration-300 ease-out will-change-transform group-hover:scale-[1.03]"
        />
      </div>

      <h3 className="mt-2 min-h-5 text-center text-[0.78rem] font-bold leading-tight text-ink/75 sm:text-[0.82rem]">
        {title}
      </h3>
    </motion.article>
  );
});
