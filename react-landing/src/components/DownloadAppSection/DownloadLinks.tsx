import { DOWNLOAD_ASSETS } from './assets';
import styles from './DownloadAppSection.module.css';

type DownloadLinksProps = {
  appUrlIos?: string | null;
  appUrlAndroid?: string | null;
};

export function DownloadLinks({
  appUrlIos,
  appUrlAndroid,
}: DownloadLinksProps) {
  const iosHref = appUrlIos || '#';
  const androidHref = appUrlAndroid || '#';

  return (
    <div className={styles.download}>
      <img
        src={DOWNLOAD_ASSETS.qr}
        alt="Scan to download Wasel"
        className={styles.qr}
        width={185}
        height={185}
        loading="lazy"
        decoding="async"
      />

      <div className={styles.storeButtons}>
        <a
          href={iosHref}
          target={appUrlIos ? '_blank' : undefined}
          rel={appUrlIos ? 'noopener noreferrer' : undefined}
          aria-label="Download on the App Store"
          className={styles.storeLink}
          onClick={appUrlIos ? undefined : (event) => event.preventDefault()}
        >
          <img
            src={DOWNLOAD_ASSETS.appStore}
            alt="Download on the App Store"
            className={styles.storeBadge}
            width={215}
            height={59}
            loading="lazy"
            decoding="async"
          />
        </a>

        <a
          href={androidHref}
          target={appUrlAndroid ? '_blank' : undefined}
          rel={appUrlAndroid ? 'noopener noreferrer' : undefined}
          aria-label="Get it on Google Play"
          className={styles.storeLink}
          onClick={
            appUrlAndroid ? undefined : (event) => event.preventDefault()
          }
        >
          <img
            src={DOWNLOAD_ASSETS.googlePlay}
            alt="Get it on Google Play"
            className={styles.storeBadge}
            width={215}
            height={59}
            loading="lazy"
            decoding="async"
          />
        </a>
      </div>
    </div>
  );
}
