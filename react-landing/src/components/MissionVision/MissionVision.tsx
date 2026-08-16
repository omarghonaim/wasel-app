import styles from './MissionVision.module.css';

const ASSET_BASE = '/assets/landing/img/react_assets/About';

const CARDS = [
  {
    id: 'mission',
    label: 'OUR MISSION',
    title: 'Accessible delivery for everyone',
    description:
      'To make trusted local delivery accessible to everyone in Qatar by connecting people, brands, and drivers through a fast, reliable, and premium digital experience.',
    background: `${ASSET_BASE}/709fac2ec3e224e232aceadd20879b977f5d45cd.png`,
    vector: `${ASSET_BASE}/${encodeURIComponent('OUR MISSION-icon.png')}`,
    vectorClass: styles.vectorMission,
  },
  {
    id: 'vision',
    label: 'OUR VISION',
    title: "Qatar's most trusted delivery app",
    description:
      "To become Qatar's most trusted delivery app for everyday goods, empowering local brands and serving communities across the country.",
    background: `${ASSET_BASE}/${encodeURIComponent('our misison.png')}`,
    vector: `${ASSET_BASE}/${encodeURIComponent('OUR VISION-icon.png')}`,
    vectorClass: styles.vectorVision,
  },
] as const;

export function MissionVision() {
  return (
    <section
      className={styles.section}
      aria-labelledby="about-mission-vision-heading"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>WHAT DRIVES US</p>
          <h2 id="about-mission-vision-heading" className={styles.heading}>
            Mission &amp; Vision
          </h2>
        </header>

        <div className={styles.cards}>
          {CARDS.map((card) => (
            <article key={card.id} className={styles.card} tabIndex={0}>
              <div
                className={styles.background}
                style={{ backgroundImage: `url(${card.background})` }}
                aria-hidden="true"
              />
              <div className={styles.overlay} aria-hidden="true" />
              <img
                src={card.vector}
                alt=""
                aria-hidden="true"
                className={[styles.vector, card.vectorClass].join(' ')}
                loading="lazy"
                decoding="async"
              />
              <div className={styles.content}>
                <p className={styles.label}>{card.label}</p>
                <h3 className={styles.title}>{card.title}</h3>
                <p className={styles.description}>{card.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
