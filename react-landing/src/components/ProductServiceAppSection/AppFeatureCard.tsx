import { FeatureContent } from './FeatureContent';
import { FeatureImage } from './FeatureImage';
import type { AppFeature } from './features';
import styles from './ProductServiceAppSection.module.css';

type AppFeatureCardProps = {
  feature: AppFeature;
};

export function AppFeatureCard({ feature }: AppFeatureCardProps) {
  const imageLeft = feature.layout === 'image-left';

  return (
    <article
      className={[
        styles.card,
        imageLeft ? styles.cardImageLeft : styles.cardImageRight,
      ].join(' ')}
    >
      <FeatureContent
        Icon={feature.Icon}
        title={feature.title}
        badge={feature.badge}
        description={feature.description}
      />
      <FeatureImage
        src={feature.image}
        alt={`${feature.title} app preview`}
        layout={feature.layout}
      />
    </article>
  );
}
