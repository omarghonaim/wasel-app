import { AppFeatureCard } from './AppFeatureCard';
import { APP_FEATURES } from './features';
import styles from './ProductServiceAppSection.module.css';

export function ProductServiceAppSection() {
  return (
    <section
      className={styles.section}
      aria-label="Wasel app features"
    >
      <div className={styles.inner}>
        {APP_FEATURES.map((feature) => (
          <AppFeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
    </section>
  );
}
