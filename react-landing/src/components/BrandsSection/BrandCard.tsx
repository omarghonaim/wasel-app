import { memo } from 'react';

type BrandCardProps = {
  src: string;
  alt: string;
  className?: string;
};

export const BrandCard = memo(function BrandCard({
  src,
  alt,
  className = '',
}: BrandCardProps) {
  return (
    <article
      className={[
        'relative h-[7.5rem] w-[11.5rem] shrink-0 overflow-hidden rounded-2xl bg-white shadow-[0_4px_16px_-8px_rgba(0,0,0,0.12)] sm:h-[8.5rem] sm:w-[13.5rem] sm:rounded-[1.15rem] md:h-[9.25rem] md:w-[15rem] lg:h-[10rem] lg:w-[16.5rem]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    </article>
  );
});
