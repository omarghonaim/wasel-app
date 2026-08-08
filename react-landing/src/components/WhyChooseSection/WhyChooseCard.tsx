import type { CSSProperties, ReactNode } from 'react';
import { motion } from 'framer-motion';

export type WhyChooseCardVariant =
  | 'fleet'
  | 'percent'
  | 'partners'
  | 'premium';

export type WhyChooseCardProps = {
  title?: string;
  description: string;
  image: string;
  variant: WhyChooseCardVariant;
  buttonText?: string;
  percentage?: string;
  backgroundColor?: string;
  className?: string;
  onButtonClick?: () => void;
};

function CardMedia({
  src,
  alt,
  className,
  imgClassName,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div className={['pointer-events-none', className].filter(Boolean).join(' ')}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={[
          'h-full w-full object-contain transition-transform duration-[400ms] ease-out will-change-transform group-hover:scale-[1.08]',
          imgClassName,
        ]
          .filter(Boolean)
          .join(' ')}
      />
    </div>
  );
}

function DiscoverButton({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group/btn inline-flex items-center gap-2.5 rounded-full bg-white py-2 pl-4 pr-2 text-[13px] font-semibold text-ink shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-out hover:scale-[1.02] active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
    >
      <span>{label}</span>
      <span
        aria-hidden="true"
        className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-ink text-[15px] leading-none text-white transition-transform duration-300 ease-out group-hover/btn:translate-x-0.5"
      >
        ›
      </span>
    </button>
  );
}

function FleetContent({
  title,
  description,
  image,
  buttonText,
  onButtonClick,
}: {
  title?: string;
  description: string;
  image: string;
  buttonText?: string;
  onButtonClick?: () => void;
}) {
  return (
    <>
      <div className="relative z-20 px-5 pt-5 sm:px-6 sm:pt-6">
        <p className="max-w-[13rem] font-display text-[1.05rem] leading-[1.35] tracking-tight text-ink sm:text-[1.125rem]">
          {title ? <span className="font-bold">{title} </span> : null}
          <span className="font-medium text-ink/60">{description}</span>
        </p>
      </div>

      <CardMedia
        src={image}
        alt={title ?? 'Dedicated fleet'}
        className="absolute inset-x-0 bottom-0 z-10 h-[78%] w-full"
        imgClassName="object-contain object-bottom"
      />

      {buttonText ? (
        <div className="relative z-20 mt-auto px-5 pb-5 sm:px-6 sm:pb-6">
          <DiscoverButton label={buttonText} onClick={onButtonClick} />
        </div>
      ) : null}
    </>
  );
}

function PercentContent({
  percentage,
  description,
  image,
}: {
  percentage?: string;
  description: string;
  image: string;
}) {
  return (
    <>
      <div className="relative z-10 flex h-full max-w-[52%] flex-col justify-center px-5 py-4 sm:px-6">
        {percentage ? (
          <p className="font-display text-[2.75rem] font-extrabold leading-none tracking-tight text-ink sm:text-[3.15rem]">
            {percentage}
          </p>
        ) : null}
        <p className="mt-1.5 max-w-[9.25rem] text-[13px] leading-snug text-ink/60">
          {description}
        </p>
      </div>

      <CardMedia
        src={image}
        alt="Store coverage"
        className="absolute bottom-0 right-0 z-10 h-[92%] w-[50%] max-w-[10.5rem] sm:w-[52%]"
        imgClassName="object-contain object-right-bottom"
      />
    </>
  );
}

function PartnersContent({
  title,
  description,
  image,
}: {
  title?: string;
  description: string;
  image: string;
}) {
  return (
    <>
      <div className="relative z-10 flex h-full max-w-[55%] flex-col justify-center px-5 py-4 sm:px-6">
        <p className="font-display text-[1.05rem] leading-snug tracking-tight text-white sm:text-[1.1rem]">
          {title ? <span className="font-bold">{title} </span> : null}
          <span className="font-medium text-white/75">{description}</span>
        </p>
      </div>

      <CardMedia
        src={image}
        alt={title ?? 'Trusted Partners'}
        className="absolute bottom-0 right-0 z-10 h-[96%] w-[52%] max-w-[10.5rem] sm:w-[54%]"
        imgClassName="object-contain object-right-bottom"
      />
    </>
  );
}

function PremiumContent({
  title,
  description,
  image,
}: {
  title?: string;
  description: string;
  image: string;
}) {
  return (
    <>
      <div className="relative z-10 flex h-full w-[44%] max-w-md flex-col justify-center px-5 py-5 sm:w-[42%] sm:px-7 sm:py-6 lg:px-8">
        {title ? (
          <h3 className="font-display text-[1.2rem] font-bold tracking-tight text-burgundy sm:text-[1.3rem]">
            {title}
          </h3>
        ) : null}
        <p className="mt-1.5 max-w-[16.5rem] text-[13px] leading-relaxed text-ink/55 sm:text-sm">
          {description}
        </p>
      </div>

      <CardMedia
        src={image}
        alt={title ?? 'Premium Experience'}
        className="absolute bottom-0 right-0 z-10 h-[100%] w-[56%] max-w-[22rem] sm:w-[58%]"
        imgClassName="object-contain object-right-bottom"
      />
    </>
  );
}

function renderVariant(props: WhyChooseCardProps): ReactNode {
  switch (props.variant) {
    case 'fleet':
      return (
        <FleetContent
          title={props.title}
          description={props.description}
          image={props.image}
          buttonText={props.buttonText}
          onButtonClick={props.onButtonClick}
        />
      );
    case 'percent':
      return (
        <PercentContent
          percentage={props.percentage}
          description={props.description}
          image={props.image}
        />
      );
    case 'partners':
      return (
        <PartnersContent
          title={props.title}
          description={props.description}
          image={props.image}
        />
      );
    case 'premium':
      return (
        <PremiumContent
          title={props.title}
          description={props.description}
          image={props.image}
        />
      );
    default:
      return null;
  }
}

const variantShell: Record<WhyChooseCardVariant, string> = {
  fleet: 'flex-col overflow-hidden',
  percent: 'overflow-hidden',
  partners: 'overflow-hidden',
  premium: 'overflow-hidden',
};

export function WhyChooseCard({
  title,
  description,
  image,
  variant,
  buttonText,
  percentage,
  backgroundColor,
  className = '',
  onButtonClick,
}: WhyChooseCardProps) {
  const isDark = variant === 'partners';

  const style: CSSProperties = {
    backgroundColor:
      backgroundColor ?? (isDark ? 'var(--color-burgundy)' : 'var(--color-card)'),
  };

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      whileHover={{
        y: -5,
        boxShadow: '0 20px 40px -18px rgba(0,0,0,0.28)',
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      className={[
        'group relative z-10 flex h-full rounded-3xl border border-black/[0.04] shadow-[0_6px_20px_-12px_rgba(0,0,0,0.14)] will-change-transform',
        variantShell[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {renderVariant({
        title,
        description,
        image,
        variant,
        buttonText,
        percentage,
        onButtonClick,
      })}
    </motion.article>
  );
}
