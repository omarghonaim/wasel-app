import styles from './WaselWorksSection.module.css';

type ProcessStepProps = {
  icon: string;
  title: string;
  description: string;
  iconClassName?: string;
};

export function ProcessStep({
  icon,
  title,
  description,
  iconClassName,
}: ProcessStepProps) {
  return (
    <li className={styles.step}>
      <div className={styles.stepIconWrap}>
        <img
          src={icon}
          alt=""
          className={[styles.stepIcon, iconClassName].filter(Boolean).join(' ')}
          width={iconClassName ? 38 : 40}
          height={iconClassName ? 37 : 40}
        />
      </div>
      <div className={styles.stepContent}>
        <h3 className={styles.stepTitle}>{title}</h3>
        <p className={styles.stepDescription}>{description}</p>
      </div>
    </li>
  );
}
