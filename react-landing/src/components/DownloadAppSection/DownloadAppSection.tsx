import { DOWNLOAD_ASSETS } from './assets';
import { DownloadLinks } from './DownloadLinks';
import styles from './DownloadAppSection.module.css';

type DownloadAppSectionProps = {
  appUrlIos?: string | null;
  appUrlAndroid?: string | null;
};

export function DownloadAppSection({
  appUrlIos,
  appUrlAndroid,
}: DownloadAppSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="download-app-heading">
      <div className={styles.whiteBand} aria-hidden="true" />

      <div className={styles.burgundy}>
        <div
          className={styles.pattern}
          style={{ backgroundImage: `url(${DOWNLOAD_ASSETS.pattern})` }}
          aria-hidden="true"
        />

        <div className={styles.inner}>
          {/* Mobile: flex row. Desktop (md+): display:contents → same 3-col grid as before */}
          <div className={styles.heroRow}>
            <h2 id="download-app-heading" className={styles.heading}>
              <span className={styles.headingLight}>
                Ready to
                <br />
                Experience
              </span>
              <span className={styles.headingBold}>
                Smarter
                <br />
                Delivery?
              </span>
            </h2>

            <div className={styles.phoneWrap}>
              <img
                src={DOWNLOAD_ASSETS.phone}
                alt="Wasel mobile app"
                className={styles.phone}
                width={768}
                height={857}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <DownloadLinks
            appUrlIos={appUrlIos}
            appUrlAndroid={appUrlAndroid}
          />
        </div>
      </div>
    </section>
  );
}
