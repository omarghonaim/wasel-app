import { memo } from 'react';

const FOOTER_ASSETS = '/assets/landing/img/react_assets/footer';

const APP_STORE_IMAGE = `${FOOTER_ASSETS}/426fae20c5466daf5188bd0775e3e1003b745596.png`;
const GOOGLE_PLAY_IMAGE = `${FOOTER_ASSETS}/d845f54d74dd0a954a0babe8d672e4283251502a.png`;

type StoreButtonsProps = {
  appUrlIos?: string | null;
  appUrlAndroid?: string | null;
  className?: string;
};

const storeButtonClass =
  'inline-block transition-[transform,box-shadow] duration-300 ease-out will-change-transform hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_10px_24px_rgba(0,0,0,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70';

const storeImageClass = 'h-10 w-auto sm:h-11';

export const StoreButtons = memo(function StoreButtons({
  appUrlIos,
  appUrlAndroid,
  className = '',
}: StoreButtonsProps) {
  const iosHref = appUrlIos || '#';
  const androidHref = appUrlAndroid || '#';

  return (
    <div
      className={['flex flex-wrap items-center justify-center gap-3 sm:justify-start sm:gap-3.5', className]
        .filter(Boolean)
        .join(' ')}
    >
      <a
        href={iosHref}
        target={appUrlIos ? '_blank' : undefined}
        rel={appUrlIos ? 'noopener noreferrer' : undefined}
        aria-label="Download on the App Store"
        className={storeButtonClass}
        onClick={appUrlIos ? undefined : (event) => event.preventDefault()}
      >
        <img
          src={APP_STORE_IMAGE}
          alt="Download on the App Store"
          loading="lazy"
          decoding="async"
          className={storeImageClass}
        />
      </a>

      <a
        href={androidHref}
        target={appUrlAndroid ? '_blank' : undefined}
        rel={appUrlAndroid ? 'noopener noreferrer' : undefined}
        aria-label="Get it on Google Play"
        className={storeButtonClass}
        onClick={appUrlAndroid ? undefined : (event) => event.preventDefault()}
      >
        <img
          src={GOOGLE_PLAY_IMAGE}
          alt="Get it on Google Play"
          loading="lazy"
          decoding="async"
          className={storeImageClass}
        />
      </a>
    </div>
  );
});
