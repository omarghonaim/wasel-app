import type { IconType } from 'react-icons';
import styles from './ProductServiceAppSection.module.css';

type FeatureContentProps = {
  Icon: IconType;
  title: string;
  badge?: string;
  description: string;
};

export function FeatureContent({
  Icon,
  title,
  badge,
  description,
}: FeatureContentProps) {
  return (
    <div className={styles.content}>
      <div className={styles.titleRow}>
        <span className={styles.icon} aria-hidden="true">
          <Icon className={styles.iconSvg} strokeWidth={2.25} />
        </span>
        <h3 className={styles.title}>{title}</h3>
        {badge ? <span className={styles.badge}>{badge}</span> : null}
      </div>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
